import nodemailer, { type Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null; // not configured — caller will log instead of send
  }
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

export interface ContactMail {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail(payload: ContactMail) {
  const to = process.env.CONTACT_TO ?? 'info@frandeeconsult.com';
  const t = getTransporter();
  const subject = `[Frandee Contact] ${payload.subject ?? 'New enquiry'} — ${payload.name}`;
  const text = `From: ${payload.name} <${payload.email}>\n\n${payload.message}`;

  if (!t) {
    // eslint-disable-next-line no-console
    console.log('[mailer:dev] (would send)', { to, subject, text });
    return { sent: false, reason: 'SMTP not configured' };
  }

  await t.sendMail({
    from: `"Frandee Website" <${process.env.SMTP_USER}>`,
    to,
    replyTo: payload.email,
    subject,
    text,
  });
  return { sent: true };
}
