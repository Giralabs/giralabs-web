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
    '/project/gipsi': { status: 301, destination: '/proyecto/gipsi' },
    '/project/nexus': { status: 301, destination: '/proyecto/nexus' },
    '/project/rewind-tv': { status: 301, destination: '/proyecto/rewind-tv' },
    '/project/auramovies': { status: 301, destination: '/proyecto/auramovies' }
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/cancel') && !page.endsWith('/cancel/') && !page.includes('/en/') && !page.endsWith('/en') && !page.includes('/api/') && !page.endsWith('/api'),
    }),
    {
      name: 'newsletter-notifier',
      hooks: {
        'astro:build:done': async () => {
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
