import { google } from 'googleapis';

// ----------------------------------------------------------------
// Google Calendar API integration — creates a real Google Meet
// event and returns the unique hangout link.
//
// Required env vars (set in .env):
//   GOOGLE_CLIENT_ID      — OAuth2 client ID
//   GOOGLE_CLIENT_SECRET  — OAuth2 client secret
//   GOOGLE_REFRESH_TOKEN  — Long-lived refresh token
//   GMAIL_USER            — e.g. giralabs.contact@gmail.com
// ----------------------------------------------------------------

export interface MeetEventParams {
  dateISO: string;       // "YYYY-MM-DD"
  time: string;          // "HH:MM"
  name: string;
  email: string;
  company?: string;
  allEmails: string[];   // main email + guests
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/** Formats a local Date as "YYYY-MM-DDTHH:MM:SS" */
function toLocalISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
}

/**
 * Creates a Google Calendar event with a Meet link and returns the hangoutLink.
 * Falls back to "https://meet.google.com/new" if credentials are not configured.
 */
export async function createMeetEvent(params: MeetEventParams): Promise<string> {
  const clientId     = import.meta.env.GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = import.meta.env.GOOGLE_REFRESH_TOKEN;
  const organizer    = import.meta.env.GMAIL_USER ?? 'giralabs.contact@gmail.com';

  if (!clientId || !clientSecret || !refreshToken) {
    console.warn(
      '[Giralabs] Google Calendar credentials not set — using fallback Meet link. ' +
      'Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN in .env to enable real events.'
    );
    return `https://meet.google.com/new`;
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Build start/end Date objects in local time (Spain: UTC+2 in summer)
  const [year, month, day] = params.dateISO.split('-').map(Number);
  const [hours, minutes]   = params.time.split(':').map(Number);

  const startDate = new Date(year, month - 1, day, hours, minutes, 0);
  const endDate   = new Date(startDate.getTime() + 30 * 60 * 1000); // +30 min

  // Deduplicated attendees (excluding organizer to avoid duplication)
  const attendees = [...new Set(params.allEmails)]
    .filter(e => e && e !== organizer)
    .map(email => ({ email }));

  const event = {
    summary: `Reunión Giralabs × ${params.name}${params.company ? ` (${params.company})` : ''}`,
    description: [
      'Videollamada de consulta con el equipo de Giralabs.',
      '',
      `Cliente: ${params.name}`,
      params.company ? `Empresa: ${params.company}` : null,
      `Email: ${params.email}`,
    ].filter(Boolean).join('\n'),
    start: {
      dateTime: `${toLocalISO(startDate)}+02:00`,
      timeZone: 'Europe/Madrid',
    },
    end: {
      dateTime: `${toLocalISO(endDate)}+02:00`,
      timeZone: 'Europe/Madrid',
    },
    attendees,
    conferenceData: {
      createRequest: {
        requestId: `giralabs-${params.dateISO}-${params.time.replace(':', '')}-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 15 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: organizer,
    conferenceDataVersion: 1,
    resource: event,
    sendNotifications: false, // We send our own branded emails
  });

  const meetLink = response.data.hangoutLink;
  if (!meetLink) throw new Error('Google Calendar API did not return a Meet link');

  return meetLink;
}
