'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SearchDialog = dynamic(() => import('@/components/search'), {
  ssr: false,
});

// Chinese translations for fumadocs UI
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

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  locales: Array<{ locale: string; name: string }>;
}

export function Providers({ children, locale, locales }: ProvidersProps) {
  return (
    <RootProvider
      i18n={{
        locale,
        locales,
        translations: locale === 'zh' ? zhTranslations : undefined,
      }}
      search={{
        SearchDialog,
      }}
    >
      {children}
    </RootProvider>
  );
}
