# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation website for JEngine, a Unity framework that enables runtime hot updates for Unity games. Built with **Fumadocs** (Next.js) and **Bun**. Hosted on **Cloudflare** (Pages or Workers).

## Quick Reference

| Task | Guide |
|------|-------|
| Updating for new release | [Release Update Guide](.claude/release-update-guide.md) |
| Finding source code | [JEngine Source Reference](.claude/jengine-source-reference.md) |
| Writing documentation | [Documentation Guidelines](.claude/documentation-guidelines.md) |

## Development Commands

```bash
bun install          # Install dependencies
bun run dev          # Run development server
bun run build        # Build for production (Next.js)
```

## Repository Structure

```
/
├── content/docs/            # All documentation content
│   ├── v1.0/                # Version 1.0 (active, default)
│   │   ├── meta.json        # English sidebar config
│   │   ├── meta.zh.json     # Chinese sidebar config
│   │   ├── *.mdx            # English doc pages
│   │   └── *.zh.mdx         # Chinese doc pages
│   ├── v0.8/, v0.7/, v0.6/, v0.5/  # Legacy versions (Chinese only)
│   └── pro/                 # Pro version docs (Chinese only)
├── public/                  # Static assets (images, logo)
│   └── images/              # Downloaded legacy doc images
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── [lang]/          # Locale-prefixed routes
│   │   │   ├── (home)/      # Home page layout
│   │   │   └── docs/[version]/  # Docs layout with version
│   │   ├── llms.mdx/        # LLM markdown endpoint
│   │   ├── llms.txt/        # LLM page listing
│   │   └── llms-full.txt/   # Full LLM content
│   ├── components/          # React components
│   │   └── ai/              # AI/LLM page actions (Copy Markdown, etc.)
│   └── lib/                 # Shared utilities
│       ├── source.ts        # Fumadocs source loader
│       ├── i18n.ts          # i18n config (en, zh)
│       └── layout.shared.tsx # Shared layout config (nav, logo)
├── source.config.ts         # Fumadocs MDX config (remarkImage, plugins)
├── next.config.mjs          # Next.js config (rewrites for .mdx URLs)
└── package.json
```

## Key Architecture

- **Framework**: Fumadocs (Next.js App Router, Turbopack)
- **Package Manager**: Bun
- **MDX Processing**: fumadocs-mdx with remarkImage plugin
- **i18n**: Fumadocs built-in i18n with dot notation (`page.mdx` = English, `page.zh.mdx` = Chinese)
- **Multi-version**: Version directories under `content/docs/` — controlled by source loader
- **Hosting**: Cloudflare (Pages or Workers)

## Content Conventions

### File Naming

- English: `feature-name.mdx`
- Chinese: `feature-name.zh.mdx`
- Always provide both for v1.0+ docs
- Legacy versions (v0.5–v0.8, pro) are Chinese-only with a minimal English index

### Sidebar Configuration

Each version has `meta.json` (English) and `meta.zh.json` (Chinese) at its root:

```json
{
  "title": "v1.0",
  "pages": [
    "index",
    "---Section Title---",
    "page-slug",
    "another-page"
  ]
}
```

Use `---Section Title---` for sidebar section separators.

### Frontmatter

```yaml
---
title: Page Title
description: Brief description
icon: LucideIconName     # Optional, from lucide-react
---
```

### MDX Components Available

- `<Callout type="info|warn|error" title="...">` — Callout boxes
- `<Cards>` / `<Card title="" href="" description="">` — Card grid
- `<Tabs items={[...]}>` / `<Tab value="">` — Tabbed content
- `<Steps>` / `<Step>` — Step-by-step guides
- `<Files>` / `<Folder>` / `<File>` — File tree display
- `<Accordions>` / `<Accordion title="">` — Collapsible sections

### Images

- Store in `public/images/` with descriptive kebab-case names
- Reference as `![alt](/images/descriptive-name.png)` in MDX
- remarkImage plugin resolves `/images/*` from `public/` directory
- External images are disabled (`external: false` in source.config.ts)

## Changelog Management

| Language | Changelog Location |
|----------|-------------------|
| English | `content/docs/v1.0/changelog.mdx` |
| Chinese | `content/docs/v1.0/changelog.zh.mdx` |

**Workflow for new releases:**
1. Read `CHANGE.md` from the [JEngine repo](https://github.com/JasonXuDeveloper/JEngine) for release notes
2. Add new version section at the **top** of both changelog files
3. Filter out CI/infrastructure changes — only document user-facing changes
4. Translate English changelog to Chinese

## Documentation Versions

| Version | Status | Directory | Languages |
|---------|--------|-----------|-----------|
| **v1.0** | Active (default) | `content/docs/v1.0/` | EN + ZH |
| v0.8 | Legacy | `content/docs/v0.8/` | ZH only |
| v0.7 | Legacy | `content/docs/v0.7/` | ZH only |
| v0.6 | Legacy | `content/docs/v0.6/` | ZH only |
| v0.5 | Legacy | `content/docs/v0.5/` | ZH only |
| Pro | Legacy | `content/docs/pro/` | ZH only |

## Adding New Versions

When releasing a new major version (e.g., v1.1):

1. Update version config in `src/lib/source.ts` or wherever versions are defined
2. Create directory: `content/docs/v1.1/`
3. Add `meta.json` and `meta.zh.json` sidebar configs
4. Create `index.mdx` and `index.zh.mdx` landing pages
5. Add doc pages as `*.mdx` (English) and `*.zh.mdx` (Chinese)
6. Run `bun run build` to verify

## LLM Endpoints

- `/llms.txt` — Page listing (add `?lang=zh` for Chinese)
- `/llms-full.txt` — Full content dump (add `?lang=zh` for Chinese)
- `/{lang}/docs/{version}/{page}.mdx` — Individual page markdown (via rewrite)

## Build & Deploy

```bash
bun run build        # Production build
```

The site is deployed to Cloudflare. Run `bun run build` before committing to catch errors.
