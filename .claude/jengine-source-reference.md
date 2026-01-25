# JEngine Source Code Reference

When documenting new features, reference the JEngine source code.

## Local Paths

- **Unity Project**: `/Users/jason/Documents/GitHub/JEngine/UnityProject/`
- **Packages Directory**: `Packages/com.jasonxudeveloper.jengine.*/`
- **Hot Update Code**: `Assets/HotUpdate/Code/`

## Discovering Packages

To find all JEngine packages:

```bash
ls /Users/jason/Documents/GitHub/JEngine/UnityProject/Packages/ | grep jengine
```

Current packages (check for new ones before documenting):

| Package | Description |
|---------|-------------|
| `com.jasonxudeveloper.jengine.core` | Core hot update framework |
| `com.jasonxudeveloper.jengine.util` | Utility classes (JAction, JObjectPool, etc.) |

## Package Structure

Each package follows this structure:

```
Packages/com.jasonxudeveloper.jengine.{name}/
├── Runtime/           # Runtime scripts (main source code)
├── Editor/            # Editor scripts (if any)
├── Tests/             # Unit tests
│   ├── Runtime/
│   └── Editor/
└── package.json       # Package metadata with version info
```

## External Resources

| Resource | URL |
|----------|-----|
| GitHub Repository | https://github.com/JasonXuDeveloper/JEngine |
| GitHub Releases | https://github.com/JasonXuDeveloper/JEngine/releases |
| OpenUPM Base URL | `https://openupm.com/packages/com.jasonxudeveloper.jengine.{name}/` |

Replace `{name}` with: `core`, `util`, or any future package name.

## Reading Source for Documentation

1. **Check `package.json`** for current version number
2. **Read Runtime scripts** for API signatures and XML documentation
3. **Check Tests** for usage examples and edge cases
4. **Look for `README.md`** in package root for high-level overview
