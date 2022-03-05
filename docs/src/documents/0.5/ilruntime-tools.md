# ILRuntime工具
JEngine提供了ILRuntime可视化工具面板

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

4. 在Unity工程，Assets/Scripts/Helpers/RegisterCrossBindingAdaptorHelper.cs里，加入适配器注册到```Register(AppDomain appdomain)```方法
```csharp
appdomain.RegisterCrossBindingAdaptor(new 你的适配器类());
```

> 下一步，[Protobuf工具](proto-tools.html)
