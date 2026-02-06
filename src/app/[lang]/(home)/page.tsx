import Link from 'next/link';
import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { defaultVersion } from '@/lib/versions';
import { cn } from '@/lib/cn';
import { ArrowRight, Flame, Zap, Shield, Package } from 'lucide-react';

const translations: Record<
  Locale,
  {
    tagline: string;
    headline: string[];
    description: string;
    getStarted: string;
    viewOnGithub: string;
    highlights: Array<{
      icon: typeof Flame;
      label: string;
      text: string;
    }>;
  }
> = {
  en: {
    tagline: 'Unity Hot Update Framework · AI Enhanced',
    headline: ['Ship game updates', 'without shipping a build.'],
    description:
      'Runtime hot updates for all platforms — push code, assets, and logic without rebuilding. Modular package ecosystem with Claude Code AI integration. Powered by HybridCLR with built-in encryption and obfuscation.',
    getStarted: 'Get Started',
    viewOnGithub: 'View on GitHub',
    highlights: [
      {
        icon: Flame,
        label: 'Zero-Code Hot Update',
        text: 'No code required — configure and get hot update capability instantly',
      },
      {
        icon: Zap,
        label: 'Native C# via HybridCLR',
        text: 'Full AOT support with zero interpretation overhead',
      },
      {
        icon: Shield,
        label: 'Secure by Default',
        text: 'Built-in encryption (XOR/AES/ChaCha20) and code obfuscation',
      },
      {
        icon: Package,
        label: 'Modular Packages',
        text: 'Install only what you need — UI, utilities, and an AI-powered Claude Code plugin',
      },
    ],
  },
  zh: {
    tagline: 'Unity 热更新框架 · AI 赋能',
    headline: ['线上热更，', '即时生效。'],
    description:
      '全平台运行时热更新——无需重新打包，即可推送代码、资源和逻辑。模块化包生态，集成 Claude Code AI 工作流。基于 HybridCLR，内置加密与混淆。',
    getStarted: '快速开始',
    viewOnGithub: '在 GitHub 查看',
    highlights: [
      {
        icon: Flame,
        label: '零代码热更新',
        text: '无需编写任何代码，配置即可获得热更新能力',
      },
      {
        icon: Zap,
        label: '原生 C# · HybridCLR',
        text: '完整 AOT 支持，零解释执行开销',
      },
      {
        icon: Shield,
        label: '安全开箱即用',
        text: '内置加密（XOR/AES/ChaCha20）与代码混淆',
      },
      {
        icon: Package,
        label: '模块化包体系',
        text: '按需安装——UI、工具类，还有 AI 驱动的 Claude Code 插件',
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const pageMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'JEngine - Unity Hot Update Framework',
    description: 'Ship game updates without shipping a build. JEngine enables runtime hot updates across all Unity platforms with built-in encryption, code obfuscation, and superior performance via HybridCLR. Modular packages with AI-ready tooling.',
  },
  zh: {
    title: 'JEngine - Unity 热更新框架',
    description: '无需重新打包即可推送游戏更新。JEngine 支持全 Unity 平台运行时热更新，内置加密、代码混淆，基于 HybridCLR 实现卓越运行时性能。模块化包体系，开箱支持 AI 辅助开发。',
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = pageMeta[lang] ?? pageMeta.en;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      languages: {
        en: '/en',
        zh: '/zh',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const t = translations[lang];

  return (
    <main className="flex flex-1 flex-col items-center">
      {/* Hero */}
      <section className="relative flex w-full flex-col items-center px-6 pt-10 pb-8 md:pt-16 md:pb-10">
        {/* Subtle gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_var(--tw-gradient-stops))] from-fd-primary/8 to-transparent" />

        <div className="flex max-w-3xl flex-col items-center text-center">
          {/* Badge */}
          <span className="mb-4 rounded-full border border-fd-border bg-fd-secondary/50 px-3 py-1 text-xs font-medium text-fd-muted-foreground">
            {t.tagline}
          </span>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {t.headline[0]}
            <br />
            <span className="bg-gradient-to-r from-fd-primary to-blue-400 bg-clip-text text-transparent">
              {t.headline[1]}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-3 max-w-xl text-base leading-relaxed text-fd-muted-foreground md:text-lg">
            {t.description}
          </p>

          {/* CTA */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/${lang}/docs/${defaultVersion}`}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
                'bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/90',
              )}
            >
              {t.getStarted}
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="https://github.com/JasonXuDeveloper/JEngine"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors',
                'hover:bg-fd-accent hover:text-fd-accent-foreground',
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t.viewOnGithub}
            </a>
          </div>
        </div>
      </section>

      {/* Highlights — 2x2 grid */}
      <section className="w-full border-t px-6 py-8">
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {t.highlights.map((h) => (
            <div key={h.label} className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0 rounded-md bg-fd-primary/10 p-2 text-fd-primary">
                <h.icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{h.label}</p>
                <p className="text-sm text-fd-muted-foreground">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
