# Production Deployment Checklist

This is the canonical checklist for taking the Frandee Consulting Services web app from
local Docker to a live, secure, monitored deployment.

**Hosting options covered:**

- **Vercel + Render + Supabase** (this file + [SETUP.md](./SETUP.md)) — recommended for most teams.
- **LyteHosting shared / VPS** — see [HOST_LYTEHOSTING.md](./HOST_LYTEHOSTING.md).

## 1. Domain & DNS

For the live `frandeeconsultingservices.com` domain, keep the website records
pointed at Vercel but point mail records at LyteHosting. See
[EMAIL_DNS_FIX.md](./EMAIL_DNS_FIX.md) for the exact cPanel records.

1. Register the domain (e.g. `frandeeconsult.com`).
2. Create DNS records:
   - **Apex (`frandeeconsult.com`)** -> A record to Vercel's IP, or
     `ALIAS`/`CNAME` if your registrar supports flattening.
   - **`www.frandeeconsult.com`** -> `CNAME` -> `cname.vercel-dns.com`
   - **`api.frandeeconsult.com`** -> `CNAME` -> your Render/Railway service hostname.
3. Vercel and Render both provision and renew SSL automatically.

## 2. Environment variables

### Backend (Render — API only; Postgres lives on Supabase)

| Variable           | Example                                                                              | Notes                            |
|--------------------|--------------------------------------------------------------------------------------|----------------------------------|
| `DATABASE_URL`     | Supabase **Transaction Pooler** URL (port 6543), with `?pgbouncer=true&connection_limit=1` | Runtime queries.                 |
| `DIRECT_URL`       | Supabase **Direct** URL (port 5432)                                                  | Prisma migrations.               |
| `JWT_SECRET`       | a 64-char random hex string                                                          | `openssl rand -hex 32`           |
| `FRONTEND_URL`     | `https://www.frandeeconsult.com`                                                     | CORS allowlist.                  |
| `NODE_ENV`         | `production`                                                                         |                                  |
| `PORT`             | `4000`                                                                               | Render auto-binds.               |
| `FORCE_HTTPS`      | `true`                                                                               | Redirects http -> https.         |
| `SMTP_HOST`        | `smtp.resend.com` / `smtp.gmail.com`                                                 | Contact-form mail provider.      |
| `SMTP_PORT`        | `587`                                                                                |                                  |
| `SMTP_USER`        | account / API key                                                                    |                                  |
| `SMTP_PASS`        | password / API token                                                                 | Store as a secret.               |
| `CONTACT_TO`       | `dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com`    | Inboxes that receive submissions. |
| `SENTRY_DSN`       | Sentry project DSN                                                                   | Optional.                        |

### Frontend (Vercel)

The active contact form is implemented in the Next.js app at `/api/contact`, so these SMTP variables must be configured on the Vercel project too.

| Variable                  | Example                                                                                       |
|---------------------------|-----------------------------------------------------------------------------------------------|
| `NEXT_PUBLIC_API_URL`     | `https://api.frandeeconsult.com/api`                                                          |
| `NEXT_PUBLIC_SITE_URL`    | `https://www.frandeeconsultingservices.com`                                                    |
| `NEXT_PUBLIC_SENTRY_DSN`  | Sentry frontend DSN                                                                           |
| `SMTP_HOST`               | `mail.frandeeconsultingservices.com`                                                          |
| `SMTP_PORT`               | `587`                                                                                         |
| `SMTP_SECURE`             | `false`                                                                                       |
| `SMTP_USER`               | `services@frandeeconsultingservices.com`                                                      |
| `SMTP_PASS`               | mailbox password                                                                              |
| `CONTACT_TO`              | `dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com`             |

## 3. Database setup (Supabase)

1. Sign in to https://supabase.com and create a new project (`frandee-prod`). Set a strong DB password and save it.
2. Pick a region close to where Render will run your API (keep both in `us-east` or both in `eu-west` — cross-region adds ~150ms per query).
3. **Project Settings → Database → Connection string → URI**:
   - **Transaction Pooler** (port 6543) → `DATABASE_URL` — append `?pgbouncer=true&connection_limit=1`.
   - **Direct connection** (port 5432) → `DIRECT_URL`.
   - URL-encode special characters in the password (`@` → `%40`, `:` → `%3A`, etc.).
4. Set both variables on the Render API service (§2 above).
5. Run migrations and seed from the Render shell:
   ```bash
   npx prisma migrate deploy
   # If the pooled connection rejects the seed (rare), force it through the direct URL:
 
