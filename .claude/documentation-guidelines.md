# Documentation Guidelines

Writing standards and best practices for JEngine documentation.

## Bilingual Requirements

- **Always provide both English and Chinese versions** for v1.0+ docs
- English: `feature.mdx`, Chinese: `feature.zh.mdx` (dot notation)
- **Verify EN/ZH are in sync**: Section headers should match, code examples should be identical
- Legacy versions (v0.5–v0.8, pro) are Chinese-only

## Fumadocs MDX Components

### Callouts

```mdx
<Callout type="info" title="Optional Title">
Helpful information
</Callout>

<Callout type="warn">
Important limitation or caveat
</Callout>

<Callout type="error" title="Critical">
Critical warning — may cause issues
</Callout>
```

### Cards

```mdx
<Cards>
  <Card title="Feature Name" href="./feature" description="Brief description" />
</Cards>
```

### Tabs

```mdx
<Tabs items={['Option A', 'Option B']}>
<Tab value="Option A">
Content for option A
</Tab>
<Tab value="Option B">
Content for option B
</Tab>
</Tabs>
```

### Steps

```mdx
<Steps>
<Step>
### Step Title
Step content here
</Step>
</Steps>
```

### File Trees

```mdx
<Files>
  <Folder name="src" defaultOpen>
    <File name="index.ts" />
    <Folder name="lib">
      <File name="utils.ts" />
    </Folder>
  </Folder>
</Files>
```

### Accordions

```mdx
<Accordions>
<Accordion title="Click to expand">
Hidden content
</Accordion>
</Accordions>
```

## Code Examples

### Static Lambdas

Use `static` lambdas with state parameters where applicable for zero-allocation:

```csharp
// Good — zero allocation with reference types
MyClass obj = new MyClass();
using var action = JAction.Create()
    .Do(static (o) => o.DoSomething(), obj)
    .Execute();

// Note: State overloads only work with reference types
// For value types (int, float, struct), use closures
```

### Disposable Objects

Always show `using` pattern for disposable objects:

```csharp
// Correct — auto dispose
using var action = await JAction.Create()
    .Do(static () => Debug.Log("Work"))
    .ExecuteAsync();
```

### Async vs Sync

**Prefer `ExecuteAsync()` over `Execute()` in examples** — sync blocks main thread by spinning:

```csharp
// Recommended — non-blocking
using var action = await JAction.Create()
    .Delay(1f)
    .ExecuteAsync();
```

## API Documentation

### Verify Method Signatures

When documenting APIs, check the actual method signatures in source code:
- Parameter names and types
- Return types
- Optional parameters and defaults
- Generic constraints

### Table Format

Use tables for API reference:

```markdown
| Method | Description |
|--------|-------------|
| `.Do(Action)` | Execute a synchronous action |
| `.Do(Action<T>, T)` | Execute action with state parameter (zero-allocation) |
```

## Images

- Store in `public/images/` with descriptive kebab-case names
- Reference as `![alt text](/images/descriptive-name.png)`
- External images are disabled — all images must be local
- remarkImage plugin resolves `/images/*` from `public/` automatically

## Sidebar Configuration

Edit `meta.json` (English) and `meta.zh.json` (Chinese) at the version root:

```json
{
  "title": "v1.0",
  "pages": [
    "index",
    "---Section Title---",
    "page-slug"
  ]
}
```

## Build Verification

Always run before committing:

```bash
cd jengine.docs && bun run build
```

This catches:
- Broken links
- Invalid MDX syntax
- Missing files
- Build errors

## File Naming

- Use lowercase with hyphens: `jaction.mdx`, `editor-panel.mdx`
- Match feature names from source code
- Keep names short but descriptive
- Chinese variant: same name with `.zh.mdx` suffix
