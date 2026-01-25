# FAQ

This page collects frequently asked questions and solutions when using JEngine v1.0.


## Installation and Configuration

### Q: What are the Unity version requirements?
**A:** JEngine v1.0 requires Unity 2022.3 or higher. Unity 2022.3 LTS is recommended for best stability.

### Q: HybridCLR installation failed?
**A:**
1. Ensure Unity version meets requirements
2. Check network connection (may need VPN)
3. Manually clean `HybridCLRData` directory and reinstall
4. Check [HybridCLR Common Errors](https://www.hybridclr.cn/docs/help/commonerrors)

### Q: Errors when first opening the project?
**A:**
- Check if extraction is complete (incomplete extraction may cause missing files)
- Confirm Unity version meets requirements
- Try deleting the `Library` directory and reopening the project
- Check if antivirus software deleted DLL files

## Hot Update Code

### Q: Hot update code cannot access main project code?
**A:** Hot update code can only access:
- Code in Packages
- Code in Plugins
- Existing DLL files
- Assemblies defined with asmdef

Main project (Assembly-CSharp) code requires:
1. Create asmdef file to separate into independent assembly
2. Add reference in `HotUpdate/Code/HotUpdate.Code.asmdef`

### Q: Hot update code compilation failed?
**A:** Common causes:
- Syntax errors: Check for compilation errors in hot update code
- Reference errors: Ensure all referenced libraries are properly configured
- HybridCLR not installed: Install HybridCLR first
- Obfuz or HybridCLR issues: Check corresponding documentation

### Q: Cannot debug after code obfuscation?
**A:**
- Disable obfuscation in Obfuz configuration during development
- Use [Stack Trace Deobfuscation Tool](https://www.obfuz.com/docs/manual/deobfuscate-stacktrace)
- Keep obfuscation mapping files for debugging

## Resource Management

### Q: Resource loading failed?
**A:** Check the following:
1. Is the resource path correct (needs full path)?
2. Is the resource in YooAsset configuration?
3. Is the package configuration correct?
4. Was the resource successfully packaged?
5. Is the package properly loaded?

### Q: How to add new resource directories?
**A:**
1. Create directory under `HotUpdate/`
2. Open `YooAsset/AssetBundle Collector`
3. Add collection rules for new directory (refer to YooAsset documentation)
4. Repackage resources

### Q: Resource download is slow?
**A:**
- Use CDN acceleration
- Enable resource compression
- Properly divide resource package sizes

## Packaging and Publishing

### Q: Packaging failed with encryption error?
**A:**
- Check if encryption key configuration is correct
- Ensure key length meets requirements (16/32 bits)
- Check configuration files in `Resources/EncryptConfigs/`

### Q: WebGL platform packaging failed?
**A:**
- Check if Unity WebGL module is installed
- Ensure no unsupported APIs are used
- Check if memory settings are reasonable

### Q: Mini-game platform limitations?
**A:** Different platforms have different limitations:
- **WeChat Mini Game**: First package ≤4MB, total ≤20MB
- **ByteDance Mini Game**: First package ≤4MB
- **Alipay Mini Game**: First package ≤5MB
- Recommend using sub-packages and CDN

## Runtime Errors

### Q: Button events/UI events/Timeline events not working?
**A:**
- Unity doesn't support adding hot update type functions to events in the editor, need to register manually in code
- You can try to prevent Obfuz from obfuscating certain class names and function names to see if it works, but theoretically it won't work

### Q: Version mismatch error?
**A:**
- Clear local cache: `yoo` directory
- Ensure server resources are up to date
- Check if version configuration is correct

### Q: Hot update manifest or resources cannot load?
**A:**
- Check if decryption method matches encryption method (non-hot-updatable decryption method)
- Check if decryption key is configured correctly (non-hot-updatable decryption key)

### Q: Hot update scene cannot load?
**A:**
- Confirm scene is in Build Settings
- Check if scene is in hot update resource package
- Verify scene name is correct (case-sensitive)

### Q: MessageBox not showing?
**A:**
- Check if MessageBox prefab exists
- Confirm related resources exist in Resources directory
- Check if other UI is blocking

### Q: Hot update code execution error?
**A:**
- Check HybridCLR or Obfuz documentation based on logs
- If it is reflection code, [refer to this](https://www.obfuz.com/docs/manual/reflection)

### Q: Why do `typeof(Type).Name` or `nameof(member)` cause errors on device?
**A:** This can happen if you use the string from `typeof(Type).Name` or `nameof(member)` for things like loading hot-update resources by path. JEngine uses Obfuz to obfuscate hot-update code, which changes class and member names. This causes errors on the actual device (but not in the editor).

- **Solution 1:** Get the real name by following the [Obfuz reflection documentation](https://www.obfuz.com/docs/manual/reflection). Note that this method won't work for `nameof(member)`.
- **Solution 2:** Use the `ObfuzIgnoreAttribute` to individually prevent the obfuscation of class names, field names, method names, etc. You can find more details in the [Obfuz custom attributes documentation](https://www.obfuz.com/docs/manual/customattributes).

::: tip
We recommend using `ObfuzIgnoreAttribute` (Solution 2) as it is more convenient and flexible.
:::

## JEngine.Util Package

### Q: How do I install the JEngine.Util package?
**A:** Install via OpenUPM CLI:
```bash
openupm add com.jasonxudeveloper.jengine.util
```
Or visit the [OpenUPM page](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/) for manual installation via Unity Package Manager.

### Q: What's the difference between JAction state overloads and closures?
**A:** State overloads avoid heap allocation by passing state as a parameter instead of capturing it in a closure:
```csharp
// Closure (allocates)
player => player.TakeDamage(10)

// State overload (zero allocation)
static (p) => p.TakeDamage(10), player
```
**Important:** State overloads only work with reference types (classes). For value types (int, float, struct), use closures.

### Q: Why does my JAction state overload not work with int/float?
**A:** State overloads only work with **reference types** (classes, arrays). Value types (int, float, bool, struct) get boxed, defeating the purpose. For value types, use closures or wrap them in a class.

### Q: What's the difference between JObjectPool and Unity's ObjectPool?
**A:** JObjectPool uses lock-free CAS operations for better performance in high-frequency scenarios. It also provides built-in shared pools per type via `JObjectPool.Shared<T>()`.

### Q: When should I use JAction vs coroutines?
**A:** JAction provides:
- Chainable fluent API for better readability
- Zero-GC async execution with `ExecuteAsync()`
- Built-in object pooling
- State overloads for performance-critical code

Use coroutines for simple delays; use JAction for complex sequences or when GC matters.

## Performance Optimization

### Q: Game startup is slow?
**A:**
- Reduce first package resource size
- Use asynchronous loading
- Optimize initial scene
- Pre-download common resources

### Q: High memory usage?
**A:**
- Promptly unload unused resource packages
- Use object pool management
- Regularly clean cache
- Optimize texture sizes

### Q: Poor hot update code performance?
**A:** v1.0 uses HybridCLR with greatly improved performance:
- Value type calculations improved up to 10x
- Use profiling tools to locate bottlenecks
- Check if it's your own issue (e.g., frequent memory allocation causing GC)

## Development Tips

### Q: How to debug quickly?
**A:**
- Use Editor Dev Mode to skip packaging
- Enable IngameDebugConsole to view logs
- Use conditional compilation to distinguish environments
- Keep detailed log output

### Q: How to handle platform differences?
**A:**
```csharp
#if UNITY_EDITOR
    // Editor code
#elif UNITY_ANDROID
    // Android platform code
#elif UNITY_IOS
    // iOS platform code
#endif
```

### Q: Problems after update?
**A:** Emergency handling process:
1. Immediately rollback server resources
2. Notify users to clear cache
3. Republish after fixing issues
4. Consider forced update mechanism

## Best Practices

### Q: How to organize code structure?
**A:** Recommended structure:
```
HotUpdate/Code/
├── Game/           # Game logic
├── UI/             # UI logic
├── Data/           # Data models
├── Network/        # Network communication
└── Utils/          # Utility classes
```

### Q: How to manage configuration files?
**A:**
- Use ScriptableObject to store configuration
- Place JSON/XML files in Resources or hot update package
- Use encryption for sensitive configuration
- Support remote configuration hot updates

### Q: How to handle multiple languages?
**A:**
- Use JEngine's localization system
- Place text configuration in hot update package
- Support dynamic language switching
- Package image resources by language

## Troubleshooting

### Q: How to locate crash causes?
**A:**
1. Check device logs (use IngameDebugConsole)
2. Check stack trace before obfuscation
3. Use try-catch to capture exceptions
4. Add logs at critical locations

### Q: How to resolve compatibility issues?
**A:**
- Test mainstream devices and OS versions
- Avoid using experimental APIs
- Handle permissions and privacy compliance
- Prepare degradation plans

### Q: Problems after update?
**A:** Emergency handling process:
1. Immediately rollback server resources
2. Notify users to clear cache
3. Republish after fixing issues
4. Consider forced update mechanism

## Related Resources

- [YooAsset FAQ](https://www.yooasset.com/docs/FAQ)
- [HybridCLR Common Errors](https://www.hybridclr.cn/docs/help/commonerrors)
- [Obfuz Help Documentation](https://www.obfuz.com/docs/help/faq)

## Getting Help

If the above content doesn't solve your problem:

1. Search or ask on [GitHub Issues](https://github.com/JasonXuDeveloper/JEngine/issues)
2. Check [GitHub Discussions](https://github.com/JasonXuDeveloper/JEngine/discussions)
3. Provide detailed error information and reproduction steps