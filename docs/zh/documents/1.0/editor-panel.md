# 编辑器面板

JEngine 提供了一个编辑器面板，用于管理热更新资源的构建和打包。

## 打开面板

在 Unity 编辑器的顶部菜单栏，点击 `JEngine/JEngine Panel` 即可打开编辑器面板。

## 面板字段设置

### JEngine Settings（JEngine 设置）
**（位于面板顶部，第一个渲染的分组）**

#### Startup Scene（启动场景设置）
- **Startup Scene** - 下拉选择框，设置项目的初始化场景
- **Jump to Start up Scene** - 开关按钮，控制是否自动跳转到启动场景

**功能说明**：
- 当 `Jump to Start up Scene` 开启时，在 Unity 开发环境下运行非初始化场景时，会自动跳转到指定的启动场景
- 跳转后会走完整的热更流程：加载热更代码 → 进入热更场景 → 调用热更代码
- 这个功能便于开发时快速测试热更流程，无需每次都从初始化场景开始运行

### Package Settings（包设置）

#### Package Name（包名称）
下拉选择框，选择需要打包的热更资源分包：
- **main** - 主分包（包含热更代码）
- **AddOn1** - 示例分包1（JEngine 提供的例子，可删除）
- **Raw** - 示例原生资源包（JEngine 提供的例子，可删除）
- **其他自定义分包** - 用户可以根据需要创建自己的分包

#### Build Target（构建目标）
- 显示当前构建平台
- 点击 `Set to Current Active Target` 按钮自动设置为当前激活的平台
- 支持的平台：Android、iOS、Windows、MacOS、WebGL 等

### Build Options（构建选项）

#### Encryption Mode（加密模式）
下拉选择框，选择热更资源的加密方式：
- **XOR** - 异或加密（推荐，速度快）
- **AES** - AES 加密（安全性高）
- **ChaCha20** - ChaCha20 加密（安全性最高）

#### Manifest Config（清单配置）
资源清单的配置对象：
- 系统会根据选择的加密模式自动从 `Resources/EncryptConfigs/` 目录读取对应配置
- 管理资源包的版本信息和加密参数
- 通常无需手动修改

#### Bundle Config（包配置）
资源包的配置对象：
- 系统会根据选择的加密模式自动从 `Resources/EncryptConfigs/` 目录读取对应配置
- 定义资源包的加载、缓存和解密策略
- 与所选加密模式的密钥配置关联

### Hot Update Scenes（热更新场景）
- 显示 `Assets/HotUpdate/Scenes` 目录下的场景列表
- 支持分页浏览
- 双击场景可快速在 Unity 中打开

## 构建按钮

### Build All Hot Update Res (Code + Assets)
**什么时候点击**：
- 修改了热更代码时
- 修改了 Obfuz 配置时
- 首次构建主分包时

**点击后会执行**：
1. 编译热更代码（`Assets/HotUpdate/Code`）
2. 生成 AOT 泛型补充 DLL
3. 应用代码混淆（如果启用 Obfuz）
4. 打包热更资源为 AssetBundle
5. 生成新版本号

**日志显示**：
- 编译进度信息
- 混淆处理状态
- 资源打包进度
- 完成后显示版本号和输出路径

**版本号生成**：
- 格式：基于时间戳的数字版本号（如：24120115300）
- 算法：`(year-2000)*10000000 + month*100000 + day*1000 + hour*100 + minute*10 + second/6`
- 确保每次构建都有唯一的版本号

### Build Hot Update Assets Only
**什么时候点击**：
- 只修改了热更资源（场景、预制体、材质等）
- 代码没有变化时

**点击后会执行**：
1. 分析资源依赖关系
2. 打包变更的资源为 AssetBundle
3. 更新资源版本信息

**日志显示**：
- 资源扫描进度
- 打包处理状态
- 完成后的版本号和路径

### Clean Built Packages
**什么时候点击**：
- 遇到构建问题需要清理缓存时
- 准备全新构建时

**点击后会执行**：
1. 删除 `UnityProject/Bundles` 目录下的构建产物
2. 清理构建过程中的临时文件

**日志显示**：清理操作的详细信息

## 构建状态监控

面板提供实时的构建状态反馈：
- **进度条**：显示当前构建的整体进度
- **状态标签**：显示正在执行的具体步骤
- **日志区域**：显示详细的构建过程信息、错误提示和成功确认

## 输出结果

构建成功后，资源输出到：
```
UnityProject/Bundles/{平台}/{分包名}/{版本号}/
```

例如：
```
UnityProject/Bundles/WebGL/main/1.0.0/
```

面板会在日志中显示完整的输出路径和版本信息，便于后续将资源上传到 CDN 服务器。

## 资源部署

### 上传路径结构
需要在服务器/CDN 上按以下结构部署资源：
```
https://cdn.domain.com/
├── WebGL/           # 平台目录
│   ├── main/        # 主分包目录（必须）
│   │   ├── PackageManifest_main.version
│   │   ├── PackageManifest_main.hash
│   │   └── [其他资源文件]
│   ├── AddOn1/      # 示例分包1目录（可删除）
│   │   ├── PackageManifest_AddOn1.version
│   │   └── [其他资源文件]
│   ├── Raw/         # 示例原生资源包目录（可删除）
│   ├── MyFeature/   # 用户自定义分包示例
│   └── DLC1/        # 用户自定义分包示例
├── Android/         # Android平台
└── iOS/            # iOS平台
```

### 部署步骤
1. 构建完成后，进入 `UnityProject/Bundles/{平台}/{分包}/{版本号}/` 目录
2. 将该版本目录下的所有文件直接复制到服务器的 `{平台}/{分包}/` 目录下
3. 例如：将 `UnityProject/Bundles/WebGL/main/24120115300/` 内的所有文件复制到 `https://cdn.domain.com/WebGL/main/` 目录
4. 确保服务器地址配置正确，如 `https://cdn.domain.com`
5. 注意服务器地址不要包含平台或分包路径，系统会自动拼接

## 使用流程

1. 选择分包（通常选择 `main`）
2. 点击 `Set to Current Active Target` 设置平台
3. 选择合适的加密模式
4. 根据修改内容选择对应的构建按钮
5. 观察日志确认构建成功
6. 将生成的资源按照上述路径结构上传到服务器