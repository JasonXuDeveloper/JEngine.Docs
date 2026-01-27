# Release Update Guide

Checklist and file locations for updating JEngine documentation on new releases.

## Files to Update

### 1. Sidebar Configuration

**File:** `/docs/.vitepress/config-helpers.mts`

- English sidebar: Search for `/en/documents/1.0/`
- Chinese sidebar: Search for `/zh/documents/1.0/`
- Add new pages to appropriate sections

### 2. Changelog Pages (Primary for Release Updates)

| File | Purpose |
|------|---------|
| `/docs/en/documents/1.0/changelog.md` | English changelog - add new versions here |
| `/docs/zh/documents/1.0/changelog.md` | Chinese changelog - add translated versions here |

### 3. Version Overview Pages

| File | Purpose |
|------|---------|
| `/docs/en/documents/1.0/index.md` | English overview (links to changelog) |
| `/docs/zh/documents/1.0/index.md` | Chinese overview (links to changelog) |
| `/docs/zh/documents/index.md` | Main documents page with version badge |

### 4. Getting Started Guides

| File | Purpose |
|------|---------|
| `/docs/en/documents/1.0/startup.md` | English startup guide |
| `/docs/zh/documents/1.0/startup.md` | Chinese startup guide |

### 5. FAQ Pages

| File | Purpose |
|------|---------|
| `/docs/en/documents/1.0/faq.md` | English FAQ |
| `/docs/zh/documents/1.0/faq.md` | Chinese FAQ |

### 6. New Feature Documentation

Create as needed:
- `/docs/en/documents/1.0/{feature}.md`
- `/docs/zh/documents/1.0/{feature}.md`

## v1.0.x Documentation Structure

```
/docs/en/documents/1.0/
├── index.md          # Version overview (links to changelog)
├── changelog.md      # Full version history
├── startup.md        # Getting started guide
├── editor-panel.md   # Editor panel documentation
├── runtime-panel.md  # Runtime panel documentation
├── package-manager.md # Hot update package manager
├── messagebox.md     # MessageBox UI component
├── jaction.md        # JAction chainable task framework (from jengine.util)
├── jobjectpool.md    # JObjectPool generic object pool (from jengine.util)
├── faq.md           # Frequently asked questions
└── migration.md     # Migration guide from older versions

/docs/zh/documents/1.0/
├── index.md          # 版本概述（链接到更新日志）
├── changelog.md      # 完整版本历史
├── startup.md        # 快速开始指南
├── editor-panel.md   # 编辑器面板文档
├── runtime-panel.md  # 运行时面板文档
├── package-manager.md # 热更包管理
├── messagebox.md     # 弹窗提示框组件
├── jaction.md        # JAction 链式任务框架 (来自 jengine.util)
├── jobjectpool.md    # JObjectPool 对象池 (来自 jengine.util)
├── faq.md           # 常见问题
└── migration.md     # 老版本迁移指南
```

## Adding New Package Documentation

When a new JEngine package is released:

1. **Check the package source** at `Packages/com.jasonxudeveloper.jengine.{name}/Runtime/`

2. **Read the XML documentation** in the C# source files for API details

3. **Create documentation files** for each major class/feature:
   - `/docs/en/documents/1.0/{feature}.md`
   - `/docs/zh/documents/1.0/{feature}.md`

4. **Update sidebar** in `config-helpers.mts`:
   - Add a new section for the package (e.g., "Utility Package" / "工具包")
   - Include OpenUPM link: `{ text: 'OpenUPM ↗', link: 'https://openupm.com/packages/com.jasonxudeveloper.jengine.{name}/' }`

5. **Update overview pages** with release notes mentioning the new package

6. **Update startup.md** with installation instructions via OpenUPM

7. **Update FAQ** with common questions about the new package

## Version Update Workflow

1. Read `CHANGE.md` from [JEngine repo](https://github.com/JasonXuDeveloper/JEngine) for release notes
2. Add new version section at **top** of changelog files (EN and ZH)
3. Filter out CI/infrastructure changes - only document user-facing changes
4. Update version badge in `/docs/zh/documents/index.md`
5. Update overview pages if latest release info changed
6. Create/update feature documentation for new features
7. Update sidebars if new pages added
8. Run `pnpm run docs:build` to verify
9. Commit with descriptive message
