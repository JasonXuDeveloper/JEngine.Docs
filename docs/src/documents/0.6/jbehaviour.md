# JBehaviour

JEngine~~现已支持基于MonoBehaviour，却**更强大**的基类~~已经制作了比使用MonoBehaviour更优化性能的基类，JBehaviour已经不基于MonoBehaviour了

> 为什么使用JBehaviour？
>
> - 更简单的周期处理
> - 少量代码，更强功能，API丰富
> - 以异步代替Update，节约开销
> - 更可控的循环，可以调整循环模式和频率
> - 对比热更内继承MonoBehaviour，更少GC，性能更强，执行更快

<img src="https://s1.ax1x.com/2020/07/19/URW5mn.png" alt="JBehaviour" style="zoom:50%;" />


## 继承使用

1. 在您的热更工程里，引入以下命名空间：

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

3. **JBehaviour**有四个可overrdie方法

   - ```Init``` => 当类被添加到GameObject，可以参考```Awake```
   - ```Run``` => Init之后，参考```Start```
   - ```Loop``` => 频率循环事件，参考```Update```
   - ```End``` => 当脚本被销毁，参考```OnDestory```
    
4. 注意：JBehaviour不推荐用gameObject.GetComponent获取，因为JBehaviour原理的缘故，真机这么操作无效，所以建议就用gameObject.GetJBehaviour获取


## Demo示例（包含90%以上的API使用）

   ```csharp
   using System;
   using JEngine.Core;
   
   namespace JEngine.Examples
   {
       public class JBehaviourExample : JBehaviour
       {
           private int i;
   
           public override void Init()
           {
               Log.Print("JBehaviour has been created!");
           }
   
           public override void Run()
           {
               Log.Print("JBehaviour is running!");
               //Change the frequency of loop
               FrameMode = false;//Don't loop in frame
               Frequency = 1000;//Run every 1000 milliseconds
   
               i = 1;
   
               Destroy(this.gameObject, 10);
           }
   
           public override void Loop()
           {
               Log.Print("Hello JBehaviour * " + i + " times!");
               i++;
           }
   
           public override void End()
           {
               Log.Print("I have been destroyed!");
           }
       }
   }
   
   ```

5. 显而易见，在**Run**方法中，分配了```frame```和```frequency```数值，这两个数值影响```loop```方法的频率。

   - ```FrameMode```: ```bool```，如果为true，**帧循环**；反之，**毫秒循环** ，默认为```true```
   - ```Frequency```: ```int```，代表循环的**间隔时间**，代表毫秒或帧数，默认为```1```

## 其他接口

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
/// Hides the UI gameObject
/// 隐藏UI对象
/// </summary>
public JBehaviour Hide()
```

```csharp
/// <summary>
/// Shows the UI gameObject
/// 显示UI对象
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
/// 激活
/// </summary>
/// <returns></returns>
public JBehaviour Activate()
```

## 实例化

  - 创建实例（3种方法）
    1. 直接在编辑器内使用ClassBind挂载脚本[参考这里](classbind.html)
    2. 使用JBehaviour的创造方法```JBehaviour.CreateOn<T>(GameObject gameObject, bool activeAfter = true) where T : JBehaviour```
    3. 直接```new()```，会创建以唯一实例ID命名的GameObject，并挂上该JBehaviour
  - 获取实例
    1. 获取单个实例```T GetJBehaviour<T>(GameObject gameObject) where T : JBehaviour```
    2. 获取单个实例```T GetJBehaviour<T>(string instanceID) where T : JBehaviour```
    3. 获取某GameObject上多个实例```T[] GetJBehaviours<T>(GameObject gameObject) where T : JBehaviour```
  - 删除实例
    ```RemoveJBehaviour(JBehaviour jBehaviour)```
  - Demo示范

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

> 下一篇，[资源加载JResource教程](jresource)
