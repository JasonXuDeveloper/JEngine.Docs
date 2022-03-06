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



### 使用

1. [下载](#下载)完成后，使用Unity打开UnityProject
2. 这个时候应该会有很多报错，深吸一口气，不要慌，调整心态
3. 导入Odin Inspector（自备unitypackage或从Asset Store导入）
4. 导入后不应该有报错，如果还有报错，请看[常见问题](./FAQ/)
5. 这个时候就可以打开热更工程了，也就是```path/to/JEngine-Pro/UnityProject/HotUpdateScripts```目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件
6. 尝试跑[Demo](#Demo)
7. 修改热更工程，例如在```Program.cs```的```RunGame```方法内加个Log
8. 编译热更工程，如果出现问题（例如跳过），请看[常见问题](./FAQ/)
9. 尝试[打包热更资源](./BuildAB/)
10. 尝试打包游戏，真机运行





### Demo

::: tip

JEngine自带的Demo可以用3种模式跑：开发模式，离线模式，真机模式

:::

1. 开发模式
   1. 直接编辑器下运行游戏，忽略全部运行时报错，能进热更场景及输出Log到控制台就代表成功了，然后可以运行一下相关的功能Demo，注意看控制台
   2. 尝试修改热更代码并编译，或热更资源，回到步骤1，尝试实现热更

2. 离线模式

   1. 参考[打包热更资源](./BuildAB/)打出AB包
   2. 在Unity编辑器菜单栏选择Tools/BuildAsset/Copy资源到StreamingAssets
   3. 控制台输出复制成功后，进入Init场景，将```Updater```的```Mode```设置为```Local```
   4. 尝试运行游戏
   5. 尝试修改热更代码并编译，或热更资源，回到步骤1，尝试实现热更

3. 真机模式

   1. 参考[打包热更资源](./BuildAB/)打出AB包

   2. 在资源服务器上创建DLC目录

      - 如果未开启AB加密（默认），就将UnityProject/DLC内的文件上传到资源服务器的DLC目录下
      - 如果开启了AB加密（需要自己配置），就将UnityProject/EncryptAssets内的文件上传到资源服务器的DLC目录下

   3. 进入Init场景，将将```Updater```的```Mode```设置为```Build```

   4. 将```Updater```的```baseURL```设置为```http(s)://资源服务器地址/DLC```

   5. 尝试运行游戏

      ::: tip

      - 资源服务器上创建的目录名字可以随意，但是```Updater```的```baseURL```的地址必须是服务器上创建的文件夹的名字结尾

      - 不论资源服务器上创建的目录是什么名字，打包热更资源后都应该根据是否使用加密将```UnityProject/DLC```或```UnityProject/EncryptAssets```下的文件上传上去

      :::

   6. 尝试修改热更代码并编译，或热更资源，回到步骤1，尝试实现热更
