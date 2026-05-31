import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const DEFAULT_TO_ADDRESSES = [
  'dr.francis@frandeeconsultingservices.com',
  'services@frandeeconsultingservices.com',
];

type ContactData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiry: string;
  message: string;
};

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromAddress: string;
};

function parseAddressList(value?: string) {
  return (value ?? '')
    .split(/[;,]/)
    .map((address) => address.trim())
    .filter(Boolean);
}

function getRecipientAddresses() {
  return Array.from(
    new Set([...DEFAULT_TO_ADDRESSES, ...parseAddressList(process.env.CONTACT_TO)])
  );
}

function getMailConfig(): { ok: true; config: MailConfig } | { ok: false; missing: string[] } {
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return { ok: false, missing };
  }

  const port = Number(process.env.SMTP_PORT ?? 587);
  if (!Number.isInteger(port) || port <= 0) {
    return { ok: false, missing: ['valid SMTP_PORT'] };
  }

  return {
    ok: true,
    config: {
      host: process.env.SMTP_HOST!,
      port,
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE.toLowerCase() === 'true'
        : port === 465,
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
      fromAddress: process.env.SMTP_FROM || process.env.SMTP_USER!,
    },
  };
}

function buildTransporter(config: MailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function normalizePayload(body: unknown): ContactData | null {
  if (!body || typeof body !== 'object') return null;
  const data = body as Partial<Record<keyof ContactData, unknown>>;

  return {
    name: String(data.name ?? '').trim(),
    email: String(data.email ?? '').trim().toLowerCase(),
    company: String(data.company ?? '').trim(),
    phone: String(data.phone ?? '').trim(),
    inquiry: String(data.inquiry ?? '').trim(),
    message: String(data.message ?? '').trim(),
  };
}

function validatePayload(data: ContactData) {
  if (!data.name || !data.email || !data.message) {
    return 'Name, email and message are required.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return 'Please enter a valid email address.';
  }

  if (data.name.length > 120) return 'Name is too long.';
  if (data.company.length > 160) return 'Company name is too long.';
  if (data.phone.length > 60) return 'Phone number is too long.';
  if (data.inquiry.length > 120) return 'Inquiry type is too long.';
  if (data.message.length > 5000) return 'Message is too long.';

  return null;
}

function htmlBody(data: ContactData) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: #0d1525; padding: 28px; }
    .brand { color: #ffffff; font-size: 18px; font-weight: 700; }
    .brand span { display: block; font-size: 10px; color: #06b6d4; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px; }
    h1 { color: #ffffff; font-size: 22px; margin: 18px 0 6px; }
    .header p { color: #94a3b8; font-size: 13px; margin: 0; }
    .body { padding: 28px; }
    .badge { display: inline-block; padding: 4px 12px; background: #e0f7fa; color: #0e7490; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
    .field { margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 18px; }
    .field:last-of-type { border-bottom: none; }
    .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; margin-bottom: 5px; }
    .value { font-size: 15px; color: #1e293b; line-height: 1.5; }
    .message-box { background: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 0 8px 8px 0; padding: 16px; white-space: pre-wrap; font-size: 14px; color: #334155; line-height: 1.7; }
    .footer { background: #f8fafc; padding: 18px 28px; text-align: center; }
    .footer p { font-size: 12px; color: #64748b; margin: 0; line-height: 1.6; }
    a { color: #06b6d4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Frandee <span>Geoscience</span></div>
      <h1>New Project Inquiry</h1>
      <p>Received via frandeeconsultingservices.com contact form</p>
    </div>

    <div class="body">
      <div class="badge">${escapeHtml(data.inquiry || 'General Inquiry')}</div>

      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>

      ${data.company ? `
      <div class="field">
        <div class="label">Company / Organisation</div>
        <div class="value">${escapeHtml(data.company)}</div>
      </div>` : ''}

      ${data.phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></div>
      </div>` : ''}

      <div class="field">
        <div class="label">Project Description</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
    </div>

    <div class="footer">
      <p>
        This message was submitted through the Frandee Geoscience website contact form.<br />
        Reply directly to <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a> to respond.
      </p>
    </div>
  </div>
</body>
</html>`;
}

function textBody(data: ContactData) {
  return [
    'New Project Inquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : '',
    data.phone ? `Phone: ${data.phone}` : '',
    data.inquiry ? `Inquiry: ${data.inquiry}` : '',
    '',
    'Message:',
    data.message,
  ]
    .filter(Boolean)
    .join('\n');
}

function autoReplyHtml(name: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: #0d1525; padding: 36px 28px; text-align: center; }
    .brand { color: #ffffff; font-size: 22px; font-weight: 800; }
    .brand span { display: block; font-size: 10px; color: #06b6d4; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px; }
    .header h1 { color: #ffffff; font-size: 24px; margin: 18px 0 8px; }
    .header p { color: #94a3b8; font-size: 14px; margin: 0; }
    .body { padding: 32px 28px; }
    .body p { font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 16px; }
    .highlight { background: #f0fdff; border: 1px solid #e0f7fa; border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
    .highlight p { margin: 0; font-size: 14px; color: #0e7490; }
    .footer { background: #f8fafc; padding: 18px 28px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 12px; color: #64748b; margin: 0; line-height: 1.6; }
    a { color: #06b6d4; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="brand">Frandee <span>Geoscience</span></div>
      <h1>We've Received Your Enquiry</h1>
      <p>Thank you for reaching out, ${escapeHtml(name.split(' ')[0] || name)}.</p>
    </div>

    <div class="body">
      <p>Dear ${escapeHtml(name)},</p>
      <p>
        Thank you for contacting <strong>Frandee Geoscience</strong>. We have received your project enquiry and a member of our technical team will review it and get back to you within <strong>24 hours</strong> on business days.
      </p>

      <div class="highlight">
        <p>
          <strong>Typical response time:</strong> within 24 hours<br />
          For urgent matters, please call us directly at <a href="tel:+2349067298542">+234 906 729 8542</a>.
        </p>
      </div>
    </div>

    <div class="footer">
      <p>
        Frandee Geoscience, Yenagoa, Bayelsa, Nigeria<br />
        <a href="mailto:services@frandeeconsultingservices.com">services@frandeeconsultingservices.com</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const data = normalizePayload(body);
    if (!data) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const validationError = validatePayload(data);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const mailConfig = getMailConfig();
    if (!mailConfig.ok) {
      console.error('[contact API] SMTP is not configured', { missing: mailConfig.missing });
      return NextResponse.json(
        {
          error:
            'The website email service is not connected yet. Please email dr.francis@frandeeconsultingservices.com or services@frandeeconsultingservices.com directly while we finish setup.',
        },
        { status: 503 }
      );
    }

    const transporter = buildTransporter(mailConfig.config);
    const safeName = cleanHeader(data.name);
    const safeInquiry = cleanHeader(data.inquiry);
    const subject = `[Frandee] New Enquiry${safeInquiry ? ` - ${safeInquiry}` : ''} from ${safeName}`;

    await transporter.sendMail({
      from: { name: 'Frandee Geoscience Website', address: mailConfig.config.fromAddress },
      to: getRecipientAddresses(),
      replyTo: { name: safeName, address: data.email },
      subject,
      text: textBody(data),
      html: htmlBody(data),
    });

    try {
      await transporter.sendMail({
        from: { name: 'Frandee Geoscience', address: mailConfig.config.fromAddress },
        to: { name: safeName, address: data.email },
        subject: 'We received your enquiry - Frandee Geoscience',
        html: autoReplyHtml(data.name),
      });
    } catch (autoReplyError) {
      console.error('[contact API] auto-reply failed', autoReplyError);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact API]', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
