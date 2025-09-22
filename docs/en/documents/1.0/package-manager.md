# Package Manager

JEngine provides powerful hot update package management features, supporting independent management and updates of main packages and sub-packages.

## Package Types

### Main Package
- Contains hot update code and core resources
- Must be loaded first
- Default name: `main`
- **This package is YooAsset's default package**, meaning when using YooAsset functions without specifying a sub-package, the main package will be used

### Sub Packages
- Contains additional resources
- Load on demand
- Can be updated independently
- Examples: `AddOn1`, `Raw`

## Package Configuration

### YooAsset Configuration
Configure resource packages in Unity editor:
1. Open `YooAsset/AssetBundle Collector`
2. Configure different packages and resource rules
3. Set packaging strategies

### Resource Organization Structure
```
Assets/HotUpdate/
├── Main/           # Main package resources
│   ├── Prefabs/    # Prefabs
│   ├── Scenes/     # Scenes
│   └── UI/         # UI resources
├── AddOn1/         # Sub-package 1
│   └── ...
└── Code/           # Hot update code (automatically included in main package)
```

## Package Version Management

### Version Number Generation
Version numbers are automatically generated based on timestamp for each build:
- Format: `YearMonthDayHourMinuteSecond` (e.g., 24120115300)
- Algorithm: `(year-2000)*10000000 + month*100000 + day*1000 + hour*100 + minute*10 + second/6`
- Ensures each build has a unique version number

### Version File Structure
```
Bundles/
└── WebGL/
    └── main/
        ├── 24120115300/   # Version 1
        ├── 24120115400/   # Version 2
```

## Core API Methods

### CreateOrGetPackage Method
```csharp
public static ResourcePackage CreateOrGetPackage(string packageName)
```

**Parameters:**
- `packageName` - Resource package name (e.g., "main", "AddOn1")

**Return Value:**
- `ResourcePackage` - YooAsset resource package instance

**Usage Example:**
```csharp
// Create or get resource package
var package = Bootstrap.CreateOrGetPackage("AddOn1");
```

### UpdatePackage Method
```csharp
public static async UniTask<bool> UpdatePackage(ResourcePackage package, PackageInitializationCallbacks callbacks, EncryptionOption encryptionOption)
```

**Parameters:**
- `package` - Resource package instance to update
- `callbacks` - Package initialization callback structure
- `encryptionOption` - Encryption option (Xor/Aes/ChaCha20)

**Return Value:**
- `UniTask<bool>` - Whether the update was successful

**PackageInitializationCallbacks Parameters:**
- `OnStatusUpdate` - `Action<PackageInitializationStatus>` - Status update callback
- `OnVersionUpdate` - `Action<string>` - Version information callback
- `OnDownloadProgress` - `DownloaderOperation.DownloadUpdate` - Download progress callback
- `OnDownloadPrompt` - `Func<int, long, UniTask<bool>>` - Download confirmation callback
- `OnDownloadStart` - `Action` - Download start callback
- `OnDownloadComplete` - `Action` - Download complete callback
- `OnError` - `Func<Exception, UniTask>` - Error handling callback

**Usage Example:**
```csharp
// Configure callbacks
var callbacks = new PackageInitializationCallbacks
{
    OnStatusUpdate = (status) => {
        Debug.Log($"Package initialization status: {status}");
    },
    OnVersionUpdate = (version) => {
        Debug.Log($"Version info: {version}");
    },
    OnDownloadProgress = (downloaded, total, progress) => {
        Debug.Log($"Download progress: {progress * 100:F1}%");
    },
    OnDownloadPrompt = async (fileCount, totalBytes) => {
        Debug.Log($"Need to download {fileCount} files, total size: {totalBytes} bytes");
        return true; // Confirm download
    },
    OnDownloadStart = () => {
        Debug.Log("Download started");
    },
    OnDownloadComplete = () => {
        Debug.Log("Download completed");
    },
    OnError = async (exception) => {
        Debug.LogError($"Error: {exception.Message}");
    }
};

// Update resource package
bool success = await Bootstrap.UpdatePackage(
    package,                     // ResourcePackage instance
    callbacks,                   // Callbacks
    EncryptionOption.Xor         // Encryption option (Xor/Aes/ChaCha20)
);
```

### LoadHotUpdateScene Method
```csharp
public static async UniTask<SceneHandle> LoadHotUpdateScene(ResourcePackage package, string sceneName, SceneLoadCallbacks callbacks, LoadSceneMode loadMode = LoadSceneMode.Single)
```

**Parameters:**
- `package` - Resource package instance
- `sceneName` - Scene name
- `callbacks` - Scene load callback structure
- `loadMode` - Load mode (default Single)

**Return Value:**
- `UniTask<SceneHandle>` - YooAsset scene handle

**SceneLoadCallbacks Parameters:**
- `OnStatusUpdate` - `Action<SceneLoadStatus>` - Scene load status callback
- `OnProgressUpdate` - `Action<float>` - Load progress callback (0.0-1.0)
- `OnError` - `Func<Exception, UniTask>` - Error handling callback

**Usage Example:**
```csharp
// Configure scene load callbacks
var sceneCallbacks = new SceneLoadCallbacks
{
    OnProgressUpdate = (progress) => {
        Debug.Log($"Scene loading progress: {progress * 100:F1}%");
    },
    OnStatusUpdate = (status) => {
        Debug.Log($"Scene loading status: {status}");
    },
    OnError = async (exception) => {
        Debug.LogError($"Scene loading error: {exception.Message}");
    }
};

// Load hot update scene
var mainPackage = Bootstrap.CreateOrGetPackage("main");
SceneHandle sceneHandle = await Bootstrap.LoadHotUpdateScene(
    mainPackage,                 // ResourcePackage instance
    "GameScene",                 // Scene name
    sceneCallbacks,              // Callbacks
    LoadSceneMode.Single         // Loading mode
);
```

### DeletePackageCache Method
```csharp
public static async UniTask<bool> DeletePackageCache(ResourcePackage package, Func<Exception, UniTask> onError = null)
```

**Parameters:**
- `package` - Resource package instance to clear cache for
- `onError` - Error handling callback (optional)

**Return Value:**
- `UniTask<bool>` - Whether the cleanup was successful

**Usage Example:**
```csharp
// Clear specific package cache
var package = Bootstrap.CreateOrGetPackage("AddOn1");
bool deleted = await Bootstrap.DeletePackageCache(
    package,
    onError: async (exception) => {
        Debug.LogError($"Clear cache failed: {exception.Message}");
    }
);

// Clear main package cache
var mainPackage = Bootstrap.CreateOrGetPackage("main");
bool success = await Bootstrap.DeletePackageCache(mainPackage);
```

## Resource Loading

For resource loading, please refer to the [YooAsset Official Documentation](https://www.yooasset.com/docs/Introduce) for detailed resource loading APIs and usage methods.

JEngine uses YooAsset as the resource management system, supporting synchronous and asynchronous loading, resource reference counting, memory management, and other features.


## Cache Management

### Cache Location
- Editor: `UnityProject/yoo/`
- Android: `Application.persistentDataPath/yoo/`
- iOS: `Application.persistentDataPath/yoo/`
- Windows: `Application.persistentDataPath/yoo/`

### Encryption Options
Available encryption methods:
- `EncryptionOption.Xor` - XOR encryption (lightweight)
- `EncryptionOption.Aes` - AES encryption (balanced)
- `EncryptionOption.ChaCha20` - ChaCha20 encryption (high security)

### Incremental Update
Download only changed files:
- YooAsset automatically handles incremental downloads
- Reduces download size and time



## Best Practices

### Package Division Principles
- Main package: Core features and common resources
- Sub-packages: Optional features and large resources
- Divide by functional modules for independent updates

### Version Control
- Use timestamp-based version number system
- Keep historical versions for rollback
- Maintain version update logs

### Performance Optimization
- Use CDN to accelerate downloads
- Enable resource compression
- Keep package sizes reasonable

## Important Notes

- Main package must contain all hot update code
- Sub-packages cannot contain code, only resources
- Keep package sizes reasonable, recommend single package under 50MB
- Regularly clean old version caches
- Server must support resumable downloads