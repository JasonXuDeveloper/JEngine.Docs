# 开始使用 （v0.6）

该文章将告诉您如何初步使用JEngine

## 开发环境

- Unity版本：2019.3.13f1 （请使用该版本及以上）

- U3D工程.net环境： .Net Framework 4.x

- 热更工程.net环境： .Net Framework 4.x

- 开发系统：MacOS 10.15.5

  > 100%支持Windows

## 快速开始

> 请按照以下顺序进行操作

1. **Clone该项目**

2. 将**Project目录用Unity打开**

3. 找到**HotUpdateResources/Scene**, 确保你能找到**Game.unity**，并且**HotUpdateResources/DLL/~Hidden文件夹中有生成的DLL文件（这个文件夹Unity内看不见）**

   <img src="https://s1.ax1x.com/2020/07/14/Ut6vWR.png" alt="check1" style="width:50%;margin-left:25%" />

4. 找到并点击顶部导航栏中**JEngine/XAsset/Bundles/Build Bundles**选项

   <img src="https://s1.ax1x.com/2020/11/10/BqjoIf.png" alt="menu" style="width:75%;margin-left:12.5%" />

5. ~~根据弹窗，**输入DLL加密密码**，点击**Build**~~如果要自定义打包密码，请打开JEngine面板以配置打包密码

6. 生成成功后，资源将进入**DLC目录**，将该目录传入您的资源服务器（如果不知道如何操作，请百度搜索如何搭建资源服务器）

7. 进入**Init场景**，在阶级中选择**Updater**

   <img src="https://s1.ax1x.com/2020/07/14/UtcuOf.png" alt="hierarchy" style="width:50%;margin-left:25%" />

   > 注：Updater组件中有3个勾选框：
   > - development，是否为编辑器开发模式，勾选后不需要打ab包即可运行游戏，反之需要打ab包，上传到服务器或通过菜单栏工具拷贝到本地才可以运行游戏
   > - vfs，是否启用vfs，安卓建议开启，ios可以看情况，这个vfs是把所有ab整一起，防止小白用asset studio破解资源
   > - offline，离线模式，勾选后把ab的资源通过菜单栏工具复制到本地后，即可打包使用，无需部署服务器（适用于测试模拟，或暂时不需要热更的游戏）
   > 
   > 热更ab拷贝到本地的流程：
   > 1. 打ab
   > 2. 菜单栏，JEngine/XAsset/Bundles/Copy Bundles to Streaming Assets

8. 在**Inspector**中，将**BaseURL**换为您**存放资源的地址**

   > 格式: ```http://your-ip:your-port/DLC/``` 或 ```http://your-domain/DLC/```
   >
   > <img src="https://s1.ax1x.com/2020/07/16/UBC5uD.png" alt="inspector" style="width:50%;margin-left:25%" />

9. **Init场景中**，找到 **~~HotFixCode~~ 现已改名InitJEngine**，Inspector中Init方法里的Key为DLL加密密码

  <img src="https://s1.ax1x.com/2020/07/26/apu7En.png" alt="guide1" style="width:50%;margin-left:25%" />


10. **现在，运行游戏，即可体验热更功能！**

   > 到这里，您已经完成了热更游戏的第一步，恭喜！


> 下一步，[目录结构](structure.html)
