# v1.0.x

::: tip
最新版本，**强烈推荐**使用此版本
:::



JEngine的设计思路一直是让（通常是无热更新基础的）用户可以下载本框架后就能做支持热更新的游戏，老版本中因为使用的方案的问题导致用户经常遇到一些问题（如需要注册函数、需要写适配器、部分插件无法使用），**于是我们推出了全新的v1.0**版本：

- 代码热更方案切换至**HybridCLR**：

  - 更卓越的性能
  - 无需手写注册函数
  - 无需手写跨域适配器
  - 更统一的Unity开发体验
  - 任何能在Unity使用的插件都可以在热更代码内使用

  > 因为技术方案的原因，热更代码内的值类型计算会有最高**10倍**的**性能提升**

- 因为**不再**使用**ILRuntime**，**分块解密**执行DLL的方案**不再契合JEngine**，但我们使用了**Obfuz**对Unity工程和热更的代码进行了**混淆**，使得破解难度变大
- 我们更新了**YooAsset**，得益于此，**JEngine现已彻底支持WebGL和小游戏平台**
- 我们默认使用了**UniTask**和**Nino**，这让我们提供的底层函数的性能更高效（例如无GC的异步函数调用、高性能的部分配置数据反序列化）
- 我们**去除**了老版本的大部分工具，后续会作为**扩展模块**提供给用户，这使得JEngine框架的主体更加轻量，核心模块只包含热更新必须的功能：
  - 打包热更资源
  - 下载热更资源
  - 进入热更场景
  - 删除本地分包缓存



### 重磅更新

- **更轻量**：仅需下载框架即可开发*可热更*的游戏，无需*主动学习任何热更新知识*，几乎对热更代码没有[限制](https://www.hybridclr.cn/docs/basic/notsupportedfeatures)，同时自带代码混淆、资源加密、首包资源（用于应用商店审核）等功能可*直接使用*
- **更简便**：提供编辑器工具，可以一键：
  - 编译热更代码
  - 生成[AOT泛型](https://www.hybridclr.cn/docs/basic/aotgeneric)
  - 混淆全部代码
    - 支持自定义混淆规则（需[学习Obfuz](https://www.obfuz.com/docs/beginner/configuration)）
  - 热更资源包加密
    - XOR
    - AES
    - ChaCha20
  - 生成热更包资源
    - 支持分包（需[学习YooAsset](https://www.yooasset.com/docs/guide-editor/AssetBundleCollector)）
    - 自带生成首包资源（用于App Store审核等）
    - 自动收集Shader（防止材质丢失）
- **更好用**：提供运行时工具，可以配置：
  - 运行模式
    - 编辑器下可选模拟模式（无需打包资源）
    - 常规模式（iOS/Android/Windows/MacOS/WebGL）
    - 小游戏模式
      - 微信小游戏
      - 抖音小游戏
      - 支付宝小游戏
      - TapTap小游戏
  
  - 热更资源下载地址
  - 热更资源首包
  - 热更程序入口
  - 热更初始场景
  - 解密热更资源方式
    - XOR
    - AES
    - ChaCha20
  
  - 解密被混淆代码密钥
  




### v1.0.10 更新说明

**Bug 修复：**
- 修复在 Unity 6 中使用时 `SceneHandle` 产生歧义引用的错误 ([#589](https://github.com/JasonXuDeveloper/JEngine/pull/589))

### v1.0.9 更新说明

::: info 新包：JEngine.Util
本次更新引入 **JEngine.Util** 包（v1.0.3）- 一系列高性能工具类集合。
:::

**安装方式：**
```bash
openupm add com.jasonxudeveloper.jengine.util
```

或通过 [OpenUPM Package Manager UI](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/) 安装。

**新功能：**

- **[JAction 链式任务](./jaction.md)** - 支持零GC异步执行的链式操作框架
  - 流畅的 API 用于构建操作序列
  - 零GC的状态重载，适用于性能关键代码
  - 自定义 `JActionAwaitable` 结构体实现无GC的 async/await
  - 内置对象池（最多 32 个实例）

- **[JObjectPool 对象池](./jobjectpool.md)** - 线程安全的泛型对象池
  - 无锁 CAS 操作实现高性能
  - 可配置的创建、租借和归还回调
  - 每种类型内置共享池
  - 支持预热以实现无GC的游戏运行

### 仓库

[在GitHub查看 →](https://github.com/JasonXuDeveloper/JEngine/tree/master)



### 文档部分

[开始阅读 →](./startup.md)

