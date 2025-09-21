# 热更资源工具

## AssetMgr

AssetMgr是JEngine封装的加载热更资源/场景的工具

如果不是加载主包资源时，AssetMgr需要先初始化分包才可使用，需要参考[Updater使用](./Updater.md)，要先调用UpdatePackage接口

::: tip
从Init场景进入游戏时底层会自动调用这个接口实现初始化主包，这就是加载主包资源不需要手动调用接口去初始化分包的原因；

但如果想使用其他包的资源必须先调用UpdatePackage接口去更新分包内容并初始化，然后再使用AssetMgr接口加载之类的；

注意，UpdatePackage也可以针对某个分包多次调用，可以自行决定，但是一般来讲使用UpdatePackage去更新一个分包一次后就可以正常加载这个分包内的资源了
:::

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






### 注意事项

- 进入热更场景必须用上面提到的接口，不然可能会导致无法进入，同时热更场景若被打入游戏包（如APK）内，则该场景无法被热更
- 文本文件建议改.txt后缀打入热更包，不然unity可能会屏蔽（.json是可以的，其他的自己试试）
- 二进制文件建议改.bytes后缀打入热更包，不然unity可能会屏蔽（.mp3，.wav是可以的，其他的自己试试）



### 使用示范

::: tip

此示范只演示同步或异步加载不同资源，以及该用啥类型，不演示其它接口

其它接口直接调用就好，然后根据参数进行传参

:::



- 加载预制体

  ```csharp
  GameObject prefab = AssetMgr.Load<GameObject>("预制体全路径.prefab");//同步加载主包的预制体
  GameObject prefab2 = await AssetMgr.LoadAsync<GameObject>("预制体全路径.prefab");//异步加载主包的预制体
  ```

- 加载文本或二进制文件

  ```csharp
  TextAsset txt = AssetMgr.Load<TextAsset>("文本文件全路径.txt");//同步加载主包的txt文本文件
  TextAsset bin = await AssetMgr.LoadAsync<TextAsset>("二进制文件全路径.bytes");//异步加载主包的bytes二进制文件
  ```

- 加载音频

  ```csharp
  AudioClip clip = AssetMgr.Load<AudioClip>("音频文件全路径.wav");//同步加载主包的wav音频文件
  ```



### BPath

BPath是每次[打AB](./BuildAB)后自动生成的文件，会生成到热更工程，里面包含了全部打入AB的资源的全路径，可以使用BPath的字段来快速加载指定路径的资源
