import nodemailer from 'nodemailer';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildBookingEmailHTML,
  buildInternalNotificationEmailHTML,
  buildCancellationConfirmEmailHTML,
  buildCancellationNotificationEmailHTML,
  type EmailTemplateParams,
  type CancellationEmailParams,
} from './email-templates.js';

function createTransporter() {
  const user = import.meta.env.GMAIL_USER;
  const pass = import.meta.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error('[Giralabs] GMAIL_USER and GMAIL_APP_PASSWORD must be set in .env');
  }
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

function getLogoAttachment() {
  const logoPath = join(process.cwd(), 'public', 'logo-email.avif');
  if (existsSync(logoPath)) {
    return { filename: 'logo.avif', path: logoPath, cid: 'giralabs-logo', contentType: 'image/avif' };
  }
  return null;
}

function getAttachments() {
  const logo = getLogoAttachment();
  return logo ? [logo] : [];
}

export interface SendBookingEmailParams extends EmailTemplateParams {
  recipientEmail: string;
  clientCancelUrl?: string;   // cancel URL for client emails
  giralabsCancelUrl?: string; // cancel URL for Giralabs internal email
}

// ── BOOKING CONFIRMATION ───────────────────────────────────────

export async function sendBookingConfirmation(params: SendBookingEmailParams): Promise<void> {
  const transporter  = createTransporter();
  const fromUser     = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';
  const isES         = params.lang !== 'en';
  const attachments  = getAttachments();

  const clientSubject = isES
    ? `✅ Reunión confirmada · ${params.dateFormatted} a las ${params.time} — Giralabs`
    : `✅ Meeting confirmed · ${params.dateFormatted} at ${params.time} — Giralabs`;

  const internalSubject = `🔔 Nueva reunión · ${params.name}${params.company ? ` (${params.company})` : ''} · ${params.dateFormatted} ${params.time}`;

  // 1. Client + guests
  const clientRecipients = [params.recipientEmail, ...params.guests.filter(Boolean)];
  const clientSends = clientRecipients.map(async (recipient) => {
    const html = buildBookingEmailHTML(
      { ...params, bookerEmail: params.recipientEmail, cancelUrl: params.clientCancelUrl },
      recipient
    );
    await transporter.sendMail({
      from: `"Giralabs" <${fromUser}>`,
      to: recipient,
      subject: clientSubject,
      html,
      attachments,
      text: `${params.name}, tu videollamada con Giralabs está confirmada para el ${params.dateFormatted} a las ${params.time}.\nMeet: ${params.meetLink}`,
    });
  });

  // 2. Giralabs internal
  const internalHtml = buildInternalNotificationEmailHTML({
    name: params.name,
    email: params.recipientEmail,
    company: params.company,
    guests: params.guests,
    dateFormatted: params.dateFormatted,
    time: params.time,
    meetLink: params.meetLink,
    cancelUrl: params.giralabsCancelUrl,
  });

  const internalSend = transporter.sendMail({
    from: `"Giralabs Booking" <${fromUser}>`,
    to: fromUser,
    subject: internalSubject,
    html: internalHtml,
    attachments,
    text: `Nueva reunión:\n${params.name} <${params.recipientEmail}>\nFecha: ${params.dateFormatted} ${params.time}\nMeet: ${params.meetLink}`,
  });

  await Promise.all([...clientSends, internalSend]);
  console.log(`[Giralabs] ✅ Emails enviados a: ${clientRecipients.join(', ')}`);
  console.log(`[Giralabs] 🔔 Notificación interna enviada a: ${fromUser}`);
}

// ── CANCELLATION EMAILS ────────────────────────────────────────

export interface SendCancellationParams extends CancellationEmailParams {
  guests?: string[];
}

export async function sendCancellationEmails(params: SendCancellationParams): Promise<void> {
  const transporter = createTransporter();
  const fromUser    = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';
  const attachments = getAttachments();

  const { cancelledBy, name, email, company, dateFormatted, time, guests = [] } = params;
  const isClientCancelled = cancelledBy === 'client';

  const confirmSubject = isClientCancelled
    ? `❌ Reunión cancelada · ${dateFormatted} ${time} — Giralabs`
    : `❌ Has cancelado la reunión con ${name} · ${dateFormatted} ${time}`;

  const notifySubject = isClientCancelled
    ? `🔔 ${name}${company ? ` (${company})` : ''} ha cancelado su reunión · ${dateFormatted} ${time}`
    : `❌ Tu reunión con Giralabs ha sido cancelada · ${dateFormatted} ${time}`;

  // 1. Confirmation to whoever cancelled
  const cancellerEmail  = isClientCancelled ? email : fromUser;
  const confirmHtml     = buildCancellationConfirmEmailHTML(params);

  // 2. Notification to the other party
  const notifyRecipients = isClientCancelled
    ? [fromUser]              // Giralabs gets notified client cancelled
    : [email, ...guests.filter(Boolean)]; // Client(+guests) get notified Giralabs cancelled

  const notifyHtml = buildCancellationNotificationEmailHTML(params);

  const sends = [
    transporter.sendMail({
      from: `"Giralabs" <${fromUser}>`,
      to: cancellerEmail,
      subject: confirmSubject,
      html: confirmHtml,
      attachments,
    }),
    ...notifyRecipients.map((r) =>
      transporter.sendMail({
        from: `"Giralabs" <${fromUser}>`,
        to: r,
        subject: notifySubject,
        html: notifyHtml,
        attachments,
      })
    ),
  ];

  await Promise.all(sends);
  console.log(`[Giralabs] ❌ Cancellation emails sent. Cancelled by: ${cancelledBy}`);
}
