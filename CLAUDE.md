# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the documentation website for JEngine, a Unity framework that enables runtime hot updates for Unity games. The documentation is built using VuePress v2 with Chinese as the primary language.

## Development Commands

```bash
# Install dependencies (using yarn)
yarn install

# Run development server
yarn dev
# or
npm run dev

# Build documentation for production
yarn build
# or
npm run build
```

## Repository Structure

- `/docs/` - Main documentation directory
  - `/src/` - Source files for VuePress documentation
    - `/.vuepress/` - VuePress configuration and theme customization
      - `/config.ts` - Main VuePress configuration file defining navigation, sidebars, plugins, and locales
    - `/documents/` - Documentation organized by version (0.5, 0.6, 0.7, 0.8, pro) in Chinese
    - `/pro/` - JEngine Pro version documentation
    - `/config/` - Additional configuration files
  - `/node_modules/` - Dependencies (managed by yarn/npm)
  - `package.json` - Project dependencies and scripts

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

### VuePress Configuration
The site uses VuePress v2 with:
- **Theme**: @vuepress/theme-default
- **Search**: Algolia DocSearch integration (configured with appId, apiKey, indexName)
- **Plugins**:
  - Back to top navigation
  - Medium zoom for images
  - DocSearch for site search with Chinese translations

### Content Organization
Documentation is organized hierarchically:
- 入门教程 (Getting Started guides)
- 框架核心 (Core Framework features)
- UI功能 (UI Components)
- 编辑器工具 (Editor Tools)
- 额外插件 (Additional Plugins and Libraries)

Each version maintains consistency in structure but may have different features based on the JEngine version capabilities.