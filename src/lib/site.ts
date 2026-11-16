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
 * Search result snippets show about 155-160 characters. Longer descriptions get
 * cut by Google mid-word, so cut them here instead: at the last full sentence
 * that fits, or failing that at a word boundary with an ellipsis.
 */
export function clipDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('.'));
  if (sentenceEnd >= 90) return head.slice(0, sentenceEnd + 1);
  const wordEnd = head.slice(0, max - 1).lastIndexOf(' ');
  return `${head.slice(0, wordEnd).replace(/[,;:]$/, '')}…`;
}

/** Search titles for the service pages, keyed by slug in both languages. */
export const SERVICE_SEO_TITLES: Record<string, string> = {
  'aplicaciones-moviles': 'Desarrollo de apps móviles en Sevilla',
  'paginas-web': 'Diseño y desarrollo de páginas web en Sevilla',
  'digitalizacion-empresas': 'Digitalización de empresas en Sevilla',
  'tiendas-online': 'Creación de tiendas online en Sevilla',
  'software-a-medida': 'Desarrollo de software a medida en Sevilla',
  'integracion-ia': 'Integración de IA en apps y empresas',
  'mobile-apps': 'Mobile app development in Seville, Spain',
  'web-development': 'Web design and development in Seville',
  'business-digitalization': 'Business digitalization in Seville',
  'online-stores': 'Online store development in Seville',
  'custom-software': 'Custom software development in Seville',
  'ai-integration': 'AI integration for apps and businesses',
};

/**
 * Normalizes a pathname to the form the whole site advertises: no trailing
 * slash. Both forms return 200 on the host, so canonical, hreflang, sitemap and
 * internal links all have to agree on one or the page looks duplicated.
 */
export function canonicalPath(pathname: string): string {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}
