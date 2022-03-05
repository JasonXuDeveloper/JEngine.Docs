{% import "views/_data.njk" as data %}

# JResource（v0.5）

JEngine现已支持基于XAsset的资源管理方案

> 为什么使用JResource？
>
> - 更精简的代码
> - 支持开发模式
> - 支持泛型加载



## APIs

- ```c#
  LoadRes<T>(string path, MatchMode mode = MatchMode.AutoMatch) where T : UnityEngine.Object
  ```


- ```c#
  LoadResAsync<T>(string path, Action<T> callback, MatchMode mode = MatchMode.AutoMatch) where T : UnityEngine.Object
  ```

- ```c#
  public enum MatchMode
  {
    AutoMatch = 1,
    Animation = 2,
    Material = 3,
    Prefab = 4,
    Scene = 5,
    ScriptableObject = 6,
    TextAsset = 7,
    UI = 8,
    Other = 9
  }
  ```



## 示例代码（包含90%以上的API使用）

- Sync Method

```c#
var txt = JResource.LoadRes<TextAsset>("Text.txt");
Log.Print("Get Resource with Sync method: " + txt.text);
```

- Async Parallel Method 

```c#
JResource.LoadResAsync<TextAsset>("Text.txt",(txt)=>
{
	Log.Print("Get Resource with Async method: " + txt.text);
});
```

> 下一篇，[队列解决方案JAction教程](jaction.html)

