import nodemailer from 'nodemailer';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildBookingEmailHTML,
  buildInternalNotificationEmailHTML,
  buildCancellationConfirmEmailHTML,
  buildCancellationNotificationEmailHTML,
  buildWelcomeEmailHTML,
  buildNewPostsEmailHTML,
  buildApplicationInternalEmailHTML,
  buildApplicationConfirmEmailHTML,
  type EmailTemplateParams,
  type CancellationEmailParams,
} from './email-templates.ts';
import { applicationFormCopy, jobPath, type CareersLang, type Job } from '../data/careers.ts';
import { SITE_ORIGIN } from './site.ts';

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

// ── NEWSLETTER EMAILS ──────────────────────────────────────────

export async function sendWelcomeEmail(recipientEmail: string, lang: 'es' | 'en'): Promise<void> {
  const transporter = createTransporter();
  const fromUser    = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';
  const attachments = getAttachments();
  const html        = buildWelcomeEmailHTML(lang);
  const subject     = lang === 'en'
    ? 'Welcome to the Giralabs newsletter! 🚀'
    : '¡Te has suscrito a la newsletter de Giralabs! 🚀';

  await transporter.sendMail({
    from: `"Giralabs" <${fromUser}>`,
    to: recipientEmail,
    subject,
    html,
    attachments,
  });
  console.log(`[Giralabs Newsletter] Welcome email sent to: ${recipientEmail}`);
}

export async function sendNewPostsNotification(
  subscribers: Array<{ email: string; lang: 'es' | 'en' }>,
  newPosts: any[]
): Promise<void> {
  if (subscribers.length === 0 || newPosts.length === 0) return;

  const transporter = createTransporter();
  const fromUser    = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';
  const attachments = getAttachments();

  const sends = subscribers.map(async (sub) => {
    const html = buildNewPostsEmailHTML(newPosts, sub.lang);
    const subject = sub.lang === 'en'
      ? '🔔 New articles published at Giralabs'
      : '🔔 Nuevos artículos publicados en Giralabs';

    try {
      await transporter.sendMail({
        from: `"Giralabs" <${fromUser}>`,
        to: sub.email,
        subject,
        html,
        attachments,
      });
      console.log(`[Giralabs Newsletter] Notification sent to: ${sub.email} (${sub.lang})`);
    } catch (err) {
      console.error(`[Giralabs Newsletter] Failed to send notification to ${sub.email}:`, err);
    }
  });

  await Promise.all(sends);
}

// ── JOB APPLICATIONS ───────────────────────────────────────────

export interface SendJobApplicationParams {
  job: Job;
  lang: CareersLang;
  fields: Record<string, string>;
  cv: { filename: string; content: Buffer; contentType: string };
}

export async function sendJobApplication({ job, lang, fields, cv }: SendJobApplicationParams): Promise<void> {
  const transporter = createTransporter();
  const fromUser    = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';
  // Applications can go to a dedicated inbox; by default they land with the rest
  const inbox       = import.meta.env.CAREERS_EMAIL || fromUser;
  const attachments = getAttachments();

  // The team reads applications in Spanish, whatever language the candidate used
  const O = applicationFormCopy.es.options;
  const F = applicationFormCopy.es;
  const levelLabels = Object.fromEntries(job.es.levelQuestions.map((q) => [q.name, q.label]));
  const pick = (map: Record<string, string>, key: string) => map[key] ?? key;
  const phoneHref = `tel:${fields.phone.replace(/[^\d+]/g, '')}`;

  const rows = [
    { label: F.email, value: fields.email, href: `mailto:${fields.email}` },
    { label: F.phone, value: fields.phone, href: phoneHref },
    { label: F.city, value: fields.city },
    { label: 'Permiso de trabajo', value: pick(O.workPermit, fields.work_permit) },
    { label: 'LinkedIn', value: fields.linkedin, href: fields.linkedin },
    { label: 'GitHub / portfolio', value: fields.portfolio, href: fields.portfolio },
    { label: 'Experiencia', value: pick(O.experience, fields.experience) },
    { label: levelLabels.level_flutter, value: pick(O.level, fields.level_flutter) },
    { label: levelLabels.level_angular, value: pick(O.level, fields.level_angular) },
    { label: levelLabels.level_spring, value: pick(O.level, fields.level_spring) },
    { label: 'Disponibilidad', value: pick(O.availability, fields.availability) },
    { label: 'Salario esperado', value: fields.salary },
    { label: 'Origen', value: pick(O.source, fields.source) },
    { label: 'UTM', value: fields.utm },
    { label: 'Idioma del formulario', value: lang.toUpperCase() },
  ];

  const siteOrigin = SITE_ORIGIN;
  const internalHtml = buildApplicationInternalEmailHTML({
    jobTitle: job.es.title,
    jobUrl: `${siteOrigin}${jobPath(job.slug, 'es')}`,
    candidateName: fields.name,
    candidateEmail: fields.email,
    rows,
    coverLetter: fields.cover_letter,
    cvFilename: cv.filename,
  });

  // Header values: strip line breaks so a crafted name cannot inject headers
  const oneLine = (v: string) => v.replace(/[\r\n]+/g, ' ');

  await transporter.sendMail({
    from: `"Giralabs Empleo" <${fromUser}>`,
    to: inbox,
    replyTo: { name: oneLine(fields.name), address: fields.email },
    subject: oneLine(`💼 Candidatura · ${job.es.shortTitle} · ${fields.name} (${pick(O.experience, fields.experience)})`),
    html: internalHtml,
    text:
      `Nueva candidatura para ${job.es.title}\n\n` +
      rows.filter((r) => r.value).map((r) => `${r.label}: ${r.value}`).join('\n') +
      `\n\nMotivación:\n${fields.cover_letter}`,
    attachments: [...attachments, { filename: cv.filename, content: cv.content, contentType: cv.contentType }],
  });
  console.log(`[Giralabs Careers] Application for ${job.slug} delivered to ${inbox}`);

  // The confirmation is a courtesy: the application is already in the inbox
  try {
    const J = job[lang];
    await transporter.sendMail({
      from: `"Giralabs" <${fromUser}>`,
      to: fields.email,
      subject: lang === 'en'
        ? `We have received your application · ${J.shortTitle} — Giralabs`
        : `Hemos recibido tu candidatura · ${J.shortTitle} — Giralabs`,
      html: buildApplicationConfirmEmailHTML({
        name: fields.name,
        jobTitle: J.title,
        jobUrl: `${siteOrigin}${jobPath(job.slug, lang)}`,
        lang,
      }),
      attachments,
    });
  } catch (err) {
    console.error('[Giralabs Careers] Candidate confirmation failed:', err);
  }
}
