# ILRuntime限制

## 针对ILRuntime环境下的建议

- 数学计算最好放到主工程

  计算较慢（开寄存器后会好很多）

- 少用```{get;set;}```这种索引器

  开发时有额外GC，但是Release出热更DLL，真机下就没了

- 多线程调用同函数需要预热优化性能（非必须）

  参考ILRuntime文档

## 不能进行的骚操作

- ~~不能使用可空类型修饰符(?)~~

  ```csharp
  int? a = null;//这种在热更里已经支持了，但需要做CLR绑定
  ```

- 不能使用```volatile```关键词

  ```csharp
  volatile int number;//这种在热更里也不行
  ```

- 委托只能调用```Invoke```方法

  ```csharp
  Delegate.BeginInvoke();//会出错
  Delegate.Invoke();//可以
  ```

- ~~LitJson反序列化限制~~（已经在JEnginev0.6.2修复并支持了）

  ```csharp
  #region 本地工程
  public class Generic<T>{}
  public class Data{}
  #endregion
  
  #region 热更工程
  public class HotData{}
  ...
  public class Program
  {
    public void RunGame()
    {
        //序列化本地泛型类型，泛型参数为热更类型，是没问题的
        Generic<HotData> d = new Generic<HotData>();
        var json = JsonMapper.ToJson(d);//OK
  
        //序列化本地泛型类型，泛型参数为本地类型，是没问题的
        Generic<Data> d2 = new Generic<Data>();
        var json2 = JsonMapper.ToJson(d2);//OK
  
        //反序列化Generic<HotData> v0.6.2开始就支持了
        d = JsonMapper.ToObject<Generic<HotData>>(json);//v0.6.2开始就支持了
        
        //反序列化Generic<Data>可以的
        d2 = JsonMapper.ToObject<Generic<Data>>(json2);//OK
    }
  }
  #endregion
  ```

- 跨域继承类型强转限制

  ```csharp
  /*
  * 热更工程
  */
  public interface IClass{}
  
  public class MonoClass: MonoBehaviour, IClass{}
  public class NormalClass: IClass{}
  
  public class Program
  {
    public void RunGame()
    {
        List<IClass> lst = new List<IClass>();
        lst.Add(new NormalClass());//OK
        lst.Add(new MonoClass());//出错，因为Mono跨域继承了，无法强转为热更类型
    }
  }
  ```

- 欢迎提交更多ILRuntime的限制！
