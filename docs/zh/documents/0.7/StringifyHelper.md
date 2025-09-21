# 序列化助手方案

## StringifyHelper

JEngine封装的快捷序列化/反序列化对象的方法

### 命名空间

```csharp
using JEngine.Core;
```

### 类名

```csharp
public class StringifyHelper
```



### 接口

```csharp
/// <summary>
/// 序列化并返回二进制
/// Serialize an Object and return byte[]
/// </summary>
/// <param name="obj"></param>
/// <returns></returns>
public static byte[] ProtoSerialize<T>(T obj) where T : class
```

```csharp
/// <summary>
/// 获取文件来反序列化（只能是可热更资源）
/// Use file to deserialize (only hot update resources)
/// </summary>
/// <param name="path"></param>
/// <typeparam name="T"></typeparam>
/// <returns></returns>
public static T ProtoDeSerializeFromFile<T>(string path) where T : class
```

```csharp
/// <summary>
/// 通过二进制反序列化
/// Deserialize with byte[]
/// </summary>
/// <param name="msg"></param>
/// <typeparam name="T"></typeparam>
/// <returns></returns>
public static T ProtoDeSerialize<T>(byte[] msg) where T : class
```

```csharp
/// <summary>
/// 将类转换至JSON字符串
/// Convert object to JSON string
/// </summary>
/// <param name="value"></param>
/// <returns></returns>
public static string JSONSerliaze(object value)
```

```csharp
/// <summary>
/// 将JSON字符串转类
/// Convert JSON string to Class
/// </summary>
/// <param name="value"></param>
/// <returns></returns>
public static T JSONDeSerliaze<T>(string value)
```

```csharp
/// <summary>
/// 将文件中的JSON字符串转类（仅限热更资源）
/// Convert JSON string from file to class (only hot update files)
/// </summary>
/// <param name="value"></param>
/// <returns></returns>
public static T JSONDeSerliazeFromFile<T>(string path)
```

