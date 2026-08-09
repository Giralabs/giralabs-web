// Canonical origin of the site, in a single place.
//
// The live site is served from www: giralabs.es answers with a 308 to
// www.giralabs.es. Every canonical, hreflang, sitemap entry and JSON-LD @id has
// to use the hostname that actually returns 200, or search engines resolve a
// redirect on every URL and end up picking a canonical themselves.
//
// To move the site to the bare domain: flip the primary domain in Vercel so www
// redirects to giralabs.es, then change this constant. Nothing else.
export const SITE_ORIGIN = 'https://www.giralabs.es';

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) return `${SITE_ORIGIN}/${path}`;
  return path === '/' ? SITE_ORIGIN : `${SITE_ORIGIN}${path}`;
}

/**
 * Normalizes a pathname to the form the whole site advertises: no trailing
 * slash. Both forms return 200 on the host, so canonical, hreflang, sitemap and
 * internal links all have to agree on one or the page looks duplicated.
 */
export function canonicalPath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
