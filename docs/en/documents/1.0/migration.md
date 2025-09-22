# Migration Guide

This guide helps you migrate from older JEngine versions to v1.0.


## Upgrading from v1.0.x

Simply delete `Packages/com.jasonxudeveloper.jengine.core` and [refer here](https://openupm.com/packages/com.jasonxudeveloper.jengine.core/?subPage=readme) to update via UPM.

> The directory structure will basically not change, and there will be no additional files/directories under Assets. If there are, they will be specifically listed here.


## Version Comparison

### Major Changes
| Feature | Old Versions (0.8.x and below) | v1.0 |
|---------|--------------------------------|------|
| Hot Update Solution | ILRuntime | HybridCLR |
| Performance | Average | Excellent (10x improvement for value types) |
| Cross-Domain Inheritance | Requires adapters | No adapters needed |
| Function Registration | Manual registration required | No registration needed |
| Code Restrictions | Many | Very few |
| Unity Plugin Compatibility | Partial | Full |
| Code Protection | Chunked decryption | Obfuz obfuscation |
| Platform Support | Major platforms | Major platforms + Mini-games |

## Migration Preparation

### 1. Backup Project
Before migration, backup:
- Complete project files
- Hot update code
- Resource files
- Configuration files

### 2. Environment Requirements
- Upgrade Unity to 2022.3 or higher
- Upgrade .NET Framework to 4.7.1+
- Install necessary Unity modules

### 3. Assess Workload
Check your project for:
- ILRuntime-specific code (adapters, registration, etc.)
- Custom framework extensions
- Third-party plugin compatibility

## Migration from Old Versions (below v1.0.x)

### Step 1: Create New Project

1. Download JEngine v1.0
2. Open with Unity 2022.3+
3. Install HybridCLR

### Step 2: Migrate Hot Update Code

#### Remove ILRuntime Related Code
Delete the following:
- CLR binding code
- Adapter code
- Delegate registration
- Value type binding

#### Code Structure Adjustment
Old version:
```csharp
// ILRuntime required registration
app.DelegateManager.RegisterMethodDelegate<int>();
app.DelegateManager.RegisterFunctionDelegate<int, string>();

// Cross-domain inheritance needs adapter
public class MonoBehaviourAdapter : CrossBindingAdaptor
{
    // Adapter code
}
```

New version:
```csharp
// Direct use, no registration or adapters needed
public class MyBehaviour : MonoBehaviour
{
    // Direct inheritance, no adapter needed
}
```

#### Modify Entry Code
Old version may have `Init.cs` or `Main.cs`, new version uses `EntryPoint.cs`:

```csharp
public class EntryPoint
{
    public static void Main()
    {
        // Initialization code
        InitGame();
    }

    private static async void InitGame()
    {
        // Game initialization logic
        await LoadResources();
        EnterMainScene();
    }
}
```

### Step 3: Migrate Resources

#### Directory Structure Adjustment
Move old version resources to new structure:
```
Old version:
Assets/HotUpdateResources/
├── Dll/
├── Material/
├── Prefab/
└── Scene/

New version:
Assets/HotUpdate/
├── Main/
│   ├── Prefabs/
│   ├── Scenes/
│   └── Materials/
├── Code/
└── AddOn1/ (optional sub-package)
```

#### YooAsset Configuration
1. Open `YooAsset/AssetBundle Collector`
2. Configure resource collection rules (based on new version changes)
3. Set packaging parameters

### Step 4: Migrate Configuration

#### Encryption Configuration
Old version uses chunked decryption, new version uses overall encryption:

1. Choose encryption method (XOR/AES/ChaCha20)
2. Configure encryption keys
3. Update `Resources/EncryptConfigs/` configuration

#### Server Configuration
Update Bootstrap configuration:
```csharp
// Server address
DefaultHostServer = "https://cdn.yourdomain.com";
// Encryption option
EncryptionOption = EncryptOption.XOR;
// Platform setting
TargetPlatform = PlatformType.Regular;
```

### Step 5: API Migration

#### ClassBind

Remove directly, just drag the MonoBehaviour from hot update to hot update scene.

**Button events/UI events/Timeline events, etc.**

Register events in code, don't operate in Unity's panel.

#### Resource Loading API
Old version:
```csharp
// JResource loading
var asset = JResource.LoadRes<GameObject>("path/to/asset");
```

New version (use YooAsset interface directly, refer to YooAsset documentation):
```csharp
// PackageManager loading
var asset = YooAsset.LoadAsset<GameObject>("Assets/HotUpdate/Main/Prefabs/Player.prefab");
```

#### Scene Loading API
Old version:
```csharp
JResource.LoadScene("SceneName");
```

New version:
```csharp
await Bootstrap.LoadHotUpdateScene("SceneName");
```

#### UI System
Old version JUI system is simplified in new version:
```csharp
// Old version
JUI.CreatePanel<MyPanel>();

// New version - use standard Unity UI
var panel = Instantiate(panelPrefab);
```

### Step 6: Test and Verify

#### Function Test Checklist
- Hot update code loads normally
- Resources load normally
- Scene switching works
- UI displays correctly
- Network communication works
- Data storage works

#### Performance Testing
- Compare startup time
- Compare memory usage
- Compare runtime FPS
- Verify hot update process

## Common Migration Issues

### Q: How to handle existing ILRuntime adapters?
**A:** Delete them all, HybridCLR doesn't need adapters.

### Q: Delegates and events not working?
**A:** Check for leftover ILRuntime registration code, HybridCLR can use them directly.

### Q: Reflection code errors?
**A:** HybridCLR fully supports reflection, check for ILRuntime-specific reflection code, but Obfuz may obfuscate class names or method names, so you need to [refer here](https://www.obfuz.com/docs/manual/reflection).

### Q: Performance not improved?
**A:**
- Confirm using HybridCLR instead of ILRuntime
- Check if performance bottlenecks are elsewhere
- Use Profiler to analyze specific issues

### Q: Third-party plugins incompatible?
**A:**
- Most plugins work directly with HybridCLR
- Check if plugins have ILRuntime-specific code
- Update to latest plugin versions

## Post-Migration Optimization

### Code Optimization
- Remove all ILRuntime-related code
- Simplify cross-domain call logic
- Optimize hot update loading process

### Resource Optimization
- Reorganize resource structure
- Optimize resource packaging strategy
- Configure reasonable sub-packaging scheme

### Performance Optimization
- Leverage HybridCLR's performance advantages
- Optimize value type usage
- Reduce unnecessary boxing/unboxing

## Rollback Plan

If migration encounters unsolvable problems:

1. **Keep old version branch** - Can switch back anytime
2. **Progressive migration** - Migrate parts first
3. **Parallel development** - New features use v1.0, old features temporarily retained
4. **Seek help** - Ask in community or contact technical support

## Migration Benefits

After successfully migrating to v1.0, you'll gain:

### Performance Improvements
- Value type calculation performance improved up to 10x
- Faster startup speed
- Lower memory usage

### Development Efficiency
- No need to write adapters
- No need to register delegates
- Easier debugging

### Compatibility
- Supports all Unity plugins
- Supports complete C# features
- Supports more platforms (including mini-games)

### Maintainability
- Cleaner code
- Fewer errors
- Easier upgrades

## Technical Support

For help during migration:

1. Check [FAQ](./faq.md)
2. Reference [Example Project](https://github.com/JasonXuDeveloper/JEngine/tree/master/UnityProject)
3. Ask on [GitHub Issues](https://github.com/JasonXuDeveloper/JEngine/issues)

## Related Documentation

- [HybridCLR Migration Guide](https://www.hybridclr.cn/docs/basic/migration)
- [YooAsset Upgrade Guide](https://www.yooasset.com/docs/guide-upgrade)
- [Obfuz Configuration Documentation](https://www.obfuz.com/docs/beginner/configuration)