# 数据存储方案

## JSaver

JSaver是数据持久化的工具

JSaver能干什么？

::: tip

- 将数据转字符串/JSON字符串/Protobuf二进制的Base64字符串
- AES加密
- 存储数据至本地
- 从本地加载数据（支持泛型）
- 获取本地是否有Key
- 删除本地Key

:::

[[toc]]

### 接口

| 参数       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| dataName   | 需要存取的数据的名字，用于记录到本地，取得时候可以用同名取   |
| val        | 泛型接口的泛型类型实例，即要读取的数据的类型或要存的数据的类型 |
| encryptKey | 16位加密密钥，为null则默认用解压DLL的秘钥                    |

```csharp
/// <summary>
/// Save a data to local storage as string
/// 存数据.ToString()到本地
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static string SaveAsString<T>(string dataName, T val, string encryptKey = null)
```

```csharp
/// <summary>
/// Save a data to local storage as protobuf bytes
/// 存数据转protobuf后的二进制的base64字符串到本地
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static byte[] SaveAsProtobufBytes<T>(string dataName, T val, string encryptKey = null) where T : class
```

```csharp
/// <summary>
/// Save a data to local storage as JSON
/// 存数据转json后的字符串到本地
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static string SaveAsJSON<T>(string dataName, T val, string encryptKey = null)
```

```csharp
/// <summary>
/// Get string from local storage
/// 取ToString()存的数据的字符串
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static string GetString(string dataName, string encryptKey = null)
```

```csharp
/// <summary>
/// Get int from local storage
/// 将ToString()存的数据的字符串尝试转int返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static int GetInt(string dataName, int defaultValue = 0, string encryptKey = null)
```

```csharp
/// <summary>
/// Get short from local storage
/// 将ToString()存的数据的字符串尝试转short返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static short GetShort(string dataName, short defaultValue = 0, string encryptKey = null)
```

```csharp
/// <summary>
/// Get long from local storage
/// 将ToString()存的数据的字符串尝试转long返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static long GetLong(string dataName, long defaultValue = 0, string encryptKey = null)
```

```csharp
/// <summary>
/// Get decimal from local storage
/// 将ToString()存的数据的字符串尝试转decimal返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static decimal GetDecimal(string dataName, decimal defaultValue = 0m, string encryptKey = null)
```

```csharp
/// <summary>
/// Get double from local storage
/// 将ToString()存的数据的字符串尝试转double返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static double GetDouble(string dataName, double defaultValue = 0d, string encryptKey = null)
```

```csharp
/// <summary>
/// Get float from local storage
/// 将ToString()存的数据的字符串尝试转float返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static float GetFloat(string dataName, float defaultValue = 0f, string encryptKey = null)
```

```csharp
/// <summary>
/// Get bool from local storage
/// 将ToString()存的数据的字符串尝试转bool返回
/// </summary>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static bool GetBool(string dataName, bool defaultValue = false, string encryptKey = null)
```

```csharp
/// <summary>
/// Get object from local storage from JSON
/// 取转json字符串存的对象并返回
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static T GetObjectFromJSON<T>(string dataName, string encryptKey = null) where T: class
```

```csharp
/// <summary>
/// Get object from local storage from protobuf
/// 取转protobuf二进制base64字符串存的对象并返回
/// </summary>
/// <typeparam name="T"></typeparam>
/// <param name="val"></param>
/// <param name="encryptKey"></param>
/// <returns>Saved value</returns>
public static T GetObjectFromProtobuf<T>(string dataName, string encryptKey = null) where T : class
```

```csharp
/// <summary>
/// Whether or not has specific data
/// 判断是否有某个名字的数据存着
/// </summary>
/// <param name="dataName"></param>
/// <returns></returns>
public static bool HasData(string dataName)
```

```csharp
/// <summary>
/// Delete specific data
/// 删除指定名字的数据
/// </summary>
/// <param name="dataName"></param>
public static void DeleteData(string dataName)
```

```csharp
/// <summary>
/// Delete all data
/// 删除全部数据
/// </summary>
public static void DeleteAll()
```





### 如何使用

1. 引入以下命名空间

   ```csharp
   using JEngine.Core;
   ```

2. 保存字符串，配置加密密码和数据名称

   ```csharp
   JSaver.SaveAsString("dataName", "data to save", "1234567890987654");//Set a data to local storage
   ```

3. 可获取返回的加密值

   ```csharp
   var encryptStr = JSaver.SaveAsString("dataName", "data to save", "1234567890987654");//set and get the encrypted data string
   ```

4. 获取数据:

   ```csharp
   var decryptStr = JSaver.GetString("dataName", "1234567890987654");
   ```

5. **恭喜！成功使用！**



### 使用示范

   ```csharp
[System.Serializable]
[global::ProtoBuf.ProtoContract()]
public partial class DataClass
{
  [global::ProtoBuf.ProtoMember(1)]
  [global::System.ComponentModel.DefaultValue(0)]
  public int id = 0;

  [global::ProtoBuf.ProtoMember(2)]
  [global::System.ComponentModel.DefaultValue("")]
  public string name = "";

  [global::ProtoBuf.ProtoMember(3)]
  [global::System.ComponentModel.DefaultValue(0)]
  public long money = 0;

  [global::ProtoBuf.ProtoMember(4)]
  [global::System.ComponentModel.DefaultValue(false)]
  public bool gm = false;

  [global::ProtoBuf.ProtoMember(5, TypeName = "JEngine.Examples.DataClass.DataEntry")]
  [global::ProtoBuf.ProtoMap]
  public global::System.Collections.Generic.Dictionary<string, string> data = new global::System.Collections.Generic.Dictionary<string, string>();

}
public static class Program
{
  public static void RunGame()
  {
   /*
   * ====================================
   *           JSaver EXAMPLE
   * ====================================
   */
    JSaver.SaveAsString("dataName", "data to save", "1234567890987654");//Set a data to local storage
    var encryptStr = JSaver.SaveAsString("dataName", "data to save", "1234567890987654");//set and get the encrypted data string
    Log.Print($"[JSaver] Str Encrypted result: {encryptStr}");
    var decryptStr = JSaver.GetString("dataName", "1234567890987654");
    Log.Print($"[JSaver] Str Decrypted result: {decryptStr}");

    //save custom class
    DataClass data = new DataClass
    {
      id = 666,
      name = "JSaver - JSON",
      data = new System.Collections.Generic.Dictionary<string, string>()
      {
        {"test","112233" }
      }
    };
    encryptStr = JSaver.SaveAsJSON("数据存JSON", data);
    Log.Print($"[JSaver] Custom Class Encrypted result: {encryptStr}");
    decryptStr = JSaver.GetString("数据存JSON");//Can convert to string
    Log.Print($"[JSaver] Str Decrypted result: {decryptStr}");

    DataClass newData = JSaver.GetObjectFromJSON<DataClass>("数据存JSON");//Can covert to class

    data = new DataClass
    {
      id = 666666,
      name = "JSaver - Protobuf",
      data = new System.Collections.Generic.Dictionary<string, string>()
      {
        {"test-proto","112233" }
      }
    };
    var bytes = JSaver.SaveAsProtobufBytes("数据存Protobuf", data);
    Log.Print($"[JSaver] Custom Class Encrypted result: {string.Join(",", bytes)}");
    decryptStr = JSaver.GetString("数据存Protobuf");//Can convert to string
    Log.Print($"[JSaver] Str Decrypted result: {decryptStr}");

    newData = JSaver.GetObjectFromProtobuf<DataClass>("数据存Protobuf");//Can covert to class
  }
}
   ```

