import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const router = Router();

const querySchema = z.object({
  q: z.string().min(1).max(200),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
});

/**
 * Postgres full-text search across Projects and Equipment.
 * Uses to_tsvector('english', ...) over the searchable columns.
 * No materialised tsvector column — fine for a few thousand rows.
 */
router.get('/', async (req, res, next) => {
  try {
    const { q, limit } = querySchema.parse(req.query);
    // websearch_to_tsquery supports natural-language input (quotes, AND/OR/-).
    const projects = await prisma.$queryRawUnsafe<
      Array<{ id: string; slug: string; title: string; summary: string; category: string; rank: number }>
    >(
      `SELECT id, slug, title, summary, category,
              ts_rank(
                to_tsvector('english',
                  coalesce(title,'')||' '||coalesce(summary,'')||' '||coalesce(description,'')||' '||coalesce(client,'')||' '||coalesce(location,'')||' '||coalesce(array_to_string(tags,' '),'')),
                websearch_to_tsquery('english', $1)
              ) AS rank
       FROM "Project"
       WHERE to_tsvector('english',
                coalesce(title,'')||' '||coalesce(summary,'')||' '||coalesce(description,'')||' '||coalesce(client,'')||' '||coalesce(location,'')||' '||coalesce(array_to_string(tags,' '),''))
             @@ websearch_to_tsquery('english', $1)
       ORDER BY rank DESC
       LIMIT $2`,
      q,
      limit,
    );

    const equipment = await prisma.$queryRawUnsafe<
      Array<{ id: string; name: string; category: string; rank: number }>
    >(
      `SELECT id, name, category,
              ts_rank(
                to_tsvector('english',
                  coalesce(name,'')||' '||coalesce(manufacturer,'')||' '||coalesce(model,'')||' '||coalesce(description,'')||' '||coalesce(category,'')),
                websearch_to_tsquery('english', $1)
              ) AS rank
       FROM "Equipment"
       WHERE to_tsvector('english',
                coalesce(name,'')||' '||coalesce(manufacturer,'')||' '||coalesce(model,'')||' '||coalesce(description,'')||' '||coalesce(category,''))
             @@ websearch_to_tsquery('english', $1)
       ORDER BY rank DESC
       LIMIT $2`,
      q,
      limit,
    );

    res.json({ query: q, projects, equipment });
  } catch (e) {
    next(e);
  }
});

export default router;
