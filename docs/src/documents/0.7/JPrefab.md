# 预制体管理方案

## JPrefab

JPrefab是一个预制体管理方案，可以更好的管理预制体



[[toc]]



### 用途

- 控制热更Prefab资源的加载/生成/消耗/释放
- 通过Prefab生成可统一管理的对象



### 创建

::: tip

JPrefab可以通过3种方式创建：

- 同步阻塞
- 异步并行（不阻塞同步）
- 纯异步

:::

#### 无回调的创建JPrefab

```csharp
/// <summary>
/// Load a prefab from hot update resources
/// 从热更资源里读取prefab
/// </summary>
/// <param name="path"></param>
public JPrefab(string path, bool async = false)
```

```csharp
/// <summary>
/// Load a prefab from hot update resources
/// 从热更资源里读取prefab
/// </summary>
/// <param name="path"></param>
public JPrefab(string path, string package, bool async = false)
```

path是资源路径，需要全路径，可以不带.prefab后缀

package是热更资源所属的分包，传null就是主包，或者传其他包的包名

async代表是否异步加载，true的时候会变异步，false的时候会阻塞线程

#### 有回调的创建JPrefab

```csharp
 /// <summary>
/// Load a prefab from hot update resources (async)
/// 从热更资源里读取prefab （异步）
/// </summary>
/// <param name="path"></param>
/// <param name="complete">Action<bool,JPrefab>, success 与 JPrefab</param>
public JPrefab(string path, Action<bool, JPrefab> complete = null)
```

```csharp
 /// <summary>
/// Load a prefab from hot update resources (async)
/// 从热更资源里读取prefab （异步）
/// </summary>
/// <param name="path"></param>
/// <param name="complete">Action<bool,JPrefab>, success 与 JPrefab</param>
public JPrefab(string path,string package, Action<bool, JPrefab> complete = null)
```

这里默认都是异步的

path是资源路径，需要全路径，可以不带.prefab后缀

package是热更资源所属的分包，传null就是主包，或者传其他包的包名

complete是回调，bool是加载结果，JPrefab是对象本身，可以不传回调



### 使用

如果是异步创建的JPrefab，可以使用该方法进行同步等待：

```csharp
public async Task WaitForAsyncLoading()
```

当然，也可以选择使用异步回调加载，然后回调内执行逻辑



### 接口

```csharp
/// <summary>
/// If the prefab has loaded or not (if it has error, it will still be loaded)
/// Prefab是否加载（如果有错误，这里也会是加载）
/// </summary>
public bool Loaded;
```

```csharp
/// <summary>
/// If has error while loading or not
/// 加载时是否有错
/// </summary>
public bool Error 
```

```csharp
/// <summary>
/// Prefab GameObject (this is not in scene and it has not been instantiated)
/// Prefab游戏对象（这个并不在场景中，也没被生成）
/// </summary>
public GameObject Instance;
```

```csharp
/// <summary>
/// All GameObjects that has been instantiated to scene
/// 全部被生成到场景中的游戏对象
/// </summary>
public List<GameObject> InstantiatedGameObjects
```

```csharp
/// <summary>
/// Instantiate a prefab
/// 生成预制体
/// </summary>
/// <param name="name"></param>
/// <returns></returns>
public GameObject Instantiate(string name = "")
```

```csharp
/// <summary>
/// Instantiate a prefab
/// 生成预制体
/// </summary>
/// <param name="parent"></param>
/// <param name="name"></param>
/// <returns></returns>
public GameObject Instantiate(Transform parent, string name = "")
```

```csharp
/// <summary>
/// Instantiate a prefab
/// 生成预制体
/// </summary>
/// <param name="parent"></param>
/// <param name="instantiateInWorldSpace"></param>
/// <param name="name"></param>
/// <returns></returns>
public GameObject Instantiate(Transform parent, bool instantiateInWorldSpace, string name = "")
```

```csharp
/// <summary>
/// Instantiate a prefab
/// 生成预制体
/// </summary>
/// <param name="position"></param>
/// <param name="rotation"></param>
/// <param name="name"></param>
/// <returns></returns>
public GameObject Instantiate(Vector3 position, Quaternion rotation, string name = "")
```

```csharp
/// <summary>
/// Instantiate a prefab
/// 生成预制体
/// </summary>
/// <param name="position"></param>
/// <param name="rotation"></param>
/// <param name="parent"></param>
/// <param name="name"></param>
/// <returns></returns>
public GameObject Instantiate(Vector3 position, Quaternion rotation,Transform parent, string name = "")
```

```csharp
/// <summary>
/// Destory all instantiated gameObjects from this prefab
/// 删除该prefab生成的全部gameObject（只有通过JPrefab内部Instantiate创建的方法才能在这里被删除）
/// </summary>
public void DestroyAllInstantiatedObjects()
```

```csharp
/// <summary>
/// Dispose this JPrefab
/// 删除全部生成的gameObject，卸载资源，并且收集GC
/// </summary>
public void Dispose()
```



### 注意事项

- JPrefab的Instance不是场景内的gmaeObject，而是prefab这个gameObject，请勿对其的字段或属性进行任何修改操作
- JPrefab的InstantiatedGameObjects是全部通过JPrefab内部Instantiate接口创建的对象，外部使用Object.Instantiate(JPrefab.Instance)的对象不会被记录到List内
- 异步创建的JPrefab如果不在回调内执行相关逻辑务必await一下上述接口



### 使用示范

```csharp
public async static void RunGame()
{
  var prefab = new JPrefab("Assets/HotUpdateResources/Prefab/InstantiateDemo.prefab", true);
  await prefab.WaitForAsyncLoading();
  prefab.Instantiate("demo1");
  var prefab2 = new JPrefab("Assets/HotUpdateResources/Prefab/InstantiateDemo.prefab", (result, prefab2) => {
    if (!result)
    {
      Debug.Log("资源没出来");
      return;
    }
    prefab2.Instantiate("demo2");
    foreach(var g in prefab2.InstantiatedGameObjects)
    {
      Debug.Log(g.name);
    }
    prefab.Dispose();
    prefab2.DestroyAllInstantiatedObjects();
  });
}
```

