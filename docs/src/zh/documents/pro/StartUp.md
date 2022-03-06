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



### Updater使用

::: tip

JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是**Updater**和**InitJEngine**

:::

Updater有5个字段需要在编辑器下配置（Init场景），分别是：

- Base URL，即资源下载地址，请确保部署热更资源后```BaseUrl/资源分包/VersionLog.txt```等文件可以访问
- Game Scene，即热更资源更新成功后跳转的场景，这个场景必须打在主包内（即```Assets/HotUpdateResources/Scene```下），该字段需要输入全路径（Assets开头），建议在Unity的Project窗口下选中对应场景然后右键```Copy Path```然后黏贴到这个字段里
- Main Package Name，即热更主包名称，默认是Main，如果没改过热更资源配置，就不需要修改
- Main Package Key，即热更主包加密秘钥，默认是空的，如果没改过热更资源配置或没有为热更主包配置密码，留空即可
- Mode，即运行模式，Develop代表开发模式，Local代表离线模式，Build代表真机模式（即下载模式）

同时Updater也是一个用于管理热更资源的脚本，集成了以下功能：

- 获取分包信息

  ```csharp
  var info = await Updater.CheckPackage(包名字符串);
  ```

- 更新指定分包

  | 参数                | 描述                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | bundlePackageName   | 分包名                                                       |
  | updater             | IUpdater对象，可以给UI界面控制脚本继承IUpdater后注册对应事件，或创建BaseUpdater对象并注册事件回调 |
  | package             | 分包信息，可以通过CheckPackage获取，也可以留空自动根据分包名获取 |
  | key                 | 分包加密密钥，没加密就留空或写null，或者不写该参数           |
  | nextScene           | 分包下载完毕后跳转到的分包内的场景，需要全路径，留空或null就不跳转 |
  | onMessage           | 文本提示回调                                                 |
  | onProgress          | 下载进度回调（范围是0~1）                                    |
  | onVersion           | 版本提示回调                                                 |
  | onLoadSceneProgress | 场景跳转回调                                                 |
  | onLoadSceneFinished | 场景加载完毕回调                                             |

  ```csharp
  UpdatePackage(string bundlePackageName, IUpdater updater, string key = null, string nextScene = null)
  ```

  ```csharp
  UpdatePackage(string bundlePackageName, IUpdater updater, UpdateBundleDataInfo package = null, string key = null, string nextScene = null)
  ```

  ```csharp
  Updater.UpdatePackage(string bundlePackageName, string key = null, string nextScene = null,
          Action<string> onMessage = null, Action<float> onProgress = null, Action<string> onVersion = null,
          Action<float> onLoadSceneProgress = null, Action onLoadSceneFinished = null)
  ```

  

- 获取指定分包本地版本

  ```csharp
  var localVer = await Updater.GetLocalPackageVersion(包名字符串);
  ```

  ```csharp
  var localVer = await Updater.GetLocalPackageVersion(包名字符串, 分包信息);
  ```

  

- 获取指定分包服务器版本

  ```csharp
  var remoteVer = await Updater.GetRemotePackageVersion(包名字符串);
  ```

  ```csharp
  var remoteVer = await Updater.GetRemotePackageVersion(包名字符串, 分包信息);
  ```



### InitJEngine使用

::: tip

JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是**Updater**和**InitJEngine**

:::

InitJEngine有4个字段需要在编辑器下配置（Init场景），分别是：

- Key，即热更代码的加密秘钥，16位，应该与打包热更资源时给热更DLL配置的密码一样，可以在JEngine面板（菜单栏里找）内设置
- Use JIT，即代码热更模块ILRuntime加载热更代码时使用的模式，默认使用```JIT On Demand```，即一个代码被多次使用后开启寄存器提高性能，相关部分请自行从ILRuntime文档了解
- Use Pdb，即是否使用pdb调试，勾选后才能在Windows的Visual Studio下开启断点调试（需下载安装ILRuntime Debugger并运行游戏进入热更代码后开始调试），该字段仅在编辑器下的开发模式下生效
- Debug，即是否输出调试信息，JEngine有个分块解密热更代码模块会频繁输出相关信息

InitJEngine还有个热重载方法，[点击阅读](./HotReload/)



### Demo

::: tip

JEngine自带的Demo可以用3种模式跑：开发模式，离线模式，真机模式

:::

1. 开发模式
   1. 直接编辑器下运行游戏，忽略全部运行时报错，能进热更场景及输出Log到控制台就代表成功了，然后可以运行一下相关的功能Demo，注意看控制台
   2. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更

2. 离线模式

   1. 参考[打包热更资源](./BuildAB/)打出AB包
   2. 在Unity编辑器菜单栏选择Tools/BuildAsset/Copy资源到StreamingAssets
   3. 控制台输出复制成功后，进入Init场景，将```Updater```的```Mode```设置为```Local```
   4. 尝试运行游戏
   5. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更

3. 真机模式

   1. 参考[打包热更资源](./BuildAB/)打出AB包

   2. 在资源服务器上创建DLC目录

      - 如果未开启AB加密（默认），就将UnityProject/DLC内的文件上传到资源服务器的DLC目录下
      - 如果开启了AB加密（需要自己配置），就将UnityProject/EncryptAssets内的文件上传到资源服务器的DLC目录下

   3. 进入Init场景，将将```Updater```的```Mode```设置为```Build```

   4. 将```Updater```的```BaseURL```设置为```http(s)://资源服务器地址/DLC```

   5. 尝试运行游戏

      ::: tip

      - 资源服务器上创建的目录名字可以随意，但是```Updater```的```BaseURL```的地址必须是服务器上创建的文件夹的名字结尾

      - 不论资源服务器上创建的目录是什么名字，打包热更资源后都应该根据是否使用加密将```UnityProject/DLC```或```UnityProject/EncryptAssets```下的文件上传上去

      :::

   6. 尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更
