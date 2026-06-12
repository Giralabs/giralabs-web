import type { APIRoute } from 'astro';
import { getBookingByToken, cancelBookingByToken } from '../../lib/bookings-store.js';
import { sendCancellationEmails } from '../../lib/email-sender.js';

export const prerender = false;

// ----------------------------------------------------------------
// GET /api/cancel?token=TOKEN
// Returns booking info for a cancel token (used by the cancel page)
// ----------------------------------------------------------------
export const GET: APIRoute = async ({ url }) => {
  const token = url.searchParams.get('token');
  if (!token) {
    return new Response(JSON.stringify({ error: 'Token requerido' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const booking = await getBookingByToken(token);
  if (!booking) {
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Only return safe-to-display info (not the token itself in info)
  return new Response(JSON.stringify({
    dateISO: booking.dateISO,
    time: booking.time,
    name: booking.info.name,
    email: booking.info.email,
    company: booking.info.company ?? null,
    guests: booking.info.guests,
    meetLink: booking.info.meetLink,
    dateFormatted: booking.info.dateFormatted ?? booking.dateISO,
  }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};

// ----------------------------------------------------------------
// POST /api/cancel
// Body: { token: string, cancelledBy: 'client' | 'giralabs' }
// Deletes booking, frees slot, sends cancellation emails.
// ----------------------------------------------------------------
export const POST: APIRoute = async ({ request }) => {
  let body: { token: string; cancelledBy: 'client' | 'giralabs' };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON inválido' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const { token, cancelledBy } = body;

  if (!token || !cancelledBy) {
    return new Response(JSON.stringify({ error: 'Faltan campos: token, cancelledBy' }), {
      status: 400, headers: { 'Content-Type': 'application/json' },
    });
  }

  const cancelled = await cancelBookingByToken(token);
  if (!cancelled) {
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send cancellation emails (non-fatal)
  try {
    await sendCancellationEmails({
      cancelledBy,
      name: cancelled.info.name,
      email: cancelled.info.email,
      company: cancelled.info.company,
      guests: cancelled.info.guests,
      dateFormatted: cancelled.info.dateFormatted ?? cancelled.dateISO,
      time: cancelled.time,
    });
  } catch (err) {
    console.error('[Giralabs] Cancellation email failed:', err);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: { 'Content-Type': 'application/json' },
  });
};
