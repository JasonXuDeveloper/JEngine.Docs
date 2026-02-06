import { createMDX } from 'fumadocs-mdx/next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Allow AI agents to get markdown by appending .mdx to any docs URL
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/en/docs/:path*',
      },
      // Locale-prefixed paths — map lang to [lang] dynamic segment
      {
        source: '/:lang/docs/:path*.mdx',
        destination: '/llms.mdx/:lang/docs/:path*',
      },
    ];
  },
};

export default withMDX(config);

initOpenNextCloudflareForDev();
