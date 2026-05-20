# Production Deployment Checklist

This is the canonical checklist for taking the Frandee Consulting Services web app from
local Docker to a live, secure, monitored deployment.

## 1. Domain & DNS

1. Register the domain (e.g. `frandeeconsult.com`).
2. Create DNS records:
   - **Apex (`frandeeconsult.com`)** -> A record to Vercel's IP, or
     `ALIAS`/`CNAME` if your registrar supports flattening.
   - **`www.frandeeconsult.com`** -> `CNAME` -> `cname.vercel-dns.com`
   - **`api.frandeeconsult.com`** -> `CNAME` -> your Render/Railway service hostname.
3. Vercel and Render both provision and renew SSL automatically.

## 2. Environment variables

### Backend (Render / Railway)

| Variable           | Example                                      | Notes                            |
|--------------------|----------------------------------------------|----------------------------------|
| `DATABASE_URL`     | `postgres://user:pass@host:5432/frandee`     | Use the managed Postgres URL.    |
| `JWT_SECRET`       | a 64-char random hex string                  | `openssl rand -hex 32`           |
| `FRONTEND_URL`     | `https://www.frandeeconsult.com`             | CORS allowlist.                  |
| `NODE_ENV`         | `production`                                 |                                  |
| `PORT`             | `4000`                                       | Render auto-binds.               |
| `FORCE_HTTPS`      | `true`                                       | Redirects http -> https.         |
| `SMTP_HOST`        | `smtp.resend.com` / `smtp.gmail.com`         | Contact-form mail provider.      |
| `SMTP_PORT`        | `587`                                        |                                  |
| `SMTP_USER`        | account / API key                            |                                  |
| `SMTP_PASS`        | password / API token                         | Store as a secret.               |
| `CONTACT_TO`       | `info@frandeeconsult.com`                    | Inbox that receives submissions. |
| `SENTRY_DSN`       | Sentry project DSN                           | Optional.                        |

### Frontend (Vercel)

| Variable                  | Example                                      |
|---------------------------|----------------------------------------------|
| `NEXT_PUBLIC_API_URL`     | `https://api.frandeeconsult.com/api`         |
| `NEXT_PUBLIC_SITE_URL`    | `https://www.frandeeconsult.com`             |
| `NEXT_PUBLIC_SENTRY_DSN`  | Sentry frontend DSN                          |

## 3. Database setup

1. Create a managed Postgres instance (Render / Railway / Supabase / Neon).
2. Set `DATABASE_URL` on the backend service.
3. Run migrations and seed:
   ```bash
   # one-off shell on Render / Railway
   npx prisma migrate deploy
   npx prisma db seed
   ```
4. Verify health:
   ```bash
   curl https://api.frandeeconsult.com/api/health
   ```

## 4. Create / rotate admin

If you need to create the first admin via API (rather than seed):

```bash
curl -X POST https://api.frandeeconsult.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@frandee.com","password":"SuperSecret123!","role":"ADMIN","name":"Dr. Francis Omonefe"}'
```

The very first user is auto-promoted to ADMIN regardless of payload role; afterwards only
ADMINs can create new accounts.

## 5. Monitoring

- Render / Railway logs for the API.
- Vercel analytics for the frontend.
- Sentry for error tracking (frontend and backend share an organisation).
- Alerts to consider:
  - error rate > 1 % over 5 minutes
  - DB CPU > 80 % for 10 minutes
  - 5xx > 1 % over 5 minutes

## 6. Backups

- Enable automatic daily snapshots on the managed Postgres.
- Retention: 30 days.
- Test a restore once a quarter into a sandbox database.

## 7. Performance

- Next.js Image Optimisation is on by default on Vercel.
- ISR (`revalidate: 300`) is configured on public pages.
- Add Redis (Upstash) if you start serving heavy reports.

## 8. Security hardening

- `helmet`, `cors`, `express-rate-limit` are wired.
- `FORCE_HTTPS=true` redirects to HTTPS in production.
- Contact form rate-limit: 10 / 15 min / IP.
- Honeypot field rejects most bot submissions.
- Rotate `JWT_SECRET` periodically — that force-logs every session.
- Consider moving JWT into an HTTP-only cookie behind your apex domain.
