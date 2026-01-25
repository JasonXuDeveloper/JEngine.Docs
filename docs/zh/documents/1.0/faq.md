# 常见问题

本页面收集了使用 JEngine v1.0 过程中的常见问题和解决方案。


## 安装和配置

### Q: Unity 版本要求是什么？
**A:** JEngine v1.0 需要 Unity 2022.3 或更高版本。推荐使用 Unity 2022.3 LTS 版本以获得最佳稳定性。

### Q: HybridCLR 安装失败怎么办？
**A:**
1. 确保 Unity 版本满足要求
2. 检查网络连接（可能需要科学上网）
3. 手动清理 `HybridCLRData` 目录后重新安装
4. 查看 [HybridCLR 常见错误](https://www.hybridclr.cn/docs/help/commonerrors)

### Q: 首次打开项目报错？
**A:**
- 检查是否解压完整（有时候解压不完整会导致文件缺失）
- 确认 Unity 版本符合要求
- 尝试删除 `Library` 目录后重新打开项目
- 检查是否有杀毒软件误删了 DLL 文件

## 热更新代码

### Q: 热更代码无法访问主工程代码？
**A:** 热更代码只能访问：
- Packages 中的代码
- Plugins 中的 代码
- 现成的DLL 文件
- 使用 asmdef 定义的程序集

主工程（Assembly-CSharp）的代码需要：
1. 创建 asmdef 文件分离到独立程序集
2. 在 `HotUpdate/Code/HotUpdate.Code.asmdef` 中添加引用

### Q: 编译热更代码失败？
**A:** 常见原因：
- 语法错误：检查热更代码是否有编译错误
- 引用错误：确保所有引用的库都正确配置
- HybridCLR 未安装：先安装 HybridCLR
- Obfuz或HybridCLR问题：查阅对应的文档

### Q: 代码混淆后无法调试？
**A:**
- 开发阶段可以在 Obfuz 配置中禁用混淆
- 使用 [堆栈还原工具](https://www.obfuz.com/docs/manual/deobfuscate-stacktrace)
- 保留混淆映射文件用于调试

## 资源管理

### Q: 资源加载失败？
**A:** 检查以下几点：
1. 资源路径是否正确（需要完整路径）
2. 资源是否在 YooAsset 配置中
3. 分包配置是否正确
4. 资源是否成功打包
5. 分包是否被正确加载

### Q: 如何添加新的资源目录？
**A:**
1. 在 `HotUpdate/` 下创建目录
2. 打开 `YooAsset/AssetBundle Collector`
3. 添加新目录的收集规则（参考YooAsset文档）
4. 重新打包资源

### Q: 资源下载很慢？
**A:**
- 使用 CDN 加速
- 启用资源压缩
- 合理划分资源包大小

## 打包和发布

### Q: 打包失败提示加密错误？
**A:**
- 检查加密密钥配置是否正确
- 确保密钥长度符合要求（16/32 位）
- 检查 `Resources/EncryptConfigs/` 中的配置文件

### Q: WebGL 平台打包失败？
**A:**
- 检查 Unity WebGL 模块是否安装
- 确保没有使用不支持的 API
- 检查内存设置是否合理

### Q: 小游戏平台限制？
**A:** 不同平台有不同限制：
- **微信小游戏**：首包不超过 4MB，总包不超过 20MB
- **抖音小游戏**：首包不超过 4MB
- **支付宝小游戏**：首包不超过 5MB
- 建议使用分包和 CDN

## 运行时错误

### Q: 按钮事件/UI事件/Timeline事件无效？
**A:**
- 不支持在Unity下给事件添加热更类型的函数，需要手动在代码里注册
- 可以尝试不让Obfuz去混淆某个类的类名和函数名，看看是否能成功，理论上不行

### Q: 提示版本不匹配？
**A:**
- 清理本地缓存：`yoo` 目录
- 确保服务器资源是最新的
- 检查版本号配置是否正确

### Q: 热更清单或热更资源无法加载？
**A:**
- 检查解密方式是否与加密方式匹配（不可热更解密方式）
- 检查解密密钥是否配置正确（不可热更解密密钥）

### Q: 热更场景无法加载？
**A:**
- 确认场景在 Build Settings 中
- 检查场景是否在热更资源包中
- 验证场景名称是否正确（区分大小写）

### Q: MessageBox 不显示？
**A:**
- 检查 MessageBox 预制体是否存在
- 确认 Resources 目录中有相关资源
- 查看是否有其他 UI 遮挡

### Q: 热更代码执行错误？
**A:**
- 根据日志查看HybridCLR或Obfuz文档
- 如果是反射代码，[参考这里](https://www.obfuz.com/docs/manual/reflection)

### Q: 为何 `typeof(Type).Name` 或 `nameof(成员)` 在真机上引发错误？
**A:** 如果您使用 `typeof(Type).Name` 或 `nameof(成员)` 生成的字符串来拼接路径加载热更新资源，可能会在真机（非编辑器）上遇到错误。这是因为 JEngine 使用了 Obfuz 来混淆热更新代码，导致类名和成员名被更改。

- **解决方案一：** 遵循 [Obfuz 反射文档](https://www.obfuz.com/docs/manual/reflection) 的方法来获取真实的类型名称。请注意，此方法无法还原 `nameof(成员)` 的结果。
- **解决方案二：** 使用 `ObfuzIgnoreAttribute` 可以让你单独不会混淆类名/字段名/函数名等。更多详情请参阅 [Obfuz 自定义属性文档](https://www.obfuz.com/docs/manual/customattributes)。

::: tip
我们推荐使用 `ObfuzIgnoreAttribute` (解决方案二)，该方法更方便灵活。
:::


## JEngine.Util 工具包

### Q: 如何安装 JEngine.Util 包？
**A:** 通过 OpenUPM CLI 安装：
```bash
openupm add com.jasonxudeveloper.jengine.util
```
或访问 [OpenUPM 页面](https://openupm.com/packages/com.jasonxudeveloper.jengine.util/) 通过 Unity Package Manager 手动安装。

### Q: JAction 状态重载和闭包有什么区别？
**A:** 状态重载通过将状态作为参数传递而不是在闭包中捕获来避免堆分配：
```csharp
// 闭包（会分配内存）
player => player.TakeDamage(10)

// 状态重载（零分配）
static (p) => p.TakeDamage(10), player
```
**重要：** 状态重载仅适用于引用类型（类）。对于值类型（int、float、struct），请使用闭包。

### Q: 为什么我的 JAction 状态重载对 int/float 无效？
**A:** 状态重载仅适用于**引用类型**（类、数组）。值类型（int、float、bool、struct）会被装箱，这违背了避免分配的目的。对于值类型，请使用闭包或将其封装到类中。

### Q: JObjectPool 和 Unity 的 ObjectPool 有什么区别？
**A:** JObjectPool 使用无锁 CAS 操作，在高频场景中性能更好。它还通过 `JObjectPool.Shared<T>()` 为每种类型提供内置的共享池。

### Q: 什么时候应该使用 JAction 而不是协程？
**A:** JAction 提供：
- 链式流畅 API，可读性更好
- 通过 `ExecuteAsync()` 实现零GC异步执行
- 内置对象池
- 用于性能关键代码的状态重载

简单延迟使用协程；复杂序列或需要关注 GC 时使用 JAction。

## 性能优化

### Q: 游戏启动很慢？
**A:**
- 减少首包资源大小
- 使用异步加载
- 优化初始场景
- 预下载常用资源

### Q: 内存占用过高？
**A:**
- 及时卸载不用的资源包
- 使用对象池管理
- 定期清理缓存
- 优化贴图大小

### Q: 热更代码性能差？
**A:** v1.0 使用 HybridCLR，性能已大幅提升：
- 值类型计算提升最高 10 倍
- 使用性能分析工具定位瓶颈
- 检查是否是自身问题（如频繁内存分配导致GC等）

## 开发技巧

### Q: 如何快速调试？
**A:**
- 使用 Editor Dev Mode 跳过打包
- 启用 IngameDebugConsole 查看日志
- 使用条件编译区分环境
- 保留详细的日志输出

### Q: 如何处理平台差异？
**A:**
```csharp
#if UNITY_EDITOR
    // 编辑器代码
#elif UNITY_ANDROID
    // Android 平台代码
#elif UNITY_IOS
    // iOS 平台代码
#endif
```

### Q: 更新后出现问题怎么办？
**A:** 应急处理流程：
1. 立即回滚服务器资源
2. 通知用户清理缓存
3. 修复问题后重新发布
4. 考虑强制更新机制

## 相关资源

- [YooAsset 常见问题](https://www.yooasset.com/docs/FAQ)
- [HybridCLR 常见错误](https://www.hybridclr.cn/docs/help/commonerrors)
- [Obfuz 帮助文档](https://www.obfuz.com/docs/help/faq)

## 获取帮助

如果以上内容无法解决您的问题：

1. 在 [GitHub Issues](https://github.com/JasonXuDeveloper/JEngine/issues) 搜索或提问
2. 加入官方 QQ 群：921271552
3. 查看 [GitHub Discussions](https://github.com/JasonXuDeveloper/JEngine/discussions)
4. 提供详细的错误信息和复现步骤