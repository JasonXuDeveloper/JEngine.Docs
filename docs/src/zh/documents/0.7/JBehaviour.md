# 生命周期方案

## JBehaviour

JBehaviour是MonoBehaviour的平替方案，如果只需要在固定频率循环执行某件事情，完全可以使用继承JBehaviour代替继承MonoBehaviour

::: tip

JBehaviour有以下优势：

- 主线程执行
- 更简单的周期处理
- 少量代码，更强功能，API丰富
- 以异步代替Update，节约开销
- 更可控的循环，可以调整循环模式和频率
- 对比热更内继承MonoBehaviour，更少GC，性能更强，执行更快

:::



[[toc]]



### 流程图

<img src="https://s1.ax1x.com/2020/07/19/URW5mn.png" alt="JBehaviour" style="zoom:50%;" />

### 使用

1. 引入以下命名空间：

   ```csharp
   using JEngine.Core;
   ```

2. 继承**JBehaviour**

   ```csharp
   namespace HotUpdateScripts
   {
       public class Sample : JBehaviour
       {
       	//ToDo
       }
   }
   ```

3. **JBehaviour**有四个可override方法

   - ```Init``` => 当类被添加到GameObject，可以参考```Awake```
   - ```Run``` => Init之后，参考```Start```
   - ```Loop``` => 频率循环事件，参考```Update```
   - ```End``` => 当脚本被销毁，参考```OnDestory```
   - ```OnShow```=> 当JBehaviour的GameObject的active从false转true时，参考```OnEnable```
   - ```OnHide```=> 当JBehaviour的GameObject的active从false转true时，参考```OnDisable```

4. 注意：JBehaviour不可以用gameObject.GetComponent获取，因为JBehaviour原理的缘故，真机这么操作无效，所以建议就用gameObject.GetJBehaviour获取

### 生命周期

1. Init
2. OnShow/OnHidden，基于当前gameObject状态
3. Run
4. Loop以及OnShow/OnHidden

### 注意事项

1. 目前JBehaviour在隐藏gameObject后也会执行Loop，建议在OnHidden方法内调用Pause来暂停Loop，以及在OnShow内调用Resume来恢复Loop
2. JBehaviour不能跨域继承任何接口
2. 挂载JBehaviour的GameObject一旦隐藏（即触发OnHidden），JBehaviour就不会继续执行Loop，显示后（即触发OnShow）才能继续执行Loop



### 创建JBehaviour

有3种方法：

1. 直接在编辑器内使用ClassBind挂载脚本[参考这里](./ClassBind.md)
2. 使用JBehaviour的创造方法```JBehaviour.CreateOn<T>(GameObject gameObject, bool activeAfter = true) where T : JBehaviour```
3. 直接使用[扩展方法](./Extension.md)创建：```gameObject.CreateJBehaviour<T>()```

### 获取指定ID或gameObject上的JBehaviour

有4种方法：

1. 获取单个实例```T GetJBehaviour<T>(GameObject gameObject) where T : JBehaviour```
2. 获取单个实例```T GetJBehaviour<T>(string instanceID) where T : JBehaviour```
3. 获取某GameObject上多个实例```T[] GetJBehaviours<T>(GameObject gameObject) where T : JBehaviour```
4. 使用[扩展方法](./Extension.md)

### 获取指定Type的JBehaviour

有2个静态方法，都在JBehaviour类下，可以根据情况调用

::: warning

这两个接口会比较慢，并且会造成GC，建议少用

:::

```csharp
/// <summary>
/// Find a JBehaviour that is the given type
/// 通过指定类型寻找一个JBehaviour
/// </summary>
/// <typeparam name="T"></typeparam>
/// <returns></returns>
public static T FindJBehaviourOfType<T>() where T: JBehaviour
```

```csharp
/// <summary>
/// Find all JBehaviours that are the given type
/// 通过指定类型寻找全部JBehaviour
/// </summary>
/// <typeparam name="T"></typeparam>
/// <returns></returns>
public static T[] FindJBehavioursOfType<T>() where T : JBehaviour
```



### 销毁JBehaviour

有2种方法：

1. ```RemoveJBehaviour(JBehaviour jBehaviour)```
2. 使用[扩展方法](./Extension.md)



### 创建/获取/销毁示范

```csharp
var go = new UnityEngine.GameObject("Test");

//创建实例
JBehaviourExample jb1 = JBehaviour.CreateOn<JBehaviourExample>(go, false);
JBehaviourExample jb2 = JBehaviour.CreateOn<JBehaviourExample>(go, false);

//创建后有唯一实例ID
Log.Print($"jb1: {jb1.InstanceID}");
Log.Print($"jb2: {jb2.InstanceID}");


//通过实例ID获取
JBehaviourExample getJb1 = JBehaviour.GetJBehaviour<JBehaviourExample>(jb1.InstanceID);
Log.Print($"jb1 == getJb1 is {jb1 == getJb1}");

//通过GameObject获取第一个挂在上面的JBehaviour
JBehaviourExample getJb1GO = JBehaviour.GetJBehaviour<JBehaviourExample>(go);
Log.Print($"jb1 == getJb1GO is {jb1 == getJb1GO}");

//获取某GameObject上全部挂着的JBehaviour
JBehaviourExample[] allJbsOnGO =
  JBehaviour.GetJBehaviours<JBehaviourExample>(go);

var allJbsIds = from jb in allJbsOnGO select jb.InstanceID;

Log.Print($"Test go has {allJbsOnGO.Length} JBehaviours, " +
          $"which are {string.Join(",", allJbsIds)}");

//删除JBehvaiour
JBehaviour.RemoveJBehaviour(jb1);
```



### 接口

```csharp
/// <summary>
/// Instance ID
/// 实例ID
/// </summary>
public string InstanceID => _instanceID;
```

```csharp
/// <summary>
/// GameObject of this instance
/// 游戏对象
/// </summary>
public GameObject gameObject => _gameObject;
```

```csharp
 /// <summary>
/// Loop in frame or millisecond
/// 帧模式或毫秒模式
/// </summary>
public bool FrameMode = true;
```

```csharp
/// <summary>
/// Frequency of loop, if frame = false, this field stands for milliseconds
/// 循环频率，如果是毫秒模式，单位就是ms
/// </summary>
public int Frequency = 1;
```

  ```csharp
/// <summary>
/// Total time that this JBehaviour has run
/// 该JBehaviour运行总时长
/// </summary>
public float TotalTime = 0;
  ```

```csharp
/// <summary>
/// Deltatime of loop
/// 循环耗时
/// </summary>
public float LoopDeltaTime = 0;
```

```csharp
/// <summary>
/// Loop counts
/// 循环次数
/// </summary>
public long LoopCounts = 0;
```

```csharp
/// <summary>
/// Time scale
/// 时间倍速
/// </summary>
public float TimeScale = 1;
```

```csharp
/// <summary>
/// Hides the gameObject
/// 隐藏对象
/// </summary>
public JBehaviour Hide()
```

```csharp
/// <summary>
/// Shows the gameObject
/// 显示对象
/// </summary>
public JBehaviour Show()
```

```csharp
/// <summary>
/// Pause the loop
/// 暂停循环
/// </summary>
public JBehaviour Pause()
```

```csharp
/// <summary>
/// Resume the loop
/// 恢复循环
/// </summary>
public JBehaviour Resume()
```

```csharp
/// <summary>
/// Activate the JBehaviour
/// 激活（只有通过ClassBind创建并没勾选自动激活的时候需要手动调用）
/// </summary>
/// <returns></returns>
public JBehaviour Activate()
```



### 使用示范

```csharp
public static void RunGame()
{
  new GameObject("JBehaviourTest").CreateJBehaviour<Demo>();
}

public class Demo : JBehaviour
{
  public override void Init()
  {
    Log.Print("Inited");
    gameObject.SetActive(true);
  }
  public override void OnShow()
  {
    Log.Print("Show");
  }
  public override void OnHide()
  {
    Log.Print("Hide");
    gameObject.SetActive(true);
  }
  public override void Run()
  {
    Log.Print("Run");
    gameObject.SetActive(false);
    Frequency = 100;
    FrameMode = true;
  }
  public override void Loop()
  {
    Log.Print($"Loop {LoopCounts} times, last time took {LoopDeltaTime}ms");
  }
}
```

