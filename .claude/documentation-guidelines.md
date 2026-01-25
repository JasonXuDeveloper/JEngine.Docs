# Documentation Guidelines

Writing standards and best practices for JEngine documentation.

## Bilingual Requirements

- **Always provide both English (`/en/`) and Chinese (`/zh/`) versions**
- **Verify EN/ZH are in sync**: Section headers should match, code examples should be identical
- Compare line counts and structure when updating one version

## VitePress Features

### Callouts

Use VitePress callouts for important information:

```markdown
::: tip
Helpful information
:::

::: warning
Important limitation or caveat
:::

::: danger
Critical warning - may cause issues
:::

::: info
Additional context
:::
```

### External Links

- External links in sidebar automatically open in new tabs
- OpenUPM links should point to package pages for manual installation instructions

## Code Examples

### Static Lambdas

Use `static` lambdas with state parameters where applicable for zero-allocation:

```csharp
// Good - zero allocation with reference types
MyClass obj = new MyClass();
using var action = JAction.Create()
    .Do(static (o) => o.DoSomething(), obj)
    .Execute();

// Note: State overloads only work with reference types
// For value types (int, float, struct), use closures
```

### Disposable Objects

Always show `using` pattern for disposable objects to ensure proper disposal:

```csharp
// Correct - auto dispose
using var action = await JAction.Create()
    .Do(static () => Debug.Log("Work"))
    .ExecuteAsync();

// Also correct for sync
using var action = JAction.Create()
    .Do(static () => Debug.Log("Work"))
    .Execute();
```

### Async vs Sync

**Prefer `ExecuteAsync()` over `Execute()` in examples** - sync blocks main thread by spinning:

```csharp
// Recommended - non-blocking
using var action = await JAction.Create()
    .Delay(1f)
    .ExecuteAsync();

// Avoid unless necessary - blocks main thread
using var action = JAction.Create()
    .Delay(1f)
    .Execute();
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

## Build Verification

Always run before committing:

```bash
pnpm run docs:build
```

This catches:
- Broken links
- Invalid markdown syntax
- Missing files
- Build errors

## File Naming

- Use lowercase with hyphens: `jaction.md`, `jobject-pool.md`
- Match feature names from source code
- Keep names short but descriptive
