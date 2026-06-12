// ----------------------------------------------------------------
// Giralabs booking email templates — Light mode, brand-aligned.
// Brand colors: Black (#0A0A0A) + Apricot (#F0EFEA)
// Uses inline styles for maximum email client compatibility.
// ----------------------------------------------------------------

export interface EmailTemplateParams {
  name: string;
  bookerEmail: string;    // ← always the MAIN booker's email (for participants block)
  dateFormatted: string;  // "15 de Junio, 2026" or "June 15, 2026"
  time: string;           // "09:30"
  meetLink: string;
  company?: string;
  guests: string[];
  lang?: string;
  cancelUrl?: string;     // ← cancel link for this specific recipient
}

// All participants = main booker + guests (always the full list, regardless of recipient)
function buildParticipantsBlock(bookerEmail: string, guests: string[]): string {
  const all = [bookerEmail, ...guests.filter(Boolean)];
  if (all.length <= 1) return '';
  return all
    .map(
      (e) =>
        `<div style="font-size:13px;color:#0a0a0a;padding:5px 0;display:flex;align-items:center;">` +
        `<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:#0a0a0a;margin-right:10px;flex-shrink:0;opacity:0.35;"></span>` +
        `${e}</div>`
    )
    .join('');
}

// Logo embedded as CID attachment (injected by email-sender.ts)
// The email sender attaches the file with cid=giralabs-logo
function logoBlock(): string {
  return `<img src="cid:giralabs-logo" alt="Giralabs" width="140" height="auto" style="display:block;width:140px;height:auto;border:0;" />`;
}

// ─────────────────────────────────────────────────────────────────
// CLIENT CONFIRMATION EMAIL — Light mode, black & apricot
// ─────────────────────────────────────────────────────────────────
export function buildBookingEmailHTML(params: EmailTemplateParams, recipientEmail: string): string {
  const isES = params.lang !== 'en';
  // Participants always show full list (main booker + all guests)
  const participantsBlock = buildParticipantsBlock(params.bookerEmail, params.guests);
  const hasGuests = params.guests.filter(Boolean).length > 0;

  const labels = isES
    ? {
        greeting: `¡Tu reunión está confirmada!`,
        intro: `Hola <strong>${params.name}</strong>, te esperamos para la videollamada en Giralabs.`,
        dateLabel: 'Fecha',
        timeLabel: 'Hora',
        durationLabel: 'Duración',
        duration: '30 min',
        timeZone: 'CET',
        cta: 'Unirse a Google Meet',
        tip: 'Te recomendamos unirte 2–3 minutos antes para comprobar cámara y micrófono.',
        participants: 'Participantes',
        cancelLine: '¿Necesitas cancelar o reprogramar? Escríbenos a',
        footerCopy: '© 2026 Giralabs. Todos los derechos reservados.',
      }
    : {
        greeting: `Your meeting is confirmed!`,
        intro: `Hi <strong>${params.name}</strong>, we look forward to your video call with Giralabs.`,
        dateLabel: 'Date',
        timeLabel: 'Time',
        durationLabel: 'Duration',
        duration: '30 min',
        timeZone: 'CET',
        cta: 'Join Google Meet',
        tip: 'We recommend joining 2–3 minutes early to check your camera and microphone.',
        participants: 'Participants',
        cancelLine: 'Need to cancel or reschedule? Email us at',
        footerCopy: '© 2026 Giralabs. All rights reserved.',
      };

  return `<!DOCTYPE html>
<html lang="${isES ? 'es' : 'en'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${labels.greeting} · Giralabs</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
<tr><td align="center" style="padding:40px 16px 56px;">

<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

  <!-- ── HEADER: black bar with logo ── -->
  <tr>
    <td style="background:#0a0a0a;border-radius:20px 20px 0 0;padding:28px 40px;">
      ${logoBlock()}
    </td>
  </tr>

  <!-- ── HERO ── -->
  <tr>
    <td style="background:#ffffff;padding:40px 40px 28px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <h1 style="margin:0 0 12px;font-size:26px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;line-height:1.2;">${labels.greeting}</h1>
      <p style="margin:0;font-size:15px;color:#555;line-height:1.65;">${labels.intro}</p>
    </td>
  </tr>

  <!-- ── MEETING DETAILS (apricot cards) ── -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 28px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <!-- Date -->
          <td width="34%" style="padding-right:6px;vertical-align:top;">
            <div style="background:#F0EFEA;border-radius:14px;padding:18px 16px;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">${labels.dateLabel}</div>
              <div style="font-size:14px;font-weight:700;color:#0a0a0a;line-height:1.3;">${params.dateFormatted}</div>
            </div>
          </td>
          <!-- Time -->
          <td width="33%" style="padding:0 3px;vertical-align:top;">
            <div style="background:#F0EFEA;border-radius:14px;padding:18px 16px;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">${labels.timeLabel}</div>
              <div style="font-size:14px;font-weight:700;color:#0a0a0a;">${params.time} <span style="font-size:10px;color:#aaa;font-weight:500;">${labels.timeZone}</span></div>
            </div>
          </td>
          <!-- Duration -->
          <td width="33%" style="padding-left:6px;vertical-align:top;">
            <div style="background:#F0EFEA;border-radius:14px;padding:18px 16px;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">${labels.durationLabel}</div>
              <div style="font-size:14px;font-weight:700;color:#0a0a0a;">${labels.duration}</div>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── MEET CTA ── -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 32px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;" align="center">
      <a href="${params.meetLink}" target="_blank" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;border-radius:12px;padding:16px 44px;font-size:15px;font-weight:700;letter-spacing:-0.01em;">${labels.cta} →</a>
      <div style="margin-top:10px;">
        <a href="${params.meetLink}" style="color:#aaa;font-size:10px;word-break:break-all;text-decoration:none;">${params.meetLink}</a>
      </div>
    </td>
  </tr>

  ${hasGuests ? `
  <!-- ── PARTICIPANTS ── -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 28px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <div style="background:#F0EFEA;border-radius:14px;padding:18px 22px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:12px;">${labels.participants}</div>
        ${participantsBlock}
      </div>
    </td>
  </tr>` : ''}

  <!-- ── TIP ── -->
  <tr>
    <td style="background:#ffffff;padding:0 40px 24px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <p style="font-size:13px;color:#888;margin:0;line-height:1.65;border-top:1px solid #f0f0ec;padding-top:24px;">💡 ${labels.tip}</p>
    </td>
  </tr>

  <!-- ── CANCEL LINK ── -->
  ${params.cancelUrl ? `<tr>
    <td style="background:#ffffff;padding:0 40px 28px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;" align="center">
      <a href="${params.cancelUrl}" style="font-size:12px;color:#bbb;text-decoration:underline;">Cancelar reunión</a>
    </td>
  </tr>` : ''}

  <!-- ── FOOTER ── -->
  <tr>
    <td style="background:#F0EFEA;border-radius:0 0 20px 20px;padding:24px 40px;border:1px solid #e8e8e3;border-top:none;">
      <p style="color:#888;font-size:12px;line-height:1.75;margin:0;">
        ${labels.cancelLine} <a href="mailto:giralabs.contact@gmail.com" style="color:#0a0a0a;text-decoration:none;font-weight:600;">giralabs.contact@gmail.com</a>
      </p>
      <p style="color:#bbb;font-size:11px;margin:12px 0 0;">${labels.footerCopy}</p>
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>`;
}


// ─────────────────────────────────────────────────────────────────
// INTERNAL NOTIFICATION EMAIL — sent only to giralabs team
// Same light mode, but with a "Nueva reunión" badge
// ─────────────────────────────────────────────────────────────────
export interface InternalNotificationParams {
  name: string;
  email: string;
  company?: string;
  guests: string[];
  dateFormatted: string;
  time: string;
  meetLink: string;
  cancelUrl?: string;  // ← cancel link for Giralabs (from=giralabs)
}

export function buildInternalNotificationEmailHTML(p: InternalNotificationParams): string {
  const hasGuests  = p.guests.filter(Boolean).length > 0;
  const hasCompany = !!p.company;
  const bookedAt   = new Date().toLocaleString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const dataRow = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #e8e8e3;vertical-align:top;">
        <span style="display:block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin-bottom:3px;">${label}</span>
        <span style="font-size:14px;font-weight:600;color:#0a0a0a;">${value}</span>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>🔔 Nueva reunión solicitada · Giralabs</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
<tr><td align="center" style="padding:40px 16px 56px;">

<table role="presentation" width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;">

  <!-- ── HEADER ── -->
  <tr>
    <td style="background:#0a0a0a;border-radius:20px 20px 0 0;padding:24px 36px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>${logoBlock()}</td>
          <td align="right">
            <span style="display:inline-block;background:#F0EFEA;border-radius:100px;padding:5px 14px;font-size:11px;font-weight:700;color:#0a0a0a;letter-spacing:0.05em;text-transform:uppercase;">🔔 Nueva reunión</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- ── CLIENT NAME ── -->
  <tr>
    <td style="background:#ffffff;padding:32px 36px 20px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;">Solicitud recibida</p>
      <h1 style="margin:0 0 6px;font-size:24px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;">
        ${p.name}${hasCompany ? `<span style="font-size:15px;font-weight:400;color:#999;margin-left:10px;">${p.company}</span>` : ''}
      </h1>
      <p style="margin:0;font-size:12px;color:#bbb;">Registrada el ${bookedAt}</p>
    </td>
  </tr>

  <!-- ── MEETING PILL (apricot) ── -->
  <tr>
    <td style="background:#ffffff;padding:0 36px 20px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <div style="background:#F0EFEA;border-radius:14px;padding:18px 22px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="45%" style="vertical-align:middle;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin-bottom:5px;">Fecha</div>
              <div style="font-size:17px;font-weight:700;color:#0a0a0a;">${p.dateFormatted}</div>
            </td>
            <td width="25%" style="vertical-align:middle;border-left:1px solid #ddd;padding-left:18px;">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin-bottom:5px;">Hora</div>
              <div style="font-size:17px;font-weight:700;color:#0a0a0a;">${p.time}</div>
            </td>
            <td width="30%" style="vertical-align:middle;" align="right">
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin-bottom:5px;">Duración</div>
              <div style="font-size:14px;font-weight:600;color:#666;">30 min</div>
            </td>
          </tr>
        </table>
      </div>
    </td>
  </tr>

  <!-- ── CLIENT DATA ── -->
  <tr>
    <td style="background:#ffffff;padding:0 36px 20px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dataRow('Email', `<a href="mailto:${p.email}" style="color:#0a0a0a;text-decoration:underline;">${p.email}</a>`)}
        ${hasCompany ? dataRow('Empresa', p.company!) : ''}
        ${hasGuests ? dataRow('Invitados', p.guests.filter(Boolean).map(g => `<a href="mailto:${g}" style="color:#555;text-decoration:none;display:block;margin-bottom:2px;">↳ ${g}</a>`).join('')) : ''}
      </table>
    </td>
  </tr>

  <!-- ── CTA: Meet + Cancel ── -->
  <tr>
    <td style="background:#ffffff;padding:0 36px 24px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;" align="center">
      <a href="${p.meetLink}" target="_blank" style="display:inline-block;background:#0a0a0a;color:#ffffff;text-decoration:none;border-radius:12px;padding:15px 36px;font-size:15px;font-weight:700;">Unirse a Google Meet →</a>
      <div style="margin-top:8px;">
        <a href="${p.meetLink}" style="color:#ccc;font-size:10px;word-break:break-all;text-decoration:none;">${p.meetLink}</a>
      </div>
      ${p.cancelUrl ? `<div style="margin-top:16px;">
        <a href="${p.cancelUrl}" style="font-size:12px;color:#bbb;text-decoration:underline;">Cancelar reunión</a>
      </div>` : ''}
    </td>
  </tr>

  <!-- ── FOOTER ── -->
  <tr>
    <td style="background:#F0EFEA;border-radius:0 0 20px 20px;padding:20px 36px;border:1px solid #e8e8e3;border-top:none;">
      <p style="color:#aaa;font-size:11px;margin:0;line-height:1.7;">
        Correo interno de <strong style="color:#666;">Giralabs</strong> · Sistema de reservas automático · No reenviar
      </p>
    </td>
  </tr>

</table>

</td></tr>
</table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────
// CANCELLATION EMAILS
// ─────────────────────────────────────────────────────────────────
export interface CancellationEmailParams {
  name: string;         // client name
  email: string;        // client email
  company?: string;
  dateFormatted: string;
  time: string;
  cancelledBy: 'client' | 'giralabs';
}

/** Shared scaffold for simple cancellation emails */
function buildCancelCard(header: string, body: string, footer: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${header} · Giralabs</title></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;">
<tr><td align="center" style="padding:40px 16px 56px;">
<table role="presentation" width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;">
  <tr>
    <td style="background:#0a0a0a;border-radius:20px 20px 0 0;padding:24px 36px;">
      ${logoBlock()}
    </td>
  </tr>
  <tr>
    <td style="background:#ffffff;padding:36px 36px 28px;border-left:1px solid #e8e8e3;border-right:1px solid #e8e8e3;">
      ${body}
    </td>
  </tr>
  <tr>
    <td style="background:#F0EFEA;border-radius:0 0 20px 20px;padding:20px 36px;border:1px solid #e8e8e3;border-top:none;">
      <p style="color:#aaa;font-size:11px;margin:0;line-height:1.7;">${footer}</p>
    </td>
  </tr>
</table>
</td></tr></table>
</body></html>`;
}

/**
 * Email sent to the PERSON WHO CANCELLED (confirmation they cancelled).
 * Also sent to Giralabs when they cancel (their own confirmation).
 */
export function buildCancellationConfirmEmailHTML(p: CancellationEmailParams): string {
  const isGiralabs = p.cancelledBy === 'giralabs';

  const body = isGiralabs
    ? `
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin:0 0 10px;">Cancelación confirmada</p>
      <h1 style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;margin:0 0 12px;">Has cancelado la reunión</h1>
      <p style="font-size:14px;color:#666;line-height:1.65;margin:0 0 20px;">Se ha cancelado la videollamada con <strong style="color:#0a0a0a">${p.name}</strong>${p.company ? ` de <strong style="color:#0a0a0a">${p.company}</strong>` : ''} del <strong style="color:#0a0a0a">${p.dateFormatted} a las ${p.time}</strong>. El horario vuelve a estar disponible.</p>
      <div style="background:#F0EFEA;border-radius:12px;padding:16px 18px;">
        <p style="font-size:13px;color:#888;margin:0;">El cliente ha sido notificado por correo electrónico.</p>
      </div>
    `
    : `
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin:0 0 10px;">Cancelación aprobada</p>
      <h1 style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;margin:0 0 12px;">Reunión cancelada</h1>
      <p style="font-size:14px;color:#666;line-height:1.65;margin:0 0 20px;">Tu reunión del <strong style="color:#0a0a0a">${p.dateFormatted} a las ${p.time}</strong> ha sido cancelada correctamente. El equipo de Giralabs ha sido notificado.</p>
      <div style="background:#F0EFEA;border-radius:12px;padding:16px 18px;">
        <p style="font-size:13px;color:#888;margin:0;">Si quieres programar una nueva reunión, visita <a href="https://giralabs.com/contact" style="color:#0a0a0a;font-weight:600;text-decoration:none;">giralabs.com/contact</a></p>
      </div>
    `;

  return buildCancelCard(
    isGiralabs ? 'Reunión cancelada' : 'Cancelación confirmada',
    body,
    isGiralabs
      ? 'Correo interno · Giralabs · Sistema de reservas'
      : '© 2026 Giralabs · ¿Necesitas ayuda? Escríbenos a giralabs.contact@gmail.com'
  );
}

/**
 * Email sent to the OTHER PARTY notifying them of the cancellation.
 * - If client cancelled → sent to Giralabs: "X canceló su reunión"
 * - If Giralabs cancelled → sent to client: "Giralabs canceló tu reunión"
 */
export function buildCancellationNotificationEmailHTML(p: CancellationEmailParams): string {
  const clientCancelled = p.cancelledBy === 'client';

  const body = clientCancelled
    ? `
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin:0 0 10px;">Reunión cancelada</p>
      <h1 style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;margin:0 0 12px;">${p.name} ha cancelado</h1>
      <p style="font-size:14px;color:#666;line-height:1.65;margin:0 0 20px;">
        <strong style="color:#0a0a0a">${p.name}</strong>${p.company ? ` de <strong style="color:#0a0a0a">${p.company}</strong>` : ''} ha cancelado su reunión del
        <strong style="color:#0a0a0a">${p.dateFormatted} a las ${p.time}</strong>. El horario vuelve a estar disponible.
      </p>
      <div style="background:#F0EFEA;border-radius:12px;padding:16px 18px;">
        <div style="font-size:12px;color:#aaa;margin-bottom:4px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;">Email</div>
        <a href="mailto:${p.email}" style="font-size:14px;color:#0a0a0a;text-decoration:none;font-weight:600;">${p.email}</a>
      </div>
    `
    : `
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#aaa;margin:0 0 10px;">Reunión cancelada</p>
      <h1 style="font-size:22px;font-weight:700;color:#0a0a0a;letter-spacing:-0.03em;margin:0 0 12px;">Tu reunión fue cancelada</h1>
      <p style="font-size:14px;color:#666;line-height:1.65;margin:0 0 20px;">
        Hola <strong style="color:#0a0a0a">${p.name}</strong>, lamentamos informarte de que el equipo de Giralabs ha tenido que cancelar
        la reunión del <strong style="color:#0a0a0a">${p.dateFormatted} a las ${p.time}</strong>.
      </p>
      <div style="background:#F0EFEA;border-radius:12px;padding:16px 18px;margin-bottom:20px;">
        <p style="font-size:13px;color:#888;margin:0;">Puedes reservar otra reunión en <a href="https://giralabs.com/contact" style="color:#0a0a0a;font-weight:600;text-decoration:none;">giralabs.com/contact</a> o escribirnos a <a href="mailto:giralabs.contact@gmail.com" style="color:#0a0a0a;font-weight:600;text-decoration:none;">giralabs.contact@gmail.com</a></p>
      </div>
    `;

  return buildCancelCard(
    'Reunión cancelada',
    body,
    clientCancelled
      ? 'Correo interno · Giralabs · Sistema de reservas'
      : '© 2026 Giralabs · ¿Necesitas ayuda? Escríbenos a giralabs.contact@gmail.com'
  );
}
