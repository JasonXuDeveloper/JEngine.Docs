import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang } = await params;

  return <HomeLayout {...baseOptions(lang)}>{children}</HomeLayout>;
}
