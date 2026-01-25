# Getting Started

This article will guide you through the initial setup and usage of JEngine


## Version Requirements

Unity 2022.3 or higher

## Download JEngine

Please [download JEngine here](https://github.com/JasonXuDeveloper/JEngine/tree/master), extract it, and open `UnityProject` in Unity Hub using a Unity version that meets the requirements.

## Main Project Structure

The following describes JEngine-related directories and files. It's generally **not recommended** to delete the files/directories mentioned below.

**JEngine**: Downloaded directory

- **UnityProject**: Unity project

  - **Bundles**: Directory for packaged hot update resources

    - **{Platform}**: Platform for packaged hot update resources (e.g., Android, WebGL, etc.)
      - **main**: Main package
        - **{PackageVersion}**: Version of the main package
      - **{OtherPackage}**: Other packages
        - **{PackageVersion}**: Version of other packages

  - **HybridCLRData**: Directory required for HybridCLR compilation (needs to be installed manually in Unity, mentioned later)

  - **Packages**: Third-party libraries used

    - **com.code-philosophy.hybridclr@8.6.0**: HybridCLR, copied to this directory for Obfuz compatibility. To update HybridCLR, [refer here](https://www.obfuz.com/docs/beginner/work-with-hybridclr)
    - **com.jasonxudeveloper.jengine.core**: JEngine core code (hot update-related runtime and editor code)
    - **manifest.json**: Manifest file containing other JEngine dependencies (UniTask, YooAsset, Obfuz, Nino, etc.)

  - **ProjectSettings**: Contains various project configurations, recommended to modify only through Unity (Project Settings panel) as needed

  - **yoo**: Directory for caching downloaded hot update resources when running in editor simulation mode. If deleted, resources need to be re-downloaded at runtime

  - **Assets**: Unity project assets directory

    - **Samples**: Contains YooAsset plugins (UniTask plugin, mini-game plugin)

    - **StreamingAssets**: First package resources, automatically copied when packaging main hot update resources, used for App Store and other marketplace reviews

    - **HybridCLRGenerate**: Contains bridge functions and Unity stripping prevention files generated during hot update code compilation. Can be deleted (but pointless), automatically generated when compiling hot update code

    - **Obfuz**: Obfuscation-related generated code, including generated junk code and files for [deobfuscating stack traces](https://www.obfuz.com/docs/manual/deobfuscate-stacktrace)

    - **TextMesh Pro**: Most projects now use this for UI text, JEngine has it installed (JEngine's demo uses it)

    - **Resources**: Non-hot update resource directory, stores configurations and prefabs, **changing content here requires rebuilding the app (packaging and submitting to platforms)**

      - **EncryptConfigs**: Configuration files for various hot update resource encryption methods, where you can configure keys for different encryption methods
      - **Obfuz**: Static key for decrypting obfuscated code
      - **Animations/Shaders/UI/Prefabs**: Animations/effects/images/prefabs used by JEngine's popup feature (**MessageBox**), can be modified, but the structure and names of controls in `MessageBox.prefab` cannot be changed

    - **Editor**: Editor tool configurations (YooAsset, JEngine) stored here, usually no need to manage

    - **HotUpdate**: Hot update resources (including code) directory

      - **Compiled**: Compiled and obfuscated hot update code and [AOT generic supplement DLLs](https://www.hybridclr.cn/docs/basic/aotgeneric) stored here, no need to manage, automatically written when compiling hot update code
      - **Obfuz**: Dynamic key for decrypting obfuscated code (can modify Obfuz configuration to regenerate this key for hot update)
      - **Main**: Main hot update resource package
      - **AddOn1**: Hot update resource subpackage test (can be deleted, [need to remove this package in YooAsset configuration](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector))
      - **Raw**: Hot update raw package test (can be deleted, [need to remove this package in YooAsset configuration](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector))
      - **Code**: Hot update code
        - **EntryPoint.cs**: Function entry point for hot update code

      ::: tip

      You can place hot update resources in `HotUpdate/{package}` according to your standards, but if you add new directories or don't add files in existing directories (e.g., adding files or new directories in `HotUpdate/Main/`), you need to refer to [YooAsset documentation](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector) to configure newly added `files/directories` to corresponding hot update resource packages

      :::

      ::: danger

      Hot update code cannot use code from Unity project that is not Plugin, Packages, dll, or asmdef. Code within Assembly-CSharp project cannot be used in hot update project.

      If you want to use any main project code in hot update code, the corresponding main project code must use [`asmdef`](https://docs.unity3d.com/6000.2/Documentation/Manual/cus-asmdef.html) to separate into a project, then add a reference to that main project asmdef in `HotUpdate/Code/HotUpdate.Code.asmdef`. Most Unity plugins should have this (e.g., YooAsset, UniTask, ZLinq, LitMotion); if some Unity plugins provide `dll`, like Nino, no action is needed.

      This section is very important. If you're new or unfamiliar with this mechanism, you can copy this paragraph to an LLM (DeepSeek, GPT, etc.) for AI explanation and examples

      :::

## Install HybridCLR

After opening `UnityProject` with the correct Unity version, in the top menu bar, click `HybridCLR/Installer..`, then click `Install`. It will freeze for a moment. Once installed, the panel will show `Installed Version: xxxx`, indicating successful installation (the `UnityProject/HybridCLRData` directory will be generated with many files).

> If you encounter errors at this step, check [here](https://www.hybridclr.cn/docs/help/commonerrors)

## Optional: Install JEngine.Util Package

JEngine provides an optional utility package with high-performance tools:

- **JAction** - Chainable action framework with zero-GC async execution
- **JObjectPool** - Thread-safe generic object pool

### Via OpenUPM CLI

```bash
openupm add com.jasonxudeveloper.jengine.util
```

### Via Unity Package Manager

1. Open Unity Package Manager (Window > Package Manager)
2. Click "+" button and select "Add package by name..."
3. Enter: `com.jasonxudeveloper.jengine.util`

For detailed manual installation steps, visit the [OpenUPM page](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/).

::: tip
After installation, use `using JEngine.Util;` to access JAction and JObjectPool classes. See [JAction documentation](./jaction.md) and [JObjectPool documentation](./jobjectpool.md) for usage details.
:::

## Simulate Project Execution

In this step, we can use JEngine's development mode to simulate the hot update process in the editor:

1. Enter the `Init` scene
2. Click the `Bootstrap` object in `Hierarchy`
3. In `Inspector`'s `Development Settings` area, check if `Editor Mode` is `Editor Dev Mode` (red), if not, click the button
4. Run the game in the editor
5. Click `Start` to load hot update code and enter the main hot update scene
6. Click `AddOnDemo` to load the `AddOn1` package and enter its scene



> In the Init scene there's a GameObject called `IngameDebugConsole`, it is used for **collecting logs in runtime (Windows/iOS/Android) without the need of external tools**, feel free to delete it if you don't need it





## General Development Workflow

1. Modify hot update code/resources
2. Open JEngine panel (top menu bar, click `JEngine Panel`)
3. In the panel's `Package Settings`, select the package to build for `Package Name` (usually the main package `main`), click `Set to Current Active Target` for `Build Target`
4. In the panel's `Build Options`, select the desired encryption mode, usually `XOR` is recommended (fast), but `AES` and `ChaCha20` are more secure
5. If hot update code or Obfuz configuration was modified, click `Build All Hot Update Res (Code + Assets)` (only main package needs this), then wait. If errors occur, consult [YooAsset documentation](https://www.yooasset.com/docs/FAQ), [HybridCLR documentation](https://www.hybridclr.cn/docs/help/commonerrors), and [Obfuz documentation](https://www.obfuz.com/docs/help/faq) based on console errors
6. If hot update resources (like scenes) were modified and the previous step wasn't executed, click `Build Hot Update Assets Only`, then wait
7. After doing either of the previous two steps, if packaging succeeds, a log will mention the version number. Go to `UnityProject/Bundles/{platform from step 4}/{package from step 3}/{version}` directory - this contains the packaged hot update resources
8. On server/CDN, create `{platform from step 4}/{package from step 3}` directory, copy contents from the previous step's directory, e.g., store all resources from the previous step in `https://cdn.domain.com/WebGL/main/` directory (assuming you're also on WebGL platform)
9. Enter the `Init` scene
10. Click the `Bootstrap` object in `Hierarchy`
11. Switch `Editor Mode` in `Inspector` to `Host Play Mode`
12. In `Inspector`'s `Server Settings` area, enter the address where you deployed resources in step 8 for `Default Host Server`, e.g., `https://cdn.domain.com` or `http://127.0.0.1`. Don't include platform or package in the link. If you placed resources in another path, the address should include that path, e.g., if resources are at `wwwroot/cdn.domain.com/something/`, enter `https://cdn.domain.com/something`
13. In `Inspector`'s `Security Settings`, select the encryption mode you used for the **main package** in `Encryption Option`
14. In `Inspector`'s `Asset Settings`, select the corresponding platform for `Target Platform`, `Regular` is for regular platforms, others are for corresponding mini-game platforms
15. Run the game. The experience should be similar to simulation mode, but this time there will be popups for downloading resources (main package might not have them as resources are copied to `Streaming Assets`), and download progress will be displayed
16. Regular development follows this `modify code/resources -> package hot update resources -> upload hot update resources -> test` workflow. More detailed framework features will be introduced in subsequent articles

## Code Obfuscation

As mentioned above, we obfuscate most code (including hot update code). Note that if the code in the `Assets/Obfuz` directory (`GeneratedEncryptionVirtualMachine.cs` or junk code) or `Assets/Resources/Obfuz/StaticSecretKey.bytes` changes, you need to rebuild the project and submit version updates to different platforms. It's recommended to use `git` or `svn` tools to check if you've encountered this issue.

Usually, if you don't modify Obfuz configuration or regenerate junk code, you won't encounter this problem.

For specific Obfuz configuration, please [check the Obfuz documentation](https://www.obfuz.com/docs/intro). **It's strongly recommended to read this documentation and modify various keys used for obfuscation**. **Using default keys is not secure**