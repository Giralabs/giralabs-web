const urlMapEStoEN: Record<string, string> = {
  '/': '/',
  '/servicios': '/services',
  '/proyectos': '/projects',
  '/nosotros': '/about',
  '/contacto': '/contact',
  '/privacidad': '/privacy',
  '/accesibilidad': '/accessibility',
  '/blog': '/blog',
  '/legal': '/legal',
  '/servicio/aplicaciones-moviles': '/service/mobile-apps',
  '/servicio/paginas-web': '/service/web-development',
  '/servicio/digitalizacion-empresas': '/service/business-digitalization',
  '/servicio/tiendas-online': '/service/online-stores',
  '/servicio/software-a-medida': '/service/custom-software',
  '/servicio/integracion-ia': '/service/ai-integration',
  '/proyecto/bipsy': '/project/bipsy',
  // Blog slugs are translated, so without these pairs every post declared an
  // hreflang pointing at /en/blog/<spanish-slug>, which does not exist
  '/blog/ciberseguridad-secure-by-design-pymes-2026': '/blog/cybersecurity-secure-by-design-smes-2026',
  '/blog/facturacion-electronica-obligatoria-pymes-2026': '/blog/mandatory-electronic-invoicing-smes-2026',
  '/blog/ingenieria-agentic-desarrollo-software-2026': '/blog/agentic-engineering-custom-software-2026',
};

// Pages that exist in one language only must not advertise a translation.
// Anything outside the blog is mirrored, so only posts need checking.
export function hasEnglishAlternate(path: string): boolean {
  const clean = path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
  if (!clean.startsWith('/blog/') && !clean.startsWith('/en/blog/')) return true;
  if (clean.startsWith('/en/blog/')) return true;
  return clean in urlMapEStoEN;
}

// Inverse map for translating from English back to Spanish
const urlMapENtoES: Record<string, string> = Object.entries(urlMapEStoEN).reduce((acc, [es, en]) => {
  acc[en] = es;
  return acc;
}, {} as Record<string, string>);

export function getLocalizedPath(path: string, lang: string): string {
  // Extract hash if any
  const [pathPart, hashPart] = path.split('#');
  const hash = hashPart ? `#${hashPart}` : '';

  if (lang === 'en') {
    // If it's already an English path, return it (just in case)
    if (pathPart.startsWith('/en/')) {
      return pathPart + hash;
    }
    // Translate the path if it's in Spanish
    const enPath = urlMapEStoEN[pathPart] || pathPart;
    if (enPath === '/') {
      return '/en/' + hash;
    }
    return `/en${enPath}${hash}`;
  } else {
    // Translate the path if it's in English
    let cleanPath = pathPart;
    if (pathPart.startsWith('/en/')) {
      cleanPath = pathPart.replace(/^\/en/, '') || '/';
    } else if (pathPart.startsWith('/en')) {
      cleanPath = pathPart.substring(3) || '/';
    }
    const esPath = urlMapENtoES[cleanPath] || cleanPath;
    return esPath + hash;
  }
}

// Translates a pathname into the requested language. Used by the language
// switcher and by the hreflang annotations, so it must be idempotent: asking
// for the language a path is already in has to return that same path.
export function getSwitchLanguagePath(currentPathname: string, targetLang: string): string {
  // Normalize pathname (remove trailing slash except for root / and /en/)
  let path = currentPathname;
  if (path !== '/' && path !== '/en/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Resolve to the Spanish path first, whatever language we came from.
  // Without this, an English path asking for English gets prefixed twice
  // (/en/projects -> /en/en/projects) and every hreflang on the English
  // pages points at a URL that does not exist.
  let esPath = path;
  if (path === '/en' || path === '/en/' || path.startsWith('/en/')) {
    const stripped = path.replace(/^\/en/, '') || '/';
    const normalized = stripped === '' ? '/' : stripped;
    esPath = urlMapENtoES[normalized] || normalized;
  }

  if (targetLang === 'en') {
    const enPath = urlMapEStoEN[esPath] || esPath;
    if (enPath === '/') return '/en/';
    return `/en${enPath}`;
  }

  return esPath;
}
