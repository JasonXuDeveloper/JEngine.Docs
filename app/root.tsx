import { RootProvider } from 'fumadocs-ui/provider/react-router';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';
import SearchDialog from '@/components/search';
import { locales } from '@/lib/i18n';
import type { Route } from './+types/root';
import './app.css';

const zhTranslations = {
  search: '搜索文档...',
  searchNoResult: '未找到结果',
  toc: '本页目录',
  tocNoHeadings: '无标题',
  lastUpdate: '最后更新',
  chooseLanguage: '选择语言',
  nextPage: '下一页',
  previousPage: '上一页',
  chooseTheme: '选择主题',
  editOnGithub: '在 GitHub 上编辑',
};

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
  {
    rel: 'icon',
    href: '/favicon-32x32.png',
    type: 'image/png',
    sizes: '32x32',
  },
  {
    rel: 'icon',
    href: '/favicon-16x16.png',
    type: 'image/png',
    sizes: '16x16',
  },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

function getLocale(pathname: string) {
  return pathname.startsWith('/zh') ? 'zh' : 'en';
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const locale = getLocale(pathname);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          i18n={{
            locale,
            locales,
            translations: locale === 'zh' ? zhTranslations : undefined,
          }}
          search={{ SearchDialog }}
          theme={{ disableTransitionOnChange: false }}
        >
          {children}
        </RootProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="mx-auto w-full max-w-3xl p-8 pt-16">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-fd-muted-foreground">
          The page you requested does not exist.
        </p>
      </main>
    );
  }

  const message = error instanceof Error ? error.message : 'Unexpected error';

  return (
    <main className="mx-auto w-full max-w-3xl p-8 pt-16">
      <h1 className="text-2xl font-semibold">Error</h1>
      <p className="mt-2 text-fd-muted-foreground">{message}</p>
    </main>
  );
}
