# 扩展方法工具

JEngine提供了众多扩展方法，位于主工程```Assets/Dependencies/JEngine/Core/Tool```，热更工程```HotUpdateScripts/JEngine/UI/JUIExtensions.cs```内，以及热更工程```HotUpdateScripts/JEngine/Core/JExtensions.cs```内

[[toc]]



## 命名空间

```csharp
using JEngine.Core;
using JEngine.UI;
```



## 常用工具

- 将对象转换为指定类型

  ```csharp
  public static object ConvertSimpleType(this object value, Type destinationType)
  ```

  ClassBind就通过这个方法将输入的字符串值转为其他类型（例如int）



## GameObject工具

- 获取对象的GameObject

  ```csharp
  public static GameObject GetGameObject(this object ins)
  ```

  该方法可以获取热更工程的MonoBehaviour派生类对象的gameObject、以及在主工程的Component的gameObject

  该方法主要用于CLR重定向底层和ClassBind底层

- 获取热更对象的GameObject

  ```csharp
  public static GameObject FindGOForHotClass(this ILTypeInstance instance)
  ```

  与上面的方法同理，用于获取热更继承MonoBehaviour的对象的gameObject，主要用于CLR重定向和ClassBind底层获取数据

- 获取当前全部场景内全部特定Type的对象

  ```csharp
  public static List<T> FindObjectsOfTypeAll<T>()
  ```

  这个方法能获取全部的特定Type对象（包括隐藏的），但是无法获取DontDestroyOnLoad内的

- 获取object的指定类型的对象实例

  ```csharp
  public static object GetInstanceFromGO(this Type fieldType, Object obj)
  ```

  这个方法能获取指定类型的对象实例，例如如果obj是GameObject，就会GetComponent这个fieldType并返回，如果obj是热更类型（例如热更的MonoBehaviour或其他ClassBind创建的对象），就会在obj的适配器上找到相同热更类型的热更实例，并返回

- 获取场景内全部适配器

  ```csharp
  public static List<CrossBindingAdaptorType> GetAllMonoAdapters()
  ```

  该方法能获取场景内全部Mono适配器（用ClassBind创建的一切对象也会被包括在其中）

  该方法主要用于辅助CLR重定向（例如重定向的FindObjectsOfType）

- 获取GameObject上的热更对象

  ```csharp
  public static object GetHotComponent(this GameObject gameObject, string typeName)
  ```

  ```csharp
  public static object GetHotComponent(this GameObject gameObject, ILType type)
  ```

  ```csharp
  public static object GetHotComponent(this CrossBindingAdaptorType[] adapters, ILType type)
  ```

  ```csharp
  public static object GetHotComponent(this List<CrossBindingAdaptorType> adapters, ILType type)
  ```

  如果一个GameObject上面用ClassBind创建了对象，或用AddComponent动态挂载了热更的MonoBehaviour，可以通过这个方法获取上面的指定Type的对象

  ::: warning

  这个函数会返回一个ILTypeInstance数组，需要把object转```ILTypeInstance[]```后判断长度然后取第一个元素（如果能肯定这个数组只有一个元素也可以直接将其装箱为ILTypeInstance）

  在主工程调用这个方法是转```ILTypeInstance[]```，而在热更工程内调用这个方法可以直接转```热更类型数组```

  :::

- 获取GameObject及其子物体的热更对象

  ```csharp
   public static object GetHotComponentInChildren(this GameObject gameObject, string typeName)
  ```

  原理同上，只是还能获取子物体的对象

- 删除GameObject上的指定对象

  ```csharp
  public static void DestroyHotComponent(this GameObject gameObject, object hotObject)
  ```

  如果gameObject上通过ClassBind或AddComponent动态挂载了热更对象，可以通过这个方法彻底删除hotObject（如果是ClassBind创建的对象，这样删更彻底）



## 热更类型工具

> 建议这些工具在主工程使用，热更工程内没必要用大部分接口

- ILRuntime的Appdomain

  ```csharp
  public static AppDomain Domain
  ```

  会根据运行模式返回一个AppDomain，编辑器下返回无缓存的AppDomain，即每次请求都会销毁前一次使用（如果存在的话）的引用，运行模式下会使用InitJEngine内创建的AppDomain

- 通过字符串获取热更Type

  ```csharp
   public static Type GetHotType(string typename)
  ```

- 通过字符串获取ILType

  ```csharp
  public static IType GetHotILType(string typename)
  ```

- 通过字符串生成热更对象

  ```csharp
  public static ILTypeInstance GetHotInstance(string typename)
  ```

- 判断热更类型是否存在

  ```csharp
  public static bool HasHotType(string typename)
  ```

- 判断是否继承了JBehaviour

  ```csharp
  public static bool IsJBehaviourType(Type type)
  ```

  ```csharp
  public static bool IsJBehaviourType(string typename)
  ```

- 调用热更方法

  ```csharp
  public static void InvokeHotMethod(string type, string method)
  ```

  ```csharp
  public static void InvokeHotMethod(string type, string method, object instance, params object[] param)
  ```

  用```Tools.InvokeHotMethod```调用

- 获取热更方法参数

  ```csharp
  public static ParameterInfo[] GetHotMethodParams(Type type, string methodName)
  ```

  用```Tools.GetHotMethodParams```调用

- 判断是否可分配到指定类型

  ```csharp
  public static bool CanAssignTo(this object instance, Type type)
  ```

  

## 字符串工具

这些工具都不是扩展方法，需要用```Tools.xxx```访问

- 下载的字节大小转字符串

  ```csharp
  public static string GetDisplaySpeed(float downloadSpeed)
  ```

  ```csharp
  public static string GetDisplaySize(long downloadSize)
  ```

  假设下载了1024bytes，会返回1KB，其他大小同理

- 确保某个字符串以指定字符串结尾

  ```csharp
  public static void EnsureEndWith(ref string source, string endWith)
  ```

  如果source不是以endWith内容结尾，则source末尾会加上endWith



## 热更工程工具

- 获取通过ClassBind创建的任何对象

  ```csharp
  public static T GetHotClass<T>(this GameObject gameObject) where T : class
  ```

  ```csharp
  public static T[] GetHotClasses<T>(this GameObject gameObject) where T : class
  ```

  ```csharp
  public static T GetHotClassInChildren<T>(this GameObject gameObject) where T : class
  ```

  ```csharp
  public static T[] GetHotClassesInChildren<T>(this GameObject gameObject) where T : class
  ```

  这些方法能获取gameObject自身或自身和以及子物体上全部的T类型的热更对象，这些热更对象必须是ClassBind创建的，或者是动态创建的MonoBehaviour和JBehaviour

- 在GameObject上创建JBehaviour

  ```csharp
  public static T CreateJBehaviour<T>(this GameObject gameObject, bool activeAfter = true) where T : JBehaviour
  ```

- 在GameObject上获取JBehaviour

  ```csharp
  public static T GetJBehaviour<T>(this GameObject gameObject) where T : JBehaviour
  ```

- 获取GameObject上全部的JBehaviour

  ```csharp
  public static T[] GetJBehaviours<T>(this GameObject gameObject) where T : JBehaviour
  ```

- 销毁JBehaviour

  ```csharp
  public static void Remove(this JBehaviour jBehaviour)
  ```

- 在GameObject上创建JUI

  ```csharp
  public static JUI CreateJUI(this GameObject gameObject)
  ```

- 在GameObject上获取JUI

  ```csharp
  public static JUI GetJUI(this GameObject gameObject)
  ```

- 获取GameObject上全部JUI

  ```csharp
  public static JUI[] GetJUIs(this GameObject gameObject)
  ```

- 销毁JUI

  ```csharp
  public static void Remove(this JUI jUI)
  ```

  

## UI扩展工具

- 颜色hex编码转颜色类

  ```csharp
  public static Color ToColor(this string hex)
  ```

- 获取transform的Text组件

  ```csharp
  public static Text txt(this Transform x)
  ```

- 获取transfrom指定路径的Text组件

  ```csharp
  public static Text txt(this Transform x, string name)
  ```


- 获取transform的Button组件

  ```csharp
  public static Button btn(this Transform x)
  ```

- 获取transfrom指定路径的Button组件

  ```csharp
  public static Button btn(this Transform x, string name)
  ```

- 获取transform的Outline组件

  ```csharp
  public static Outline outline(this Transform x)
  ```

- 获取transfrom指定路径的Outline组件

  ```csharp
  public static Outline outline(this Transform x, string name)
  ```

- 获取transform的Shadow组件

  ```csharp
  public static Shadow shadow(this Transform x)
  ```

- 获取transfrom指定路径的Shadow组件

  ```csharp
  public static Shadow shadow(this Transform x, string name)
  ```

- 获取transform的Image组件

  ```csharp
  public static Image img(this Transform x)
  ```

- 获取transfrom指定路径的Image组件

  ```csharp
  public static Image img(this Transform x, string name)
  ```


- 获取transform的RectTransform组件

  ```csharp
  public static RectTransform rect(this Transform x)
  ```

- 获取transfrom指定路径的RectTransform组件

  ```csharp
  public static RectTransform rect(this Transform x, string name)
  ```

- 获取transform的RawImage组件

  ```csharp
  public static RawImage rawImg(this Transform x)
  ```

- 获取transfrom指定路径的RawImage组件

  ```csharp
  public static RawImage rawImg(this Transform x, string name)
  ```

- 获取transform的Slider组件

  ```csharp
  public static Slider slider(this Transform x)
  ```

- 获取transfrom指定路径的Slider组件

  ```csharp
  public static Slider slider(this Transform x, string name)
  ```

- 获取transform的Toggle组件

  ```csharp
  public static Toggle toggle(this Transform x)
  ```

- 获取transfrom指定路径的Toggle组件

  ```csharp
  public static Toggle toggle(this Transform x, string name)
  ```

- 获取transform的Scrollbar组件

  ```csharp
  public static Scrollbar scrollbar(this Transform x)
  ```

- 获取transfrom指定路径的Scrollbar组件

  ```csharp
  public static Scrollbar scrollbar(this Transform x, string name)
  ```

- 获取transform的Dropdown组件

  ```csharp
  public static Dropdown dropdown(this Transform x)
  ```

- 获取transfrom指定路径的Dropdown组件

  ```csharp
  public static Dropdown dropdown(this Transform x, string name)
  ```

- 获取transform的InputField组件

  ```csharp
  public static InputField input(this Transform x)
  ```

- 获取transfrom指定路径的InputField组件

  ```csharp
  public static InputField input(this Transform x, string name)
  ```

- 获取transform的Canvas组件

  ```csharp
  public static Canvas canvas(this Transform x)
  ```

- 获取transfrom指定路径的Canvas组件

  ```csharp
  public static Canvas canvas(this Transform x, string name)
  ```

  