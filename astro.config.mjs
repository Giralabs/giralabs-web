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
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/cancel') && !page.endsWith('/cancel/') && !page.includes('/en/') && !page.endsWith('/en'),
    }),
  ],
});
