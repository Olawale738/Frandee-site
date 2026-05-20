import jwt from 'jsonwebtoken';
import type { Role } from '@prisma/client';

const SECRET = process.env.JWT_SECRET ?? 'dev_only_not_for_production';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  name: string;
}

export function signToken(payload: JwtPayload, expiresIn: string = '7d'): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
