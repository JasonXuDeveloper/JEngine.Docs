import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { DocumentRecord } from 'fumadocs-core/search/algolia';
import { getLLMText } from '../src/lib/get-llm-text';
import { source } from '../src/lib/source';

const BASE_URL = 'https://jengine.xgamedev.net';
const OUT_DIR = path.resolve('build/client');
const INDEXNOW_KEY = 'c5f06259d2f7f011aacc287c3f21fda4';
const locales = ['en', 'zh'] as const;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const records = generateSearchRecords();
  const sitemapUrls = generateSitemapUrls();

  await Promise.all([
    writeText('llms.txt', generateLLMSList('en')),
    writeText('llms-full.txt', await generateLLMSFull('en')),
    writeText('llms.zh.txt', generateLLMSList('zh')),
    writeText('llms-full.zh.txt', await generateLLMSFull('zh')),
    writeJSON('static.json', records),
    writeText('sitemap.xml', generateSitemap(sitemapUrls)),
    writeText('robots.txt', generateRobots()),
    writeJSON('manifest.webmanifest', generateManifest()),
    writeText(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY),
    writeMarkdownPages(),
  ]);
}

function generateSearchRecords(): DocumentRecord[] {
  const records: DocumentRecord[] = [];

  for (const locale of locales) {
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

  return records;
}

function generateSitemapUrls() {
  const urls = [
    { loc: `${BASE_URL}/en`, priority: '1.0' },
    { loc: `${BASE_URL}/zh`, priority: '1.0' },
  ];

  for (const locale of locales) {
    for (const page of source.getPages(locale)) {
      urls.push({
        loc: `${BASE_URL}${page.url}`,
        priority: page.slugs[0] === 'v1.1' ? '0.8' : '0.5',
      });
    }
  }

  return urls;
}

function generateLLMSList(locale: (typeof locales)[number]) {
  const pages = source.getPages(locale);
  const grouped: Record<string, typeof pages> = {};

  for (const page of pages) {
    const version = page.slugs[0] ?? 'other';
    grouped[version] ??= [];
    grouped[version].push(page);
  }

  const lines = [
    '# JEngine Documentation',
    '',
    '> JEngine is a Unity hot update framework that enables runtime code and asset updates',
    '> across all Unity-supported platforms including mobile, PC, console, and minigames.',
    '> It supports zero-code hot update configuration, built-in encryption (XOR/AES/ChaCha20),',
    '> code obfuscation, and native C# execution via HybridCLR with superior runtime performance.',
    '',
  ];

  const versions = Object.keys(grouped).sort((a, b) => {
    if (a === 'v1.1') return -1;
    if (b === 'v1.1') return 1;
    if (a === 'v1.0') return -1;
    if (b === 'v1.0') return 1;
    return b.localeCompare(a);
  });

  for (const version of versions) {
    lines.push(`## ${version}`);
    lines.push('');

    for (const page of grouped[version]) {
      const desc = page.data.description ? `: ${page.data.description}` : '';
      lines.push(`- [${page.data.title}](${BASE_URL}${page.url})${desc}`);
    }

    lines.push('');
  }

  lines.push('## Full Content');
  lines.push('');
  lines.push(
    `For complete documentation in a single file, visit ${BASE_URL}/${locale === 'zh' ? 'llms-full.zh.txt' : 'llms-full.txt'}`,
  );

  return lines.join('\n');
}

async function generateLLMSFull(locale: string) {
  const scanned = await Promise.all(source.getPages(locale).map(getLLMText));
  return scanned.join('\n\n---\n\n');
}

async function writeMarkdownPages() {
  await Promise.all(
    locales.flatMap((locale) =>
      source.getPages(locale).map(async (page) => {
        await writeText(`${page.url.slice(1)}.mdx`, await getLLMText(page));
      }),
    ),
  );
}

function generateSitemap(urls: Array<{ loc: string; priority: string }>) {
  const now = new Date().toISOString();
  const entries = urls
    .map(
      ({ loc, priority }) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${priority === '1.0' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function generateRobots() {
  return `User-agent: *
Allow: /

User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
}

function generateManifest() {
  return {
    name: 'JEngine Documentation',
    short_name: 'JEngine',
    description: 'Unity hot update framework documentation',
    start_url: '/en',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/logo.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

async function writeJSON(filePath: string, data: unknown) {
  await writeText(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function writeText(filePath: string, content: string) {
  const absolutePath = path.join(OUT_DIR, filePath);
  await fs.mkdir(path.dirname(absolutePath), { recursive: true });
  await fs.writeFile(absolutePath, content);
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
