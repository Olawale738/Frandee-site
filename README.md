# Frandee Consulting Services — Production Web App

A full‑stack, production‑grade web application for **Frandee Consulting Services**:
exploration, geophysics, mineral consulting and field operations.

- **Frontend:** Next.js 14 (Pages Router) + TypeScript + Tailwind CSS
- **Backend:** Node.js 20 + Express + TypeScript + Prisma
- **Database:** PostgreSQL 16 (with `tsvector` full‑text search)
- **Auth:** JWT (HTTP‑only ready) with role-based access (`ADMIN`, `STAFF`, `USER`)
- **Add‑ons:** Contact form (nodemailer), PDF report generation (pdfkit),
  full‑text search, Sentry error tracking
- **Infra:** Docker Compose for local dev; **Vercel (frontend) + Render (API) + Supabase (Postgres)** for production
- **CI:** GitHub Actions — lint, typecheck, prisma validate, build

---

## Quick start (local)

```bash
# 1. Clone & enter
git clone <your-fork> frandee-site
cd frandee-site

# 2. Copy env examples
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# 3. Start everything
docker compose up --build

# 4. Seed the database (in a second terminal)
docker compose exec api npx prisma db seed

# 5. Open
#    Frontend  -> http://localhost:3000
#    API health -> http://localhost:4000/api/health
```

Default seeded admin:

```
email:    admin@frandee.com
password: SuperSecret123!
```

> Change this password immediately in production.

---

## Repo layout

```
frandee-site/
├─ docker-compose.yml
├─ backend/
│   ├─ src/
│   │   ├─ app.ts
│   │   ├─ index.ts
│   │   ├─ routes/      # auth, projects, inventory, equipment, software, services, contact, reports, search
│   │   ├─ middleware/  # auth, requireRole, errorHandler, rateLimit
│   │   ├─ services/    # mailer, pdf
│   │   └─ lib/         # prisma, sentry
│   ├─ prisma/
│   │   ├─ schema.prisma
│   │   └─ seed.ts
│   ├─ Dockerfile
│   ├─ tsconfig.json
│   ├─ package.json
│   └─ .env.example
├─ frontend/
│   ├─ pages/
│   ├─ components/
│   ├─ lib/
│   ├─ styles/
│   ├─ public/images/
│   ├─ Dockerfile
│   ├─ next.config.js
│   ├─ tailwind.config.js
│   ├─ tsconfig.json
│   ├─ package.json
│   └─ .env.local.example
└─ .github/workflows/ci.yml
```

See `docs/DEPLOY.md` 