# 概述

JEngine是一个于2020年7月15日初次提交的Unity框架。大约每年会进行一次大版本更新。

目前有超过100家企业使用JEngine制作商业项目，同时有数百上千位独立游戏开发者（或工作室）使用JEngine开发独立游戏。

<ul style="list-style:none;padding:0">
  <li style="display:inline-block">
    <iframe src="https://ghbtns.com/github-btn.html?user=JasonXuDeveloper&amp;repo=JEngine&amp;type=star&amp;count=true" frameborder="0" scrolling="0" width="102px" height="21px"></iframe>
  </li>
  <li style="display:inline-block">
    <iframe src="https://ghbtns.com/github-btn.html?user=JasonXuDeveloper&amp;repo=JEngine&amp;type=fork&amp;count=true" frameborder="0" scrolling="0" width="110px" height="21px"></iframe>
  </li>
</ul>


## 稳定版本

JEngine目前正在维护的版本



### [最新版本](/zh/documents/0.8/) <Badge type="tip" text="v0.8.x" vertical="middle" />

::: tip 

> 该版本对应的是JEngine的master分支

最新版本是开发者认为的可以正常使用，不会有太大问题的最新版本，建议使用，功能最为强大，同时修复了老版本的bug。

#### V0.8.0更新日志

- **支持** WebGL

- **移除** JUI（过段时间会重构）

- **优化** LifeCycleMgr 性能

- **优化** ThreadMgr 功能

- **优化** JStream 性能

- **优化** JBehaviour 性能

- **优化** MonoBehaviour 性能

- **优化** FpsMonitor 性能

- **优化** CryptoMgr 接口

- **优化** JBehaviour/ClassBind Object/MonoBehaviour GC

- **优化** GetComponent(s)/FindObject(s)OfType 性能

- **切换** 到 YooAsset作为热更资源管理 (弃用Bundle Master)

- **新功能** UnsafeMgr 提供不安全（用于性能优化）功能

- **新功能** UnmanagedMemoryPool 提供非托管内存池功能

- **新功能** CoroutineMgr提供在非MonoBehaviour类型内使用携程的功能

- **新架构** 将JEngine源码分成不同的模块，核心代码更轻量！

#### [快速开始 →](/zh/documents/0.8/)

:::



### [专业版本](/zh/documents/pro/) <Badge type="tip" text="PRO v1.5" vertical="middle" />

::: tip 

> 该版本对应的是JEngine Pro的master分支

专业版是针对JEngine开源版设计的加强版本，[点击了解详情](/zh/pro/)

#### 本次更新

- 【新增】打热更包时自动收集Shader及其变种并自动生成保留文件到主包
- 【新增】全部UGUI编辑器下事件支持注册带Enum参数的方法
- 【新增】支持运行时Inspector下查看主工程Enum字段并修改
- 【新增】支持ClassBind赋值Enum对象（主工程热更工程的都支持）
- 【同步】开源版7月15日至10月8日全部更新
- 【更新】ILRuntime至v2.1.0正式版

#### [快速开始 →](/zh/documents/pro/)

:::



## 历史版本

JEngine历史版本，不再维护，使用需谨慎，建议更新到稳定版本



### [0.7.x版本](/zh/documents/0.7/) <Badge type="warning" text="v0.7.x" vertical="middle" />

::: warning

> 该版本对应的是JEngine的0.7.x分支

0.7.x版本目前大部分商业项目都在使用，该版本是2022年最热门的版本，附带强大可靠的功能，包含完善的文档，但是没有任何官方视频教程，且不会再更新或维护，建议使用[最新版本](#最新版本)。

#### [快速开始 →](/zh/documents/0.6/)

:::

### [0.6.x版本](/zh/documents/0.6/) <Badge type="warning" text="v0.6.x" vertical="middle" />
::: warning
> 该版本对应的是JEngine的0.6.x分支

0.6.x版本目前部分商业项目正在使用，内容完善，文档视频充足，需要注意这个版本不是LTS版本，不会再进行任何更新或维护，建议使用[最新版本](#最新版本)。

#### [快速开始 →](/zh/documents/0.6/)

:::

### [0.5.x版本](/zh/documents/0.5/) <Badge type="danger" text="v0.5.x" vertical="middle" />
::: danger
> 该版本对应的是JEngine的0.5分支

0.5.x版本有部分商业项目正在使用，这个版本是JEngine保留下来的最老的版本，与0.6.x一样，该版本不是LTS版本，不会再进行更新或维护，建议使用[最新版本](#最新版本)因为这个版本有很大概率会遇到莫名其妙的Bug。

#### [快速开始 →](/documents/0.5/)

:::