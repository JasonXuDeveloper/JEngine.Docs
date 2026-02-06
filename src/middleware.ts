import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { i18n } from '@/lib/i18n';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

const COOKIE_NAME = 'FD_LOCALE';
const CN_COUNTRIES = new Set(['CN', 'TW', 'HK', 'MO', 'SG']);

const i18nProxy = createI18nMiddleware(i18n);

// Rewrite docs paths to LLM markdown endpoint when Accept: text/markdown
const { rewrite: rewriteLLM } = rewritePath(
  '/:lang/docs{/*path}',
  '/llms.mdx/:lang/docs{/*path}',
);

export function middleware(request: NextRequest, event: NextFetchEvent) {
  // Serve markdown to AI agents that send Accept: text/markdown
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);
    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl));
    }
  }

  // For first-time visitors (no locale cookie), use Cloudflare geo to pick locale
  const hasCookie = request.cookies.has(COOKIE_NAME);
  if (!hasCookie) {
    const country = request.headers.get('cf-ipcountry') ?? '';
    if (country) {
      const locale = CN_COUNTRIES.has(country) ? 'zh' : 'en';
      // Set cookie so fumadocs middleware picks it up
      request.cookies.set(COOKIE_NAME, locale);
    }
  }

  return i18nProxy(request, event);
}

export const config = {
  // Match all routes except api, static files, images, and public assets
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|llms|og|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|static\\.json|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.ico$).*)'],
};
