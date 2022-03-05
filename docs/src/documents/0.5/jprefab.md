# 热更预制体解决方案 JPrefab（v0.5）

JPrefab是针对热更Prefab制作的类型

> JPrefab能干什么？
>
> - 加载热更预制体
> - 检测状态
> - 检测错误信息
> - 生成实例
> - 获取全部通过JPrefab方法生成的预制体实例
> - 优越的GC管理
> - 可手动释放

## 命名空间
- ```csharp
  using JEngine.Core;
  ```

## API
- ```csharp
  public JPrefab(string path) //从热更资源里读取prefab
  ```

- ```csharp
  public bool Loaded; //Prefab是否加载（如果有错误，这里也会是加载）
  ```

- ```csharp
  public bool Error; //加载时是否有错
  ```

- ```csharp
  public string ErrorMessage; //错误时的错误信息
  ```

- ```csharp
  public float Progress; //加载prefab的进度
  ```

- ```csharp
  public LoadState State; //加载prefab的状态
  ```

- ```csharp
  public GameObject Instance; //Prefab游戏对象（这个并不在场景中，也没被生成）
  ```

- ```csharp
  public List<GameObject> InstantiatedGameObjects; //全部被生成到场景中的游戏对象
  ```

- 生成预制体
  ```csharp
  public GameObject Instantiate(string name = "")
  ```

  ```csharp
  public GameObject Instantiate(Transform parent, string name = "")
  ```

  ```csharp
  public GameObject Instantiate(Transform parent, bool instantiateInWorldSpace, string name = "")
  ```

  ```csharp
  public GameObject Instantiate(Vector3 position, Quaternion rotation, string name = "")
  ```

  ```csharp
  public GameObject Instantiate(Vector3 position, Quaternion rotation,Transform parent, string name = "")
  ```

- 释放
  ```csharp
  public void Dispose()
  ```


> 下一篇，[ILRuntime工具](ilruntime-tools.html)
