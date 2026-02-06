import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow all standard and AI search crawlers
      { userAgent: '*', allow: '/' },
      // Block AI training crawlers (keep search/user crawlers allowed above)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'meta-externalagent', disallow: '/' },
    ],
    sitemap: 'https://jengine.xgamedev.net/sitemap.xml',
  };
}
