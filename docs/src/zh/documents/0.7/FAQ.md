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





### 热更工程部分Unity类型不存在

::: tip

#### 原因

因为Unity2018后对引擎代码进行了拆分，把不同功能拆分到了不同模块的DLL内，如```Animatior```，```Input```等类型都被拆分出去了，在热更工程内如果没引用对应的模块DLL，则没办法使用

#### 解决方案

1. 用IDE打开主工程任意脚本

2. 写个你要用的类，例如写个```public Animator a;```，然后按下F12，或按下Command（mac），然后左键点击你要用的类（这里的例子就是点刚刚写的```Animator```

3. 接着会反编译出来个程序集路径

   ![BIwX9K.png](https://s1.ax1x.com/2020/11/07/BIwX9K.png)

4. 热更工程引用该路径的DLL即可

:::



### `.Net Framework4.6.1` 安装不上

::: tip

#### 原因

不同电脑有不同的```.net framework```版本，需要在VS内配置对应版本

#### 解决方案

右键 -> 解决方案 -> 属性 -> 应用程序 : 目标框架 选择对应的版本，需要```4.x```版本

:::
