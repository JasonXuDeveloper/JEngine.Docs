# 验证器校验方案

验证器模块包含2个部分：验证结果类型、验证器类型

[[toc]]

## 命名空间

```csharp
using JEngine.Core;
```

## JValidation

JValidation是JEngine提供的验证器校验结果，里面包含了是否验证成功以及错误信息

### 字段

```csharp
public string ErrorMsg;
```

错误信息

```csharp
(bool)validation;
```

将JValidation强转为bool，该值代表是否验证通过



## StringValidation

目前验证器类型制作了对String的验证

::: tip

建议参考JEngine自带的ValidationDemo

:::

### 接口

::: tip

验证时对于condition参数，可以使用以下关键词（多个关键词用|拼接）: min:int,max:int,nullable,capital,lower,number

```min:数字```，代表最小字符串长度；

```max:int```，代表最大字符串长度；

```nullable```，代表字符串可以是null；

```capital```，代表字符串必须是全大写；

```lower```，代表字符串必须全小写；

```number```，代表字符串必须全数字

:::

```csharp
/// <summary>
/// 验证字符串
/// condition可以使用以下关键词（多个关键词用|拼接）: min:int,max:int,nullable,capital,lower,number
/// </summary>
/// <param name="str"></param>
/// <param name="condition"></param>
/// <returns></returns>
public static JValidation Validate(this string str, string condition)
```

```csharp
/// <summary>
/// 验证字符串
/// condition可以使用以下关键词（多个关键词用|拼接）: min:int,max:int,nullable,capital,lower,number
/// </summary>
/// <param name="str"></param>
/// <param name="ret"></param>
/// <param name="cond"></param>
/// <returns></returns>
public static JValidation Validate(this string str, string cond, out JValidation ret)
```

::: tip

第二个方法中，out的参数也是校验结果，和该方法自身的返回值是相同的，之所以这么写是为了在if的条件内直接使用Validate，然后再out出一个用于获取错误信息的对象，可以参考下面使用示范

:::



### 使用示范

```csharp
Debug.Log("目前验证器制作了对String的验证");
Debug.Log("条件可以使用以下关键词（多个关键词用|拼接）: min:int,max:int,nullable,capital,lower,number");
Debug.Log("一种写法是StringValidation.Validate(字符串内容，条件，out var result)，这个result是个JValidation，可以获取其ErrorMsg即错误信息");
var str = "111";
if (!StringValidation.Validate(str, "min:10", out var v))
{
  Debug.LogError(v.ErrorMsg);
}
else
{
  Debug.Log($"valid str: {str}");
}

Debug.Log("简单点也可以定义一个对象，然后用扩展方法验证，即：var result = 字符串内容.Validate(条件)");
str = "1234567890987654321";
var validated = str.Validate("max:10");
if (!validated)
{
  Debug.LogError(validated.ErrorMsg);
}
else
{
  Debug.Log($"valid str: {str}");
}

Debug.Log("条件可以有多个，用|分割即可，即str.Validate(条件1|条件2|...)");
str = "ABCDEFG";
validated = StringValidation.Validate(str, $"max:{int.MaxValue}|capital");
if (!validated)
{
  Debug.LogError(validated.ErrorMsg);
}
else
{
  Debug.Log($"valid str: {str}");
}

Debug.Log("判断是不是全是数字");
str = "1234567890987654321";
validated = str.Validate("number");
if (!validated)
{
  Debug.LogError(validated.ErrorMsg);
}
else
{
  Debug.Log($"valid str: {str}");
}

Debug.Log("还可以对空string做验证");
str = null;
validated = str.Validate("nullable");
if (!validated)
{
  Debug.LogError(validated.ErrorMsg);
}
else
{
  Debug.Log($"str is null: {str is null}");
}
```

