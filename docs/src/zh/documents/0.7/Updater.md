# Updater使用

::: tip

JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是**Updater**和**InitJEngine**，本文将讲述```Updater```的API以及用法

:::

### 编辑器下配置

Updater有6个字段需要在编辑器下配置（Init场景），分别是：

- Base URL，即资源下载地址，请确保部署热更资源后```BaseUrl/资源分包/VersionLog.txt```等文件可以访问
- Game Scene，即热更资源更新成功后跳转的场景，这个场景必须打在主包内（即```Assets/HotUpdateResources/Scene```下），该字段需要输入全路径（Assets开头），建议在Unity的Project窗口下选中对应场景然后右键```Copy Path```然后黏贴到这个字段里
- Main Package Name，即热更主包名称，默认是Main，如果没改过热更资源配置，就不需要修改
- Main Package Key，即热更主包加密秘钥，默认是空的，如果没改过热更资源配置或没有为热更主包配置密码，留空即可
- Main Package Check CRC，即热更主包是否需要CRC校验，默认开启，不开启的话初始化热更资源更快，但是不能确保热更资源有没有被篡改
- Mode，即运行模式，Develop代表开发模式，Local代表离线模式，Build代表真机模式（即下载模式）

### 使用

默认的Demo下有个Button，该Button的点击事件就是调用```Updater```的```StartUpdate```方法，即请求更新主包资源。

```StartUpdate```方法内本质上就是更新分包的接口调用，如果需要进行一些修改（如不点击按钮，直接请求更新），在Updater的Start周期之后调用```StartUpdate```即可

::: warning

一定要先请求更新主分包并进入主分包的场景，因为热更代码只会存在于主分包内，框架底层的设计是在进入主分包场景后启动热更代码

:::



### 接口

Updater是一个用于管理热更资源的脚本，集成了以下功能：

- 获取分包信息

  ```csharp
  var info = await Updater.CheckPackage(包名字符串, 是否校验CRC布尔值);
  ```

- 更新指定分包

  | 参数                | 描述                                                         |
  | ------------------- | ------------------------------------------------------------ |
  | bundlePackageName   | 分包名                                                       |
  | updater             | IUpdater对象，可以给UI界面控制脚本继承IUpdater后注册对应事件，或创建BaseUpdater对象并注册事件回调 |
  | checkCRC            | 校验CRC，默认true，开启后可防止用户篡改本地热更资源，但是会影响初始化速度 |
  | package             | 分包信息，可以通过CheckPackage获取，也可以留空自动根据分包名获取 |
  | key                 | 分包加密密钥，没加密就留空或写null，或者不写该参数           |
  | nextScene           | 分包下载完毕后跳转到的分包内的场景，需要全路径，留空或null就不跳转 |
  | onMessage           | 文本提示回调                                                 |
  | onProgress          | 下载进度回调（范围是0~1）                                    |
  | onVersion           | 版本提示回调                                                 |
  | onLoadSceneProgress | 场景跳转回调                                                 |
  | onLoadSceneFinished | 场景加载完毕回调                                             |

  ```csharp
  Updater.UpdatePackage(string bundlePackageName, IUpdater updater, bool checkCRC = true,
          UpdateBundleDataInfo package = null, string key = null, string nextScene = null)
  ```

  ```csharp
  Updater.UpdatePackage(string bundlePackageName, IUpdater updater, bool checkCRC = true,
          string key = null,
          string nextScene = null)
  ```

  ```csharp
  Updater.UpdatePackage(string bundlePackageName, bool checkCRC = true,
          UpdateBundleDataInfo package = null, string key = null,
          string nextScene = null,
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

