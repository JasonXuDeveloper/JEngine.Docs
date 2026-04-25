import { notFound } from 'next/navigation';
import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string; slug?: string[] }> },
) {
  const { lang, slug } = await params;
  const normalizedSlug = slug?.at(-1) === 'index' ? slug.slice(0, -1) : slug;
  const page = source.getPage(normalizedSlug, lang);

  if (!page) notFound();

  const content = await getLLMText(page);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
