# AssetMgr

AssetMgr是在JEngine用来进行热更资源操作的助手

[[toc]]

## 前言
下面提到的成员/函数都是在`AssetMgr`类下的，这个类型是个单例类型，直接使用`AssetMgr.XXX`即可。

## 真机模式
`RuntimeMode`，Bool类型，为True时代表当前的运行模式为**非编辑器下模拟**的模式

## 运行平台
`GetPlatform`，String类型，返回当前平台的字符串名称

## 更新分包
```csharp
async Task UpdatePackage(string packageName, IUpdater updater = null)
```
对分包进行更新，不需要更新的分包会直接返回

### 参数
- `packageName`，需要进行分包的名称，分包可以在热更资源配置界面进行配置
- `updater`，更新分包时会有各种各样的事件，可以传一个实现了`IUpdater`接口的类型的实例对象来调用这些事件的回调
  > 比如首页Init场景，就挂有一个Updater的脚本负责UI更新等事件，这个脚本就继承了Updater。
  > 如果不想再新建个继承IUpdater的类型，但又想处理回调，可以直接传参`new BaseUpdater`，该类型的构造函数里可以传各种回调事件的匿名委托。

### 例子
该例子来自热更工程的`AddOnDemo`：
```csharp
var packageName = "AddOn1";
await AssetMgr.UpdatePackage(packageName);
```
这个例子对`AddOn1`分包进行了异步更新（通过await进行等待，但不会阻塞线程）

