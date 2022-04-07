# 开始使用 

该文章将告诉您如何初步使用JEngine

[[toc]]



## 开发环境

- Unity版本：2019.3.13f1 （请使用该版本及以上）

- U3D工程.net环境： .Net Framework 4.x

- 热更工程.net环境： .Net Framework 4.x

- 开发系统：MacOS 10.15.5

  > 100%支持Windows



## 下载方式-非常重要

> 因为JEngine使用了Git的Submodule模块来安装子模块，下载本框架源码不推荐直接从网站下载zip，目前有3种下载方式：

1. 方法一，直接**下载zip**，然后进入UnityProject/Assets/Dependencies，解压里面的zip（zip下载必看）

2. 方法二，先```git clone```再**安装子模块**

   ```bash
   git clone git@github.com:JasonXuDeveloper/JEngine.git
   cd JEngine
   git submodule init
   git submodule update
   ```

3. 方法三，git clone的时候顺带安装子模块   ----   **推荐**

   ```bash
   git clone git@github.com:JasonXuDeveloper/JEngine.git --recursive
   ```

> 注，这里的github地址可以换为gitee地址
>
> 如果安装submodule的时候报错了，则需要配置Github（或Gitee）的ssh key



## 目录结构

> 该结构是UnityProject目录内的结构，非热更工程的目录结构都可以凭个人喜好决定是否遵守

#### Unity工程

- **Assets** - Unity工程根目录
  - **Dependencies** - JEngine用到的一些第三方插件，更新时替换该目录内相关的插件
  - **HotUpdateResources** - 所有热更资源将存放在这里
    - **AddOns** - 分包
      - **AddOn1** - 分包1
    - **Controller** - 动画
    - **Dll** - 该目录存放热更代码
    - **Material** - 材质
    - **Prefab** - 预制体
    - **Scene** - 场景
    - **ScriptableObject** - Unity的可程序化物件
    - **TextAsset** - 文本资源
    - **UI** - 图片资源
    - **Other** - 其他任意东西，只要能被加载的都可以丢在这里
  - **Scripts** - 无法热更新的代码
    - **InitJEngine.cs&LoadILRuntime.cs** - **十分重要**的文件，用于启动游戏，每次更新必须替换该2个文件
    - **Helpers** - 助手类文件夹，包含ILRuntime注册代码
    - **Adapters** - 适配器类文件夹，生成ILRuntime适配器后会创建此文件夹，包含ILRuntime的适配器，用于热更工程继承本地接口和类
    - **APIs** - 往该文件夹里放您的代码
  - **Init.unity** - 启动游戏的场景

#### 生成目录

- **Builds** - 生成的客户端可以放在这里

#### 热更资源生成目录

- **DLC** - 热更资源导出目录
- **EncryptsAssets** - 加密热更资源导出目录

#### 热更代码目录

- **HotUpdateScripts** - 热更代码项目
  - **Program.cs** - 启动游戏的代码, **你可以更改里面的东西，但请不要删除或更改该脚本的SetupGame和RunGame方法**
  - **JEngine** - **请勿删除**，JEngine部分源码在里面，**每次更新覆盖该目录**
    - **Examples** - JEngine的Demo源码





## 快速开始

> 请按照以下顺序进行操作

1. **[下载](#下载方式-非常重要)该项目**
2. 将项目的**UnityProject目录用Unity打开**
2. 首次打开会生成个**lock文件**到Assets目录下，**请勿删除**，同时还会有个提示
3. 找到**HotUpdateResources/Scene**, 确保你能找到**Game.unity**，并且**HotUpdateResources/DLL/~Hidden文件夹中有生成的DLL文件（这个文件夹Unity内看不见）**
4. 导入后不应该有报错，如果还有报错，请看[常见问题](./FAQ.md)
5. 无需进行任何修改，尝试在[不同的模式](#运行模式)运行自带的Demo，注意留意控制台
6. 这个时候就可以打开热更工程了，也就是```path/to/JEngine/UnityProject/HotUpdateScripts```目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件
7. 修改热更工程，例如在```Program.cs```的```RunGame```方法内加个Log
8. 编译热更工程，如果出现问题（例如跳过），请看[常见问题](./FAQ.md)
9. 尝试[打包热更资源](./BuildAB.md)
10. 尝试打包游戏（APK、EXE等），注意[打包事项](#打包事项)
11. **现在，运行游戏，即可体验热更功能！**

   > 到这里，您已经完成了热更游戏的第一步，恭喜！



## 打包事项

生成项目的时候，**为了避免冗余，请手动删除热更场景**（开发模式会自动将热更场景加入Build Settings）

<img src="https://s1.ax1x.com/2020/07/20/Uhxcuj.jpg" alt="guide4" style="width:50%;margin-left:25%" />



## 运行模式

::: tip

JEngine可以使用三种模式运行游戏，分别是：开发模式，离线模式，真机模式

:::

1. 开发模式

   1. 直接编辑器下运行游戏
   2. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更

2. 离线模式

   1. 参考[打包热更资源](./BuildAB.md)打出AB包
   2. 在Unity编辑器菜单栏选择Tools/BuildAsset/Copy资源到StreamingAssets
   3. 控制台输出复制成功后，进入Init场景，将```Updater```的```Mode```设置为```Local```
   4. 尝试运行游戏
   5. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更

3. 真机模式

   1. 参考[打包热更资源](./BuildAB.md)打出AB包

   2. 在资源服务器上创建DLC目录

      - 如果未开启AB加密（默认），就将UnityProject/DLC内的文件上传到资源服务器的DLC目录下
      - 如果开启了AB加密（需要自己配置），就将UnityProject/EncryptAssets内的文件上传到资源服务器的DLC目录下

   3. 进入Init场景，将将```Updater```的```Mode```设置为```Build```

   4. 将```Updater```的```BaseURL```设置为```http(s)://资源服务器地址/DLC```

   5. 尝试运行游戏

      ::: tip

        - 资源服务器上创建的目录名字可以随意，但是```Updater```的```BaseURL```的地址必须是服务器上创建的文件夹的名字结尾
        - 不论资源服务器上创建的目录是什么名字，打包热更资源后都应该根据是否使用加密将```UnityProject/DLC```或```UnityProject/EncryptAssets```下的文件上传上去
        - 如果打了AB后通过菜单栏工具将其复制到了```StreamingAssets```，那么真机模式下会基于```StreamingAssets```内的资源进行增量热更

      :::

   6. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更

