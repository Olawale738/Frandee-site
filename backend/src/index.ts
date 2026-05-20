import { buildApp } from './app';
import { prisma } from './lib/prisma';

const port = Number(process.env.PORT ?? 4000);
const app = buildApp();

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://0.0.0.0:${port}`);
});

async function shutdown(signal: string) {
  // eslint-disable-next-line no-console
  console.log(`[api] received ${signal}, shutting down`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
  // hard timeout
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
