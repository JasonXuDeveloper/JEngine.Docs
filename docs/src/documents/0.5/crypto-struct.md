{% import "views/_data.njk" as data %}

# 内存加密结构（v0.5）

JEngine针对特定情况制作了内存加密结构

> 内存加密结构能干什么？
>
> - 防止内存修改（例如GG修改器）
> - 内存加密结构进行数学运算时：
>   - ```10```次计算，加密结构耗时与原生```无区别```；
>   - ```100```次计算，加密结构耗时是原生```1~3```倍；
>   - ```1000```次计算，加密结构耗时是原生```18~20```倍；
>   - ```10000```次计算，加密结构耗时是原生```19~21```倍；
>   - ```100000```次计算，加密结构耗时是原生```19~21```倍

![compare](https://s1.ax1x.com/2020/10/01/0M6fMV.png)

## 命名空间
- ```csharp
  using JEngine.AntiCheat;
  ```

## API
- ```csharp
  AntiCheatHelper.OnMemoryCheatDetected(Action toDo); //如果被发现玩家有修改内存，执行toDo
  ```

## 请勿调用
- ```csharp
  AntiCheatHelper.OnDetected(); //该方法是内部方法，请勿调用！
  ```

## 支持类型

- ```csharp
  JBool 对应 bool
  ```

- ```csharp
  JChar 对应 char
  ```

- ```csharp
  JString 对应 string
  ```

- ```csharp
  JByte 对应 byte
  ```

- ```csharp
  JSByte 对应 sbyte
  ```

- ```csharp
  JShort 对应 short
  ```

- ```csharp
  JUShort 对应 ushort
  ```

- ```csharp
  JInt 对应 int
  ```

- ```csharp
  JUInt 对应 uint
  ```

- ```csharp
  JLong 对应 long
  ```

- ```csharp
  JULong 对应 ulong
  ```

- ```csharp
  JFloat 对应 float
  ```

- ```csharp
  JDecimal 对应 decimal
  ```

- ```csharp
  JDouble 对应 double
  ```

## 如何使用
和正常数值结构一样，直接使用
```csharp
int a = 0;
JInt b = 1;
b++; //b会是2
b *= a; //b会是0
a++; //a会是1
b = a; //b也会是1
```

从上面的示范里，可以看到，内存加密数据结构会自动转换为正常结构，进行运算时也是如此


## 推荐写法
最简化JSON和Protobuf序列化的长度
```csharp
    [ProtoBuf.ProtoContract]
    public class SafeData
    {
        //Use this format to serialize and deserialize safe data
        [global::ProtoBuf.ProtoMember(1)]
        private float realA;
        [global::ProtoBuf.ProtoMember(2)]
        private long realB;

        //Use this format to declare safe data
        public JFloat a;
        public JLong b;

        public SafeData()
        {
            a = realA;
            b = realB;
        }

        public void BeforeSerialize()
        {
            realA = a;
            realB = b;
        }
    }
```
需要在序列化前，调用```BeforeSerialize()```，这样一来可以最简化序列化长度。

> 下一篇，[热更预制体JPrefab教程](jprefab.html)
