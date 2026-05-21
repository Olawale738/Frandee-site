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
[ Render / Railway (Express API) ]  --->  /api/*  endpoints
     │
     ▼ TCP, password
[ Managed PostgreSQL 16 ]
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
| `DATABASE_URL`  | yes      | `postgres://user:pass@host:5432/frandee`    | Connection string Prisma uses.                                       |
| `JWT_SECRET`    | yes      | 64-char random hex                          | Signs and verifies JWTs. Change it and everyone gets logged out.     |
| `PORT`          | no       | `4000`                                      | HTTP port for the API. Render auto-binds.                            |
| `NODE_ENV`      | yes      | `production` / `development`                | Controls logging, error verbosity, Prisma log level.                 |
| `FRONTEND_URL`  | yes      | `https://www.frandeeconsult.com`            | CORS allowlist. Comma-separated for multiple origins.                |
| `FORCE_HTTPS`   | no       | `true`                                      | If `true`, redirects HTTP → HTTPS using `x-forwarded-proto`.         |
| `SMTP_HOST`     | no       | `smtp.resend.com` / `smtp.gmail.com`        | If blank, contact-form submissions are logged instead of mailed.     |
| `SMTP_PORT`     | no       | `587`                                       | `465` enables TLS automatically.                                     |
| `SMTP_USER`     | no       | API key or email                            |                                                                      |
| `SMTP_PASS`     | no       | API secret or password                      | **Use a secret store; never commit.**                                |
| `CONTACT_TO`    | no       | `info@frandeeconsult.com`                   | Inbox that receives form submissions.                                |
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
┌────────────────────────┐        ┌──────────────────────────┐
│  Vercel (frontend)     │ ─────► │  Render (API + Postgres) │
│  www.frandeeconsult.com│        │  api.frandeeconsult.com  │
└────────────────────────┘        └──────────────────────────┘
```

You can swap Render for Railway, Fly.io, AWS App Runner, or a single VPS — the steps are equivalent. Below uses **Vercel + Render** because it's the cheapest end-to-end with free tiers.

### 7.1 Push your repo (already done)

```bash
git push origin main
```

### 7.2 Create the database on Render

1. Sign in to https://dashboard.render.com.
2. **New → PostgreSQL.** Choose a name (`frandee-prod`), region close to your users, and the Free or Starter plan.
3. Once it provisions, open the dashboard and copy the **External Database URL**.
4. Save it — you'll paste it into the API service in a moment.

### 7.3 Create the API service on Render

1. **New → Web Service.**
2. Connect your GitHub account and pick `Olawale738/Frandee-site`.
3. Configure:
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
4. Under **Environment**, add every variable from §5.1. Use the External DB URL from step 7.2 for `DATABASE_URL`. Generate a fresh `JWT_SECRET` with `openssl rand -hex 32`.
5. Click **Create Web Service**. First boot takes 2–5 minutes.

After it's up:

```bash
# verify
curl https://YOUR-API.onrender.com/api/health
# {"ok":true,"ts":"..."}

# seed (one time) — open the "Shell" tab on Render and run:
npx prisma db seed
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
CONTACT_TO=info@frandeeconsult.com
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

| Signal                          | Where to check                            | Alert threshold              |
|---------------------------------|-------------------------------------------|------------------------------|
| API uptime                      | Render dashboard → Metrics                | 5xx > 1 % over 5 min         |
| Frontend traffic                | Vercel Analytics                          | RPS drop > 50 % vs baseline  |
| Database CPU                    | Render Postgres → Metrics                 | > 80 % for 10 min            |
| Database disk                   | Render Postgres → Metrics                 | > 80 %                       |
| Error tracking                  | Sentry                                    | new error fingerprint        |
| SSL expiry                      | n/a — auto-renewed                        | n/a                          |

Render and Vercel both send email alerts on deploy failures and downtime.

### 10.2 Backups

Render Postgres has **daily automatic snapshots**, retained on the Standard plan and above (free tier has shorter retention). Configure:

- Render → Postgres → Backups → set **30-day retention**.
- Once a quarter, run a **restore drill** into a sandbox database:
  - Render → Backups → pick a snapshot → "Restore to new database".
  - Connect to the restored DB and verify row counts match production.

To export off-site:

```bash
pg_dump "$DATABASE_URL" -Fc -f frandee-$(date +%F).dump
# Then upload to S3 / Backblaze B2 / Cloudflare R2.
```

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
- `bcryptjs` (cost 12) for password hashing
- `FORCE_HTTPS=true` redirect using `x-forwarded-proto`
- JWT 7-day expiry; rotate `JWT_SECRET` to force-logout everyone

Additional hardening to consider:

1. **Move JWT to an httpOnly cookie.** This requires both apps to be on the same apex (e.g. `frandeeconsult.com` and `api.frandeeconsult.com`) and adding `SameSite=Lax; Secure; HttpOnly` cookie issuance in `routes/auth.ts`. It eliminates XSS-stealable tokens.
2. **Set a CSP.** Add a `Content-Security-Policy` header in `frontend/next.config.js` once you've finalised your third-party scripts.
3. **Rate-limit login attempts.** Add a tighter `rate-limit` middleware to `/api/auth/login` to slow brute force.
4. **Periodically rotate `JWT_SECRET`** (e.g. every 90 days). Document this in your runbook.
5. **Subresource Integrity** on any external scripts you add.
6. **Enable 2FA** on GitHub, Vercel, and Render accounts.

---

## 12. Troubleshooting

### "ECONNREFUSED 127.0.0.1:5432" when starting the API

Postgres isn't ready yet. With Docker, the `api` service uses `depends_on: condition: service_healthy`, so wait until you see `frandee_db ... healthy`. Bare-metal: make sure `psql -h localhost -U frandee -d frandee` works first.

### `prisma migrate dev` fails with "Environment variable not found: DATABASE_URL"

You're running it from the wrong directory or `backend/.env` is missing. Run inside `backend/` and ensure the file exists.

### Login returns "Invalid credentials" even with the seeded password

You probably ran `prisma migrate` after the seed, which doesn't drop data but **does** if you re-seed on a wiped DB. Run the seed again: `docker compose exec api npx prisma db seed`.

### Contact form returns 429

You've been rate-limited (10 submissions / 15 minutes / IP). Wait or test from a different IP.

### Images don't appear in production

- Confirm the files are in `frontend/public/images/...` and were committed (`git ls-files | grep images | wc -l` should report 65).
- Vercel caches static assets aggressively; trigger a redeploy if you've just added new images.

### Sentry isn't capturing errors

- Verify the DSN is set on **both** environments (frontend and backend).
- On Render, restart the service after adding the env var — env changes don't hot-reload.
- Send a test error from the backend: temporarily uncomment a `throw new Error('test')` in a route handler.

### CORS error in the browser console

`FRONTEND_URL` on the API doesn't include the origin the browser is using. Set it to a comma-separated list of every allowed origin (no trailing slash).

### "JWT expired" right after login

Server clock skew with the database / load balancer. JWTs include `iat`/`exp` based on the **API server's** clock. If you see this on Render, file a support ticket — it's rare.

### Docker build cache is stale after a code change

```bash
docker compose build --no-cache
docker compose up
```

### Prisma client out of sync after editing the schema

```bash
cd backend
npx prisma generate
# If you changed the schema:
npx prisma migrate dev --name <descriptive_name>
```

---

## 13. What to do next (your action items)

| Step | Action                                                                                       |
|------|----------------------------------------------------------------------------------------------|
| 1    | Rotate the GitHub PAT you shared in chat (settings → tokens → revoke + regenerate).          |
| 2    | Sign in locally (`docker compose up`), confirm the site works, **change the admin password** by signing in, opening the browser console, and calling `fetch('/api/auth/...')` against your own endpoint — or create a `POST /api/auth/change-password` route as your first real customisation. |
| 3    | Deploy backend to Render, frontend to Vercel (§7).                                           |
| 4    | Register the domain and wire DNS (§8).                                                       |
| 5    | Set up a transactional mail provider for the contact form (§9.1).                            |
| 6    | Create the Sentry projects and paste the DSNs (§9.2).                                        |
| 7    | Schedule a quarterly backup restore drill (§10.2).                                           |
| 8    | Run a vulnerability scan (`npm audit`, GitHub Dependabot) and enable security alerts.        |
| 9    | Edit `backend/prisma/seed.ts` with your real services / equipment / projects copy and re-seed. |
| 10   | (Optional) Build out the admin UI under `frontend/pages/admin/` so non-technical staff can edit content without curl. |
