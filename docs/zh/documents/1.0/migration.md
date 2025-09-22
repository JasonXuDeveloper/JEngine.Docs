# 老版本迁移指南

本指南帮助您从 JEngine 旧版本迁移到 v1.0。

[[toc]]

## 从v1.0.x升级

直接把`Packages/com.jasonxudeveloper.jengine.core`删了然后[参考这里](https://openupm.com/packages/com.jasonxudeveloper.jengine.core/?subPage=readme)通过UPM去更新

> 目录结构基本不会有变化，也不会在Assets下有额外的文件/目录，如果有的话会专门在这里列举出来



## 版本对比

### 主要变化
| 功能 | 旧版本 (0.8.x 及以下) | v1.0 |
|-----|---------------------|------|
| 热更方案 | ILRuntime | HybridCLR |
| 性能 | 一般 | 优秀（值类型计算提升10倍） |
| 跨域继承 | 需要适配器 | 无需适配器 |
| 注册函数 | 需要手动注册 | 无需注册 |
| 代码限制 | 较多 | 极少 |
| Unity插件兼容 | 部分兼容 | 完全兼容 |
| 代码保护 | 分块解密 | Obfuz混淆 |
| 平台支持 | 主流平台 | 主流平台 + 小游戏 |



## 从老版本（v1.0.x以下）迁移

### 1. 备份项目
迁移前务必备份：
- 完整的项目文件
- 热更代码
- 资源文件
- 配置文件

### 2. 环境要求
- Unity 升级到 2022.3 或更高版本
- .NET Framework 升级到 4.7.1+
- 安装必要的 Unity 模块

### 3. 评估工作量
检查项目中：
- ILRuntime 特定代码（适配器、注册等）
- 自定义的框架扩展
- 第三方插件兼容性

## 迁移步骤

### 步骤 1：创建新项目

1. 下载 JEngine v1.0
2. 使用 Unity 2022.3+ 打开
3. 安装 HybridCLR

### 步骤 2：迁移热更代码

#### 移除 ILRuntime 相关代码
删除以下内容：
- CLR绑定代码
- 适配器代码
- 委托注册
- 值类型绑定

#### 代码结构调整
旧版本：
```csharp
// ILRuntime 需要的注册
app.DelegateManager.RegisterMethodDelegate<int>();
app.DelegateManager.RegisterFunctionDelegate<int, string>();

// 跨域继承需要适配器
public class MonoBehaviourAdapter : CrossBindingAdaptor
{
    // 适配器代码
}
```

新版本：
```csharp
// 直接使用，无需任何注册和适配器
public class MyBehaviour : MonoBehaviour
{
    // 直接继承，无需适配器
}
```

#### 修改入口代码
旧版本可能有 `Init.cs` 或 `Main.cs`，新版本统一使用 `EntryPoint.cs`：

```csharp
public class EntryPoint
{
    public static void Main()
    {
        // 初始化代码
        InitGame();
    }

    private static async void InitGame()
    {
        // 游戏初始化逻辑
        await LoadResources();
        EnterMainScene();
    }
}
```

### 步骤 3：迁移资源

#### 目录结构调整
将旧版本资源移动到新结构：
```
旧版本：
Assets/HotUpdateResources/
├── Dll/
├── Material/
├── Prefab/
└── Scene/

新版本：
Assets/HotUpdate/
├── Main/
│   ├── Prefabs/
│   ├── Scenes/
│   └── Materials/
├── Code/
└── AddOn1/ (可选分包)
```

#### YooAsset 配置
1. 打开 `YooAsset/AssetBundle Collector`
2. 配置资源收集规则（基于新版的改）
3. 设置打包参数

### 步骤 4：迁移配置

#### 加密配置
旧版本使用分块解密，新版本使用整体加密：

1. 选择加密方式（XOR/AES/ChaCha20）
2. 配置加密密钥
3. 更新 `Resources/EncryptConfigs/` 配置

#### 服务器配置
更新 Bootstrap 配置：
```csharp
// 服务器地址
DefaultHostServer = "https://cdn.yourdomain.com";
// 加密选项
EncryptionOption = EncryptOption.XOR;
// 平台设置
TargetPlatform = PlatformType.Regular;
```

### 步骤 5：API 迁移

#### ClassBind

直接移除，直接把热更中的MonoBehaviour拖到热更场景上即可

**按钮事件/UI事件/Timeline事件等**

用代码注册事件，不要在Unity的面板下操作

#### 资源加载 API
旧版本：
```csharp
// JResource 加载
var asset = JResource.LoadRes<GameObject>("path/to/asset");
```

新版本（直接用YooAsset接口，参考YooAsset文档）：
```csharp
// PackageManager 加载
var asset = YooAsset.LoadAsset<GameObject>("Assets/HotUpdate/Main/Prefabs/Player.prefab");
```

#### 场景加载 API
旧版本：
```csharp
JResource.LoadScene("SceneName");
```

新版本：
```csharp
await Bootstrap.LoadHotUpdateScene("SceneName");
```

#### UI 系统
旧版本 JUI 系统在新版本中简化：
```csharp
// 旧版本
JUI.CreatePanel<MyPanel>();

// 新版本 - 使用标准 Unity UI
var panel = Instantiate(panelPrefab);
```

### 步骤 6：测试验证

#### 功能测试清单
- 热更代码加载正常
- 资源加载正常
- 场景切换正常
- UI 显示正常
- 网络通信正常
- 数据存储正常

#### 性能测试
- 对比启动时间
- 对比内存占用
- 对比运行帧率
- 验证热更新流程

## 常见迁移问题

### Q: 原有的 ILRuntime 适配器怎么处理？
**A:** 全部删除，HybridCLR 不需要适配器。

### Q: 委托和事件不工作？
**A:** 检查是否有遗留的 ILRuntime 注册代码，HybridCLR 直接使用即可。

### Q: 反射代码报错？
**A:** HybridCLR 完全支持反射，检查是否有 ILRuntime 特定的反射代码，但是Obfuz可能会对类名和函数名混淆，所以需要[参考这里](https://www.obfuz.com/docs/manual/reflection)。

### Q: 性能没有提升？
**A:**
- 确认使用了 HybridCLR 而非 ILRuntime
- 检查是否有性能瓶颈在其他地方
- 使用 Profiler 分析具体问题

### Q: 第三方插件不兼容？
**A:**
- 大部分插件在 HybridCLR 下直接可用
- 检查插件是否有 ILRuntime 特定代码
- 更新到插件的最新版本

## 迁移后优化

### 代码优化
- 移除所有 ILRuntime 相关代码
- 简化跨域调用逻辑
- 优化热更新加载流程

### 资源优化
- 重新组织资源结构
- 优化资源打包策略
- 配置合理的分包方案

### 性能优化
- 利用 HybridCLR 的性能优势
- 优化值类型使用
- 减少不必要的装箱拆箱

## 回滚方案

如果迁移遇到无法解决的问题：

1. **保留旧版本分支** - 随时可以切换回去
2. **渐进式迁移** - 先迁移部分模块
3. **并行开发** - 新功能用 v1.0，旧功能暂时保留
4. **寻求帮助** - 在社区提问或联系技术支持

## 迁移收益

成功迁移到 v1.0 后，您将获得：

### 性能提升
- 值类型计算性能提升最高 10 倍
- 启动速度更快
- 内存占用更少

### 开发效率
- 无需编写适配器
- 无需注册委托
- 调试更方便

### 兼容性
- 支持所有 Unity 插件
- 支持完整的 C# 特性
- 支持更多平台（包括小游戏）

### 维护性
- 代码更简洁
- 错误更少
- 升级更容易

## 技术支持

迁移过程中如需帮助：

1. 查看 [常见问题](./faq.md)
2. 参考 [示例项目](https://github.com/JasonXuDeveloper/JEngine/tree/master/UnityProject)
3. 在 [GitHub Issues](https://github.com/JasonXuDeveloper/JEngine/issues) 提问
4. 加入 QQ 群：921271552

