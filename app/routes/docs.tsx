import browserCollections from 'collections/browser';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps, FC } from 'react';
import { redirect } from 'react-router';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { handlePageFeedback } from '@/components/feedback/actions';
import { Feedback } from '@/components/feedback/client';
import type { Locale } from '@/lib/i18n';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import {
  defaultVersion,
  getVersionsForLocale,
  type Version,
} from '@/lib/versions';
import { getMDXComponents } from '@/mdx-components';
import type { Route } from './+types/docs';

interface ExtendedPageData {
  default: FC<{ components: MDXComponents }>;
  toc: Array<{ title: string; url: string; depth: number }>;
  title: string;
  description?: string;
  full?: boolean;
}

interface ContentProps {
  lang: Locale;
  path: string;
  pageUrl: string;
  markdownUrl: string;
  githubUrl: string;
}

function getLocale(lang?: string): Locale {
  return lang === 'zh' ? 'zh' : 'en';
}

function getVersionTree(
  fullTree: ReturnType<typeof source.getPageTree>,
  version: string,
) {
  const versionFolder = fullTree.children.find(
    (child) =>
      child.type === 'folder' &&
      typeof child.name === 'string' &&
      child.name.toLowerCase() === version.toLowerCase(),
  );

  if (versionFolder?.type === 'folder') {
    return {
      ...fullTree,
      children: versionFolder.children,
    };
  }

  return fullTree;
}

function getTabs(lang: Locale, availableVersions: readonly Version[]) {
  const descriptions: Record<Locale, Record<string, string>> = {
    en: {
      'v1.1': 'Latest — AI workflow + UI system',
      'v1.0': 'Stable with HybridCLR',
      pro: 'Legacy Pro version',
      _default: 'Legacy version',
    },
    zh: {
      'v1.1': '最新版 — AI 工作流 + UI 系统',
      'v1.0': '基于 HybridCLR 的稳定版本',
      pro: 'Pro 旧版本',
      _default: '旧版本',
    },
  };
  const desc = descriptions[lang];

  return availableVersions.map((version) => ({
    title: version === 'pro' ? 'Pro' : version,
    description: desc[version] ?? desc._default,
    url: `/${lang}/docs/${version}`,
  }));
}

function createClientRelativeLink(pageUrl: string): FC<ComponentProps<'a'>> {
  return function RelativeLink({ href, ...props }) {
    let resolved = href;

    if (href?.startsWith('./') || href?.startsWith('../')) {
      resolved = new URL(href, `https://docs.local${pageUrl}/`).pathname;
    }

    return <a href={resolved} {...props} />;
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  const lang = getLocale(params.lang);
  const version = params.version;
  const availableVersions = getVersionsForLocale(lang);

  if (!availableVersions.includes(version as Version)) {
    throw redirect(`/${lang}/docs/${defaultVersion}`);
  }

  const rest = params['*']?.split('/').filter(Boolean) ?? [];
  const fullSlug = rest.length > 0 ? [version, ...rest] : [version];
  const page = source.getPage(fullSlug, lang);
  if (!page) throw new Response('Not found', { status: 404 });

  const versionTree = getVersionTree(source.getPageTree(lang), version);

  return {
    lang,
    path: page.path,
    pageUrl: page.url,
    markdownUrl: `${page.url}.mdx`,
    githubUrl: `https://github.com/JasonXuDeveloper/JEngine.Docs/blob/main/content/docs/${page.path}`,
    pageTree: await source.serializePageTree(versionTree),
    tabs: getTabs(lang, availableVersions),
  };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) return [];

  return [
    { title: data.pageUrl },
    { property: 'og:locale', content: data.lang === 'zh' ? 'zh_CN' : 'en_US' },
    {
      rel: 'alternate',
      hrefLang: 'en',
      href: data.pageUrl.replace(/^\/zh\//, '/en/'),
    },
    {
      rel: 'alternate',
      hrefLang: 'zh',
      href: data.pageUrl.replace(/^\/en\//, '/zh/'),
    },
    {
      rel: 'alternate',
      hrefLang: 'x-default',
      href: data.pageUrl.replace(/^\/zh\//, '/en/'),
    },
  ];
}

const clientLoader = browserCollections.docs.createClientLoader<ContentProps>({
  component(loaded, props) {
    const data = loaded as unknown as ExtendedPageData;
    const MDX = data.default;

    return (
      <DocsPage toc={data.toc} full={data.full}>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <DocsTitle>{data.title}</DocsTitle>
        <DocsDescription className="mb-0">{data.description}</DocsDescription>
        <div className="flex flex-row gap-2 items-center border-b pt-2 pb-4 mb-4">
          <LLMCopyButton markdownUrl={props.markdownUrl} locale={props.lang} />
          <ViewOptions
            markdownUrl={props.markdownUrl}
            githubUrl={props.githubUrl}
            locale={props.lang}
          />
        </div>
        <DocsBody>
          <MDX
            components={getMDXComponents({
              a: createClientRelativeLink(props.pageUrl),
            })}
          />
        </DocsBody>
        <Feedback onSendAction={handlePageFeedback} />
      </DocsPage>
    );
  },
});

export default function DocsRoute({ loaderData }: Route.ComponentProps) {
  const { pageTree, path, tabs, lang, ...contentProps } =
    useFumadocsLoader(loaderData);

  return (
    <DocsLayout
      tree={pageTree}
      {...baseOptions(lang)}
      sidebar={{
        tabs,
      }}
    >
      {clientLoader.useContent(path, {
        lang,
        path,
        ...contentProps,
      })}
    </DocsLayout>
  );
}
