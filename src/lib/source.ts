import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18nSourceConfig } from './i18n';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  // baseUrl with i18n - Fumadocs adds the locale automatically
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  i18n: i18nSourceConfig,
  plugins: [lucideIconsPlugin()],
});

export type Source = typeof source;

export function getPageImage(page: InferPageType<Source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}
