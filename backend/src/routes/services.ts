import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const upsertSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2),
  description: z.string().min(2),
  icon: z.string().optional(),
  order: z.number().int().optional(),
});

router.get('/', async (_req, res, next) => {
  try {
    const items = await prisma.service.findMany({ orderBy: { order: 'asc' } });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const item = await prisma.service.findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (e) {
    next(e);
  }
});

router.post('/', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = upsertSchema.parse(req.body);
    const slug = slugify(data.title, { lower: true, strict: true });
    const created = await prisma.service.create({ data: { ...data, slug } });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = upsertSchema.partial().parse(req.body);
    const updated = await prisma.service.update({ where: { id: req.params.id }, data });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
