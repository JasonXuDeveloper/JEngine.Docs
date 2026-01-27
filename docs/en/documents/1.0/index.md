# v1.0.x

::: tip
Latest version, **strongly recommended** for use
:::

JEngine's design philosophy has always been to allow users (usually those without hot update experience) to download the framework and immediately start developing hot-updatable games. In previous versions, due to technical limitations, users often encountered issues (such as needing to register functions, write adapters, and some plugins being unusable). **Thus, we have launched the brand new v1.0** version:

- **Switched hot update solution to HybridCLR**:

  - Superior performance
  - No need to manually write registration functions
  - No need to manually write cross-domain adapters
  - More unified Unity development experience
  - Any plugin that works in Unity can be used in hot update code

  > Due to technical improvements, value type calculations in hot update code can achieve up to **10x performance improvement**

- Since we **no longer** use **ILRuntime**, the **chunked decryption** DLL execution approach **no longer fits JEngine**, but we use **Obfuz** to **obfuscate** both Unity project and hot update code, making reverse engineering more difficult
- We updated **YooAsset**, benefiting from this, **JEngine now fully supports WebGL and mini-game platforms**
- We use **UniTask** and **Nino** by default, making our underlying functions more efficient (e.g., GC-free async function calls, high-performance partial configuration data deserialization)
- We **removed** most tools from previous versions, which will be provided as **extension modules** later, making the JEngine framework core more lightweight, with core modules only including essential hot update functionality:
  - Package hot update resources
  - Download hot update resources
  - Enter hot update scenes
  - Delete local package cache

### Major Updates

- **More Lightweight**: Simply download the framework to develop *hot-updatable* games without *actively learning any hot update knowledge*, with almost no [restrictions](https://www.hybridclr.cn/docs/basic/notsupportedfeatures) on hot update code, while including code obfuscation, resource encryption, first package resources (for app store review) and other features that can be *used directly*
- **More Convenient**: Provides editor tools for one-click:
  - Compile hot update code
  - Generate [AOT generics](https://www.hybridclr.cn/docs/basic/aotgeneric)
  - Obfuscate all code
    - Supports custom obfuscation rules (requires [learning Obfuz](https://www.obfuz.com/docs/beginner/configuration))
  - Hot update resource package encryption
    - XOR
    - AES
    - ChaCha20
  - Generate hot update package resources
    - Supports subpackaging (requires [learning YooAsset](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector))
    - Built-in first package resource generation (for App Store review, etc.)
    - Automatic shader collection (prevents material loss)
- **More User-Friendly**: Provides runtime tools to configure:
  - Runtime modes
    - Editor simulation mode (no need to package resources)
    - Regular mode (iOS/Android/Windows/MacOS/WebGL)
    - Mini-game mode
      - WeChat Mini Games
      - ByteDance Mini Games
      - Alipay Mini Games
      - TapTap Mini Games

  - Hot update resource download URL
  - Hot update resource first package
  - Hot update program entry
  - Hot update initial scene
  - Hot update resource decryption method
    - XOR
    - AES
    - ChaCha20

  - Obfuscated code decryption key

### v1.0.10 Release Notes

**Bug Fixes:**
- Fixed `SceneHandle` ambiguous reference error when using Unity 6 ([#589](https://github.com/JasonXuDeveloper/JEngine/pull/589))

### v1.0.9 Release Notes

::: info New Package: JEngine.Util
This release introduces the **JEngine.Util** package (v1.0.3) - a collection of high-performance utility classes.
:::

**Installation:**
```bash
openupm add com.jasonxudeveloper.jengine.util
```

Or install via [OpenUPM Package Manager UI](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/).

**New Features:**

- **[JAction](./jaction.md)** - Chainable action framework with zero-GC async execution
  - Fluent API for building action sequences
  - Zero-allocation state overloads for performance-critical code
  - Custom `JActionAwaitable` struct for GC-free async/await
  - Built-in object pooling (max 32 instances)

- **[JObjectPool](./jobjectpool.md)** - Thread-safe generic object pool
  - Lock-free CAS operations for high performance
  - Configurable create, rent, and return callbacks
  - Built-in shared pool per type
  - Prewarm support for allocation-free gameplay

### Repository

[View on GitHub →](https://github.com/JasonXuDeveloper/JEngine/tree/master)

### Documentation

[Start Reading →](./startup.md)