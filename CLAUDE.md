# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the documentation website for JEngine, a Unity framework that enables runtime hot updates for Unity games. The documentation is built using **VitePress v2** with **pnpm** as the package manager, Chinese as the primary language, and includes modern PWA capabilities.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Run development server
pnpm run docs:dev

# Build documentation for production
pnpm run docs:build

# Preview built documentation
pnpm run docs:preview
```

## Repository Structure

- `/docs/` - VitePress documentation source files
  - `/.vitepress/` - VitePress configuration and theme customization
    - `/config.mts` - Main VitePress configuration file with TypeScript support and build hooks
    - `/dist/` - Built documentation output (generated)
  - `/public/` - Static assets (logo, images, favicons)
  - `/documents/` - Documentation organized by version (0.5, 0.6, 0.7, 0.8, pro) in Chinese
  - `/pro/` - JEngine Pro version documentation
  - `index.md` - Homepage with VitePress home layout
- `/node_modules/` - Dependencies (managed by pnpm)
- `package.json` - Project dependencies and scripts (VitePress + pnpm)
- `pnpm-lock.yaml` - pnpm lockfile
- `CLAUDE.md` - This guidance file

## Architecture Notes

### Documentation Versioning
The documentation maintains multiple versions:
- **0.8.x** - Latest open-source version (master branch)
- **0.7.x** - Previous stable version
- **0.6.x** - Legacy version
- **0.5.x** - Oldest maintained version
- **Pro** - Professional edition documentation

### Language Configuration
- Primary language: Chinese (zh-CN)
- All documentation content is in Chinese
- The site is configured with Chinese UI labels and navigation

### VitePress Configuration
The site has been **migrated from VuePress to VitePress v2** and uses advanced features:
- **Theme**: VitePress default theme with Chinese localization
- **Search**: Algolia DocSearch integration (configured with appId, apiKey, indexName)
- **PWA**: Progressive Web App capabilities with @vite-pwa/vitepress
- **SEO & Assets**:
  - Automatic sitemap generation with custom priority mapping
  - **Smart robots.txt generation** - automatically discovers allowed paths from navigation and sidebar configuration during build
  - Automated favicon generation from logo.png using Sharp image processing
  - Dynamic favicon links injection via transformHead hook
  - Comprehensive meta tags for social media (Open Graph, Twitter Cards)
- **Build Features**:
  - Modern TypeScript configuration
  - Build hooks for asset processing
  - Optimized PWA asset handling
  - Automatic last updated timestamps

### Content Organization
Documentation is organized hierarchically:
- 入门教程 (Getting Started guides)
- 框架核心 (Core Framework features)
- UI功能 (UI Components)
- 编辑器工具 (Editor Tools)
- 额外插件 (Additional Plugins and Libraries)

Each version maintains consistency in structure but may have different features based on the JEngine version capabilities.

### PWA Configuration
The site includes Progressive Web App features:
- Service worker for offline capability
- App manifest for installability
- Automatic asset caching
- Optimized for mobile experience