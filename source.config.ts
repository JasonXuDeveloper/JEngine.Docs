import path from 'node:path';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
import { remarkFeedbackBlock } from 'fumadocs-core/mdx-plugins/remark-feedback-block';

// Single docs collection for all versions
// Structure: content/docs/{version}/guide/*.mdx
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [
      // Disable external image fetching; resolve /images/* from public/
      [remarkImage, { external: false, publicDir: path.join(process.cwd(), 'public') }],
      // Enable block-level feedback (hover + highlight)
      remarkFeedbackBlock,
    ],
  },
});
