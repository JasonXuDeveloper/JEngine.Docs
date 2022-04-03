# 常见问题一览

::: tip

如果遇到无法解决的问题欢迎联系作者

:::



[[toc]]



### 热更工程无法打开

::: tip

#### 原因

JEngine是用Mac开发的，Win下用VS打开可能会出现这个问题

#### 解决方案

百度/谷歌搜索以下关键词：

- Windows 打开Mac的C#项目
- mac windows sln csproj不兼容
- visual studio 无法打开sln 文件

或者可以创建个C#命令行工程，然后覆盖替换sln和csprj文件，然后记得配置输出路径，参考[这里](#生成热更工程后游戏没热更)

:::

### 生成热更工程DLL跳过

::: tip

#### 原因

JEngine是用Mac开发的，Win下编译DLL有可能需要重新配置

#### 解决方法

VS打开热更工程后找到配置管理器，指定平台后记得勾上生成

:::



### 生成热更工程后游戏没热更

::: tip

#### 原因

可能是开了真机模式没打新ab，可能开了离线模式没把新ab复制到Streaming Assets，可能DLL没生成成功

#### 解决方案

1. 确保DLL生成路径在```UnityProject/Assets/HotUpdateResources/Dlls/Hidden~```下
2. 确保热更工程生成DLL后Unity控制台有输出```Clean xxx in xxx ms```
3. 如果是离线模式，确保打了ab后复制到了Streaming Assets
4. 如果是真机模式，确保打了ab后上传到了服务器

:::
