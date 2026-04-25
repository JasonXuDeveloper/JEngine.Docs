import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';
import * as MdxConfig from './source.config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [mdx(MdxConfig)],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@app': path.resolve(root, 'app'),
      collections: path.resolve(root, '.source'),
    },
    tsconfigPaths: true,
  },
});
