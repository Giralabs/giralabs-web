import type { APIRoute } from 'astro';
import { getBookedSlots, getBookedSlotsForDates, isSlotBooked, saveBooking, generateCancelToken } from '../../lib/bookings-store.js';
import { createMeetEvent } from '../../lib/google-calendar.js';
import { sendBookingConfirmation } from '../../lib/email-sender.js';

// Disable static prerendering — this route must always run server-side
export const prerender = false;

// All available time slots (single source of truth)
const DEFAULT_SLOTS = ['09:30', '11:00', '15:00', '16:30'];

// Maximum number of extra guests (not counting the main attendee)
const MAX_GUESTS = 5;

// ----------------------------------------------------------------
// GET /api/bookings?date=YYYY-MM-DD or /api/bookings?dates=YYYY-MM-DD,YYYY-MM-DD,...
// Returns { bookedSlots: string[] } or { bookings: Record<string, string[]> }
// ----------------------------------------------------------------
export const GET: APIRoute = async ({ url }) => {
  const date = url.searchParams.get('date');
  const dates = url.searchParams.get('dates');

  if (dates) {
    const datesList = dates.split(',');
    for (const d of datesList) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
        return new Response(JSON.stringify({ error: 'Invalid date format in list (expected YYYY-MM-DD)' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    const bookings = await getBookedSlotsForDates(datesList);
    return new Response(JSON.stringify({ bookings }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing date param (expected YYYY-MM-DD)' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const bookedSlots = await getBookedSlots(date);

  return new Response(JSON.stringify({ bookedSlots }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// ----------------------------------------------------------------
// POST /api/bookings
// Body: { dateISO, dateFormatted, time, name, email, company?, guests[], lang? }
// Creates Meet event, saves booking, sends emails.
// Returns { meetLink: string }
// ----------------------------------------------------------------
export const POST: APIRoute = async ({ request }) => {
  let body: {
    dateISO: string;
    dateFormatted: string;
    time: string;
    name: string;
    email: string;
    company?: string;
    guests?: string[];
    lang?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { dateISO, dateFormatted, time, name, email, company, guests = [], lang = 'es' } = body;

  // ── Validation ──────────────────────────────────────────────
  if (!dateISO || !time || !name || !email) {
    return new Response(
      JSON.stringify({ error: 'Missing required fields: dateISO, time, name, email' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
    return new Response(JSON.stringify({ error: 'dateISO must be YYYY-MM-DD' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify date is at least tomorrow
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const localTodayStr = `${year}-${month}-${day}`;

  if (dateISO <= localTodayStr) {
    return new Response(
      JSON.stringify({ error: lang === 'es' ? 'Solo se pueden reservar citas a partir de mañana.' : 'Bookings are only allowed starting from tomorrow.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!DEFAULT_SLOTS.includes(time)) {
    return new Response(JSON.stringify({ error: 'Invalid time slot' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (guests && guests.length > MAX_GUESTS) {
    return new Response(
      JSON.stringify({ error: `Máximo ${MAX_GUESTS} invitados permitidos.` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // ── Race-condition check: is slot still available? ──────────
  if (await isSlotBooked(dateISO, time)) {
    return new Response(
      JSON.stringify({ error: 'Este horario ya ha sido reservado. Por favor elige otro.' }),
      { status: 409, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const cleanGuests = guests.filter((g) => g && g.includes('@'));
  const allEmails   = [email, ...cleanGuests];

  try {
    // ── Step 1: Create Google Meet event ──────────────────
    const meetLink = await createMeetEvent({ dateISO, time, name, email, company, allEmails });

    // ── Step 2: Generate cancel token & persist booking ──
    const cancelToken = generateCancelToken();
    await saveBooking(dateISO, time, {
      name,
      email,
      company,
      guests: cleanGuests,
      meetLink,
      bookedAt: new Date().toISOString(),
      cancelToken,
      dateFormatted: dateFormatted ?? dateISO,
    });

    // ── Step 3: Build cancel URLs from request origin ──────────
    const origin = new URL(request.url).origin;
    const clientCancelUrl  = `${origin}/cancel?token=${cancelToken}&from=client`;
    const giralabsCancelUrl = `${origin}/cancel?token=${cancelToken}&from=giralabs`;

    // ── Step 4: Send confirmation emails ──────────────────────
    try {
      await sendBookingConfirmation({
        recipientEmail: email,
        bookerEmail: email,
        name,
        dateFormatted: dateFormatted ?? dateISO,
        time,
        meetLink,
        company,
        guests: cleanGuests,
        lang,
        clientCancelUrl,
        giralabsCancelUrl,
      });
    } catch (emailErr) {
      // Email failure is non-fatal — booking is saved, log the error
      console.error('[Giralabs] Email send failed (booking saved):', emailErr);
    }

    return new Response(JSON.stringify({ meetLink }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('[Giralabs] Booking creation error:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno al procesar la reserva. Inténtalo de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
