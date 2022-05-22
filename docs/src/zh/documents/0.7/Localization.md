# 多语言解决方案

## Localization

JEngine现已支持多语言本地化

:::tip

Localization能干什么？

- 切换语言
- 获取不同语言的字符串
- 缓存语言到本地，下次运行直接使用缓存语言
- 绑定到Text上，自动切换文本

:::

[[toc]]




### APIs


- 切换语言（需要在excel内配置语言的名字）

  ```csharp
  ChangeLanguage(string lang)
  ```


- 获取特定key的当前语种的字符串（需要在excel内配key和值）

  ```csharp
  GetString(string key)
  ```


### 如何使用

#### 代码内使用

1. 引入以下命名空间

   ```csharp
   using JEngine.Core;
   ```

2. 获取字符串

   ```csharp
   string val = Localization.GetString("key");
   ```

3. 切换语言

   ```csharp
   Localization.ChangeLanguage("en-us");
   ```

#### Text绑定多语言

   给GameObject添加LocalizedText，输入key即可

#### 配置多语言

   打开HotUpdateResources/TextAsset/Localization.csv，编辑内容即可

