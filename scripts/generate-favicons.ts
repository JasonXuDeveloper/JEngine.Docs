/**
 * Generate all favicon variants from public/logo.png using sharp.
 *
 * Usage: bun run scripts/generate-favicons.ts
 */
import sharp from 'sharp';
import ico from 'sharp-ico';
import path from 'node:path';
import { writeFile } from 'node:fs/promises';

const SOURCE = path.resolve(import.meta.dirname, '../public/logo.png');
const OUTPUT = path.resolve(import.meta.dirname, '../public');

const PNG_VARIANTS = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

const ICO_SIZES = [16, 32, 48];

async function main() {
  console.log('Generating favicons from:', SOURCE);

  // Generate PNG variants
  await Promise.all(
    PNG_VARIANTS.map(async ({ name, size }) => {
      await sharp(SOURCE)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUTPUT, name));
      console.log(`  ${name} (${size}x${size})`);
    }),
  );

  // Generate favicon.ico with multiple sizes
  const buffers = await Promise.all(
    ICO_SIZES.map((size) =>
      sharp(SOURCE)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  );
  await writeFile(path.join(OUTPUT, 'favicon.ico'), ico.encode(buffers));
  console.log(`  favicon.ico (${ICO_SIZES.join('+')})`);

  console.log('Done.');
}

main().catch(console.error);
