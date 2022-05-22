# 单例解决方案

JEngine提供了较为基础的单例解决方案，可以针对MonoBehaviour和其他类型创建单例

[[toc]]



## 命名空间

```csharp
using JEngine.Core;
```



### MonoBehaviour单例

只需要继承```MonoSingleton<T>```即可，T是类型本身，例如：

```csharp
public class MyMonoSingleton: MonoSingleton<MyMonoSingleton>
```



### 常规单例

只需继承```Singleton<T>```即可，T是类型本身，例如：

```csharp
public class MySingleton: Singleton<MySingleton>
```



### 访问单例

直接访问继承了单例父类的对象的```Instance```字段即可，例如：

```csharp
MySingleton.Instance
```



### 注意事项

如果要访问MonoBehaviour单例的实例（Instance），且是第一次访问，请确保要在主线程访问它，这样才能动态创建出一个单例实例（子线程下不让new GameObject也不让AddComponent所以无法在子线程创建任何MonoBehaviour实例）