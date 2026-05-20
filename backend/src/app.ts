import 'dotenv/config';
import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { initSentry, Sentry } from './lib/sentry';
import { forceHttps } from './middleware/forceHttps';
import { notFound, errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth';
import serviceRoutes from './routes/services';
import equipmentRoutes from './routes/equipment';
import softwareRoutes from './routes/software';
import projectRoutes from './routes/projects';
import contactRoutes from './routes/contact';
import reportRoutes from './routes/reports';
import searchRoutes from './routes/search';

export function buildApp(): Express {
  initSentry();
  const app = express();

  // Sentry request handler must be the first middleware.
  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.requestHandler());
  }

  app.set('trust proxy', 1);
  app.use(forceHttps);
  app.use(
    helmet({
      contentSecurityPolicy: false, // managed by frontend / reverse proxy
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );
  app.use(
    cors({
      origin: (process.env.FRONTEND_URL ?? 'http://localhost:3000').split(','),
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

  // Generic rate limit on all /api routes
  app.use(
    '/api',
    rateLimit({
      windowMs: 60 * 1000,
      max: 240,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get('/api/health', (_req, res) =>
    res.json({ ok: true, ts: new Date().toISOString() }),
  );

  app.use('/api/auth', authRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/equipment', equipmentRoutes);
  app.use('/api/software', softwareRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/reports', reportRoutes);
  app.use('/api/search', searchRoutes);

  if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
  }
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
