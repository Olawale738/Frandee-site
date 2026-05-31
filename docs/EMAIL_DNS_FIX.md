# Frandee Email DNS Fix

Last checked: 2026-05-31.

The website can be hosted on Vercel, but email for `@frandeeconsultingservices.com`
must point to the LyteHosting mail server. The current public DNS still sends mail
to the apex domain, and the apex domain points to Vercel. That prevents normal
mailbox delivery.

## Current Broken Public DNS

```txt
frandeeconsultingservices.com.      MX 0 frandeeconsultingservices.com.
frandeeconsultingservices.com.      A    216.198.79.1
mail.frandeeconsultingservices.com. CNAME frandeeconsultingservices.com.
```

Because `mail.frandeeconsultingservices.com` is a CNAME to the website, mail
clients resolve it to Vercel instead of the LyteHosting mail server.

## Required DNS Records

In LyteHosting cPanel Zone Editor, set these records:

```txt
frandeeconsultingservices.com.      A     216.198.79.1
www.frandeeconsultingservices.com.  CNAME cname.vercel-dns.com.

frandeeconsultingservices.com.      MX    Priority 0, Destination mail.frandeeconsultingservices.com.
mail.frandeeconsultingservices.com. A     37.49.229.75

frandeeconsultingservices.com.      TXT   v=spf1 mx ip4:37.49.229.75 ~all
_dmarc.frandeeconsultingservices.com. TXT v=DMARC1; p=none;
```

Keep the existing DKIM record from cPanel:

```txt
default._domainkey.frandeeconsultingservices.com. TXT v=DKIM1; ...
```

## What To Delete Or Change

Delete this record:

```txt
mail.frandeeconsultingservices.com. CNAME frandeeconsultingservices.com.
```

Change this record:

```txt
frandeeconsultingservices.com. MX 0 frandeeconsultingservices.com.
```

to:

```txt
frandeeconsultingservices.com. MX 0 mail.frandeeconsultingservices.com.
```

Do not remove the apex website A record to Vercel unless the website is being
moved away from Vercel.

## Vercel Contact Form Variables

The live Next.js contact form runs at `/api/contact`, so the Vercel project must
also have SMTP variables:

```txt
SMTP_HOST=mail.frandeeconsultingservices.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=services@frandeeconsultingservices.com
SMTP_PASS=<mailbox password from LyteHosting>
CONTACT_TO=dr.francis@frandeeconsultingservices.com,services@frandeeconsultingservices.com
```

Never commit the real mailbox password.

## Verification

After DNS propagation, these checks should resolve as follows:

```powershell
Resolve-DnsName frandeeconsultingservices.com -Type MX
Resolve-DnsName mail.frandeeconsultingservices.com -Type A
Resolve-DnsName frandeeconsultingservices.com -Type TXT
```

Expected result:

```txt
MX: mail.frandeeconsultingservices.com
mail A: 37.49.229.75
SPF TXT: v=spf1 mx ip4:37.49.229.75 ~all
```
