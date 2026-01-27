# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Documentation website for JEngine, a Unity framework that enables runtime hot updates for Unity games. Built with **VitePress v2** and **pnpm**.

## Quick Reference

| Task | Guide |
|------|-------|
| Updating for new release | [Release Update Guide](.claude/release-update-guide.md) |
| Finding source code | [JEngine Source Reference](.claude/jengine-source-reference.md) |
| Writing documentation | [Documentation Guidelines](.claude/documentation-guidelines.md) |

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm run docs:dev     # Run development server
pnpm run docs:build   # Build for production
pnpm run docs:preview # Preview built docs
```

## Repository Structure

```
/docs/
├── .vitepress/          # VitePress config
│   └── config-helpers.mts  # Sidebar configuration
├── en/documents/1.0/    # English docs (latest)
├── zh/documents/1.0/    # Chinese docs (latest)
└── public/              # Static assets
```

## Key Points

- **Bilingual**: Always update both `/en/` and `/zh/` versions
- **Sidebar**: Edit `config-helpers.mts` to add navigation items
- **Build check**: Run `pnpm run docs:build` before committing
- **Source code**: See [JEngine Source Reference](.claude/jengine-source-reference.md) for Unity project paths

## Changelog Management

When documenting new releases, update the **dedicated changelog pages** (not inline in overview pages):

| Language | Changelog Location |
|----------|-------------------|
| English | `/docs/en/documents/1.0/changelog.md` |
| Chinese | `/docs/zh/documents/1.0/changelog.md` |

**Workflow for new releases:**
1. Read `CHANGE.md` from the [JEngine repo](https://github.com/JasonXuDeveloper/JEngine) for release notes
2. Add new version section at the **top** of both changelog files
3. Filter out CI/infrastructure changes - only document user-facing changes
4. Translate English changelog to Chinese
5. Update version badge in `/docs/zh/documents/index.md` if needed

## Documentation Versions

| Version | Status | Branch |
|---------|--------|--------|
| **1.0.x** | Active | master |
| 0.8.x | Legacy | 0.8.x |
| 0.7.x | Legacy | 0.7.x |
| Pro | Separate | pro |

## VitePress Features

- Algolia DocSearch for search
- PWA for offline capability
- Auto sitemap generation
- Chinese as primary language with English support
