import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const schema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  quantity: z.number().int().min(0).optional(),
  status: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('').transform(() => undefined)),
});

router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query as { category?: string; status?: string };
    const where: Record<string, string> = {};
    if (category) where.category = category;
    if (status) where.status = status;
    const items = await prisma.equipment.findMany({ where, orderBy: { name: 'asc' } });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const item = await prisma.equipment.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

router.post('/', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    const created = await prisma.equipment.create({ data });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = schema.partial().parse(req.body);
    const updated = await prisma.equipment.update({ where: { id: req.params.id }, data });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    await prisma.equipment.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
