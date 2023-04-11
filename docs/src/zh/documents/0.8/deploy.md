# 部署资源

该文章将告诉您如何使用JEngine部署打包好了的热更资源

[[toc]]



## 前言

上一篇文章，我们成功的对热更资源进行了打包，现在我们进行资源部署

::: warning 

如果不打算使用远程模式（[热更资源](./ab.md)文章内有提到），可以忽略本文

:::



## 资源结构

请参考以下架构：

- Bundles
  - Android
    - Main
    - AddOn1
  - WebGL
    - Main
    - AddOn1
  - iOS
    - Main
    - AddOn1
  - ...
    - Main
    - AddOn1
    - AddOn2
    - ...



## 结构说明

- 最顶级的目录是叫做Bundles

  > 也可以改名成其他的，但需要在Unity项目的Init场景的Updater的Resource Url和Fallback Url进行修改，这个后面会有详解

- 二级目录以平台命名，例如：

  - Android
  - iOS
  - WebGL
  - Mac
  - Windows
  - 其他平台

  > 若某平台的名字与对应文件夹名字不匹配，Unity项目运行时会有报错，直接看报错信息内要求的URL里的文件夹名称是什么然后使用正确的名称就行

- 三级目录以分别名命名，Main是必须有的，其他分包可选



## 资源上传

打包出来的资源应该在**```UnityProject/Bundles/平台/```**下，进入该目录后**选择**你需要部署资源的**分包**的目录，把**最新打包**出来**的资源复制**到**资源结构**里**对应平台对应分包的资源目录**即可

例如：

把```UnityProject/Bundles/Android/Main/2023-04-10-106```内全部的资源复制到```path/to/Bundles/Android/Main```内

**最后，将Bundles目录上传到静态资源服务器即可**

::: tip

静态资源服务器可以用nginx/apache/tomcat部署，也可以用python的simple http server部署，

把Bundles放到网页根目录下即可，

反正只要能从一个链接下载资源就行

:::
