# 队列任务方案

## JAction

JAction是一个队列任务解决方案，可以更好的对队列任务进行管理

::: tip

比如想要某个函数一直等待到角色死亡，然后显示保存数据，等待2秒后再更新UI，常规写法：

```c#
while(!player.dead)
{
  await Task.Delay(1000);//或者yield return new WaitForSecond(1)等做法等待
}
SaveData();//保存数据
await Task.Delay(2000);//或者其他方法等待
UIPanel.Show("DeadPanel");//显示死亡UI
```

而用JAction能很优雅的解决：

```csharp
new JAction()
  .Until(player.dead)
  .Do(SaveData)
  .Delay(2)
  .Do(()=>UIPanel.Show("DeadPanel"))
  .Execute();
```

:::

JAction能干什么？

- 更少的代码，实现更强大的功能
- 链式编程
- 条件等待
- 延时等待
- 次数循环
- 条件循环
- 取消队列
- 同步异步运行
- 可主线程运行
- 内部包含对象池



[[toc]]



### 使用

1. 引入以下命名空间

   ```csharp
   using JEngine.Core;
   ```

2. 创建新的**JAction**对象

   ```csharp
   JAction j = new JAction();
   ```

3. 给JAction分配任务

   ```csharp
   j.Do(() => Log.Print("Hello from JAction!"))
     .Do(() => Log.Print("Bye from JAction"))
   ```

4. **让JAction执行（必备）**:

   ```csharp
   j.Execute();
   ```

5. **恭喜！成功使用！**（记得第四步，让JAction执行）



### 链式编程

```csharp
JAction j
  .Do(xxx)
  .Repeat(xxx,times,frequecny)
  .Delay(duration)
  .Do(xxx)
  .Execute();
```



### 执行

::: warning

同一个JAction不能被同时执行，若需要同时执行同一个JAction多次，请调用接口```Parallel()```

:::

- 同步不阻塞执行

  ```csharp
  public JAction Execute(bool onMainThread = false)
  ```

  可传是否主线程执行的参数，传true代表主线程执行，false代表子线程执行

- 异步回调执行（不阻塞）

  ```csharp
  public JAction ExecuteAsyncParallel(Action callback = null, bool onMainThread = false)
  ```

  可传执行完毕后的回调

  可传是否主线程执行的参数，传true代表主线程执行，false代表子线程执行

- 异步执行

  ```csharp
  public async ET.ETTask<JAction> ExecuteAsync(bool onMainThread = false)
  ```

  可传是否主线程执行的参数，传true代表主线程执行，false代表子线程执行

  ::: warning

  需要用```await ExecuteAsync()```执行，或者```ExecuteAsync().Coroutine()```，后者会变为同步不阻塞执行
  :::



### 复用

在通过```Dispose```接口释放掉一个JAction后，该JAction实际上会清除数据后进入内部对象池，而下一个创建的JAction会从对象池中取出一个被清空数据的JAction直接使用，减少new的开销，所以建议不用了的JAction就释放掉



### 重置

如果需要对JAction的任务进行重置，不建议再去new一个JAction而造成GC和性能浪费，建议直接调用```Reset```接口

::: warning

请确保JAction已被取消，或没有在执行状态，再去进行Reset，不然会导致之前的任务还在继续执行

:::



### 接口

```csharp
/// <summary>
/// 使同一个JAction可以同时被多次Execute
/// </summary>
/// <returns></returns>
public JAction Parallel()
```

```csharp
/// <summary>
/// 执行Action（会被同步执行）
/// </summary>
/// <param name="action"></param>
/// <returns></returns>
public JAction Do(Action action)
```

```csharp
/// <summary>
/// 执行Task（可异步）
/// </summary>
/// <param name="action"></param>
/// <returns></returns>
public JAction Do(Task action)
```

```csharp
/// <summary>
/// 延迟time秒后执行后续任务
/// </summary>
/// <param name="time"></param>
/// <returns></returns>
public JAction Delay(float time)
```

```csharp
/// <summary>
/// 延迟frame帧后执行后续任务
/// </summary>
/// <param name="frame"></param>
/// <returns></returns>
public JAction DelayFrame(int frame)
```

```csharp
/// <summary>
/// 等待到condition = true, 每frequency秒检测一次，当timeout>-1时，如果超过timeout秒condition还是false就超时了
/// </summary>
/// <param name="condition"></param>
/// <param name="frequency"></param>
/// <param name="timeout"></param>
/// <returns></returns>
public JAction Until(Func<bool> condition, float frequency = 0.5f, float timeout = -1)
```

```csharp
/// <summary>
/// 当condition是true时每frequency秒执行一次action, timeout大于-1时会在执行timeout秒后超时
/// </summary>
/// <param name="action"></param>
/// <param name="condition"></param>
/// <param name="frequency"></param>
/// <param name="timeout"></param>
/// <returns></returns>
public JAction RepeatWhen(Action action, Func<bool> condition, float frequency = 0.5f, float timeout = -1)
```

```csharp
/// <summary>
/// 当condition是false时每frequency秒执行一次action, timeout大于-1时会在执行timeout秒后超时
/// </summary>
/// <param name="action"></param>
/// <param name="condition"></param>
/// <param name="frequency"></param>
/// <param name="timeout"></param>
/// <returns></returns>
public JAction RepeatUntil(Action action, Func<bool> condition, float frequency = 0.5f, float timeout = -1)
```

```csharp
/// <summary>
/// 重复执行action counts次，每次间隔duration秒
/// </summary>
/// <param name="action"></param>
/// <param name="counts"></param>
/// <param name="duration"></param>
/// <returns></returns>
public JAction Repeat(Action action, int counts, float duration = 0)
```

```csharp
/// <summary>
/// 被取消时回调
/// </summary>
/// <param name="action"></param>
/// <returns></returns>
public JAction OnCancel(Action action)
```

```csharp
/// <summary>
/// 取消JAction
/// </summary>
/// <returns></returns>
public JAction Cancel()
```

```csharp
/// <summary>
/// 重置JAction（不force的时候如果在执行就不会重置）
/// </summary>
/// <param name="force"></param>
/// <returns></returns>
public JAction Reset(bool force = true)
```

```csharp
/// <summary>
/// 释放JAction接口，释放后会把JAction任务队列加入对象池
/// </summary>
public void Dispose()
```

### 使用示范

```csharp
public async static void RunGame()
{
  /*
  * ====================================
  *           JAction EXAMPLE
  * ====================================
  */
  int num = 0;
  int repeatCounts = 3;
  float repeatDuration = 0.5f;
  float timeout = 10f;

  //Simple use
  JAction j = new JAction();
  j.Do(() => Log.Print("[j] Hello from JAction!"))
    .Execute();

  //Until
  JAction j1 = new JAction();
  j1.Until(() => true)
    .Do(() => Log.Print("[j1] until condition has done"))
    .Execute();

  //Repeat
  JAction j2 = new JAction();
  j2.Repeat(() =>
            {
              num++;
              Log.Print($"[j2] num is: {num}");
            }, repeatCounts, repeatDuration)
    .Execute();

  //Repeat when
  JAction j3 = new JAction();
  j3.RepeatWhen(() =>
                {
                  Log.Print($"[j3] num is more than 0, num--");
                  num--;
                }, () => num > 0, repeatDuration, timeout)
    .Execute();

  //Repeat until
  JAction j4 = new JAction();
  j4.RepeatUntil(() =>
                 {
                   Log.Print($"[j4] num is less than 3, num++");
                   num++;
                 }, () => num < 3, repeatDuration, timeout)
    .Execute();

  //Delay
  JAction j5 = new JAction();
  j5.Do(() => Log.Print("[j5] JAction will do something else in 3 seconds"))
    .Delay(3.0f)
    .Do(() => Log.Print("[j5] Bye from JAction"))
    .Execute();

  //Execute Async
  JAction j6 = new JAction();
  j6.Do(() => Log.Print("[j6] This is an async JAction"))
    .ExecuteAsyncParallel(() =>
                          {
                            Log.Print("[j6] on complete callback");
                            //dispose JAction
                            j6.Dispose();
                          });

  //Execute Async Parallel
  JAction j7 = new JAction();
  await j7.Do(() => Log.Print("[j7] This is an async JAction but runs parallel, callback will be called after it has done"))
    .ExecuteAsync();

  //Cancel a JAction
  JAction j8 = new JAction();
  j8.RepeatWhen(() => Log.Print("[j8] I am repeating!!!"), () => true, 1, timeout)
    .ExecuteAsync().Coroutine();
  //You can either add a cancel callback
  j8.OnCancel(() =>
              {
                Log.Print("[j8] has been cancelled!");

                //Reset a JAction
                j8.Reset();
              });

  JAction j9 = new JAction();
  j9.Delay(5)
    .Do(() =>
        {
          j8.Cancel();
          Log.Print("[j9] cancelled j8");
        })
    .Execute();
}
```

