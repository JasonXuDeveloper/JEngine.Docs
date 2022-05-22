# 可绑定数据方案

## BindableProperty

该类型可以将数值与事件绑定，当数值出现变化，会调用绑定的事件，JUI需要这个实现数据绑定

[[toc]]

### 注意事项

每次必须对BindableProperty的Value进行修改才能监听到改变，但是如果操作Value内部的字段，这种无法监听，必须让内部字段也变成一个BindableProperty然后内部字段自行进行监听

::: tip

例如```BindableProperty<List<int>>```，当使用```b.Value.Add```，对监听值这个列表加元素时，无法监听

只能监听```b.Value = new List<int>()```这种覆盖原值的操作

:::



### 申明可绑定数据

   ```csharp
public BindableProperty<int> b = new BindableProperty<int>(0);
   ```

这里的int可以替换为别的类型



### 获得和改变BindableProperty的值

   ```csharp
int newB = b;//直接赋值即可
b.Value = 10;//需要对bindableProperty的value进行操作
   ```

### 绑定事件

```csharp
public Action<T> OnChange;//新值的回调
public Action<T,T> OnChangeWithOldVal;//老值，新值，的回调
```

### 使用示范

   ```csharp
[System.Serializable][global::ProtoBuf.ProtoContract()]
public class DataClass
{
  /*
  * Fields to serialize in Protobuf
  */
  [global::ProtoBuf.ProtoMember(1)] public int id = 0;
  [global::ProtoBuf.ProtoMember(2)] public string name = "";
  [global::ProtoBuf.ProtoMember(3)] private long money = 0;
  [global::ProtoBuf.ProtoMember(4)] public bool gm = false;

  /// <summary>
  /// Property which holds the real value and will be serialized in JSON
  /// </summary>
  public long Money
  {
    get
    {
      return money;
    }
    set
    {
      money = value;
      if (BindableMoney != null)
      {
        BindableMoney.Value = value;
      }
      else
      {
        BindableMoney = new BindableProperty<long>(value);
      }
    }
  }

  /*
  * Fields to bind but won't be serialized
  */
  internal BindableProperty<long> BindableMoney;


  //将可序列化的值变可绑定的值
  public DataClass()
  {
    id = 0;
    money = 0;
    BindableMoney = new BindableProperty<long>(money);
    BindableMoney.OnChange = val => Log.Print($"最新的值是{val}");
    BindableMoney.OnChangeWithOldVal = (oldV, newV) => Log.Print($"最新的值是{newV}, 老的是{oldV}");
  }
}
   ```