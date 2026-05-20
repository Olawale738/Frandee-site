import { Router } from 'express';
import { z } from 'zod';
import slugify from 'slugify';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

const upsertSchema = z.object({
  title: z.string().min(2),
  client: z.string().optional(),
  location: z.string().optional(),
  category: z.string().min(1),
  status: z.enum(['PLANNED', 'ACTIVE', 'COMPLETED', 'ARCHIVED']).optional(),
  summary: z.string().min(2),
  description: z.string().min(2),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  coverImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query as { category?: string; status?: string };
    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (status) where.status = status;
    const items = await prisma.project.findMany({
      where,
      orderBy: { startDate: 'desc' },
    });
    res.json(items);
  } catch (e) {
    next(e);
  }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const item = await prisma.project.findUnique({ where: { slug: req.params.slug } });
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
    const created = await prisma.project.create({
      data: {
        ...data,
        slug,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        ownerId: req.user!.sub,
      },
    });
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', requireAuth, requireRole('ADMIN', 'STAFF'), async (req, res, next) => {
  try {
    const data = upsertSchema.partial().parse(req.body);
    const updated = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
      },
    });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
