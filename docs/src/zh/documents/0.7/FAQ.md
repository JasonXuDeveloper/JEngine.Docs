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

> 内容提供者：清行

#### 原因

JEngine是用Mac开发的，Win下编译DLL有可能需要重新配置

#### 解决方法

方法一：VS打开热更工程后找到配置管理器，指定平台后记得勾上生成

方法二：删除```Assets/HotUpdateResources/Dlls/Hidden~```文件夹，然后再进一下Unity，会自动重新生成文件夹，然后再生成解决

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



### 如何调试热更工程（或ILRuntime调试器无效）

::: tip

#### 原因

VS2019开始，或ILRuntime2.0开始，就可以用新版调试器了，旧版的容易无效

#### 解决方案

直接在Visual Studio (Windows), VS Code (Windows + MacOS), Rider (Windows + MacOS) 插件市场搜索ILRuntime即可，然后安装对应的调试插件，接着运行游戏，进入热更场景后，回到IDE，然后附加到ILRuntime调试器插件即可

:::





### 热更场景光照贴图丢失

::: tip

#### 原因

Unity把光照贴图用到的Shader变体给裁了

#### 解决方案

Project Setting -> Graphics -> Shader Stripping -> Lightmap Modes

选择Custom，全打钩，打ab，出包，解决。

![OJkfdH.png](https://s1.ax1x.com/2022/05/09/OJkfdH.png)

:::



### Cannot find XXX for: **YYY**

::: tip

#### 原因

ILRuntime需要对委托、匿名函数等生成代码

> 注意，如果是Cannot find method，那就是被裁减了，要做CLR绑定（菜单栏，```JEngine/ILRuntime/CLR Bind```）

#### 解决方案

- 如果是需要生成Adapter，代表用到了跨域继承，请参考ILRuntime跨域继承文档，搭配JEngine提供的ILRuntime跨域继承适配器生成器去生成适配器

- 如果是需要生成其他的东西，在报错内会有个Please Add Following Code，复制里面的内容，黏贴到对应文件即可

  <img src="https://s1.ax1x.com/2020/07/14/Ut2RoD.png" alt="guide5" style="width:50%;margin-left:25%" />

  例如这里是```Cannot find Delegate Adapter```，那么只需要复制下面的代码，找到```Scripts/Helpers/RegisterDelegateAdapterHelper.cs```，将代码黏贴进去就好

  > 有的时候自动生成的代码，需要手动修改

:::



### 没找到这个资源的handler

:::tip

#### 原因

在切换场景时，会自动释放全部热更资源，若该热更资源已被释放，则会因为无法重复释放而出现该错误信息

#### 解决方案

忽略

:::



### 生成的适配器有报错

::: tip

#### 原因

如果继承了```MonoBehaviour```或其他Unity类型，生成的适配器可能会出现重复定义的方法

#### 解决方案

手动删除重复定义的方法即可（如同方法生成了2次，那么删除任意一个即可，需要保留一份）

:::



### 热更工程没办法使用```ScriptableObject```

::: tip

#### 原因

ScriptableObject需要在主工程定义，里面的字段无法热更，只能热更生成的数据配置（.asset文件）

#### 解决方案

在主工程定义ScriptableObject，或在热更工程用其他的代替

:::







### 热更工程没办法继承```IPointerXXXX```

::: tip

#### 原因

首先，跨域继承需要适配器，参考ILRuntime文档，其次，跨域不支持多继承，即不能同时在热更工程继承```MonoBehaviour```和```IPointerXXX```等接口

#### 解决方案

在主工程定义个类，继承这些需要继承的东西，然后用框架的ILRuntime跨域继承适配器生成器，生成该类的适配器，然后在热更工程继承该类

:::







### 热更工程没办法使用编辑器代码或使用了不生效

::: tip

#### 原因

热更工程是运行时环境，没必要使用，使用了也没效果

#### 解决方案

热更工程去掉编辑器代码

:::





### 热更工程没办法使用主工程Plugins内的代码

::: tip

#### 原因

没在热更工程引用对应代码

#### 解决方案

热更工程引用```UnityProject/Library/ScriptAssemblies/Assembly-CSharp-Firstpass.dll```

:::





### 热更工程没办法使用主工程内的代码

::: tip

#### 原因

没在热更工程引用对应代码

#### 解决方案

热更工程引用```UnityProject/Library/ScriptAssemblies/Assembly-CSharp.dll```

:::





### 热更工程没办法使用主工程Asmdef内的代码

::: tip

#### 原因

没在热更工程引用对应代码

#### 解决方案

热更工程引用```UnityProject/Library/ScriptAssemblies/Asmdef的名字.dll```

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

> 内容提供者：清行

#### 原因

不同电脑有不同的```.net framework```版本，需要在VS内配置对应版本

#### 解决方案

右键 -> 解决方案 -> 属性 -> 应用程序 : 目标框架 选择对应的版本，需要```4.x```版本

:::



### DOTween无法使用

::: tip

> 内容提供者：L-fone

#### 原因

需要以正确的姿势去使用

#### 解决方案

**1、导入DoTween**

<img src="https://s1.ax1x.com/2020/11/07/BINzo6.png" alt="BINzo6.png" style="zoom:50%;" />

**2、拷贝Dll文件到HotFix的Dlls目录下**

<img src="https://s1.ax1x.com/2020/11/07/BIwh1U.png" alt="BIwh1U.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwonJ.png" alt="BIwonJ.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwLh6.png" alt="BIwLh6.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwX9K.png" alt="BIwX9K.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwj1O.png" alt="BIwj1O.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwvcD.png" alt="BIwvcD.png" style="zoom:50%;" />

**3、引入dll文件到HotFix工程中**

<img src="https://s1.ax1x.com/2020/11/07/BIwTB9.png" alt="BIwTB9.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwqtx.png" alt="BIwqtx.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BI0SnH.png" alt="BI0SnH.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BIwxje.png" alt="BIwxje.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BI0pBd.png" alt="BI0pBd.png" style="zoom:50%;" />

**4、使用DoTween**

<img src="https://s1.ax1x.com/2020/11/07/BI09HA.png" alt="BI09HA.png" style="zoom:50%;" />

<img src="https://s1.ax1x.com/2020/11/07/BI0PAI.png" alt="BI0PAI.png" style="zoom:50%;" />


> 如果还有其他特殊情况，可以在JEngine群里求助，也可以联系QQ：275757115（L-Fone）



:::
