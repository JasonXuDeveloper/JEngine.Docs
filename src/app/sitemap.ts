import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

const BASE_URL = 'https://jengine.xgamedev.net';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/en`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/zh`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
  ];

  for (const locale of ['en', 'zh'] as const) {
    const pages = source.getPages(locale);
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}${page.url}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page.slugs[0] === 'v1.0' ? 0.8 : 0.5,
      });
    }
  }

  return entries;
}
