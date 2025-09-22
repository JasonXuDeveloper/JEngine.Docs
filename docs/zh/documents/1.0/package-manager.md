# 热更包管理

JEngine 提供了强大的热更包管理功能，支持主包和分包的独立管理和更新。

## 包类型介绍

### 主包（Main Package）
- 包含热更代码和核心资源
- 必须首先加载
- 默认名称：`main`
- **该包是YooAsset的默认包**，即使用YooAsset的函数是如果未指定分包就会用主包

### 分包（Sub Packages）
- 包含额外的资源
- 按需加载
- 可独立更新
- 示例：`AddOn1`、`Raw`

## 资源包配置

### YooAsset 配置
在 Unity 编辑器中配置资源包：
1. 打开 `YooAsset/AssetBundle Collector`
2. 配置不同的包和资源规则
3. 设置打包策略

### 资源组织结构
```
Assets/HotUpdate/
├── Main/           # 主包资源
│   ├── Prefabs/    # 预制体
│   ├── Scenes/     # 场景
│   └── UI/         # UI资源
├── AddOn1/         # 分包1
│   └── ...
└── Code/           # 热更代码（自动包含在主包）
```

## 包版本管理

### 版本号生成
每次构建会自动生成基于时间戳的版本号：
- 格式：`年月日时分秒` （如：24120115300）
- 生成算法：`(year-2000)*10000000 + month*100000 + day*1000 + hour*100 + minute*10 + second/6`
- 确保每次构建的版本号都不同

### 版本文件结构
```
Bundles/
└── WebGL/
    └── main/
        ├── 24120115300/   # 版本1
        ├── 24120115400/   # 版本2
```

## 核心API方法

### 创建或获取资源包
```csharp
// 创建或获取资源包
var package = Bootstrap.CreateOrGetPackage("AddOn1");
```

### 更新资源包
```csharp
// 配置回调
var callbacks = new PackageInitializationCallbacks
{
    OnStatusUpdate = (status) => {
        Debug.Log($"包初始化状态: {status}");
    },
    OnVersionUpdate = (version) => {
        Debug.Log($"版本信息: {version}");
    },
    OnDownloadProgress = (downloaded, total, progress) => {
        Debug.Log($"下载进度: {progress * 100:F1}%");
    },
    OnDownloadPrompt = async (fileCount, totalBytes) => {
        Debug.Log($"需要下载 {fileCount} 个文件，总大小: {totalBytes} bytes");
        return true; // 确认下载
    },
    OnDownloadStart = () => {
        Debug.Log("开始下载");
    },
    OnDownloadComplete = () => {
        Debug.Log("下载完成");
    },
    OnError = async (exception) => {
        Debug.LogError($"错误: {exception.Message}");
    }
};

// 更新资源包
bool success = await Bootstrap.UpdatePackage(
    package,                     // ResourcePackage 实例
    callbacks,                   // 回调
    EncryptionOption.Xor         // 加密选项（Xor/Aes/ChaCha20）
);
```

### 热更场景加载
```csharp
// 配置场景加载回调
var sceneCallbacks = new SceneLoadCallbacks
{
    OnProgressUpdate = (progress) => {
        Debug.Log($"场景加载进度: {progress * 100:F1}%");
    },
    OnStatusUpdate = (status) => {
        Debug.Log($"场景加载状态: {status}");
    },
    OnError = async (exception) => {
        Debug.LogError($"场景加载错误: {exception.Message}");
    }
};

// 加载热更场景
var mainPackage = Bootstrap.CreateOrGetPackage("main");
SceneHandle sceneHandle = await Bootstrap.LoadHotUpdateScene(
    mainPackage,                 // ResourcePackage 实例
    "GameScene",                 // 场景名称
    sceneCallbacks,              // 回调
    LoadSceneMode.Single         // 加载模式（可选）
);
```

### 清理资源包缓存
```csharp
// 清理指定包缓存
var package = Bootstrap.CreateOrGetPackage("AddOn1");
bool deleted = await Bootstrap.DeletePackageCache(
    package,
    onError: async (exception) => {
        Debug.LogError($"清理缓存失败: {exception.Message}");
    }
);

// 清理主包缓存
var mainPackage = Bootstrap.CreateOrGetPackage("main");
await Bootstrap.DeletePackageCache(mainPackage);
```

## 资源加载

资源加载请参考 [YooAsset 官方文档](https://www.yooasset.com/docs/Introduce) 了解详细的资源加载 API 和使用方法。

JEngine 使用 YooAsset 作为资源管理系统，支持同步和异步加载、资源引用计数、内存管理等功能。


## 缓存管理

### 缓存位置
- 编辑器：`UnityProject/yoo/`
- Android：`Application.persistentDataPath/yoo/`
- iOS：`Application.persistentDataPath/yoo/`
- Windows：`Application.persistentDataPath/yoo/`

### 加密选项
可用的加密方式：
- `EncryptionOption.Xor` - XOR 加密（轻量级）
- `EncryptionOption.Aes` - AES 加密（平衡）
- `EncryptionOption.ChaCha20` - ChaCha20 加密（高安全）

### 增量更新
只下载变化的文件：
- YooAsset 自动处理增量下载
- 减少下载量和时间



## 最佳实践

### 包划分原则
- 主包：核心功能和常用资源
- 分包：可选功能和大型资源
- 按功能模块划分，便于独立更新

### 版本控制
- 使用时间戳版本号系统
- 保留历史版本供回滚
- 记录版本更新日志

### 性能优化
- 使用 CDN 加速下载
- 启用资源压缩
- 合理控制包大小

## 注意事项

- 主包必须包含所有热更代码
- 分包不能包含代码，只能包含资源
- 合理控制包大小，建议单包不超过 50MB
- 定期清理旧版本缓存
- 服务器需支持断点续传