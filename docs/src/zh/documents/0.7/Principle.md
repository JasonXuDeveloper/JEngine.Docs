# 框架实现原理

> 本文会比较详细的介绍框架实现的原理，以便于更好的理解框架

::: tip

如果只需要使用本框架，本文可以略过；

如果对本框架原理感兴趣，建议阅读本文

:::

[[toc]]

### 流程图

![flowchart](https://s1.ax1x.com/2022/05/21/OvnMVJ.png)

### 初始化热更资源

在游戏启动后，需要初始化热更资源才能进入游戏

#### 使用编辑器资源

在开发模式下，全部的资源会通过Unity的

```csharp
AssetDatabase.LoadAssetAtPath<T>(assetPath);
```

进行加载

> 需要注意的是这个模式下加载热更场景，必须将场景添加到BuildSetting内，故而有了```DevelopSceneChange.cs```这个工具：
>
> ```csharp
> namespace BM
> {
>     [InitializeOnLoad]
>     public class DevelopSceneChange
>     {
>         /// <summary>
>         /// 每次脚本编译后执行, 用于检测在Develop模式下将场景加入BuildSettings, 如果不想每次编译后执行可以自己封装
>         /// </summary>
>         static DevelopSceneChange()
>         {
>             AssetLoadTable assetLoadTable =
>                 AssetDatabase.LoadAssetAtPath<AssetLoadTable>(BuildAssets.AssetLoadTablePath);
>             List<AssetsLoadSetting> assetsLoadSettings = assetLoadTable.AssetsLoadSettings;
>             Dictionary<string, EditorBuildSettingsScene> editorBuildSettingsScenes =
>                 new Dictionary<string, EditorBuildSettingsScene>();
>             for (int i = 0; i < assetLoadTable.InitScene.Count; i++)
>             {
>                 string scenePath = AssetDatabase.GetAssetPath(assetLoadTable.InitScene[i]);
>                 if (!editorBuildSettingsScenes.ContainsKey(scenePath))
>                 {
>                     editorBuildSettingsScenes.Add(scenePath, new EditorBuildSettingsScene(scenePath, true));
>                 }
>             }
> 
>             var sceneAssets = BuildAssetsTools.GetPackageSceneAssets(assetLoadTable).ToArray();
> 
>             foreach (var sa in sceneAssets)
>             {
>                 string scenePath = AssetDatabase.GetAssetPath(sa);
>                 if (!editorBuildSettingsScenes.ContainsKey(scenePath))
>                 {
>                     editorBuildSettingsScenes.Add(scenePath, new EditorBuildSettingsScene(scenePath, true));
>                 }
>             }
>             // }
>             EditorBuildSettings.scenes = editorBuildSettingsScenes.Values.ToArray();
>         }
>     }
> }
> ```
>
> 通过这个工具，将热更配置内的热更场景全部会在游戏启动前加入BuildSetting



#### 使用StreamingAssets内热更资源

在本地模式下，只要StreamingAssets内有打包好的热更资源，那么就会直接读取这些资源（不会访问资源服），同时这里面的资源不会被解压到persistentPath

加载这些资源时，用的是```UnityWebRequest.Get```进行的访问，并且会模拟真实的使用```AssetBundle```进行资源加载的流程

::: warning

AssetBundle的平台若于运行平台不对应，可能会造成Shader丢失（如编辑器下运行安卓平台的AssetBundle，或安卓平台运行编辑器平台的AssetBundle）

这里的AssetBundle指的是打出来的热更包，而AssetBundle的平台取决于打热更包时BuildSetting配置的平台

:::



#### 同步资源服上最新的资源

在真机模式下，会请求资源服的```FileLogs.txt```、```VersionLogs.txt```等文件与本地已存在的资源进行对比（还可选crc校验），然后进行增量更新

这些资源通过```UnityWebRequest.Get```下载到persistentPath，并且会通过```AssetBundle```的流程进行资源管理

::: warning

AssetBundle的平台若于运行平台不对应，可能会造成Shader丢失（如编辑器下运行安卓平台的AssetBundle，或安卓平台运行编辑器平台的AssetBundle）

这里的AssetBundle指的是打出来的热更包，而AssetBundle的平台取决于打热更包时BuildSetting配置的平台

:::



#### 进入热更场景

请确保加载热更场景时使用了[AssetMgr](./AssetMgr.md)的相关接口，不然会导致无法进入热更场景

::: warning

非开发模式时请确保出包（例如打APK时），BuildSetting内不包含热更场景，不然会导致被打入游戏主包的场景无法热更

:::