# ILRuntime工具

JEngine提供了ILRuntime可视化工具面板

[[toc]]



## ILRuntime CLR绑定生成

IL2CPP出包前，进行该操作可防裁剪

### 如何使用

在顶部菜单栏，选择```JEngine/ILRuntime/Generator/CLR Bind```即可自动生成



## ILRuntime适配器生成

JEngine现已支持自动生成ILRuntime适配器

### 如何使用

1. 在Unity顶部，选择JEngine/ILRuntime/Generator/Cross Bind Adapter

2. 会弹出面板，输入想给适配器分配的命名空间，所在程序名，需要生成适配器的类名
   <img src="https://s1.ax1x.com/2020/11/10/Bqvmo6.png" alt="guide1" style="width:50%;margin-left:25%" />


3. 点击生成，会自动创建

### 注意事项

程序集是需要生成适配器的类型的所在程序集

::: tip

如果这个类型在Plugins下，则需要输入Assembly-CSharp-Firstpass

如果这个类型在asmdef下，则需要输入asmdef内配置的名字

其他情况下这个类如果在主工程，则需要输入Assembly-CSharp

如果这个类是系统类，则输入System，并且确保把System这个类的DLL放到了HotUpdateScripts/Dlls内

如果这个类是Unity类，则输入这个module的全程，确保把包含这个类的Module的DLL放到了HotUpdateScripts/Dlls内

Module获取可以在[常见问题](./FAQ.md)内搜索关键词来进行了解

:::

