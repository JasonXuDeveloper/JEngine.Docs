{% import "views/_data.njk" as data %}

# Localization（v0.6）

JEngine现已支持多语言本地化

> Localization能干什么？
>
> - 切换语言
> - 获取不同语言的字符串
> - 缓存语言到本地，下次运行直接使用缓存语言
> - 绑定到Text上，自动切换文本


## APIs


- ```c#
  ChangeLanguage(string lang)
  ```


- ```c#
  GetString(string key)
  ```


## 如何使用

### 代码内使用

1. 在您的热更工程里，引入以下命名空间

   ```c#
   using JEngine.Core;
   ```

2. 获取字符串

   ```c#
   string val = Localization.GetString("key");
   ```

3. 切换语言

   ```c#
   Localization.ChangeLanguage("en-us");
   ```

### Text绑定多语言

   给GameObject添加LocalizedText，输入key即可

### 配置多语言

   打开HotUpdateResources/TextAsset/Localization.csv即可

> 下一篇，[内存加密结构教程](crypto-struct-v0-6.html)
