import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { signToken } from '../lib/jwt';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
  role: z.enum(['ADMIN', 'STAFF', 'USER']).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Register — public for the very first user; afterwards requires ADMIN role.
router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const count = await prisma.user.count();

    // After first user exists, only ADMIN can create new accounts.
    if (count > 0) {
      const header = req.headers.authorization;
      if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication required to create users' });
      }
      try {
        const { verifyToken } = await import('../lib/jwt');
        const u = verifyToken(header.slice('Bearer '.length).trim());
        if (u.role !== 'ADMIN') {
          return res.status(403).json({ error: 'Only ADMIN can create new users' });
        }
      } catch {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        // first user becomes ADMIN by default; subsequent default to whatever payload says or USER
        role: count === 0 ? 'ADMIN' : (data.role ?? 'USER'),
      },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (e) {
    next(e);
  }
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.sub },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  res.json(user);
});

router.get('/users', requireAuth, requireRole('ADMIN'), async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  res.json(users);
});

export default router;
