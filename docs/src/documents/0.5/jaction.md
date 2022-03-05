# JAction（v0.5）

JEngine现已支持JAction，为Action队列扩展

> JAction能干什么？
>
> - 更少的代码，实现更强大的功能
> - 链式编程
> - 条件等待
> - 延时等待
> - 次数循环
> - 条件循环
> - 取消队列
> - 同步异步运行
> - 可主线程运行



## APIs

- ```csharp
  Do(Action action)
  ```

- ```csharp
  Delay(float time)
  ```

- ```csharp
  Until(Func<bool> condition, float frequency = 25, float timeout = -1)
  ```

- ```csharp
  Repeat(Action action, int counts, float duration = 0)
  ```

- ```csharp
  RepeatUntil(Action action, Func<bool> condition, float frequency = 25, float timeout = -1)
  ```

- ```csharp
  RepeatWhen(Action action, Func<bool> condition, float frequency = 25, float timeout = -1)
  ```

- ```csharp
  Execute(bool onMainThread = false)
  ```

- ```csharp
  ExecuteAsync(bool onMainThread = false)
  ```

- ```csharp
  ExecuteAsyncParallel(Action callback = null, bool onMainThread = false)
  ```

- ```csharp
  OnCancel(Action action)
  ```

- ```csharp
  Cancel()
  ```

- ```csharp
  Reset(bool force)
  ```

- ```csharp
  Dispose()
  ```



## 如何使用

1. 在您的热更工程里，引入以下命名空间

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

## 扩展

### 链式编程：

   ```csharp
   JAction j = new JAction();
   j.Do(xxx)
     .Repeat(xxx,times,frequecny)
     .Delay(duration)
     .Do(xxx)
     .Execute();
   ```

### Demo示例（包含90%的API使用）：

   ```csharp
   public class Example : MonoBehaviour
   {
     public void Start()
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
                     },
                     () => num > 0, repeatDuration, timeout)
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
       _ = j6.Do(() => Log.Print("[j6] This is an async JAction"))
         .ExecuteAsync();
   
       //Execute Async Parallel
       JAction j7 = new JAction();
       j7.Do(() => Log.Print("[j7] This is an async JAction but runs parallel, callback will be called after it has done"))
         .ExecuteAsync(() => Log.Print("[j7] Done"));
   
       //Cancel a JAction
       JAction j8 = new JAction();
       j8.RepeatWhen(() => Log.Print("[j8] I am repeating!!!"), () => true, 1, timeout)
         .ExecuteAsync();
       //You can either add a cancel callback
       j8.OnCancel(() => Log.Print("[j8] has been cancelled!"));
   
       JAction j9 = new JAction();
       j9.Delay(5)
         .Do(() =>
             {
               j8.Cancel();
               Log.Print("[j9] cancelled j8");
             })
         .Execute();
   
   
       //Reset a JAction
       j8.Reset();
     }
   }
   ```

> 下一篇，[数据持久化JSaver教程](jsaver.html)
