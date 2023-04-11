# 开始使用 

该文章将告诉您如何初步使用JEngine

[[toc]]



## 开发环境

- Unity版本：2020.3.4 （请使用该版本及以上）

- U3D工程.net环境： .Net Framework 4.x / .Net 4.x / .Net Framework

- 热更工程.net环境： .Net Framework 4.x

- 开发系统：MacOS 13.0.1

  > 100%支持Windows



## 开启Unsafe

在Unity的PlayerSetting下，找到```Allow Unsafe Code```并启用（勾选）即可

## 修改.Net版本

在Unity的PlayerSetting下，将```API Compatibility Level``` 修改为```.NET 4.X ```即可

> 注意，Unity 2021开始，```API Compatibility Level```选项只有```Net Standard 2.0```以及```Net Framework```，选择后者即可，只要不是```Net Standard 2.x```就行



## 目录结构

> 该结构是UnityProject目录内的结构，非热更工程的目录结构都可以凭个人喜好决定是否遵守

#### Unity工程

- **Assets** - Unity工程根目录
  - **Dependencies** - 各种模块，内置ILRuntime/YooAsset/JEngine.Core模块
  - **HotUpdateResources** - 所有热更资源将存放在这里
    - **AddOn1** - 分包1
      - Other - 其他资源
      - Scene - 场景资源
    - **Main** - 主包
      - Common - 常用资源
        - Controller - 动画
        - Material - 材质
        - Prefab - 预制体
        - ScriptableObject - Unity脚本数据
      - Other - 其他资源
        - Audios - 音频
        - Fonts - 字体
        - Images - 图片
        - TextAssets - 文本
      - Dll - 热更代码
      - Scene -场景资源
      - Shader - Shader资源
      - Raw - 原生资源
  - **Scripts** - 无法热更新的代码
    - **Helpers** - 助手类文件夹，您自己的ILRuntime注册代码
    - **Adapters** - 适配器类文件夹，生成ILRuntime适配器后会创建此文件夹，包含ILRuntime的适配器，用于热更工程继承本地接口和类
    - **Examples** - 一些示范代码
  - **Init.unity** - 启动游戏的场景

#### 热更代码目录

- **HotUpdateScripts** - 热更代码项目
  - **Program.cs** - 启动游戏的代码, **你可以更改里面的东西，但请不要删除或更改该脚本的SetupGame和RunGame方法**
  - **JEngine** - **请勿删除**，JEngine部分源码在里面，**每次更新覆盖该目录**
    - **Examples** - JEngine的Demo源码





## 快速开始（编辑器下开发流程）

> 请按照以下顺序进行操作

1. **下载该框架**，记得有可能需要解压文件，不然会报错
2. 将项目的**UnityProject目录用Unity打开**
3. 首次打开会生成个**lock文件**到Assets目录下，**请勿删除**，同时还会弹出来一个提示，这个提示记得读一下
4. 导入后不应该有报错，如果还有报错，请看[常见问题](./FAQ.md)
5. 打开并进入**Init**场景
6. 无需进行任何修改，直接**编辑器下运行自带的Demo**，注意**留意控制台**
7. 这个时候就可以**打开热更工程**了，也就是```path/to/JEngine/UnityProject/HotUpdateScripts```目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件
8. **修改热更工程**，例如在```Program.cs```的```RunGame```方法内加个Log
9. **编译热更工程**，如果出现问题（例如跳过），请看[常见问题](./FAQ.md)
10. 第一次编译热更工程后，回到Unity会有个弹窗输入加密密码，这个密码是用来加密Dll的，输入16个字符串即可，后续可以在JEngine面板修改
11. （可选）若有需求，可以编辑一下```HotUpdateResources/Main/Scene/Game.unity```场景
12. **编辑器下再次运行游戏**，修改的热更代码应该会自动生效

   > 到这里，您已经完成了在编辑器下开发可热更新游戏的第一步了，恭喜！






