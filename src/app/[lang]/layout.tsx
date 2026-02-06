import { Inter } from 'next/font/google';
import '../global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { locales, type Locale } from '@/lib/i18n';
import { Providers } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
});

const meta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'JEngine - Unity Hot Update Solution',
    description: 'Enable hot updates for Unity games with runtime support. The lightweight framework for developing hot-updatable Unity games.',
  },
  zh: {
    title: 'JEngine - Unity 热更新框架',
    description: '轻量级 Unity 热更新框架，支持运行时代码和资源热更新，全面支持 Unity 所有平台。',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = meta[lang] ?? meta.en;

  return {
    title: {
      template: '%s | JEngine',
      default: t.title,
    },
    description: t.description,
    metadataBase: new URL('https://jengine.xgamedev.net'),
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
    openGraph: {
      title: t.title,
      description: t.description,
      siteName: 'JEngine Documentation',
      images: ['/logo.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/logo.png'],
    },
    alternates: {
      languages: {
        en: `/en`,
        zh: `/zh`,
      },
    },
    other: {
      'article:author': 'Jason Xu',
    },
  };
}

export function generateStaticParams() {
  return locales.map((l) => ({ lang: l.locale }));
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;

  return (
    <html lang={lang} className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'JEngine Documentation',
              url: 'https://jengine.xgamedev.net',
              description:
                'Documentation for JEngine, a Unity framework for runtime hot updates',
              inLanguage: ['en', 'zh'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'JEngine',
              applicationCategory: 'DeveloperApplication',
              url: 'https://github.com/JasonXuDeveloper/JEngine',
              description:
                'Unity framework enabling runtime hot updates for games across all Unity-supported platforms including mobile, PC, console, and minigames, with zero-code configuration, built-in encryption, and HybridCLR native C# support',
              programmingLanguage: 'C#',
              operatingSystem: 'All Unity-supported platforms (iOS, Android, Windows, macOS, Linux, WebGL, consoles, minigames)',
              author: { '@type': 'Person', name: 'Jason Xu' },
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers
          locale={lang}
          locales={locales.map((l) => ({
            locale: l.locale,
            name: l.name,
          }))}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
