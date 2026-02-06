import { source } from '@/lib/source';
import type { DocumentRecord } from 'fumadocs-core/search/algolia';
import { NextResponse } from 'next/server';

// Pre-render at build time
export const revalidate = false;

export function GET() {
  const records: DocumentRecord[] = [];

  for (const locale of ['en', 'zh'] as const) {
    for (const page of source.getPages(locale)) {
      const version = page.slugs[0];
      if (!version) continue;

      records.push({
        _id: `${locale}:${page.url}`,
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        structured: page.data.structuredData,
        tag: `${version}-${locale}`,
      });
    }
  }

  return NextResponse.json(records);
}
