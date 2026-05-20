import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { streamProjectPdf, streamInventoryPdf } from '../services/pdf';

const router = Router();

router.get('/projects/:slug.pdf', async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({ where: { slug: req.params.slug } });
    if (!project) return res.status(404).json({ error: 'Not found' });
    streamProjectPdf(res, project);
  } catch (e) {
    next(e);
  }
});

router.get('/inventory.pdf', async (_req, res, next) => {
  try {
    const items = await prisma.equipment.findMany({ orderBy: { name: 'asc' } });
    streamInventoryPdf(res, items);
  } catch (e) {
    next(e);
  }
});

export default router;
