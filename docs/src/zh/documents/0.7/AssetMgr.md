# AssetMgr

AssetMgr是JEngine封装的加载热更资源/场景的工具

AssetMgr需要先初始化分包才可使用，需要参考[Updater使用](./Updater.md)

[[toc]]



### 使用接口

- 是否是真机模式

  ```csharp
  AssetMgr.RuntimeMode
  ```

- 同步加载主包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）

  ```csharp
  AssetMgr.Load(资源全路径)
  ```

- 同步加载指定分包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）

  ```csharp
  AssetMgr.Load(资源全路径,分包名称) where T : UnityEngine.Object
  ```

- 同步加载主包泛型资源

  ```csharp
  AssetMgr.Load<T>(资源全路径) where T : UnityEngine.Object
  ```

- 同步加载指定分包泛型资源

  ```csharp
  AssetMgr.Load<T>(资源全路径,分包名称) where T : UnityEngine.Object
  ```

- 异步加载主包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）

  ```csharp
  await AssetMgr.LoadAsync(资源全路径)
  ```

- 异步加载指定分包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）

  ```csharp
  await AssetMgr.LoadAsync(资源全路径,分包名称) where T : UnityEngine.Object
  ```

- 异步加载主包泛型资源

  ```csharp
  await AssetMgr.LoadAsync<T>(资源全路径) where T : UnityEngine.Object
  ```

- 异步加载指定分包泛型资源

  ```csharp
  await AssetMgr.LoadAsync<T>(资源全路径,分包名称) where T : UnityEngine.Object
  ```

- 卸载路径资源

  ```csharp
  AssetMgr.Unload(资源全路径,分包名称 = null)
  ```

- 同步加载场景

  ```csharp
  AssetMgr.LoadScene(资源全路径, 是否以Additive加载 = false, 分包名称 = null)
  ```

- 异步加载场景

  ```csharp
  AssetMgr.LoadSceneAsync(资源全路径, 是否以Additive加载 = false, 分包名称 = null,
              Action<float> 加载中的回调 = null,
              Action<AsyncOperation> 加载完成的回调 = null)
  ```

- 卸载全部当前场景资源

  > 该接口会在切换场景时自动调用

  ```csharp
  AssetMgr.RemoveUnusedAssets()
  ```

  





### BPath

BPath是每次[打AB](./BuildAb.md)后自动生成的文件，会生成到热更工程，里面包含了全部打入AB的资源的全路径，可以使用BPath的字段来快速加载指定路径的资源