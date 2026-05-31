# Frandee Consulting Services — Full Setup Guide

This guide takes you from a fresh laptop to a fully running production deployment.
It covers everything: prerequisites, local development with Docker (recommended) **and**
bare-metal Node + Postgres, the database, seeding, logging in, customising content,
deploying to Vercel + Render, attaching a domain, monitoring, backups, and a
troubleshooting section.

If anything below conflicts with `docs/DEPLOY.md`, this file wins.

---

## 0. The 60-second mental model

```
[ Browser ]
     │
     ▼ HTTPS
[ Vercel / Next.js (frontend) ]   --->   public marketing pages
                                          /admin dashboard (JWT in localStorage)
     │
     ▼ HTTPS, JSON
[ Render (Express API) ]  --->  /api/*  endpoints
     │
     ▼ TCP + TLS via pgBouncer (pooled) for queries,
        direct connection (port 5432) only for migrations
[ Supabase PostgreSQL 16 ]
```

- **Frontend** is fully static-rendered (ISR with `revalidate: 300`) and pulls JSON from the API at build time and every 5 minutes.
- **Backend** is a stateless Express service. All persistent state is in Postgres.
- **Auth** is JWT-based. The token is stored in the browser's `localStorage` (you can switch to httpOnly cookies later — see §11).
- **Images** are served as static files out of `frontend/public/images/` and optimised by Vercel's image pipeline.

---

## 1. Prerequisites

You need **one of**:

**Recommended — Docker path (easiest)**

| Tool             | Minimum version | Notes                                                  |
|------------------|------------------|--------------------------------------------------------|
| Docker Desktop   | 24+              | Includes Docker Compose v2 (`docker compose`).         |
| Git              | 2.30+            |                                                        |
| Node.js (optional) | 20 LTS         | Only needed if you also want to run `npm` locally for IDE help and seed scripts. |

**Bare-metal path (no Docker)**

| Tool             | Minimum version |
|------------------|------------------|
| Node.js          | 20 LTS           |
| npm              | 10+              |
| PostgreSQL       | 16               |
| Git              | 2.30+            |

Optional but useful: VS Code with the **Prisma**, **Tailwind CSS IntelliSense**, and **ESLint** extensions.

---

## 2. Clone the repo

```bash
git clone https://github.com/Olawale738/Frandee-site.git frandee-site
cd frandee-site
```

You should see this top-level structure:

```
frandee-site/
├─ docker-compose.yml
├─ docs/
├─ backend/
├─ frontend/
└─ .github/workflows/ci.yml
```

---

## 3. Local development — Docker path (recommended)

This is the path that requires the least setup.

### 3.1 Create env files

```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```

You do **not** need to edit anything for local dev — defaults in `docker-compose.yml`
already wire the services together.

Generate a stronger local JWT secret if you want:

```bash
# Mac/Linux
openssl rand -hex 32

# Windows PowerShell
[Convert]::ToHexString((New-Object byte[] 32 | %{[byte](Get-Random -Min 0 -Max 256); $_}))
```

Paste the result into `backend/.env` under `JWT_SECRET=`.

### 3.2 Start the stack

```bash
docker compose up --build
```

What this does:

1. Pulls and starts `postgres:16-alpine` (container `frandee_db`, port `5432`).
2. Builds and starts the API (container `frandee_api`, port `4000`).
3. Builds and starts the Next.js frontend (container `frandee_web`, port `3000`).
4. The API container automatically runs `prisma migrate deploy` on boot.

Wait until you see lines like:

```
frandee_api  | [api] listening on http://0.0.0.0:4000
frandee_web  | ready - started server on 0.0.0.0:3000
```

### 3.3 Seed the database (one time)

In a **second terminal**:

```bash
docker compose exec api npx prisma db seed
```

You should see:

```
[seed] admin: admin@frandee.com
[seed] services: ok
[seed] equipment: ok
[seed] software: ok
[seed] projects: ok
[seed] done
```

### 3.4 Open the site

| URL                                | What you should see                       |
|------------------------------------|--------------------------------------------|
| http://localhost:3000              | Frandee marketing site                     |
| http://localhost:3000/services     | All 6 seeded services                      |
| http://localhost:3000/projects     | 5 seeded projects with real field photos   |
| http://localhost:3000/inventory    | Equipment + software tables                |
| http://localhost:3000/gallery      | All 65 field photos, filterable + lightbox |
| http://localhost:3000/contact      | Contact form                               |
| http://localhost:3000/admin        | Admin dashboard (redirects to login)       |
| http://localhost:4000/api/health   | `{ "ok": true, "ts": "..." }`              |

### 3.5 Log in

Go to `http://localhost:3000/admin/login`:

```
Email:    admin@frandee.com
Password: SuperSecret123!
```

### 3.6 Stopping and restarting

```bash
# stop everything but keep data
docker compose stop

# stop and remove containers (data volume persists)
docker compose down

# fully reset (also removes the database)
docker compose down -v
```

---

## 4. Local development — bare-metal path (no Docker)

Skip this section if you used Docker above.

### 4.1 Start Postgres

Install PostgreSQL 16 locally. Create a database and user:

```sql
-- Run in psql as a superuser
CREATE USER frandee WITH PASSWORD 'frandee_pass';
CREATE DATABASE frandee OWNER frandee;
GRANT ALL PRIVILEGES ON DATABASE frandee TO frandee;
```

### 4.2 Backend

```bash
cd backend
cp .env.example .env
# Edit .env if your DATABASE_URL differs from the default
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev    # starts at http://localhost:4000
```

### 4.3 Frontend (in a new terminal)

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev    # starts at http://localhost:3000
```

---

## 5. Environment variables — every variable explained

### 5.1 Backend (`backend/.env`)

| Variable        | Required | Example                                     | What it does                                                         |
|-----------------|----------|---------------------------------------------|----------------------------------------------------------------------|
| `DATABASE_URL`  | yes      | Supabase **Transaction Pooler** URL (port 6543, ends with `?pgbouncer=true&connection_limit=1`) | Prisma runtime queries. Pooled for low connection count. |
| `DIRECT_URL`    | yes      | Supabase **Direct Connection** URL (port 5432) | Prisma migrations and introspection only. Bypasses pgBouncer. In local Docker dev set equal to `DATABASE_URL`. |
| `JWT_SECRET`    | yes      | 64-char random hex                          | Signs and verifies JWTs. Change it and everyone gets logged out.     |
| `PORT`          | no       | `4000`                                      | HTTP port for the API. Render auto-binds.                            |
| `NODE_ENV`      | yes      | `production` / `development`                | Controls logging, error verbosity, Prisma log level.                 |
| `FRONTEND_URL`  | yes      | `https://www.frandeeconsult.com`            | CORS allowlist. Comma-separated for multiple origins.                |
| `FORCE_HTTPS`   | no       | `true`                                      | If `true`, redirects HTTP → HTTPS using `x-forwarded-proto`.         |
| `SMTP_HOST`     | no       | `smtp.resend.com` / `smtp.gmail.com`        | If blank, contact-form submissions are logged instead of mailed.     |
| `SMTP_PORT`     | no       | `587`                                       | `465` enables TLS automatically.                                     |
| `SMTP_USER`     | no       | API key or email                            |                                                                      |
| `SMTP_PASS`     | no       | API secret or password                      | **Use a secret store; never commit.**                                |
| `CONTACT_TO`    | no       | `dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com` | Inboxes that receive form submissions.                               |
| `SENTRY_DSN`    | no       | `https://abc@o123.ingest.sentry.io/456`     | Enables backend error reporting if set.                              |

### 5.2 Frontend (`frontend/.env.local`)

| Variable                  | Required | Example                                       | What it does                                  |
|---------------------------|----------|-----------------------------------------------|------------------------------------------------|
| `NEXT_PUBLIC_API_URL`     | yes      | `https://api.frandeeconsult.com/api`          | Where the frontend calls the API.              |
| `NEXT_PUBLIC_SITE_URL`    | yes      | `https://www.frandeeconsult.com`              | Used by OG tags and absolute links.            |
| `NEXT_PUBLIC_SENTRY_DSN`  | no       | Sentry DSN for the frontend project           | Enables Sentry on the client + server bundles. |
| `NEXT_PUBLIC_SITE_NAME`   | no       | `Frandee Consulting Services`                 | Default title fallback.                        |

> `NEXT_PUBLIC_*` variables are inlined into the **client** bundle. Don't put secrets there.

---

## 6. Customising content

You have two paths to update what visitors see:

### 6.1 Through the admin dashboard (no code)

Sign in at `/admin/login`, then call the JSON API from your own scripts or extend
the admin UI under `frontend/pages/admin/` to add CRUD pages. The API endpoints are:

| Endpoint                          | Method            | Role required             |
|-----------------------------------|-------------------|---------------------------|
| `/api/services`                   | GET (public)      | —                         |
|                                   | POST/PUT/DELETE   | ADMIN or STAFF (DELETE: ADMIN) |
| `/api/equipment`                  | same as services  |                           |
| `/api/software`                   | same as services  |                           |
| `/api/projects`                   | same as services  |                           |
| `/api/contact`                    | POST (public)     | rate-limited, honeypot    |
|                                   | GET               | ADMIN or STAFF            |
| `/api/auth/users`                 | GET               | ADMIN only                |
| `/api/reports/projects/:slug.pdf` | GET               | public                    |
| `/api/reports/inventory.pdf`      | GET               | public                    |
| `/api/search?q=…`                 | GET               | public                    |

Authenticated calls need an `Authorization: Bearer <token>` header (obtained from `/api/auth/login`).

Example: add a new project from the command line:

```bash
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@frandee.com","password":"SuperSecret123!"}' | jq -r .token)

curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
        "title": "New Survey Project",
        "category": "Geophysical Survey",
        "summary": "...",
        "description": "...",
        "tags": ["VES","groundwater"]
      }'
```

### 6.2 By editing seed data (recommended for bulk changes)

For initial content, large content edits, or when you want everything in version control:

1. Edit `backend/prisma/seed.ts`.
2. Each entity (services, equipment, software, projects) has an array near the top.
3. Save and re-run the seed: `docker compose exec api npx prisma db seed`
   (the seed script is **idempotent** — it uses `upsert`, so existing records are updated, not duplicated).

### 6.3 Swapping images

Drop new images into `frontend/public/images/<category>/` and reference them in seed
data as `/images/<category>/<filename>.jpg`. The frontend's `Gallery` page expects
filenames of the form `<prefix>-NN.jpg` (e.g. `mineral-07.jpg`); update the `CATEGORIES`
array in `frontend/pages/gallery.tsx` if you change the counts.

For optimal performance, run images through a compressor (Squoosh, ImageMagick `mogrify`, etc.) before committing — Vercel's image optimiser will further serve AVIF/WebP at request time.

### 6.4 Brand colours and typography

- **Colours** live in `frontend/tailwind.config.js` under `theme.extend.colors` (`brand.*` and `earth.*`). Update those once and Tailwind regenerates everywhere.
- **Fonts** are loaded in `frontend/pages/_document.tsx` (Inter + Manrope via Google Fonts). Swap the link tag and `tailwind.config.js`'s `fontFamily` to change them.

### 6.5 Copy / static text

Edit the relevant page under `frontend/pages/`:

- `about.tsx` — company story, principles
- `services.tsx` — pulled from DB, but the layout is here
- `projects/index.tsx` and `projects/[slug].tsx` — project list and detail page
- `contact.tsx` — contact info (phone, email, address)
- `components/Footer.tsx` — footer info
- `components/Hero.tsx` — homepage hero copy

---

## 7. Production deployment — recommended split

```
┌────────────────────────┐     ┌───────────────────┐     ┌─────────────────────┐
│  Vercel (frontend)     │ ──► │  Render (API)     │ ──► │  Supabase (Postgres)│
│  www.frandeeconsult.com│     │  api.frandee...   │     │  .pooler.supabase…  │
└────────────────────────┘     └───────────────────┘     └─────────────────────┘
```

Three providers, all on generous free tiers:

- **Supabase** for managed PostgreSQL 16 (plus pgBouncer connection pooling, point-in-time recovery on the paid tier, and a SQL/table UI in the browser).
- **Render** for the Express API.
- **Vercel** for the Next.js frontend.

You can swap any of them later (Render → Railway/Fly, Vercel → Cloudflare Pages, Supabase → Neon/RDS) — the steps are equivalent.

> **Hosting on LyteHosting (shared / VPS)?** See [HOST_LYTEHOSTING.md](./HOST_LYTEHOSTING.md) — it covers three options: static export to shared cPanel, full Node.js app via cPanel's "Setup Node.js App", and a VPS path with Nginx + PM2.

### 7.1 Push your repo (already done)

```bash
git push origin main
```

### 7.2 Create the database on Supabase

1. Sign in to https://supabase.com.
2. **New project.**
   - **Name:** `frandee-prod`
   - **Database password:** generate a strong one and store it in a password manager — you'll need it for the connection strings. **Supabase doesn't show it again** after this step.
   - **Region:** pick the one closest to your Render region (e.g. both in `eu-west` or both in `us-east`). Cross-region latency between Render and Supabase is the single biggest performance footgun.
   - **Pricing plan:** Free tier is fine to start; upgrade to Pro for daily PITR backups and more bandwidth.
3. Wait ~2 minutes for the project to provision.
4. Get the two connection strings:
   - **Project Settings → Database → Connection string → URI tab.**
   - At the top, select **Connection pooling → Transaction (port 6543)**. This is your `DATABASE_URL`. Copy it; it looks like:
     ```
     postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
     ```
     **Append** `?pgbouncer=true&connection_limit=1` to the end:
     ```
     postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
     ```
   - Switch the same widget to **Connection pooling → Session (port 5432)** (or click **Direct connection** if your project is on the older UI). This is your `DIRECT_URL`. It looks like:
     ```
     postgres://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres
     ```
5. Replace `<password>` in both strings with your actual password (URL-encode any special characters: `@ → %40`, `: → %3A`, `/ → %2F`, etc.).
6. Quickly verify the connection from your laptop:
   ```bash
   psql "<your DIRECT_URL>"
   # If you don't have psql installed, skip this — Render will fail loudly if it can't connect.
   ```

> Why two URLs? Prisma's migrations run DDL statements (`CREATE TABLE`, `CREATE INDEX`, etc.) that pgBouncer in transaction mode rejects. So we point the app at the pooled port (6543) and migrations at the direct port (5432). This is the official Prisma + Supabase pattern.

### 7.3 Create the API service on Render

1. Sign in to https://dashboard.render.com.
2. **New → Web Service.**
3. Connect your GitHub account and pick `Olawale738/Frandee-site`.
4. Configure:
   - **Name:** `frandee-api`
   - **Region:** **same region as Supabase** (matters a lot for query latency).
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:**
     ```
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command:**
     ```
     npx prisma migrate deploy && npm run start
     ```
   - **Health Check Path:** `/api/health`
   - **Plan:** Free is fine to start (cold-starts after ~15 min of idleness — pay $7/mo for always-on).
5. Under **Environment**, add every variable from §5.1. Paste:
   - `DATABASE_URL` = the **pooled** URL (port 6543) from step 7.2.4.
   - `DIRECT_URL` = the **direct** URL (port 5432) from step 7.2.4.
   - `JWT_SECRET` = generate with `openssl rand -hex 32`.
   - `FRONTEND_URL` = your Vercel URL (set after §7.4) — for now use `*` temporarily, but tighten it before going live.
   - `NODE_ENV` = `production`
   - `FORCE_HTTPS` = `true`
   - `CONTACT_TO` = `dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com`
6. Click **Create Web Service**. First boot takes 2–5 minutes.

After it's up:

```bash
# verify
curl https://frandee-api.onrender.com/api/health
# {"ok":true,"ts":"..."}

# seed (one time) — open the "Shell" tab on Render and run:
npx prisma db seed
```

If the seed errors out with `prepared statement "s1" already exists` or similar, that's pgBouncer in transaction mode rejecting prepared statements. The fix is to seed via `DIRECT_URL`:

```bash
# Inside the Render shell:
DATABASE_URL="$DIRECT_URL" npx prisma db seed
```

### 7.4 Deploy the frontend to Vercel

1. Go to https://vercel.com/new.
2. **Import Git Repository** → `Olawale738/Frandee-site`.
3. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js (auto-detected).
4. **Environment Variables:** add
   - `NEXT_PUBLIC_API_URL` → `https://YOUR-API.onrender.com/api`
   - `NEXT_PUBLIC_SITE_URL` → `https://YOUR-FRONTEND.vercel.app` (or your custom domain after step 8)
   - `NEXT_PUBLIC_SENTRY_DSN` (optional)
5. Click **Deploy**. First build takes 2–4 minutes.

After it's up, also update the API's `FRONTEND_URL` env var to the Vercel URL so CORS allows it. Render will redeploy automatically.

### 7.5 Smoke test production

| Test                                           | Expected                                            |
|------------------------------------------------|------------------------------------------------------|
| Load `https://YOUR-FRONTEND.vercel.app`        | Marketing site appears with project cards.           |
| Open a project detail page                     | Cover image + gallery render. Download PDF works.    |
| Submit the contact form                        | Returns 201, server logs the submission.             |
| Log in at `/admin/login`                       | Dashboard shows counts.                              |
| `/api/search?q=lithium`                        | JSON with at least one project match.                |

---

## 8. Domain and SSL

### 8.1 Buy the domain

Use Namecheap, Cloudflare Registrar, Porkbun, etc. Cloudflare is recommended because
its DNS panel makes SSL and CDN trivial.

### 8.2 DNS records

| Type         | Host  | Value                              | TTL  |
|--------------|-------|------------------------------------|------|
| `A`/`ALIAS`  | `@`   | Vercel's apex IP (Vercel UI shows it) | Auto |
| `CNAME`      | `www` | `cname.vercel-dns.com`             | Auto |
| `CNAME`      | `api` | `YOUR-API.onrender.com`            | Auto |

If your registrar doesn't support `ALIAS`/`ANAME` flattening on the apex, point the
apex CNAME to Vercel via Cloudflare proxy mode instead.

### 8.3 Add domains in Vercel and Render

- **Vercel:** Project → Settings → Domains → add `frandeeconsult.com` and `www.frandeeconsult.com`. Set `www` as primary (or apex, your call) and the other as a permanent redirect.
- **Render:** Web service → Settings → Custom Domains → add `api.frandeeconsult.com`.

Both providers issue Let's Encrypt SSL automatically — usually within 60 seconds of DNS resolving.

### 8.4 Update env vars after the domain is live

- Vercel: `NEXT_PUBLIC_API_URL=https://api.frandeeconsult.com/api`, `NEXT_PUBLIC_SITE_URL=https://www.frandeeconsult.com`.
- Render: `FRONTEND_URL=https://www.frandeeconsult.com,https://frandeeconsult.com`.

Both will auto-redeploy.

---

## 9. Optional integrations

### 9.1 Contact form email (nodemailer)

Pick a transactional mail provider — **Resend** or **Postmark** are the easiest:

```
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend     # literal string
SMTP_PASS=re_xxxxxx  # your API key
CONTACT_TO=dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com
```

Or Gmail (less recommended — requires app passwords and has low daily limits):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.address@gmail.com
SMTP_PASS=16-char-app-password
```

Restart the API. Submitting the contact form will now email `CONTACT_TO` and store
the submission in the database for the admin view at `GET /api/contact`.

### 9.2 Sentry error tracking

1. Create two projects in Sentry: one **Node.js**, one **Next.js**.
2. Copy each DSN.
3. Set:
   - Backend (Render): `SENTRY_DSN=https://...@o123.ingest.sentry.io/456`
   - Frontend (Vercel): `NEXT_PUBLIC_SENTRY_DSN=https://...@o123.ingest.sentry.io/789`
4. Redeploy both. Throw a test exception and confirm it lands in Sentry.

### 9.3 PDF reports

Already wired. Live endpoints:

- `https://api.frandeeconsult.com/api/reports/projects/<slug>.pdf`
- `https://api.frandeeconsult.com/api/reports/inventory.pdf`

Project detail pages already include a **Download PDF report** button.

### 9.4 Full-text search

Already wired. Try:

```
GET https://api.frandeeconsult.com/api/search?q=lithium+pegmatite
GET https://api.frandeeconsult.com/api/search?q=VES OR ERT
GET https://api.frandeeconsult.com/api/search?q="electrical resistivity"
```

The endpoint accepts `websearch_to_tsquery` syntax (quotes, AND/OR/-, parentheses).

### 9.5 Analytics

Free options that need no code change:

- **Vercel Analytics** — enable in the Vercel project settings.
- **Plausible** or **Cloudflare Web Analytics** — paste their snippet into `frontend/pages/_document.tsx`.

For Google Tag Manager, add the `<script>` block to `_document.tsx`'s `<Head>` and the `<noscript>` to the top of `<body>`.

---

## 10. Monitoring, backups, and runbook

### 10.1 Monitoring checklist

| Signal                          | Where to check                                                       | Alert threshold              |
|---------------------------------|----------------------------------------------------------------------|------------------------------|
| API uptime                      | Render dashboard → Metrics                                           | 5xx > 1 % over 5 min         |
| Frontend traffic                | Vercel Analytics                                                     | RPS drop > 50 % vs baseline  |
| Database CPU / IO               | Supabase → Reports → Database                                        | sustained > 80 %             |
| Pooler connections              | Supabase → Reports → Database → Connection pooler                    | > 90 % of pool capacity      |
| DB disk usage                   | Supabase → Reports → Database                                        | > 80 %                       |
| Error tracking                  | Sentry                                                               | new error fingerprint        |
| SSL expiry                      | n/a — auto-renewed by Vercel and Render                              | n/a                          |

Supabase, Render, and Vercel all send email alerts on incidents and deploy failures.

### 10.2 Backups

Supabase backup policy by plan:

| Plan        | Daily snapshots | PITR (point-in-time recovery)  | Retention            |
|-------------|------------------|--------------------------------|----------------------|
| Free        | Yes (1/day)      | No                             | 7 days               |
| Pro         | Yes              | Yes (down to 2 minutes)        | 7 days (extendable)  |
| Team / Ent. | Yes              | Yes                            | 14–28 days           |

Restore drill (once per quarter):

1. Supabase dashboard → Project → **Database → Backups** → pick a snapshot.
2. Click **Restore** and choose **Restore to a new project** (don't overwrite production).
3. Connect to the restored project's `DIRECT_URL` and verify row counts (`select count(*) from "Project";` etc.) match what you expect.
4. Delete the sandbox project when done.

Off-site export (recommended weekly even with Supabase backups, so you're never locked in):

```bash
pg_dump "$DIRECT_URL" -Fc -f frandee-$(date +%F).dump
# Then upload to S3 / Backblaze B2 / Cloudflare R2 via aws-cli or rclone.
```

Automate the off-site dump with a GitHub Actions cron workflow if you prefer (see §13 action item 7).

### 10.3 Releasing a new version

1. Open a PR against `main`. CI runs (`.github/workflows/ci.yml`).
2. Merge to `main`.
3. Render auto-deploys the API. Vercel auto-deploys the frontend.
4. If you changed `prisma/schema.prisma`, also commit the generated migration in `backend/prisma/migrations/` — Render runs `prisma migrate deploy` on every boot.

### 10.4 Rolling back

- Render: Web service → Deploys → pick a previous successful deploy → "Redeploy".
- Vercel: Project → Deployments → "Promote to Production" on any older deploy.
- Database: restore from a snapshot (§10.2).

---

## 11. Security hardening for production

These are already in the codebase:

- `helmet` + secure default headers
- `cors` allowlist via `FRONTEND_URL`
- `express-rate-limit` (240 req/min/IP global, 10 / 15 min on `/api/contact`)
- Contact-form honeypot
- `bcryptjs` (cost 12) for password has
