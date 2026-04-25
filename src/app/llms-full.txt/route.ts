import { getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = url.searchParams.get('lang') || undefined;
  const pages = source.getPages(lang);
  const scanned = await Promise.all(pages.map(getLLMText));

  return new Response(scanned.join('\n\n---\n\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
