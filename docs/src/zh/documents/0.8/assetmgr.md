# AssetMgr

AssetMgr是在JEngine用来进行热更资源操作的助手

[[toc]]

## 前言
下面提到的成员/函数都是在`AssetMgr`类下的，这个类型是个单例类型，直接使用`AssetMgr.XXX`即可。

## 真机模式
`RuntimeMode`，Bool类型，为True时代表当前的运行模式为**非编辑器下模拟**的模式

## 运行平台
`GetPlatform`，String类型，返回当前平台的字符串名称

## 更新分包
```csharp
async Task UpdatePackage(string packageName, IUpdater updater = null)
```
对分包进行更新，不需要更新的分包会直接返回

### 参数
- `packageName`，需要进行分包的名称，分包可以在热更资源配置界面进行配置
- `updater`，更新分包时会有各种各样的事件，可以传一个实现了`IUpdater`接口的类型的实例对象来调用这些事件的回调
  > 比如首页Init场景，就挂有一个Updater的脚本负责UI更新等事件，这个脚本就继承了Updater。
  > 如果不想再新建个继承IUpdater的类型，但又想处理回调，可以直接传参`new BaseUpdater`，该类型的构造函数里可以传各种回调事件的匿名委托。

### 示例
该例子来自热更工程的`AddOnDemo`：
```csharp
var packageName = "AddOn1";
await AssetMgr.UpdatePackage(packageName);
```
这个例子对`AddOn1`分包进行了异步更新（通过await进行等待，但不会阻塞线程）



## 加载资源

注意，加载资源可选择返回`AssetOperationHandle`，这个东西用于释放加载到内存的资源

### 同步接口

- 在主分包同步加载资源：

  ```csharp
  Object Load(string path, Type type)
  ```

  ```csharp
  Object Load(string path, Type type, out AssetOperationHandle handle)
  ```

  `path`，资源路径，需要输入全路径（例如`Assets/HotUpdateResouces/Main/Common/Prefab/test.prefab`），如果开启了YooAsset短路径的话，可以使用短路径，默认没开启短路径。

  `type`，资源类型，例如`GameObject`、`TextAsset`、`AudioClip`等

- 在其他分包同步加载资源

  ```csharp
  Object Load(string path, string package, Type type)
  ```

  ```csharp
  Object Load(string path, string package, Type type, out AssetOperationHandle handle)
  ```

  `path`与`type`同上面的参数

  `package`，分包名，不过需要确保本地有这个分包的资源（可以先更新分包，然后再进行从该分包加载资源）

- 上述接口的泛型版本

  ```csharp
  T Load<T>(string path)
  ```

  ```csharp
  T Load<T>(string path, out AssetOperationHandle handle)
  ```

  ```csharp
  T Load<T>(string path, string package)
  ```

  ```csharp
  T Load<T>(string path, string package, out AssetOperationHandle handle)
  ```

  `T`，需要加载的资源的类型的泛型参数，例如`Load<GameObject>`

### 异步接口

- 在主分包异步加载资源：

  ```csharp
  async Task<T> LoadAsync<T>(string path)
  ```

  ```csharp
  async Task<Object> LoadAsync(string path, Type type) 
  ```

  ```csharp
  async Task<(T, AssetOperationHandle)> LoadAsyncWithHandle<T>(string path)
  ```

  ```csharp
  async Task<(Object, AssetOperationHandle)> LoadAsyncWithHandle(string path, Type type) 
  ```

  `path`，资源路径，需要输入全路径（例如`Assets/HotUpdateResouces/Main/Common/Prefab/test.prefab`），如果开启了YooAsset短路径的话，可以使用短路径，默认没开启短路径。

  泛型参数`T`或`type`，为资源类型，例如`GameObject`、`TextAsset`、`AudioClip`等

- 在其他分包同步加载资源

  ```csharp
  async Task<T> LoadAsync<T>(string path, string package)
  ```

  ```csharp
  async Task<Object> LoadAsync(string path, string package, Type type) 
  ```

  ```csharp
  async Task<(T, AssetOperationHandle)> LoadAsyncWithHandle<T>(string path, string package)
  ```

  ```csharp
  async Task<(Object, AssetOperationHandle)> LoadAsyncWithHandle(string path, string package, Type type)
  ```

  `path`、`T`与`type`同上面的参数

  `package`，分包名，不过需要确保本地有这个分包的资源（可以先更新分包，然后再进行从该分包加载资源）



> 加载资源后，如果取得了`Handle`，可以根据YooAsset文档里提到的方式对`Handle`进行卸载



## 加载场景

只推荐使用异步方法

```csharp
async Task LoadSceneAsync(string path, bool additive = false, string package = null)
```

`path`，场景路径，需要输入全路径，如果开启了YooAsset短路径的话，可以使用短路径，默认没开启短路径。

`additive`，是否为额外加载的场景（为true时不会卸载当前场景）

`package`，分包名



### 示例

```csharp
var packageName = "AddOn1";
await AssetMgr.UpdatePackage(packageName);
await AssetMgr.LoadSceneAsync("Assets/HotUpdateResources/AddOn1/Scene/test.unity", package: packageName);
Debug.Log("进入分包场景");
Debug.Log((await AssetMgr.LoadAsync<TextAsset>("Assets/HotUpdateResources/AddOn1/Other/test.txt", packageName)).text);
```

这个例子先是更新了`AddOn1`分包，接着进入了分包内的`test`场景，进入成功后加载并打印了分包内的`test.txt`文本的内容



## 加载原生资源

原生资源指的是非Unity资源，YooAsset支持将原生资源的打包与加载，加载原生资源的接口会直接返回原生资源的Handle，用户可以直接读取原生资源的二进制内容或文本内容，亦或者通过Handle对资源进行其他操作

原生资源可以在热更资源打包配置里进行配置

- 同步加载原生资源：

  ```csharp
  RawFileOperationHandle LoadRaw(string path)
  ```

  ```csharp
  RawFileOperationHandle LoadRaw(string path, string package)
  ```

  `path`，资源全路径，需要输入全路径，如果开启了YooAsset短路径的话，可以使用短路径，默认没开启短路径。

  `package`，资源分包

- 异步加载原生资源：

  ```csharp
  async Task<RawFileOperationHandle> LoadRawAsync(string path) 
  ```

  ```csharp
  async Task<RawFileOperationHandle> LoadRawAsync(string path, string package)
  ```

  `path`与`package`同上





## 卸载资源

- 一般的资源，持有`Handle`后直接调用卸载函数（`Release`）即可

- 批量卸载一个分包内的没用到的资源，可以调用` RemoveUnusedAssets(string package = null)`接口，`package`为分包名，不传则默认为主包
