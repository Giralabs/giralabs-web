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
};

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

// Function to translate pathname for the language switcher
export function getSwitchLanguagePath(currentPathname: string, targetLang: string): string {
  // Normalize pathname (remove trailing slash except for root / and /en/)
  let path = currentPathname;
  if (path !== '/' && path !== '/en/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  if (targetLang === 'en') {
    // Switching from ES to EN
    const enPath = urlMapEStoEN[path] || path;
    if (enPath === '/') return '/en/';
    return `/en${enPath}`;
  } else {
    // Switching from EN to ES
    let cleanPath = path;
    if (path.startsWith('/en/')) {
      cleanPath = path.replace(/^\/en/, '') || '/';
    } else if (path.startsWith('/en')) {
      cleanPath = path.substring(3) || '/';
    }
    return urlMapENtoES[cleanPath] || cleanPath;
  }
}
