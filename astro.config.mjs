// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // SSR mode: required for API endpoints (/api/bookings)
  output: 'server',
  adapter: vercel(),
});
