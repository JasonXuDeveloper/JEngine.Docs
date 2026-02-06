import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n';
import { getVersionsForLocale, defaultVersion } from '@/lib/versions';
import { redirect } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: Locale; version: string }>;
}

// Get the page tree for a specific version only
function getVersionTree(fullTree: ReturnType<typeof source.getPageTree>, version: string) {
  // Find the version folder in the tree
  const versionFolder = fullTree.children.find(
    (child) => child.type === 'folder' && typeof child.name === 'string' && child.name.toLowerCase() === version.toLowerCase()
  );

  if (versionFolder && versionFolder.type === 'folder') {
    // Return a new tree with only this version's content
    return {
      ...fullTree,
      children: versionFolder.children,
    };
  }

  return fullTree;
}

export default async function Layout({ children, params }: LayoutProps) {
  const { lang, version } = await params;
  const availableVersions = getVersionsForLocale(lang);

  // Redirect to default version if accessing a version not available for this locale
  if (!availableVersions.includes(version as any)) {
    redirect(`/${lang}/docs/${defaultVersion}`);
  }

  // Get full tree and filter to current version
  const fullTree = source.getPageTree(lang);
  const versionTree = getVersionTree(fullTree, version);

  // Create sidebar tabs filtered by locale
  const tabs = availableVersions.map((v) => ({
    title: v === 'pro' ? 'Pro' : v,
    description:
      v === 'v1.0'
        ? 'Latest version with HybridCLR'
        : v === 'pro'
          ? 'JEngine Pro features'
          : 'Legacy version',
    url: `/${lang}/docs/${v}`,
  }));

  return (
    <DocsLayout
      tree={versionTree}
      {...baseOptions(lang)}
      sidebar={{
        tabs,
      }}
    >
      {children}
    </DocsLayout>
  );
}
