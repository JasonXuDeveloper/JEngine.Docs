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
