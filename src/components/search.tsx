'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { liteClient, type LiteClient } from 'algoliasearch/lite';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import type { SortedResult } from 'fumadocs-core/search';

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME;

const client: LiteClient | null =
  appId && apiKey ? liteClient(appId, apiKey) : null;

interface AlgoliaHit {
  objectID: string;
  title: string;
  url: string;
  content?: string;
  section?: string;
  section_id?: string;
  page_id: string;
  tag?: string;
  breadcrumbs?: string[];
  _highlightResult?: Record<
    string,
    { value: string; matchLevel: string; matchedWords: string[] }
  >;
}

function groupHits(hits: AlgoliaHit[]): SortedResult[] {
  const results: SortedResult[] = [];
  const seenPages = new Set<string>();

  for (const hit of hits) {
    // Add page header once per unique URL
    if (!seenPages.has(hit.url)) {
      seenPages.add(hit.url);
      results.push({
        id: hit.url,
        type: 'page',
        url: hit.url,
        content: hit.title,
        breadcrumbs: hit.breadcrumbs,
      });
    }

    // Add section-level result
    if (hit.content) {
      const isHeading = hit.content === hit.section;
      results.push({
        id: hit.objectID,
        type: isHeading ? 'heading' : 'text',
        url: hit.section_id ? `${hit.url}#${hit.section_id}` : hit.url,
        content: hit.content,
      });
    }
  }

  return results;
}

function getTagFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/(en|zh)\/docs\/(v\d+\.\d+|pro)/);
  if (match) return `${match[2]}-${match[1]}`;

  const localeMatch = pathname.match(/^\/(en|zh)\//);
  if (localeMatch) return undefined;

  return undefined;
}

const VERSIONS = ['v1.0', 'v0.8', 'v0.7', 'v0.6', 'v0.5', 'pro'] as const;
const LOCALES = ['en', 'zh'] as const;

function AlgoliaSearchDialog(props: SharedProps) {
  const pathname = usePathname();
  const autoTag = useMemo(() => getTagFromPath(pathname), [pathname]);
  const [manualTag, setManualTag] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SortedResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const tag = manualTag ?? autoTag;

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (search.trim().length === 0) {
      setResults(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await client!.searchForHits<AlgoliaHit>({
          requests: [
            {
              type: 'default',
              indexName: indexName!,
              query: search,
              distinct: 5,
              hitsPerPage: 20,
              filters: tag ? `tag:${tag}` : undefined,
              attributesToRetrieve: [
                'title',
                'url',
                'content',
                'section',
                'section_id',
                'page_id',
                'breadcrumbs',
              ],
              attributesToHighlight: ['content'],
            },
          ],
        });
        const hits = response.results[0].hits as AlgoliaHit[];
        setResults(groupHits(hits));
      } catch {
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, tag]);

  const tagOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    for (const version of VERSIONS) {
      for (const locale of LOCALES) {
        if (version === 'pro' && locale === 'en') continue;
        if (locale === 'en' && version !== 'v1.0' && version !== 'pro')
          continue;

        const localeLabel = locale === 'en' ? 'English' : '中文';
        const versionLabel = version === 'pro' ? 'Pro' : version;
        options.push({
          value: `${version}-${locale}`,
          label: `${versionLabel} (${localeLabel})`,
        });
      }
    }
    return options;
  }, []);

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={results} />
        <SearchDialogFooter>
          <TagsList tag={tag} onTagChange={setManualTag} allowClear>
            {tagOptions.map((option) => (
              <TagsListItem key={option.value} value={option.value}>
                {option.label}
              </TagsListItem>
            ))}
          </TagsList>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialog>
  );
}

function FallbackSearchDialog(props: SharedProps) {
  return (
    <SearchDialog
      search=""
      onSearchChange={() => {}}
      isLoading={false}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <div className="p-4 text-center text-fd-muted-foreground text-sm">
          Search is not configured. Set Algolia environment variables to enable
          search.
        </div>
      </SearchDialogContent>
    </SearchDialog>
  );
}

export default function CustomSearchDialog(props: SharedProps) {
  if (!client || !indexName) {
    return <FallbackSearchDialog {...props} />;
  }
  return <AlgoliaSearchDialog {...props} />;
}
