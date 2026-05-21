# Deploying on LyteHosting (Shared Hosting / VPS)

This guide covers deploying Frandee Consulting Services on
[LyteHosting](https://lytehosting.com/sharedhosting.php).

> **Before you start — what to confirm with LyteHosting support**
> Shared hosting features vary widely per plan. Open a support ticket (or check the
> plan comparison page) and confirm:
>
> 1. Does the plan include **cPanel** with the **"Setup Node.js App"** tool?
>    (powered by Phusion Passenger or LiteSpeed). If yes, Option B works.
> 2. What **Node.js versions** are available? You need **Node 20 LTS**.
> 3. Is **outbound TCP** allowed on arbitrary ports? (needed to reach
>    Supabase on `:5432` and `:6543`). Most shared hosts allow this, but ask.
> 4. Do you get a **dedicated IP / SSL** included? Let's Encrypt via cPanel is fine.
> 5. Are **WebSockets / long-running processes** allowed? Our app doesn't need them
>    today, but worth knowing.
> 6. What are the **memory / CPU limits**? Next.js SSR is fine on ~512 MB; below that
>    use Option A (static export).
>
> If any of those is "no" for shared hosting, **either pick Option A** (static export, you
> only host the frontend on LyteHosting) **or upgrade to a LyteHosting VPS plan** and
> follow Option C.

---

## Architecture options at a glance

| Option | Frontend | Backend (API) | Database  | When to pick it |
|--------|----------|---------------|-----------|------------------|
| **A**  | LyteHosting static (`next export`) | Render | Supabase | Cheapest, simplest, works on **any** shared host. Editing copy still requires a redeploy. |
| **B**  | LyteHosting Node.js app (cPanel) | LyteHosting Node.js app (same instance) | Supabase | Single LyteHosting bill. Requires cPanel "Setup Node.js App". |
| **C**  | LyteHosting VPS — Nginx | LyteHosting VPS — PM2 / systemd | Supabase | Full control, predictable performance. Requires a VPS plan and SSH. |

All three options keep **Supabase** as the database (free tier, managed backups, pgBouncer pooling). You can also self-host Postgres on a VPS if you want zero third-party dependencies — see §C.6.

---

# Option A — Static frontend on LyteHosting (recommended for most shared plans)

You **build the Next.js site into plain HTML/CSS/JS** on your laptop, then upload
that bundle to LyteHosting's `public_html/`. The backend (API + DB) stays on
Render + Supabase as documented in [SETUP.md](./SETUP.md).

This works on **any** shared host because there's nothing to install — just static
files served by Apache/LiteSpeed.

### A.1 Trade-offs

| ✅ Pros | ❌ Cons |
|---------|---------|
| Works on the cheapest shared plan | Project content updates require rebuild + reupload |
| Sub-100 ms TTFB worldwide via LyteHosting's CDN | Image optimisation: serve pre-resized JPGs (no Vercel `next/image` magic) |
| No Node runtime to maintain | Admin dashboard only works while Render API is reachable |
| Easy custom domain + free Let's Encrypt SSL in cPanel | |

### A.2 Configure the frontend for static export

In `frontend/next.config.js`, add `output: 'export'` and disable image optimisation
(it requires a Node server):

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // <-- new
  images: { unoptimized: true },    // <-- replace the existing images block
  reactStrictMode: true,
  poweredByHeader: false,
};
module.exports = nextConfig;
```

> If you skip `images.unoptimized: true`, the build will fail with
> `Image Optimization using the default loader is not compatible with \`{ output: 'export' }\``.

Also remove the `getStaticPaths` `fallback: 'blocking'` and replace it with
`fallback: false` in `frontend/pages/projects/[slug].tsx` (static export can't do
on-demand rendering):

```ts
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const projects = await api.get<Project[]>('/projects');
    return {
      paths: projects.map((p) => ({ params: { slug: p.slug } })),
      fallback: false,            // <-- changed
    };
  } catch {
    return { paths: [], fallback: false };
  }
};
```

> **Heads up:** with `fallback: false`, any project added in the admin dashboard
> after a build is **not visible** until you rebuild and redeploy the frontend.
> If you want true CMS-style instant updates, use Option B or C (server-rendered).

### A.3 Build the static bundle

On your laptop:

```bash
cd frontend

# Point at your live production API (already deployed to Render).
echo "NEXT_PUBLIC_API_URL=https://api.frandeeconsult.com/api" > .env.production
echo "NEXT_PUBLIC_SITE_URL=https://www.frandeeconsult.com"   >> .env.production

npm install
npm run build
# Produces ./out — that's your static site.
```

### A.4 Upload to LyteHosting

Two ways:

**a) cPanel File Manager (clicky, fine for first time):**

1. Log in to your LyteHosting cPanel.
2. **Files → File Manager → public_html/**.
3. Delete the default `index.html` / `cgi-bin` placeholders.
4. **Upload → Select File** → zip up `frontend/out/` first (it's faster) and upload the zip.
5. Right-click the uploaded zip → **Extract** into `public_html/`.

**b) FTP/SFTP (better for repeat deploys):**

In cPanel, **Email Accounts** or **FTP Accounts** — create an FTP user. Then on your laptop:

```bash
# Using lftp (Linux/macOS — install with brew install lftp or apt install lftp)
cd frontend/out
lftp -u FTP_USER,FTP_PASSWORD ftp.your-domain.com -e "
  set ssl:verify-certificate yes;
  mirror -R --delete --verbose . /public_html/;
  bye"
```

Or use **FileZilla** / **Cyberduck** if you prefer a GUI.

### A.5 Custom domain + SSL on LyteHosting

1. **Domains → Addon Domains** (or **Domains → Subdomains**) — point `frandeeconsult.com` and `www.frandeeconsult.com` at `public_html/`.
2. **DNS Zone Editor** — make sure both `A` records point at the IP cPanel shows.
3. **SSL/TLS Status** → click **Run AutoSSL** on both hostnames. Wait 2–10 minutes for Let's Encrypt issuance.

### A.6 Set CORS on the Render API

Update the Render service env var:

```
FRONTEND_URL=https://www.frandeeconsult.com,https://frandeeconsult.com
```

Render will redeploy automatically. Without this the contact form and admin will
fail with a CORS error in the browser console.

### A.7 Redeploy workflow

Every time you change frontend code or seed data:

```bash
cd frontend
npm run build
lftp -u $FTP_USER,$FTP_PASSWORD ftp.your-domain.com -e "mirror -R --delete out /public_html; bye"
```

You can also automate this with GitHub Actions on push-to-main (see §A.8).

### A.8 (Optional) GitHub Actions auto-deploy to LyteHosting

Create `.github/workflows/deploy-lytehosting.yml`:

```yaml
name: Deploy frontend to LyteHosting

on:
  push:
    branches: [main]
    paths: ['frontend/**']
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    defaults: { run: { working-directory: frontend } }
    env:
      NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
      NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm', cache-dependency-path: frontend/package-lock.json }
      - run: npm install --no-audit --no-fund
      - run: npm run build
      - name: Upload via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_HOST }}
          username: ${{ secrets.FTP_USER }}
          password: ${{ secrets.FTP_PASS }}
          local-dir: ./frontend/out/
          server-dir: /public_html/
          dangerous-clean-slate: true
```

Add the secrets (`FTP_HOST`, `FTP_USER`, `FTP_PASS`, plus the two `NEXT_PUBLIC_*`) in your GitHub repo → Settings → Secrets and variables → Actions.

---

# Option B — Full Node.js app on LyteHosting (cPanel "Setup Node.js App")

This runs both the **Next.js frontend SSR** and the **Express API** as cPanel-managed
Node.js apps on a single LyteHosting plan. **Requires** that your plan ships cPanel
with the **Setup Node.js App** tool (LiteSpeed/Passenger-backed). Confirm with support
before going further.

You'll end up with two apps on the same host:

- `https://www.frandeeconsult.com/` → Next.js
- `https://api.frandeeconsult.com/` → Express API

Database stays on Supabase.

### B.1 SSH access

Most shared plans give you SSH (cPanel → **SSH Access** → generate a key). You'll need it
for `git clone`, `npm install`, and running Prisma migrations.

```bash
ssh USER@your-server.lytehosting.com
cd ~
git clone https://github.com/Olawale738/Frandee-site.git apps
cd apps
```

### B.2 Create the API app in cPanel

1. cPanel → **Setup Node.js App → CREATE APPLICATION**.
2. Fill in:
   - **Node.js version:** 20.x
   - **Application mode:** Production
   - **Application root:** `apps/backend`
   - **Application URL:** `api.frandeeconsult.com`
   - **Application startup file:** `dist/index.js`
   - **Passenger log file:** (leave default)
3. **Environment variables** — add **all** variables from `backend/.env.example`:
   - `DATABASE_URL` (Supabase Transaction Pooler, port 6543, `?pgbouncer=true&connection_limit=1`)
   - `DIRECT_URL` (Supabase Direct, port 5432)
   - `JWT_SECRET` (`openssl rand -hex 32`)
   - `FRONTEND_URL=https://www.frandeeconsult.com`
   - `NODE_ENV=production`
   - `PORT=` *(leave blank — Passenger sets it)*
   - `FORCE_HTTPS=true`
   - `SMTP_*` (if using nodemailer)
   - `CONTACT_TO`
   - `SENTRY_DSN` (optional)
4. Click **Create**. cPanel will create a virtualenv and start Passenger.

### B.3 Install deps and build

Open the cPanel terminal (or SSH) and run:

```bash
cd ~/apps/backend
# Activate the cPanel Node env (path shown at top of the Setup Node.js App page)
source /home/USER/nodevenv/apps/backend/20/bin/activate

npm install --no-audit --no-fund
npx prisma generate
npm run build
npx prisma migrate deploy

# If the seed fails under pgBouncer's transaction mode (prepared statements):
DATABASE_URL="$DIRECT_URL" npx prisma db seed
```

In cPanel → Setup Node.js App → click **Restart** on the API app.

### B.4 Create the Next.js app

Repeat B.2 with:

- **Application root:** `apps/frontend`
- **Application URL:** `www.frandeeconsult.com`
- **Application startup file:** `node_modules/next/dist/bin/next` *(see B.5 — we'll wrap this)*
- **Environment variables:**
  - `NEXT_PUBLIC_API_URL=https://api.frandeeconsult.com/api`
  - `NEXT_PUBLIC_SITE_URL=https://www.frandeeconsult.com`
  - `NODE_ENV=production`

### B.5 Build and start the frontend

The cPanel Node.js App tool expects a single startup file. The cleanest way is a
tiny `server.js` in `frontend/`:

```bash
ssh USER@your-server.lytehosting.com
cd ~/apps/frontend
source /home/USER/nodevenv/apps/frontend/20/bin/activate

cat > server.js << 'EOF'
const { createServer } = require('http');
const next = require('next');
const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> Frandee frontend ready on :${port}`);
  });
});
EOF

npm install --no-audit --no-fund
npm run build
```

Back in cPanel → Setup Node.js App → set **Application startup file** to `server.js`,
then **Restart**.

### B.6 Domain mapping

cPanel **Domains** section:

- Set `www.frandeeconsult.com` → the frontend app's document root.
- Add `api.frandeeconsult.com` as a subdomain → the API app's document root.
- Run **AutoSSL** on both — Let's Encrypt issues certs automatically.

### B.7 Updates

Push code to GitHub. SSH into the server and pull:

```bash
ssh USER@your-server.lytehosting.com
cd ~/apps && git pull
source /home/USER/nodevenv/apps/backend/20/bin/activate
cd backend && npm install && npm run build && npx prisma migrate deploy

source /home/USER/nodevenv/apps/frontend/20/bin/activate
cd ../frontend && npm install && npm run build

# Restart both apps in cPanel UI.
```

You can script the above as a `~/deploy.sh` and trigger it from a GitHub webhook + a tiny PHP listener if you want auto-deploy. For most teams the manual step is fine.

---

# Option C — Full stack on a LyteHosting VPS

If LyteHosting offers a VPS plan (KVM/Cloud VPS), this gives you predictable performance
and full control. Steps assume **Ubuntu 22.04**.

### C.1 SSH in as root, harden the box

```bash
ssh root@your-vps-ip

# Create a non-root user
adduser deploy
usermod -aG sudo deploy

# Disable root SSH and password auth
sed -i 's/^#\?PermitRootLogin .*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl reload ssh

# Basic firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw --force enable
```

Switch to the `deploy` user for everything below: `ssh deploy@your-vps-ip`.

### C.2 Install Node 20, Nginx, certbot, PM2

```bash
# Node 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Nginx + Certbot (Let's Encrypt)
sudo apt-get install -y nginx certbot python3-certbot-nginx

# PM2 process manager
sudo npm install -g pm2
```

### C.3 Clone and build

```bash
cd ~
git clone https://github.com/Olawale738/Frandee-site.git frandee
cd frandee
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.production
# Edit those two files — paste Supabase URLs, generate JWT_SECRET, etc.

cd backend && npm install && npx prisma generate && npm run build
npx prisma migrate deploy
DATABASE_URL="$DIRECT_URL" npx prisma db seed

cd ../frontend && npm install && npm run build
```

### C.4 Run both apps with PM2

```bash
cd ~/frandee

pm2 start ./backend/dist/index.js --name frandee-api --cwd ./backend --update-env
pm2 start "npm start" --name frandee-web --cwd ./frontend

pm2 save
pm2 startup        # follow the line it prints to make PM2 boot on reboot
```

### C.5 Nginx reverse proxy

`sudo nano /etc/nginx/sites-available/frandee` →

```nginx
server {
  listen 80;
  server_name api.frandeeconsult.com;
  location / {
    proxy_pass http://127.0.0.1:4000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}

server {
  listen 80;
  server_name frandeeconsult.com www.frandeeconsult.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Enable + reload + issue SSL:

```bash
sudo ln -s /etc/nginx/sites-available/frandee /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo certbot --nginx \
  -d frandeeconsult.com -d www.frandeeconsult.com -d api.frandeeconsult.com \
  --redirect --agree-tos -m admin@frandee.com
```

### C.6 (Optional) Self-host Postgres on the same VPS

If you'd rather not depend on Supabase at all:

```bash
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql <<SQL
  CREATE USER frandee WITH PASSWORD 'STRONG_PASSWORD_HERE';
  CREATE DATABASE frandee OWNER frandee;
SQL
```

Then in `backend/.env`:

```
DATABASE_URL=postgres://frandee:STRONG_PASSWORD@127.0.0.1:5432/frandee
DIRECT_URL=postgres://frandee:STRONG_PASSWORD@127.0.0.1:5432/frandee
```

Restart the API: `pm2 restart frandee-api`. **Don't skip backups** — set up `pg_dump`
cron + off-site upload to S3/B2/R2 weekly.

### C.7 Update workflow

```bash
ssh deploy@your-vps-ip
cd ~/frandee
git pull
cd backend  && npm install && npm run build && npx prisma migrate deploy
cd ../frontend && npm install && npm run build
pm2 restart frandee-api frandee-web
```

You can script this as `~/deploy.sh` and either run it manually or trigger via a GitHub webhook → tiny webhook listener (e.g. `webhook` or a one-line PHP script behind Basic Auth).

---

# Picking between A, B, and C

| Scenario                                              | Pick |
|--------------------------------------------------------|------|
| You bought the cheapest shared hosting plan and just want the site live this week. | **A** |
| You want a single LyteHosting bill, and your plan ships cPanel with "Setup Node.js App". | **B** |
| You're already running other apps and want a VPS, or you need predictable resources / self-hosted DB. | **C** |
| You want zero-touch deployments and don't mind separate vendors. | Skip LyteHosting — Vercel + Render + Supabase as in [SETUP.md](./SETUP.md). |

# Common pitfalls on shared hosting

- **Outbound connections to port 6543 (Supabase pgBouncer) get blocked.** Some
  hosts firewall non-standard ports. Test with `nc -vz aws-0-eu-west-1.pooler.supabase.com 6543`
  from SSH; if it fails, ask support to whitelist.
- **`npm install` killed by RAM limits.** Run `npm install --omit=optional` and/or
  `NODE_OPTIONS=--max-old-space-size=512`. Or build on your laptop and `rsync` `node_modules/`
  + the build output up — slower transfer but no build pressure on the server.
- **Memory limit on the Node app process.** cPanel apps usually cap around 512 MB. Next.js
  SSR fits. If you OOM, switch to Option A.
- **Apache .htaccess interfering with the Node app.** cPanel auto-generates rules; if you
  see "Application is not responding" pages, check `~/apps/backend/.htaccess` exists and
  contains the Passenger directives cPanel wrote for you. Don't delete that file.
- **CORS errors after switching origins.** Always update `FRONTEND_URL` on the API
  whenever you add/move a domain. CORS is the #1 cause of "the site loads but admin
  login doesn't work".
- **Mixed-content warnings.** Ensure both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`
  start with `https://` in production. AutoSSL must be issued first.
