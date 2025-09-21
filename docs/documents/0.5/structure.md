# 目录结构

该文章将告诉您JEngine的目录结构是什么样子的


## Unity工程目录
- **Assets** - Unity工程根目录
  - **Dependencies** - JEngine用到的一些第三方插件，更新时替换该目录
  - **HotUpdateResources** - 所有热更资源将存放在这里
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
    - **Init.cs&InitILRT.cs** - **十分重要**的文件，用于启动游戏，每次更新替换该2个文件
    - **Helpers** - 助手类文件夹，包含ILRuntime注册代码
    - **Adapters** - 适配器类文件夹，生成ILRuntime适配器后会创建此文件夹，包含ILRuntime的适配器，用于热更工程继承本地接口和类
    - **APIs** - 往该文件夹里放您的代码
  - **Init.unity** - 启动游戏的场景

## 生成目录
- **Builds** - 生成的客户端可以放在这里

## 热更资源生成目录
- **DLC** - 热更资源导出目录

## 热更代码目录
- **HotUpdateScripts** - 热更代码项目
  - **Program.cs** - 启动游戏的代码, **你可以更改里面的东西，但请不要删除或更改该脚本的RunGame方法**
  - **JEngine** - **请勿删除**，JEngine部分源码在里面，**每次更新覆盖该目录**
  - **Examples** - JEngine的Demo源码

