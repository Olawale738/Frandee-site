import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Sentry } from '../lib/sentry';

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', details: err.flatten() });
  }
  const status =
    typeof (err as { status?: number }).status === 'number'
      ? (err as { status: number }).status
      : 500;
  const message =
    (err as { message?: string }).message ?? 'Internal server error';

  if (status >= 500) {
    Sentry.captureException(err as Error);
    // eslint-disable-next-line no-console
    console.error('[ERROR]', err);
  }

  res.status(status).json({ error: message });
}
