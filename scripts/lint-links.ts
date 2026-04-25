import { source } from '../src/lib/source';

type Page = ReturnType<typeof source.getPages>[number];

async function checkLinks() {
  const pages = source.getPages();
  const pageByUrl = new Map(pages.map((page) => [page.url, page]));
  const errors: string[] = [];

  for (const page of pages) {
    const content = await page.data.getText('raw');
    const links = getMarkdownLinks(content);

    for (const link of links) {
      if (shouldSkip(link)) continue;

      const [pathname, hash] = link.split('#');
      const resolved = resolveUrl(page, pathname);
      const targetPage = pageByUrl.get(resolved);

      if (!targetPage) {
        errors.push(`${page.path}: broken link ${link}`);
        continue;
      }

      if (hash && !getHeadings(targetPage).includes(hash)) {
        errors.push(`${page.path}: missing heading #${hash} in ${link}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exit(1);
  }
}

function getMarkdownLinks(content: string): string[] {
  const links: string[] = [];
  const markdownLinks = content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);
  const mdxHrefLinks = content.matchAll(/href=["']([^"']+)["']/g);

  for (const match of markdownLinks) links.push(match[1]);
  for (const match of mdxHrefLinks) links.push(match[1]);

  return links;
}

function shouldSkip(link: string) {
  return (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('mailto:') ||
    link.startsWith('#') ||
    link.startsWith('/images/') ||
    link.startsWith('/api/')
  );
}

function resolveUrl(page: Page, link: string) {
  if (link.startsWith('/')) return normalizeUrl(link);

  const baseUrl = isIndexPage(page) ? `${page.url}/` : page.url;
  return normalizeUrl(new URL(link, `https://docs.local${baseUrl}`).pathname);
}

function isIndexPage(page: Page) {
  return /(?:^|\/)index(?:\.zh)?\.mdx$/.test(page.path);
}

function normalizeUrl(url: string) {
  return decodeURI(url)
    .replace(/\.(md|mdx)$/i, '')
    .replace(/\/index$/, '')
    .replace(/\/$/, '');
}

function getHeadings(page: Page): string[] {
  const toc = page.data.toc as Array<{ url: string }> | undefined;
  return toc?.map((item) => decodeURI(item.url.slice(1))) ?? [];
}

void checkLinks();
