// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://giralabs.es',
  // SSR mode: required for API endpoints (/api/bookings)
  output: 'server',
  adapter: vercel(),
  redirects: {
    '/services': { status: 301, destination: '/servicios' },
    '/projects': { status: 301, destination: '/proyectos' },
    '/about': { status: 301, destination: '/nosotros' },
    '/contact': { status: 301, destination: '/contacto' },
    '/privacy': { status: 301, destination: '/privacidad' },
    '/accessibility': { status: 301, destination: '/accesibilidad' },
    '/service/mobile-apps': { status: 301, destination: '/servicio/aplicaciones-moviles' },
    '/service/web-development': { status: 301, destination: '/servicio/paginas-web' },
    '/service/business-digitalization': { status: 301, destination: '/servicio/digitalizacion-empresas' },
    '/service/online-stores': { status: 301, destination: '/servicio/tiendas-online' },
    '/service/custom-software': { status: 301, destination: '/servicio/software-a-medida' },
    '/service/ai-integration': { status: 301, destination: '/servicio/integracion-ia' },
    '/project/bipsy': { status: 301, destination: '/proyecto/bipsy' },
    // Gipsi was renamed to Bipsy: keep the old URLs pointing at the new project
    '/proyecto/gipsi': { status: 301, destination: '/proyecto/bipsy' },
    '/project/gipsi': { status: 301, destination: '/proyecto/bipsy' },
    // Retired projects: send any remaining link equity to the projects index
    '/proyecto/nexus': { status: 301, destination: '/proyectos' },
    '/project/nexus': { status: 301, destination: '/proyectos' },
    '/proyecto/rewind-tv': { status: 301, destination: '/proyectos' },
    '/project/rewind-tv': { status: 301, destination: '/proyectos' },
    '/proyecto/auramovies': { status: 301, destination: '/proyectos' },
    '/project/auramovies': { status: 301, destination: '/proyectos' }
  },
  integrations: [
    sitemap({
      // English pages stay in: they are indexable and paired by hreflang.
      // Slugs are translated (/servicios vs /en/services), so the pairing lives
      // in the page head, not in the sitemap's own i18n option.
      filter: (page) => !page.endsWith('/cancel') && !page.endsWith('/cancel/') && !page.includes('/api/') && !page.endsWith('/api'),
    }),
    {
      name: 'newsletter-notifier',
      hooks: {
        'astro:build:done': async () => {
          // Only the deploy build may notify. A local `npm run build` picks up the
          // real Gmail/Upstash credentials from .env and would mail every subscriber
          // and burn the slugs as "already notified".
          if (!process.env.VERCEL && process.env.NEWSLETTER_NOTIFY !== '1') {
            console.log('[Giralabs Newsletter] Local build detected, skipping notifications.');
            return;
          }
          try {
            console.log('[Giralabs Newsletter] Executing post-build checks for new posts...');
            const { checkAndSendNewPostNotifications } = await import('./src/lib/newsletter-notifications.ts');
            await checkAndSendNewPostNotifications();
          } catch (e) {
            console.error('[Giralabs Newsletter] Error sending newsletter updates:', e);
          }
        }
      }
    }
  ],
});
