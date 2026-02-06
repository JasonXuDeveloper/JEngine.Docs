# Release Update Guide

Checklist and file locations for updating JEngine documentation on new releases.

## Files to Update

### 1. Changelog Pages (Primary for Release Updates)

| File | Purpose |
|------|---------|
| `content/docs/v1.0/changelog.mdx` | English changelog — add new versions here |
| `content/docs/v1.0/changelog.zh.mdx` | Chinese changelog — add translated versions here |

### 2. Sidebar Configuration

| File | Purpose |
|------|---------|
| `content/docs/v1.0/meta.json` | English sidebar — add new page slugs |
| `content/docs/v1.0/meta.zh.json` | Chinese sidebar — add new page slugs |

Use `"---Section Title---"` separators to group pages. Example:

```json
{
  "title": "v1.0",
  "pages": [
    "index",
    "---Getting Started---",
    "startup",
    "---Core Features---",
    "new-feature",
    "---Reference---",
    "faq",
    "changelog"
  ]
}
```

### 3. Getting Started Guides

| File | Purpose |
|------|---------|
| `content/docs/v1.0/startup.mdx` | English startup guide |
| `content/docs/v1.0/startup.zh.mdx` | Chinese startup guide |

### 4. FAQ Pages

| File | Purpose |
|------|---------|
| `content/docs/v1.0/faq.mdx` | English FAQ |
| `content/docs/v1.0/faq.zh.mdx` | Chinese FAQ |

### 5. New Feature Documentation

Create new doc pages as needed:
- `content/docs/v1.0/{feature}.mdx` (English)
- `content/docs/v1.0/{feature}.zh.mdx` (Chinese)

Then add the slug to both `meta.json` and `meta.zh.json`.

## v1.0 Documentation Structure

```
content/docs/v1.0/
├── index.mdx / index.zh.mdx           # Version overview
├── changelog.mdx / changelog.zh.mdx   # Full version history
├── startup.mdx / startup.zh.mdx       # Getting started guide
├── editor-panel.mdx / .zh.mdx         # Editor panel documentation
├── runtime-panel.mdx / .zh.mdx        # Runtime panel documentation
├── package-manager.mdx / .zh.mdx      # Hot update package manager
├── messagebox.mdx / .zh.mdx           # MessageBox UI component
├── jaction.mdx / .zh.mdx              # JAction chainable task framework
├── jobjectpool.mdx / .zh.mdx          # JObjectPool generic object pool
├── faq.mdx / .zh.mdx                  # Frequently asked questions
├── migration.mdx / .zh.mdx            # Migration guide from older versions
├── meta.json                           # English sidebar config
└── meta.zh.json                        # Chinese sidebar config
```

## Adding New Package Documentation

When a new JEngine package is released:

1. **Check the package source** at `Packages/com.jasonxudeveloper.jengine.{name}/Runtime/`

2. **Read the XML documentation** in the C# source files for API details

3. **Create documentation files**:
   - `content/docs/v1.0/{feature}.mdx` (English)
   - `content/docs/v1.0/{feature}.zh.mdx` (Chinese)

4. **Update sidebar** in both `meta.json` and `meta.zh.json`:
   - Add the slug to the appropriate section

5. **Update startup.mdx / startup.zh.mdx** with installation instructions via OpenUPM

6. **Update FAQ** with common questions about the new package

## Version Update Workflow

1. Read `CHANGE.md` from [JEngine repo](https://github.com/JasonXuDeveloper/JEngine) for release notes
2. Add new version section at **top** of changelog files (EN and ZH)
3. Filter out CI/infrastructure changes — only document user-facing changes
4. Create/update feature documentation for new features
5. Update sidebars (`meta.json` / `meta.zh.json`) if new pages added
6. Run `bun run build` to verify no errors
7. Commit with descriptive message
