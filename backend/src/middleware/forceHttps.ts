import type { Request, Response, NextFunction } from 'express';

export function forceHttps(req: Request, res: Response, next: NextFunction) {
  if (process.env.FORCE_HTTPS !== 'true') return next();
  // Behind a proxy (Render/Vercel) the original scheme is in x-forwarded-proto.
  const proto = (req.headers['x-forwarded-proto'] as string) ?? req.protocol;
  if (proto === 'https') return next();
  return res.redirect(308, `https://${req.headers.host}${req.url}`);
}
