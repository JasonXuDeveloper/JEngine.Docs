# 框架实现原理

> 本文会比较详细的介绍框架实现的原理，以便于更好的理解框架

::: tip

如果只需要使用本框架，本文可以略过；

如果对本框架原理感兴趣，建议阅读本文

:::

[[toc]]

## 流程图

![flowchart](https://s1.ax1x.com/2022/05/21/OvnMVJ.png)

## 初始化热更资源

在游戏启动后，需要初始化热更资源才能进入游戏

### 使用编辑器资源

在开发模式下，全部的资源会通过Unity的

```csharp
AssetDatabase.LoadAssetAtPath<T>(assetPath);
```

进行加载

> 需要注意的是这个模式下加载热更场景，必须将场景添加到BuildSetting内，故而有了```DevelopSceneChange.cs```这个工具：
>
> ```csharp
> namespace BM
> {
>     [InitializeOnLoad]
>     public class DevelopSceneChange
>     {
>         /// <summary>
>         /// 每次脚本编译后执行, 用于检测在Develop模式下将场景加入BuildSettings, 如果不想每次编译后执行可以自己封装
>         /// </summary>
>         static DevelopSceneChange()
>         {
>             AssetLoadTable assetLoadTable =
>                 AssetDatabase.LoadAssetAtPath<AssetLoadTable>(BuildAssets.AssetLoadTablePath);
>             List<AssetsLoadSetting> assetsLoadSettings = assetLoadTable.AssetsLoadSettings;
>             Dictionary<string, EditorBuildSettingsScene> editorBuildSettingsScenes =
>                 new Dictionary<string, EditorBuildSettingsScene>();
>             for (int i = 0; i < assetLoadTable.InitScene.Count; i++)
>             {
>                 string scenePath = AssetDatabase.GetAssetPath(assetLoadTable.InitScene[i]);
>                 if (!editorBuildSettingsScenes.ContainsKey(scenePath))
>                 {
>                     editorBuildSettingsScenes.Add(scenePath, new EditorBuildSettingsScene(scenePath, true));
>                 }
>             }
> 
>             var sceneAssets = BuildAssetsTools.GetPackageSceneAssets(assetLoadTable).ToArray();
> 
>             foreach (var sa in sceneAssets)
>             {
>                 string scenePath = AssetDatabase.GetAssetPath(sa);
>                 if (!editorBuildSettingsScenes.ContainsKey(scenePath))
>                 {
>                     editorBuildSettingsScenes.Add(scenePath, new EditorBuildSettingsScene(scenePath, true));
>                 }
>             }
>             // }
>             EditorBuildSettings.scenes = editorBuildSettingsScenes.Values.ToArray();
>         }
>     }
> }
> ```
>
> 通过这个工具，将热更配置内的热更场景全部会在游戏启动前加入BuildSetting



### 使用StreamingAssets内热更资源

在本地模式下，只要StreamingAssets内有打包好的热更资源，那么就会直接读取这些资源（不会访问资源服），同时这里面的资源不会被解压到persistentPath

加载这些资源时，用的是```UnityWebRequest.Get```进行的访问，并且会模拟真实的使用```AssetBundle```进行资源加载的流程

::: warning

AssetBundle的平台若于运行平台不对应，可能会造成Shader丢失（如编辑器下运行安卓平台的AssetBundle，或安卓平台运行编辑器平台的AssetBundle）

这里的AssetBundle指的是打出来的热更包，而AssetBundle的平台取决于打热更包时BuildSetting配置的平台

:::



### 同步资源服上最新的资源

在真机模式下，会请求资源服的```FileLogs.txt```、```VersionLogs.txt```等文件与本地已存在的资源进行对比（还可选crc校验），然后进行增量更新

这些资源通过```UnityWebRequest.Get```下载到persistentPath，并且会通过```AssetBundle```的流程进行资源管理

::: warning

AssetBundle的平台若于运行平台不对应，可能会造成Shader丢失（如编辑器下运行安卓平台的AssetBundle，或安卓平台运行编辑器平台的AssetBundle）

这里的AssetBundle指的是打出来的热更包，而AssetBundle的平台取决于打热更包时BuildSetting配置的平台

:::



### 进入热更场景

请确保加载热更场景时使用了[AssetMgr](./AssetMgr.md)的相关接口，不然会导致无法进入热更场景

::: warning

非开发模式时请确保出包（例如打APK时），BuildSetting内不包含热更场景，不然会导致被打入游戏主包的场景无法热更

:::



## 热更功能初始化

在进入热更场景后，会初始化热更相关的代码

### 初始化堆栈定位模块

通过重写了Unity的Debug部分的Logger，将报错时Unity会打印报错到Console的方法进行了替换，替换后，实现了：

- 能定位到热更代码报错的堆栈（包括异步）
- 精简化堆栈信息（使用Ben.Demystifier库）

具体实现参考如下：

```csharp
public void LogException(Exception exception, Object context)
{
  if (logEnabled)
  {
    exception = exception.Demystify();
    var d = exception.Data["StackTrace"];
    if (d != null)
    {
      string s = GetAllExceptionStackTrace(exception);
      //能反射就反射
      if (_stackTraceString != null)
      {
        SetStackTracesString(exception,
                             $"==========ILRuntime StackTrace==========\n{s}\n\n==========Normal StackTrace=========\n{exception.StackTrace}");
      }
      //不能反射就额外打个Log
      else
      {
        Debug.LogError($"下面的报错的额外信息：\n==========ILRuntime StackTrace==========\n{s}");
      }
    }
    logHandler.LogException(exception, context);
  }
}

/// <summary>
/// 获取全部堆栈信息
/// </summary>
/// <param name="exception"></param>
/// <returns></returns>
private string GetAllExceptionStackTrace(Exception exception)
{
  Exception temp = exception;
  List<Exception> all = new List<Exception>();
  int depth = 20;//深度20层
  while (depth-- > 0 && temp != null && temp.Data["StackTrace"] != null)
  {
    all.Add(temp);
    temp = temp != exception.InnerException ? exception.InnerException : null;//inner是自己就好退出了
  }
  //把最底层的放最外面
  all.Reverse();
  return string.Join("\n\n", all.Select(e => e.Data["StackTrace"]).ToList().FindAll(s => s != null));
}
        
private readonly FieldInfo _stackTraceString = typeof (Exception).GetField("_stackTraceString", BindingFlags.Instance | BindingFlags.NonPublic);

private void SetStackTracesString(Exception exception, string value)
{
  if (_stackTraceString != null)
  {
    _stackTraceString.SetValue((object)exception, (object)value);
  }
}
```

### 给ETTask注册报错回调

> 本框架使用了ET框架的ETTask作为一个依赖库（资源管理库依赖）

为了让ETTask的内部报错准确定位，将ETTask的报错注册了```UnityEngine.Debug.LogException```事件，实际上因为上面已经替换了```UnityEngine.Debug.LogException```，所以实际上是定位到了重新实现的精确定位堆栈的方法内



## 初始化生命周期管理器

::: tip

自0.7.2版本后，JEngine推出了LifeCycleMgr这一利器用于统一管理/优化全部热更的MonoBehaviour/JBehaviour/通过ClassBind创建的一切对象，的生命周期

:::

### 优势

- 统一管理事件，并且严格遵循Unity生命周期

  - 如果对象A注册了Awake、Start、OnEnble、Update、LateUpdate事件，对象B注册了Start、FixedUpdate、Update事件，则：

    第一帧的时候会调用A的Awake，不会调用B的任何事件（因为这里B其实注册了一个空的Awake事件）

    第二帧的时候会调用A的OnEnable，不会调用B的任何事件（因为B这里也默认注册了空的OnEnable，这样才能让它继续等）

    第三帧的时候会调用A和B的Start，因为它俩都注册了这个周期

    第四帧的时候回调用B的FixedUpdate，不会调用A的任何事件（与上面提到的同理，A默认注册了空的FixedUpdate用于占位）

    第五帧的时候调用A和B的Update，因为他俩都注册了这个事件

    第六帧的时候调用B的LateUpdate，不会调用A的任何事件（理由如上）

    > 综上所述，LifeCycleMgr严格无误的遵循了Unity的生命周期

- 高性能

  - 如果有1000个MonoBehaviour或ClassBind创建的对象，则会造成Unity底层要调用1000个不同MonoBehaviour的对应方法，造成大量性能浪费（可以自行搜索相关研究，这也是为什么要大量对象的时候推荐用ECS的原因）
  - 但是通过将全部事件在Awake时注册到LifeCycleMgr，不去定义这些多余的方法（```Start```、```OnEnable```、```FixedUpdate```、```Update```、```LateUpdate```），就可以避免Unity底层去调用这些方法，而一并在LifeCycleMgr内进行调用派发
  - LifeCycleMgr内有很多个```HashSet```，用于管理每个需要派发的方法，在FixedUpdate内进行判断去进行统一事件管理（如上所述），本质上Unity底层只需要调用LifeCycleMgr，就能调用到全部注册到其内部的事件，性能可以大幅度提升（相当于ECS架构的System的对应事件被统一管理调用）

- 无侵入

  - 因为是通过结合ILRuntime底层（适配器）原理实现的，热更工程内可以照常继承MonoBehaviour，无需任何修改，在运行时会自动进行这种性能优化
  - ClassBind创建的对象同理，照常在热更工程写代码，创建出来后如果需要Awake也会通过LifeCycleMgr进行统一管理

### 实现原理

因为ILRuntime跨域继承在适配器内需要通过反射去反射热更工程定义的派生类的对应方法，于是LifeCycleMgr在这些对象的Awake事件的时候收集了这些MethodInfo及其实例进行了统一派发：

- MonoBehaviour派生类
  - 通过JEngine工具生成的适配器内部会把```Awake```、```Start```、```OnEnable```、```FixedUpdate```、```Update```、```LateUpdate```方法注册到LifeCycleMgr内
- ClassBind创建的非MonoBehaviour对象
  - 非JBehaviour
    - 通过```ClassBindNonMonoBehaviourAdapter```创建挂到GameObject上的适配器，内含创建的热更对象的实例，并且根据ClassBind上是否勾选Awake，去判断是否把该热更对象内部定义的```Awake```方法注册到LifeCycleMgr内
  - JBehaviour
    - 通过```ClassBindNonMonoBehaviourAdapter```创建挂到GameObject上的适配器，内含创建的热更对象的实例，并且根据ClassBind上是否勾选Awake，去判断是否把该热更对象内部定义的```Awake```方法注册到LifeCycleMgr内
    - 同时还会调用其内部定义的```Check```方法用于初始化该对象
    - 最后还会为该对象注册```OnEnable```和```OnStart```事件到LifeCycleMgr

派发时，会在LifeCycleMgr的FixedUpdate内进行判断：

- 遵循Unity的生命周期顺序（```Awake```、```Start```、```OnEnable```、```FixedUpdate```、```Update```、```LateUpdate```）进行调用
- 如果一个实例在同一帧执行过其他周期（哪怕是空的占位周期），则跳过在本帧调用该实例其他周期
- 如果一个实例在同一帧没有执行过任何更提前的周期了，则调用这个MethodInfo（如果是空的占位周期则跳过）

### 注意事项

不建议自行对LifeCycleMgr的接口进行任何调用（即自行注册各种函数）

如果一定需要这么做，请确保不要被重复注册，并且需要用反射取MethodInfo



## 加载热更DLL

使用ILRuntime库对DLL内的IL指令进行解释执行，实现代码热更

### 进入热更代码

1. 根据是否使用JIT（参考ILRuntime文档），实例化了ILRuntime的AppDomain
2. 获取dll和pdb（如果有的话）的二进制
3. 将dll的二进制转JStream，实现分块解密执行，高性能高安全级别防DLL的源码被盗
4. 将pdb的二进制转MemoryStream
5. 根据是否有pdb去让ILRuntime的AppDomain来LoadAssembly（加载程序集）
6. 如果加载失败，并且开了pdb，大概率是没pdb（或不合法pdb）导致的，所以讲使用pdb选项关了后从步骤1重新开始

1. 初始化AppDomain
2. 编辑器下开启调试服务
3. 对这个AppDomain进行各种注册，使得匿名委托等功能能正常使用：

```csharp
RegisterCrossBindingAdaptorHelper.HelperRegister(appdomain);
RegisterCLRMethodRedirectionHelper.HelperRegister(appdomain);
RegisterMethodDelegateHelper.HelperRegister(appdomain);
RegisterFunctionDelegateHelper.HelperRegister(appdomain);
RegisterDelegateConvertorHelper.HelperRegister(appdomain);
RegisterLitJsonHelper.HelperRegister(appdomain);
RegisterValueTypeBinderHelper.HelperRegister(appdomain);
```

4. 注册第三方序列化库的重定向，使这些库能正常运行

5. 注册CLR绑定（如果有生成的话）
6. 调用热更工程SetUpGame周期（用于初始化数据之类的，考虑到ClassBind创建的对象的Awake等函数可能会调用一些数据，这个周期就是用于提前生成数据让ClassBind对象创建后能正常访问这些数据用的）
7. 激活场景内全部ClassBind（使用ClassBindMgr进行全局ClassBind的对象创建、赋值、调用Awake）
8. 调用热更工程RunGame周期（ClassBind周期后，用于开始游戏，如打开初始化模块、登录面板等操作）
9. 调用主工程HotUpdateLoadedHelper.Init周期（如果需要反射访问热更工程的类、方法等，这个周期是最合适的）

### CLR重定向

JEngine框架提供了一系列CLR重定向用于解决正常使用Unity方法，主要有：

- SendMessage(Upwards)、BroadcastMessage
- Invoke(Repeating)、CancelInvoke
- AddComponent(s)、GetComponent(s)、AddComponent(s)InChildren、GetComponent(s)InChildren
- Debug.Log、Log.Print
- FindObject(s)OfType
- Instantiate

### ClassBind原理

#### 创建

通过创建一个MonoBehaviour适配器，内部有一个ILTypeInstance字段，而这个字段可以是任何热更类型实例

通过判断是否跨域继承MonoBehaviour来创建ILTypeInstance，简单来说就是如果继承了MonoBehaviour，就用不指定CLRInstance的方法创建对象（并且不会调用构造函数），反之用CLRInstance指向本身的方法创建对象（并且会调用其构造函数）

如果这个热更对象跨域继承了MonoBehaviour，则创建一个MonoBehaviour适配器，同时将其CLRInstance指向适配器，完成跨域绑定

如果这个热更对象没跨域继承MonoBehaviour，则创建一个```DO_NOT_USE.ClassBindNonMonoBehaviourAdapter```适配器用于存这个热更对象，这个ILTypeInstance不会进行任何额外操作

最后如果继承了MonoBehaviour，就会补充调用这个热更对象的构造函数（用反射方法，防止不让调用MonoBehaviour构造函数而引起报错）

同时通过结合适配器和上面提到的LifeCycleMgr管理周期，杜绝了大部分性能浪费

#### 赋值

通过反射对字段进行赋值

#### 激活

通过反射直接调用Awake方法激活

