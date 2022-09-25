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



### [最新版本](/zh/documents/0.7/) <Badge type="tip" text="v0.7.x" vertical="middle" />

::: tip 

> 该版本对应的是JEngine的master分支

最新版本是开发者认为的可以正常使用，不会有太大问题的最新版本，建议使用，功能最为强大，同时修复了0.6和0.5版本的bug。

#### 核心功能

- 新增可扩展验证器 <Badge type="tip" text="新功能" vertical="middle" />
- 新增UI扩展工具 <Badge type="tip" text="新功能" vertical="middle" />
- 新生命周期 <Badge type="tip" text="新功能" vertical="middle" />
- 优化编辑器流程  <Badge type="warning" text="优化功能" vertical="middle" />
- 优化框架性能  <Badge type="warning" text="优化功能" vertical="middle" />
- JEngine功能更新  <Badge type="warning" text="优化功能" vertical="middle" />
  -  JUI
  -  JAction
  -  JBehaviour

#### V0.7.5beta1更新日志

- **优化**JStream缓冲池策略
- **优化**ClassBind性能及GC
- **优化**框架初始化流程及性能
- **优化**LifeCycleMgr性能及GC
- **优化**```FindObjectsOfType```性能及GC
- **优化**JBehaviour性能及GC，取消其对```MonoBehaviour```的依赖性
- **优化**Loom（主线程执行Actions）性能及GC，取消其对```MonoBehaviour```的依赖性

#### V0.7.4更新日志

- Bug**修复**
- **更新**ILRuntime

- **接入**高性能C#库Nino

- **优化**JBehaviour性能及GC

- **优化**MonoBehaviour循环逻辑及GC

- **优化**分块解密解释执行所占用的内存及产生的GC

#### [快速开始 →](/zh/documents/0.7/)

:::



### [专业版本](/zh/documents/pro/) <Badge type="tip" text="PRO v1.4" vertical="middle" />

::: tip 

> 该版本对应的是JEngine Pro的master分支

专业版是针对JEngine开源版设计的加强版本，[点击了解详情](/zh/pro/)

#### 本次更新

- 【同步】开源版从5月27日至7月15日全部更新
- 【新增】将Slider替换为可拖拽热更事件的Slider的方法
  - 选中带Slider的gameObject后按下快捷键shift alt s进行替换，替换后依然可以用```GetComponent<UnityEngine.UI.Slider>()```获取
- 【新增】支持在Inspector下对Slider添加热更事件
- 【新增】将InputField替换为可拖拽热更事件的InputField的方法
  - 选中带InputField的gameObject后按下快捷键shift alt i进行替换，替换后依然可以用```GetComponent<UnityEngine.UI.InputField>()```获取
- 【新增】支持在Inspector下对InputField添加热更事件
- 【新增】将Dropdown替换为可拖拽热更事件的Dropdown的方法
  - 选中带Dropdown的gameObject后按下快捷键shift alt k进行替换，替换后依然可以用```GetComponent<UnityEngine.UI.Dropdown>()```获取
- 【新增】支持在Inspector下对Dropdown添加热更事件
- 【新增】将Toggle替换为可拖拽热更事件的Toggle的方法
  - 选中带Toggle的gameObject后按下快捷键shift alt l进行替换，替换后依然可以用```GetComponent<UnityEngine.UI.Toggle>()```获取
- 【新增】支持在Inspector下对Toggle添加热更事件
- 【新增】将EventTrigger替换为可拖拽热更事件的EventTrigger的方法
  - 选中带EventTrigger的gameObject后按下快捷键shift alt O进行替换，替换后依然可以用```GetComponent<UnityEngine.EventSystems.EventTrigger>()```获取
- 【新增】支持在Inspector下对EventTrigger添加热更事件
- 【修复】JBehaviour漏洞
- 【修复】JAction漏洞
- 【修复】Release模式漏洞
- 【优化】优化ClassBind依赖管理界面

#### [快速开始 →](/zh/documents/pro/)

:::



## 历史版本

JEngine历史版本，不再维护，使用需谨慎，建议更新到稳定版本



### [0.6.x版本](/zh/documents/0.6/) <Badge type="warning" text="v0.6.x" vertical="middle" />
::: warning
> 该版本对应的是JEngine的0.6.x分支

0.6.x版本是目前大部分商业项目正在使用，内容完善，文档视频充足，需要注意这个版本不是LTS版本，不会再进行任何更新或维护，建议使用[最新版本](#最新版本)。

#### [快速开始 →](/zh/documents/0.6/)

:::

### [0.5.x版本](/zh/documents/0.5/) <Badge type="danger" text="v0.5.x" vertical="middle" />
::: danger
> 该版本对应的是JEngine的0.5分支

0.5.x版本有部分商业项目正在使用，这个版本是JEngine保留下来的最老的版本，与0.6.x一样，该版本不是LTS版本，不会再进行更新或维护，建议使用[最新版本](#最新版本)因为这个版本有很大概率会遇到莫名其妙的Bug。

#### [快速开始 →](/documents/0.5/)

:::