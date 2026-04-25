import type { InferPageType } from 'fumadocs-core/source';
import type { source } from './source';

// Extended page data type with getText method
interface ExtendedPageData {
  getText: (type: 'raw' | 'processed') => Promise<string>;
  title: string;
}

export async function getLLMText(
  page: InferPageType<typeof source>,
): Promise<string> {
  const data = page.data as unknown as ExtendedPageData;
  let text: string;

  try {
    text = await data.getText('processed');
  } catch {
    text = await data.getText('raw');
  }

  return `# ${data.title} (${page.url})\n\n${text}`;
}
