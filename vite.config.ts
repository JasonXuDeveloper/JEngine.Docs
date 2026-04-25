import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';
import * as MdxConfig from './source.config';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [mdx(MdxConfig), tailwindcss(), reactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
      '@app': path.resolve(root, 'app'),
      collections: path.resolve(root, '.source'),
    },
    tsconfigPaths: true,
  },
});
