import { type FileObject, printErrors, scanURLs, validateFiles } from 'next-validate-link';
import { source } from '../src/lib/source';

type Page = ReturnType<typeof source.getPages>[number];

async function checkLinks() {
  const pages = source.getPages();

  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      'docs/[[...slug]]': pages.map((page) => {
        return {
          value: {
            slug: page.slugs,
          },
          hashes: getHeadings(page),
        };
      }),
    },
  });

  printErrors(
    await validateFiles(await getFiles(), {
      scanned,
      markdown: {
        components: {
          Card: { attributes: ['href'] },
          Cards: { attributes: ['href'] },
        },
      },
      checkRelativePaths: 'as-url',
    }),
    true,
  );
}

function getHeadings(page: Page): string[] {
  // @ts-expect-error - toc property exists at runtime
  const toc = page.data.toc as Array<{ url: string }>;
  return toc?.map((item) => item.url.slice(1)) ?? [];
}

async function getFiles() {
  const pages = source.getPages();
  const promises = pages.map(
    async (page): Promise<FileObject> => ({
      path: page.absolutePath,
      content: await page.data.getText('raw'),
      url: page.url,
      data: page.data,
    }),
  );

  return Promise.all(promises);
}

void checkLinks();
