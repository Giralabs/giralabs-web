// ----------------------------------------------------------------
// Google Calendar API integration — creates a real Google Meet
// event and returns the unique hangout link.
//
// Talks to the REST API with fetch rather than through the googleapis SDK.
// The SDK ships a generated client for every Google service — compute,
// aiplatform, discoveryengine and the rest — which is roughly 40 MB in the
// deployed function and 1.6s to evaluate, all to make the two calls below:
// refresh an access token, and insert one event.
//
// Required env vars (set in .env):
//   GOOGLE_CLIENT_ID      — OAuth2 client ID
//   GOOGLE_CLIENT_SECRET  — OAuth2 client secret
//   GOOGLE_REFRESH_TOKEN  — Long-lived refresh token
//   GMAIL_USER            — e.g. giralabs.contact@gmail.com
// ----------------------------------------------------------------

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const CALENDAR_API = 'https://www.googleapis.com/calendar/v3/calendars';

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
 * Exchanges the long-lived refresh token for a short-lived access token.
 * This is the whole of the OAuth dance the SDK was doing for us.
 */
async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google token refresh failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error('Google token refresh returned no access_token');
  return data.access_token;
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

  const accessToken = await getAccessToken(clientId, clientSecret, refreshToken);

  // conferenceDataVersion=1 is what makes Calendar honour the Meet createRequest.
  // sendUpdates=none is the current spelling of the SDK's sendNotifications:false —
  // Giralabs sends its own branded emails.
  const url = `${CALENDAR_API}/${encodeURIComponent(organizer)}/events?conferenceDataVersion=1&sendUpdates=none`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Google Calendar event insert failed (${response.status}): ${detail}`);
  }

  const data = (await response.json()) as { hangoutLink?: string };
  const meetLink = data.hangoutLink;
  if (!meetLink) throw new Error('Google Calendar API did not return a Meet link');

  return meetLink;
}
