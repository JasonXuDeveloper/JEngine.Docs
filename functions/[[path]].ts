interface Env {
  ASSETS: Fetcher;
}

const localizedPathPattern = /^\/(en|zh)(?:\/|$)/;
const docsMarkdownPattern = /^\/(en|zh)\/docs\/.+/;
const markdownMime = 'text/markdown; charset=utf-8';
const localeCookieName = 'FD_LOCALE';
const zhCountries = new Set(['CN', 'TW', 'HK', 'MO', 'SG']);
const bypassExtensions = new Set([
  '.css',
  '.js',
  '.mjs',
  '.map',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.webp',
  '.avif',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.json',
  '.txt',
  '.xml',
  '.webmanifest',
]);

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return context.next();
  }

  const url = new URL(request.url);

  if (shouldBypass(url.pathname)) {
    return context.next();
  }

  if (prefersMarkdown(request) && docsMarkdownPattern.test(url.pathname)) {
    return serveMarkdown(context, url);
  }

  if (!localizedPathPattern.test(url.pathname)) {
    const locale = getLocale(request);
    const target = new URL(request.url);
    target.pathname = localizePath(url.pathname, locale);

    return new Response(null, {
      status: 302,
      headers: {
        Location: `${target.pathname}${target.search}`,
        'Set-Cookie': serializeLocaleCookie(locale),
      },
    });
  }

  return context.next();
};

function shouldBypass(pathname: string) {
  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/images/') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/static.json' ||
    pathname === '/manifest.webmanifest'
  ) {
    return true;
  }

  const extension = pathname.match(/\.[a-z0-9]+$/i)?.[0].toLowerCase();
  return extension ? bypassExtensions.has(extension) : false;
}

function prefersMarkdown(request: Request) {
  const accept = request.headers.get('accept');
  if (!accept) return false;

  const parts = accept.split(',').map((part) => part.trim().toLowerCase());
  const markdownIndex = parts.findIndex((part) =>
    part.startsWith('text/markdown'),
  );
  if (markdownIndex === -1) return false;

  const htmlIndex = parts.findIndex((part) => part.startsWith('text/html'));
  return htmlIndex === -1 || markdownIndex < htmlIndex;
}

async function serveMarkdown(
  context: EventContext<Env, string, unknown>,
  url: URL,
) {
  const assetUrl = new URL(url);
  assetUrl.pathname = url.pathname.endsWith('.mdx')
    ? url.pathname
    : `${url.pathname}.mdx`;

  const response = await context.env.ASSETS.fetch(assetUrl);
  if (response.status === 404) return context.next();

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': markdownMime,
      'Cache-Control':
        response.headers.get('cache-control') ?? 'public, max-age=3600',
    },
  });
}

function getLocale(request: Request) {
  const cookieLocale = request.headers
    .get('cookie')
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${localeCookieName}=`))
    ?.split('=')[1];

  if (cookieLocale === 'en' || cookieLocale === 'zh') return cookieLocale;

  const cf = request.cf as IncomingRequestCfProperties | undefined;
  const country =
    typeof cf?.country === 'string'
      ? cf.country
      : request.headers.get('cf-ipcountry');

  return country && zhCountries.has(country.toUpperCase()) ? 'zh' : 'en';
}

function localizePath(pathname: string, locale: 'en' | 'zh') {
  if (pathname === '/') return `/${locale}`;
  return `/${locale}${pathname}`;
}

function serializeLocaleCookie(locale: 'en' | 'zh') {
  return `${localeCookieName}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}
