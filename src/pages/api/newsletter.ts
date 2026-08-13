import type { APIRoute } from 'astro';
import { addSubscriber } from '../../lib/newsletter-store.js';
// nodemailer is imported at its call site, not here: this function is cold on
// almost every request (the rest of the site is prerendered), and evaluating
// the mail stack on start-up delayed the read-only paths too.

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: {
    email: string;
    lang?: 'es' | 'en';
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { email, lang = 'es' } = body;

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Email inválido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const isNew = await addSubscriber(email, lang);
    
    if (!isNew) {
      return new Response(JSON.stringify({ message: 'already_subscribed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Try sending welcoming email (non-blocking for registration itself)
    try {
      const { sendWelcomeEmail } = await import('../../lib/email-sender.js');
      await sendWelcomeEmail(email, lang);
    } catch (err) {
      console.error('[Giralabs Newsletter] Welcome email delivery failed:', err);
    }

    return new Response(JSON.stringify({ message: 'subscribed_successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('[Giralabs Newsletter] Registration error:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor. Inténtalo más tarde.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
