/**
 * Compress all images in public/images/ using sharp.
 *
 * Usage: bun run scripts/optimize-images.ts
 */
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const IMAGES_DIR = path.resolve(import.meta.dirname, '../public/images');

const FORMAT_OPTIONS: Record<string, (p: sharp.Sharp) => sharp.Sharp> = {
  '.jpg': (p) => p.jpeg({ quality: 80, mozjpeg: true }),
  '.jpeg': (p) => p.jpeg({ quality: 80, mozjpeg: true }),
  '.png': (p) => p.png({ compressionLevel: 9 }),
  '.webp': (p) => p.webp({ quality: 80 }),
};

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function main() {
  // Check if directory exists
  try {
    await fs.access(IMAGES_DIR);
  } catch {
    console.log('No public/images/ directory found, skipping.');
    return;
  }

  const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true, recursive: true });
  const images = entries.filter((e) => {
    if (!e.isFile()) return false;
    const ext = path.extname(e.name).toLowerCase();
    return ext in FORMAT_OPTIONS;
  });

  if (images.length === 0) {
    console.log('No images to optimize.');
    return;
  }

  console.log(`Optimizing ${images.length} image(s) in public/images/...`);
  let totalSaved = 0;

  for (const entry of images) {
    const fullPath = path.join(entry.parentPath ?? (entry as unknown as { path: string }).path, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    const originalSize = (await fs.stat(fullPath)).size;

    const pipeline = FORMAT_OPTIONS[ext](sharp(fullPath));
    const tempPath = `${fullPath}.tmp`;
    await pipeline.toFile(tempPath);

    const newSize = (await fs.stat(tempPath)).size;
    if (newSize < originalSize) {
      await fs.rename(tempPath, fullPath);
      const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
      const rel = path.relative(IMAGES_DIR, fullPath);
      console.log(`  ${rel}: ${formatBytes(originalSize)} -> ${formatBytes(newSize)} (-${savings}%)`);
      totalSaved += originalSize - newSize;
    } else {
      await fs.unlink(tempPath);
    }
  }

  console.log(`Done. Saved ${formatBytes(totalSaved)} total.`);
}

main().catch(console.error);
