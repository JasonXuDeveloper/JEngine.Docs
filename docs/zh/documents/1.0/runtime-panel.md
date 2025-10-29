# 运行时面板

运行时面板是 JEngine 的核心配置界面，通过 `Bootstrap` 对象的 Inspector 面板进行设置。

## 访问面板

1. 打开 `Init` 场景
2. 在 Hierarchy 中选择 `Bootstrap` 对象
3. 在 Inspector 中查看和配置各项设置

## Development Settings（开发设置）

### Editor Mode（编辑器模式）
切换不同的运行模式：
- **Editor Dev Mode（红色）** - 编辑器开发模式，直接使用本地热更资源，无需下载
- **Host Play Mode（绿色）** - 主机播放模式，从服务器下载热更资源

**使用场景**：
- 开发调试时使用 Editor Dev Mode，提高开发效率
- 测试和发布时使用 Host Play Mode，模拟真实环境

## Server Settings（服务器设置）

::: tip
使用 **Standalone** 模式时，无需配置服务器，资源将从 StreamingAssets 目录加载
:::

### Default Host Server（默认主机服务器）
设置热更资源的主要下载地址：
- **格式**：`https://cdn.domain.com` 或 `http://127.0.0.1`
- **注意**：不要包含平台和分包路径，系统会自动拼接
- **子目录**：如果资源在子目录，需包含完整路径，如 `https://cdn.domain.com/games`

### Enable Fallback Host Server（启用备用服务器）
开关选项，启用后可配置备用服务器。

### Fallback Host Server（备用主机服务器）
备用服务器地址，当主服务器连接失败时自动切换：
- 只有在启用备用服务器后才显示此选项
- 提供冗余保障，提高资源下载成功率

### Append Time Ticks（请求资源添加的时间戳）
用于避免存放热更资源的服务器出现缓存问题，会在请求资源的时候传入时间戳，一般情况开启即可
- **注意**：某些CDN需要关闭自动添加的时间戳，例如[Unity提供的UOS](https://www.yooasset.com/docs/MiniGame#%E5%B0%8F%E6%B8%B8%E6%88%8F%E5%AE%BF%E4%B8%BB)

## Asset Settings（资源设置）

### Target Platform（目标平台）
选择应用运行的目标平台：
- **Regular** - 常规平台（iOS、Android、Windows、MacOS、WebGL）
- **Standalone** - 单机模式，资源从StreamingAssets加载，无需配置服务器
- **WeChat** - 微信小游戏平台
- **Douyin** - 抖音小游戏平台
- **Alipay** - 支付宝小游戏平台
- **TapTap** - TapTap 小游戏平台

::: warning
小游戏平台需要在Unity下切换到`WebGL`构建平台
:::

### Package Name（包名称）
主热更包的名称：
- 默认为 `main`
- 必须与编辑器面板中构建的包名称一致
- 下拉列表会自动检测项目中可用的包

### Hot Update Assemblies（热更程序集）
热更代码的程序集列表文件：
- 用于指定哪些程序集需要热更新
- 通常使用默认配置

### Hot Update Scenes（热更场景）
热更场景的配置文件：
- 定义哪些场景属于热更资源
- 与 YooAsset 配置关联

### Hot Update Classes（热更类）
热更类的配置信息：
- 指定热更代码中的入口类
- 默认指向 `EntryPoint` 类

### Hot Update Methods（热更方法）
热更方法的配置：
- 定义热更代码的入口方法
- 与热更类配合使用

::: warning
必须是静态函数，可以是`void`, `ValueTask`, `Task`, `UniTask`，后三种返回类型会以异步方式调用
:::

### AOT DLL List（AOT DLL 列表）
AOT（Ahead-of-Time）编译的 DLL 列表文件：
- 用于 HybridCLR 的 AOT 泛型补充
- 确保热更代码能正确调用主工程的泛型方法

## Security Settings（安全设置）

### Dynamic Secret Key（动态密钥）
热更资源的动态解密密钥文件：
- 用于解密热更资源中的动态密钥
- 通常位于 `Assets/HotUpdate/Obfuz/` 目录

### Encryption Option（加密选项）
选择资源解密方式，必须与编辑器面板打包时的加密方式一致：
- **Xor** - 异或解密（推荐，速度快）
- **Aes** - AES 解密（安全性高）
- **ChaCha20** - ChaCha20 解密（安全性最高）

### Manifest Config（清单配置）
资源清单的配置对象：
- 自动根据选择的加密模式从 `Resources/EncryptConfigs/` 目录读取对应的配置文件
- 管理资源包的版本信息和加密参数
- 通常无需手动修改，系统会根据 Encryption Option 自动选择

### Bundle Config（包配置）
资源包的配置对象：
- 自动根据选择的加密模式从 `Resources/EncryptConfigs/` 目录读取对应的配置文件
- 定义资源包的加载、缓存和解密策略
- 与所选加密模式的密钥配置关联

## UI Settings（界面设置）

Init 场景中已经默认配置了 UI 组件，通常无需修改。如需自定义界面，可以调整这些字段：

### Version Text（版本文本）
显示当前版本信息的 UI 文本组件，用于向用户展示当前应用版本。

### Update Status Text（更新状态文本）
显示热更新状态的 UI 文本组件，显示 "检查更新中..."、"下载中..." 等状态信息。

### Download Progress Bar（下载进度条）
显示资源下载进度的 UI 组件，实时展示下载进度。

### Start Button（启动按钮）
启动热更流程的 UI 按钮，用户点击后开始热更新检查和下载。

## 运行流程

### 开发模式流程
1. 设置 Editor Mode 为 **Editor Dev Mode**
2. 运行游戏
3. 系统直接加载本地 `Assets/HotUpdate/` 目录下的资源
4. 无需网络连接，快速进入热更场景

### 发布模式流程
1. 设置 Editor Mode 为 **Host Play Mode**
2. 配置 Default Host Server（必需）
3. 设置正确的 Encryption Option（与打包时一致）
4. 选择对应的 Target Platform
5. 运行游戏
6. 系统自动检查版本、下载并加载热更资源

### 单机模式流程
1. 设置 Editor Mode 为 **Host Play Mode**
2. 设置 Target Platform 为 **Standalone**
3. 确保已构建热更资源包（StreamingAssets 目录下有资源）
4. 无需配置服务器地址
5. 运行游戏
6. 系统直接从 StreamingAssets 加载热更资源

## 最佳实践

### 开发阶段
1. 使用 Editor Dev Mode 进行快速迭代
2. 定期切换到 Host Play Mode 测试完整流程
3. 使用本地服务器进行网络功能测试

### 测试阶段
1. 配置与生产环境相同的加密选项
2. 测试备用服务器的切换功能
3. 验证不同平台的资源加载

### 生产发布
1. 确保服务器地址配置正确
2. 启用适当级别的加密保护
3. 配置备用服务器提高可靠性
4. 设置用户友好的 UI 反馈

## 常见问题

### Q: 资源下载失败怎么办？
**A:** 检查以下项目：
- 服务器地址是否正确且可访问
- 资源是否已正确上传到服务器
- 加密模式是否与打包时一致
- 网络连接是否稳定
- Package Name 是否与服务器上的包名称匹配

### Q: Editor Dev Mode 和 Host Play Mode 有什么区别？
**A:**
- **Editor Dev Mode**：直接使用本地资源，不进行网络下载，适合开发调试
- **Host Play Mode**：从服务器下载资源，模拟真实运行环境，适合测试和发布

### Q: 如何配置备用服务器？
**A:**
1. 勾选 "Enable Fallback Host Server"
2. 在显示的 "Fallback Host Server" 字段中输入备用服务器地址
3. 确保备用服务器上的资源与主服务器保持同步

### Q: 小游戏平台需要特殊配置吗？
**A:**
- 选择对应的 Target Platform（WeChat/Douyin/Alipay/TapTap）
- 注意各平台对资源大小和网络请求的限制
- 某些平台可能需要特殊的域名白名单配置

## 注意事项

- 服务器地址不要以 `/` 结尾
- 加密选项必须与编辑器面板打包时保持一致
- Package Name 必须与服务器上部署的包名称完全匹配
- 小游戏平台有特殊的资源加载限制和安全要求
- UI 组件的配置是可选的，但建议配置以提供更好的用户体验
- 动态密钥文件的路径必须正确，否则可能导致解密失败