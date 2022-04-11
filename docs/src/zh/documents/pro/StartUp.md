# 开始使用

> JEngine无论是开源版还是Pro版本，下载下来后都是可以很轻松跑通的。

[[toc]]



### 要求

- Unity 2019及以上
- Odin Inspector插件



### 下载

下载可以直接在[GitHub仓库](https://github.com/JasonXuDeveloper/JEngine-Pro)上下载zip文件，或者使用Git工具进行Clone。

::: warning

1. 请使用仓库授权的GitHub账号

2. 由于git现在需要用ssh访问private仓库了，使用```git clone```时请确保当前的电脑的ssh key上传到了GitHub账号下，不然没办法拉取代码

:::



### 更新

::: warning

因为更新比较复杂，建议用版本控制工具保存项目，这样如果修改过源码，更新后也不怕遗漏

:::

更新需要替换以下内容：

- ```UnityProject/Assets/Dependencies```全部内容
- ```UnityProject/Assets/Scripts/InitJEngine.cs```、```UnityProject/Assets/Scripts/Updater.cs```、```UnityProject/Assets/Scripts/LoadILRuntime.cs```、```UnityProject/Assets/Scripts/UI```、```UnityProject/Assets/Scripts/Helpers```
- ```UnityProject/HotUpdateScripts/JEngine```

> 其中替换```UnityProject/Assets/Scripts/Helpers```时需注意保留自己之前注册过的代码，覆盖更新后记得重新注册回去



### 使用

1. [下载](#下载)完成后，使用Unity打开UnityProject
2. 这个时候应该会有很多报错，深吸一口气，不要慌，调整心态
3. 导入Odin Inspector（自备unitypackage或从Asset Store导入）
4. 导入后不应该有报错，如果还有报错，请看[常见问题](../0.7/FAQ.md)
5. 这个时候就可以打开热更工程了，也就是```path/to/JEngine-Pro/UnityProject/HotUpdateScripts```目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件
6. 尝试在[不同的模式](../0.7/startup.md#运行模式)运行Demo，注意留意控制台
7. 修改热更工程，例如在```Program.cs```的```RunGame```方法内加个Log
8. 编译热更工程，如果出现问题（例如跳过），请看[常见问题](../0.7/FAQ.md)
9. 尝试[打包热更资源](../0.7/BuildAB.md)
10. 尝试打包游戏，真机运行



### 加载热更资源

::: tip

加载热更资源或场景需要用全路径，建议使用热更工程的```BPath.cs```内的字段加载资源

:::

请参考```AssetMgr```内的接口，详细说明请参考[开源版0.7文档](../0.7/)


