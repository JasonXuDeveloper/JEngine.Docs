# LifeCycleMgr

LifeCycleMgr是JEngine独家的一大神器

[[toc]]

## 前言

::: tip

自0.7.2版本后，JEngine推出了LifeCycleMgr这一利器用于统一管理/优化全部热更的MonoBehaviour/JBehaviour/通过ClassBind创建的一切对象，的生命周期

0.8版本开始，LifeCycleMgr能做到的就更多了，可以异步注册在下一帧才需要在主线程执行的事件，可以注册在主线程执行的循环事件（ThreadMgr就是通过注册事件到LifeCycleMgr实现的派发任务到主线程）

:::

### 优势

- 线程控制
  - 注册的一切事件都是在主线程派发执行的

- 统一管理事件，并且严格遵循Unity生命周期（如果使用LifeCycleMgr来注册一个MonoBehaviour对象的周期的话）

  - 如果**同一帧内**对象A注册了Awake、Start、OnEnble、Update、LateUpdate事件，对象B注册了Start、FixedUpdate、Update事件，则：

    本帧的时候会调用A的Awake，A的OnEnable（因为Unity的Awake和OnEnable是连着的），不会调用B的任何事件（因为这里B其实注册了一个空的Awake事件，同时B这里也默认注册了空的OnEnable，这样才能让它继续等）

    之后第1帧的时候会调用A和B的Start，因为它俩都注册了这个周期

    ::: warning

    如果正好触发了Time.fixedTimestep的频率，第3帧会调用B的FixedUpdate，不会调用A的任何事件（与上面提到的同理，A默认注册了空的FixedUpdate用于占位）

    之后第2帧的时候会调用A和B的Update，因为他俩都注册了这个事件

    之后第2帧的时候会调用B的LateUpdate，不会调用A的任何事件（理由如上）

    Update和LateUpdate会一直循环下去，而FixedUpdate只会在Time.fixedTimestep的固定频率下被调用

    :::

    ::: warning

    如果没有触发Time.fixedTimestep的频率，第3帧会调用A和B的Update，因为他俩都注册了这个事件

    之后第2帧的时候会调用B的LateUpdate，不会调用A的任何事件（理由如上）

    Update和LateUpdate会一直循环下去，而FixedUpdate只会在Time.fixedTimestep的固定频率下被调用

    :::

    

  - 如果**不在同一帧**创建了A和B，先创建B后创建A（提前1帧创建的B），注册的事件与上面一致，则：

    本帧的时候会调用B的OnEnable（因为A没创建，B没Awake但是有个占位，但是OnEnable和Awake是同一帧的）

    之后第1帧的时候会调用B的Start，还会调用A的Awake和OnEnable（B的每个周期都应该比A早一帧，同时Awake和OnEnable是同一帧的）

    之后第2帧的时候可能（参考上面对于FixedUpdate的说明）会调用B的FixedUpdate，会调用B的Update，还会调用A的Start，（理由同第二帧）

    之后第3帧的时候会调用B的Update（因为B没注册LateUpdate），也会调用A的Update和LateUpdate（因为A没注册FixedUpdate但是注册了LateUpdate）

    FixedUpdate会在Time.fixedTimestep频率下被调用

    至此，B在开始Update前的每个周期都会比A早1帧，因为B比A早创建1帧

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



> 下面提到的成员/函数都是在`LifeCycleMgr`类下的，这个类型是个单例类型，但是需要使用`LifeCycle.Instance.XXX`。



## 以MonoBehaviour的生命周期注册/取消事件

以下接口可以按上述提到的周期来派发事件（MonoBehaviour的生命周期）

#### 添加Awake事件

```csharp
void AddAwakeItem<T>(T instance, MethodInfo method)
```

#### 添加Start事件

```csharp
void AddStartItem<T>(T instance, MethodInfo method)
```

#### 添加Update事件

```csharp
void AddUpdateItem<T>(T instance, MethodInfo method, GameObject parent)
```

#### 添加LateUpdate事件

```csharp
void AddLateUpdateItem<T>(T instance, MethodInfo method, GameObject parent)
```

#### 添加FixedUpdate事件

```csharp
void AddFixedUpdateItem<T>(T instance, MethodInfo method, GameObject parent)
```

#### 取消Update事件

下面有提到

#### 取消LateUpdate事件

```csharp
void RemoveLateUpdateItem<T>(T instance)
```

#### 取消FixedUpdate事件

```csharp
void RemoveFixedUpdateItem<T>(T instance)
```



`instance`，需要注册事件的对象

`method`，需要在特定周期调用的方法

`parent`，对象的gameObject，需要在添加Update事件的时候传入，用于判断是否需要循环（因为gameObject隐藏时不应该循环）



## 注册循环事件

我们也可以通过回调的方式注册每帧循环的事件

```csharp
Guid AddUpdateTask(Action action)
```

```csharp
Guid AddUpdateTask(Action action, Func<bool> condition)
```

`action`，需要触发的回调

`condition`，可选，触发回调的执行条件，只有condition返回true的时候才会执行回调

`返回值`，是这个任务的`GUID`，可以用它取消循环事件



## 取消注册的循环事件

```csharp
void RemoveUpdateItem<T>(T instance)
```

`instance`，如果是取消添加的MonoBehaviour的Update事件，则传入该MonoBehaviour对象，其他方式注册的循环事件则传入注册时返回的`GUID`即可





## 注册下一帧执行的事件

我们可以在某一帧内注册多个下一帧并行执行的任务，这样可以实现同步方法不阻塞当前帧等不同的需求

```csharp
Guid AddTask(Action action)
```

```csharp
Guid AddTask(Action action, Func<bool> condition)
```

```csharp
void AddTask<T>(T instance, Action action)
```

```csharp
void AddTask<T>(T instance, Action action, Func<bool> condition)
```

`action`，需要触发的回调

`condition`，可选，触发回调的执行条件，只有condition返回true的时候才会执行回调

`instance`，这个事件所对应的对象，当这个对象为null时则会自动取消事件

`返回值`，如果不传`instance`的话，会返回这个任务的`GUID`，可以用它取消循环事件



## 取消某个下一帧执行的事件

我们如果改变主意了，可以取消掉计划在下一帧执行的事件

```csharp
void RemoveTask(in Guid guid)
```

```csharp
void RemoveTask<T>(T instance)
```

`guid`，创建任务时返回的`GUID`

`instance`，创建任务时传递的`instance`对象



## 提前派发下一帧执行的事件

有时候，我们不想等到下一帧再执行我们注册的事件了，比如我异步注册了10个事件，原计划在下一帧执行，但我改变主意了，我想在注册10个事件后就让它们执行

```csharp
void ExecuteOnceTask()
```





## 使用场景

- ClassBind创建的对象的生命周期就是通过它管理的
- 全部热更的MonoBehaviour的生命周期也是通过这个管理的
- ThreadMgr也是通过派发了循环任务来实现在主线程派发回调的
- JBehaviour也是通过这个来进行主线程批量循环的
