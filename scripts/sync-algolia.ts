/**
 * Sync search index to Algolia.
 *
 * Reads pre-built search records from build/client/static.json.
 *
 * Usage:
 *   bun run build && bun run search:sync
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import { algoliasearch } from 'algoliasearch';
import { type DocumentRecord, sync } from 'fumadocs-core/search/algolia';

const appId =
  process.env.VITE_ALGOLIA_APP_ID ?? process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY;
const indexName =
  process.env.VITE_ALGOLIA_INDEX_NAME ??
  process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

if (!appId || !adminKey || !indexName) {
  console.error(
    'Missing env vars. Required: VITE_ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY, VITE_ALGOLIA_INDEX_NAME',
  );
  process.exit(1);
}

const filePath = path.resolve('build/client/static.json');

if (!fs.existsSync(filePath)) {
  console.error(
    `Build output not found at ${filePath}. Run "bun run build" first.`,
  );
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf-8');
const documents: DocumentRecord[] = JSON.parse(content);

// Filter out records with missing structured data
const valid = documents.filter((d) => d.structured);
const skipped = documents.length - valid.length;

console.log(
  `Syncing ${valid.length} documents to Algolia index "${indexName}"...`,
);
if (skipped > 0) {
  console.log(`  (skipped ${skipped} pages without structured data)`);
}

// Log tag distribution
const tagCounts: Record<string, number> = {};
for (const doc of valid) {
  const t = doc.tag ?? 'untagged';
  tagCounts[t] = (tagCounts[t] ?? 0) + 1;
}
for (const [tag, count] of Object.entries(tagCounts).sort()) {
  console.log(`  ${tag}: ${count} pages`);
}

const client = algoliasearch(appId, adminKey);
await sync(client, { indexName, documents: valid });

console.log('Done.');
