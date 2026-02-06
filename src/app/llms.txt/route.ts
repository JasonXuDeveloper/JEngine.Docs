import { source } from '@/lib/source';

export const revalidate = false;

const BASE_URL = 'https://jengine.xgamedev.net';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get('lang') as 'en' | 'zh') || 'en';
  const pages = source.getPages(lang);

  // Group pages by version (first slug segment)
  const grouped: Record<string, typeof pages> = {};
  for (const page of pages) {
    const version = page.slugs[0] ?? 'other';
    (grouped[version] ??= []).push(page);
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

  // Output v1.0 first, then rest sorted
  const versions = Object.keys(grouped).sort((a, b) => {
    if (a === 'v1.0') return -1;
    if (b === 'v1.0') return 1;
    return b.localeCompare(a);
  });

  for (const version of versions) {
    const versionPages = grouped[version];
    lines.push(`## ${version}`);
    lines.push('');
    for (const page of versionPages) {
      const desc = page.data.description ? `: ${page.data.description}` : '';
      lines.push(`- [${page.data.title}](${BASE_URL}${page.url})${desc}`);
    }
    lines.push('');
  }

  lines.push('## Full Content');
  lines.push('');
  lines.push(`For complete documentation in a single file, visit ${BASE_URL}/llms-full.txt`);

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
