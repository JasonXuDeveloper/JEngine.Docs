/**
 * Submit all sitemap URLs to IndexNow (Bing, Yandex, etc.)
 * Run after deploy: bun run scripts/submit-indexnow.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const SITE_URL = 'https://jengine.xgamedev.net';
const INDEXNOW_KEY = 'c5f06259d2f7f011aacc287c3f21fda4';

async function main() {
  // Read sitemap from build output
  const sitemapPath = path.resolve('.next/server/app/sitemap.xml.body');
  if (!fs.existsSync(sitemapPath)) {
    console.log('No sitemap build output found, skipping IndexNow submission.');
    return;
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  if (urls.length === 0) {
    console.log('No URLs found in sitemap.');
    return;
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      host: 'jengine.xgamedev.net',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (res.ok || res.status === 202) {
    console.log(`IndexNow: submitted ${urls.length} URLs (status ${res.status})`);
  } else {
    console.error(`IndexNow error: ${res.status} ${await res.text()}`);
  }
}

main().catch(console.error);
