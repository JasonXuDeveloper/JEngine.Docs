import { source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { Locale } from '@/lib/i18n';
import type { FC } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Feedback } from '@/components/feedback/client';
import { handlePageFeedback } from '@/app/actions';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';

interface PageParams {
  lang: Locale;
  version: string;
  slug?: string[];
}

// Extended page data type with MDX body
interface ExtendedPageData {
  body: FC<{ components: MDXComponents }>;
  toc: Array<{ title: string; url: string; depth: number }>;
  title: string;
  description?: string;
  full?: boolean;
}

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { lang, version, slug } = await params;

  // Combine version and slug for the full path
  const fullSlug = slug ? [version, ...slug] : [version];
  const page = source.getPage(fullSlug, lang);
  if (!page) notFound();

  // Cast page.data to extended type that includes body
  const data = page.data as unknown as ExtendedPageData;
  const MDX = data.body;

  // Construct URLs for page actions
  const markdownUrl = `${page.url}.mdx`;
  const githubUrl = `https://github.com/JasonXuDeveloper/JEngine.Docs/blob/main/content/docs/${fullSlug.join('/')}${lang === 'zh' ? '.zh' : ''}.mdx`;

  return (
    <DocsPage toc={data.toc} full={data.full}>
      <DocsTitle>{data.title}</DocsTitle>
      <DocsDescription className="mb-0">{data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-4 mb-4">
        <LLMCopyButton markdownUrl={markdownUrl} locale={lang} />
        <ViewOptions markdownUrl={markdownUrl} githubUrl={githubUrl} locale={lang} />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <Feedback onSendAction={handlePageFeedback} />
    </DocsPage>
  );
}

export function generateStaticParams() {
  // Generate params with version extracted
  const allParams = source.generateParams();
  return allParams.map((param) => {
    const [version, ...rest] = param.slug;
    return {
      ...param,
      version,
      slug: rest.length > 0 ? rest : undefined,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { lang, version, slug } = await params;

  const fullSlug = slug ? [version, ...slug] : [version];
  const page = source.getPage(fullSlug, lang);
  if (!page) notFound();

  const data = page.data as unknown as ExtendedPageData;

  const pathWithoutLang = slug ? `/docs/${version}/${slug.join('/')}` : `/docs/${version}`;

  return {
    title: data.title,
    description: data.description,
    alternates: {
      languages: {
        en: `/en${pathWithoutLang}`,
        zh: `/zh${pathWithoutLang}`,
      },
    },
  };
}
