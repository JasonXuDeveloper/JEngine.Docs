# 从老版本升级

该文章将告诉您如何从老版本升级至v0.8系列

[[toc]]



## 从0.7.x升级

- 拉取0.8的项目
- 需要把热更资源按新架构重新整理一番导入到拉取的项目
- 很多功能被拆成模块了，需要在对应模块选择安装
- 把老项目自己写的主工程代码直接并入拉取的项目
- 把老项目自己写的热更工程代码直接并入拉取的项目
- AseetMgr部分接口参数有更改
- 更新分包的接口有更改
- 若要兼容WebGL，请勿使用任何同步加载资源
- 热更工程需要重新引用`Libray/ScriptAssemblies/Assembly-CSharp.dll`，还需要引用`Libray/ScriptAssemblies/YooAsset.dll`
- 热更工程项目输出地址要从`Assets/HotUpdateResources/Dll/Hidden~`改到`Assets/HotUpdateResources/Main/Dll/Hidden~`
