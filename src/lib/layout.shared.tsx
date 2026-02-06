import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { Locale } from './i18n';
import { defaultVersion } from './versions';
import Image from 'next/image';
import { BookOpen, MessageCircle } from 'lucide-react';

export function baseOptions(lang: Locale = 'en'): BaseLayoutProps {
  const links: BaseLayoutProps['links'] = [
    {
      type: 'main',
      text: lang === 'zh' ? '文档' : 'Docs',
      url: `/${lang}/docs/${defaultVersion}`,
      icon: <BookOpen />,
      active: 'nested-url',
      on: 'nav',
    },
    // Chinese-only communication dropdown
    ...(lang === 'zh'
      ? [
          {
            type: 'menu' as const,
            text: '交流',
            icon: <MessageCircle />,
            on: 'nav' as const,
            items: [
              {
                type: 'main' as const,
                text: 'QQ 群：921271552',
                url: 'https://jq.qq.com/?_wv=1027&k=cF4hODjW',
                description: 'JEngine 官方 QQ 交流群',
                external: true,
              },
            ],
          },
        ]
      : []),
  ];

  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="JEngine" width={24} height={24} className="rounded-lg" />
          <span className="font-semibold">JEngine</span>
        </div>
      ),
      url: `/${lang}`,
    },
    links,
    i18n: true,
    githubUrl: 'https://github.com/JasonXuDeveloper/JEngine',
  };
}
