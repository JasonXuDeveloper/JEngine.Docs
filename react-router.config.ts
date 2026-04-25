import { glob } from 'node:fs/promises';
import type { Config } from '@react-router/dev/config';

function getDocPath(entry: string) {
  const parts = entry.split('/');
  const file = parts.pop();
  if (!file) return null;

  const locale = file.endsWith('.zh.mdx') ? 'zh' : 'en';
  const stem = file.replace(/\.zh\.mdx$/, '').replace(/\.mdx$/, '');
  const slug = stem === 'index' ? parts : [...parts, stem];

  return `/${locale}/docs/${slug.join('/')}`;
}

export default {
  ssr: false,
  future: {
    v8_middleware: true,
  },
  async prerender({ getStaticPaths }) {
    const paths = new Set<string>(['/', '/en', '/zh', ...getStaticPaths()]);

    for await (const entry of glob('**/*.mdx', { cwd: 'content/docs' })) {
      const path = getDocPath(entry);
      if (path) paths.add(path);
    }

    return [...paths];
  },
} satisfies Config;
