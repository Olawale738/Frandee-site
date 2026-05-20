import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const schema = z.object({
  name: z.string().min(1),
  vendor: z.string().optional(),
  version: z.string().optional(),
  licenseType: z.string().optional(),
  seats: z.number().int().min(0).optional(),
  description: z.string().optional(),
});

router.get('/', async (_req, res, next) => {
  try {
    const items = await prisma.software.findMany({ orderBy: { name: 'asc' } });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.post('/', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const created = await prisma.software.create({ data });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = schema.partial().parse(req.body);
    const updated = await prisma.software.update({ where: { id: req.params.id }, data });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    await prisma.software.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
