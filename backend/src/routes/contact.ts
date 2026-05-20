import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { sendContactEmail } from '../services/mailer';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many submissions — please try again later.' },
});

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  // honeypot — bots will fill this; humans won't see it
  website: z.string().optional(),
});

router.post('/', limiter, async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    if (data.website && data.website.length > 0) {
      // bot — pretend success
      return res.status(202).json({ ok: true });
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
      req.socket.remoteAddress ??
      undefined;

    const submission = await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        ip,
      },
    });

    try {
      await sendContactEmail({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });
    } catch (mailErr) {
      // We still saved the message; log mail failures but don't 500 the user.
      // eslint-disable-next-line no-console
      console.error('[contact] mail failed', mailErr);
    }

    res.status(201).json({ ok: true, id: submission.id });
  } catch (e) {
    next(e);
  }
});

// Admin view of submissions
router.get('/', requireAuth, requireRole('ADMIN', 'STAFF'), async (_req, res, next) => {
  try {
    const items = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

export default router;
