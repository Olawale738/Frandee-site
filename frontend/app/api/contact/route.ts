import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO_ADDRESSES = [
  'dr.francis@frandeeconsultingservices.com',
  'contact@frandeeconsultingservices.com',
];

function buildTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',   // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function htmlBody(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  inquiry: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0d1525 0%, #111827 100%); padding: 32px 28px; }
    .header-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .logo-badge { width: 36px; height: 36px; background: linear-gradient(135deg, #b87333, #06b6d4); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
    .brand { color: #ffffff; font-size: 18px; font-weight: 700; letter-spacing: -0.3px; }
    .brand span { display: block; font-size: 9px; color: #06b6d4; letter-spacing: 3px; text-transform: uppercase; margin-top: 1px; }
    .header h1 { color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; line-height: 1.3; }
    .header p { color: #94a3b8; font-size: 13px; margin: 6px 0 0; }
    .body { padding: 28px; }
    .badge { display: inline-block; padding: 4px 12px; background: #e0f7fa; color: #0e7490; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
    .field { margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 18px; }
    .field:last-of-type { border-bottom: none; }
    .label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600; margin-bottom: 5px; }
    .value { font-size: 15px; color: #1e293b; font-weight: 500; line-height: 1.5; }
    .message-box { background: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 0 8px 8px 0; padding: 16px; white-space: pre-wrap; font-size: 14px; color: #334155; line-height: 1.7; }
    .footer { background: #f8fafc; padding: 18px 28px; text-align: center; }
    .footer p { font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.6; }
    .footer a { color: #06b6d4; text-decoration: none; }
    .divider { height: 1px; background: linear-gradient(90deg, transparent, #e2e8f0, transparent); margin: 4px 0 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="header-logo">
        <div class="logo-badge">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </div>
        <div>
          <div class="brand">Frandee <span>Geoscience</span></div>
        </div>
      </div>
      <h1>New Project Inquiry</h1>
      <p>Received via frandeeconsultingservices.com contact form</p>
    </div>

    <div class="body">
      <div class="badge">${data.inquiry || 'General Inquiry'}</div>
      <div class="divider"></div>

      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color:#06b6d4;">${escapeHtml(data.email)}</a></div>
      </div>

      ${data.company ? `
      <div class="field">
        <div class="label">Company / Organisation</div>
        <div class="value">${escapeHtml(data.company)}</div>
      </div>` : ''}

      ${data.phone ? `
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${escapeHtml(data.phone)}" style="color:#06b6d4;">${escapeHtml(data.phone)}</a></div>
      </div>` : ''}

      <div class="field">
        <div class="label">Project Description</div>
        <div class="message-box">${escapeHtml(data.message)}</div>
      </div>
    </div>

    <div class="footer">
      <p>
        This message was submitted through the Frandee Geoscience website contact form.<br />
        Reply directly to <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a> to respond to the enquiry.
      </p>
    </div>
  </div>
</body>
</html>`;
}

/* Auto-reply sent back to the enquirer */
function autoReplyHtml(name: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f9; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #0d1525 0%, #111827 100%); padding: 40px 28px; text-align: center; }
    .logo-badge { width: 48px; height: 48px; background: linear-gradient(135deg, #b87333, #06b6d4); border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; }
    .brand { color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .brand span { display: block; font-size: 10px; color: #06b6d4; letter-spacing: 3px; text-transform: uppercase; margin-top: 2px; }
    .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; margin: 16px 0 8px; }
    .header p { color: #94a3b8; font-size: 14px; margin: 0; }
    .body { padding: 32px 28px; }
    .body p { font-size: 15px; color: #334155; line-height: 1.7; margin: 0 0 16px; }
    .highlight { background: linear-gradient(135deg, #f0fdff, #ecfdf5); border: 1px solid #e0f7fa; border-radius: 10px; padding: 16px 20px; margin: 20px 0; }
    .highlight p { margin: 0; font-size: 14px; color: #0e7490; }
    .cta { text-align: center; margin: 28px 0 8px; }
    .cta a { display: inline-block; background: #06b6d4; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; }
    .footer { background: #f8fafc; padding: 18px 28px; text-align: center; border-top: 1px solid #e2e8f0; }
    .footer p { font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.6; }
    .footer a { color: #06b6d4; text-decoration: none; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div class="brand">Frandee <span>Geoscience</span></div>
      <h1>We've Received Your Enquiry</h1>
      <p>Thank you for reaching out, ${escapeHtml(name.split(' ')[0])}.</p>
    </div>

    <div class="body">
      <p>Dear ${escapeHtml(name)},</p>
      <p>
        Thank you for contacting <strong>Frandee Geoscience</strong>. We have received your project enquiry and a member of our technical team will review it and get back to you within <strong>24 hours</strong> (business days).
      </p>

      <div class="highlight">
        <p>
          ⏱ <strong>Typical response time:</strong> within 24 hours<br />
          📞 For urgent matters, please call us directly at <a href="tel:+2349067298542">+234 906 729 8542</a>
        </p>
      </div>

      <p>
        In the meantime, feel free to explore our services, recent projects, and research publications on our website.
      </p>

      <div class="cta">
        <a href="https://frandeeconsultingservices.com/services">Explore Our Services</a>
      </div>
    </div>

    <div class="footer">
      <p>
        Frandee Geoscience &nbsp;·&nbsp; Yenagoa, Bayelsa, Nigeria<br />
        <a href="mailto:contact@frandeeconsultingservices.com">contact@frandeeconsultingservices.com</a>
        &nbsp;·&nbsp;
        <a href="https://frandeeconsultingservices.com">frandeeconsultingservices.com</a>
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
    const body = await req.json();
    const { name, email, company = '', phone = '', inquiry = '', message } = body as {
      name: string;
      email: string;
      company?: string;
      phone?: string;
      inquiry?: string;
      message: string;
    };

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const transporter = buildTransporter();

    const subject = `[Frandee] New Enquiry${inquiry ? ` — ${inquiry}` : ''} from ${name}`;

    // 1. Send notification to both inbox addresses
    await transporter.sendMail({
      from: `"Frandee Geoscience Website" <${process.env.SMTP_USER}>`,
      to: TO_ADDRESSES.join(', '),
      replyTo: `"${name}" <${email}>`,
      subject,
      html: htmlBody({ name, email, company, phone, inquiry, message }),
    });

    // 2. Auto-reply to the enquirer
    await transporter.sendMail({
      from: `"Frandee Geoscience" <${process.env.SMTP_USER}>`,
      to: `"${name}" <${email}>`,
      subject: 'We received your enquiry — Frandee Geoscience',
      html: autoReplyHtml(name),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact API]', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or email us directly.' },
      { status: 500 }
    );
  }
}
