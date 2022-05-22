# 概述

JEngine是一个于2020年7月15日初次提交的Unity框架。大约每年会进行一次大版本更新。

目前有超过50家企业使用JEngine制作商业项目，同时有数百位游戏开发者（或工作室）使用JEngine开发独立游戏。

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

#### V0.7.2更新日志

- Bug**修复**
- **优化**底层
- **优化**周期
- **更新**ETTask
- **优化**JAction
- **优化**JBehaviour
- **优化**Unity**报错堆栈**
- **热更**包支持**黑名单**功能
- 新Protobuf**序列化Demo**
- **更新**Protobuf-net魔改版**插件**

#### [快速开始 →](/zh/documents/0.7/)

:::



### [专业版本](/zh/documents/pro/) <Badge type="tip" text="PRO v1.2" vertical="middle" />

::: tip 

> 该版本对应的是JEngine Pro的master分支

专业版是针对JEngine开源版设计的加强版本，[点击了解详情](/zh/pro/)

#### 本次更新

- 【新增】ClassBind依赖管理面板 <Badge type="tip" text="新功能" vertical="middle" />
- 【新增】ClassBind对象智能检测（类型不存在时自动提示） <Badge type="tip" text="新功能" vertical="middle" />
- 【新增】将Button替换为可拖拽热更事件的Button的方法 <Badge type="tip" text="新功能" vertical="middle" />
  - 选中带Button的gameObject后按下快捷键shift alt r进行替换，替换后依然可以用`GetComponent<UnityEngine.UI.Button>()`获取
- 【新增】支持在Inspector下对Button添加热更事件 <Badge type="tip" text="新功能" vertical="middle" />
- 【新增】支持ClassBind直接选择命名空间和类名，无需输入 <Badge type="tip" text="新功能" vertical="middle" />
- 【新增】Vecotr2/3/4类型在ClassBind和运行时Inspector的支持 <Badge type="tip" text="新功能" vertical="middle" />
- 【同步】开源版从10月16日至2月5日全部更新 <Badge type="warning" text="同步功能" vertical="middle" />
- 【修复】ClassBind排序工具删不干净的问题<Badge type="danger" text="修复功能" vertical="middle" />
- 【修复】ClassBind中如果有字段的类型是Transfrom，但赋值的gameObject是个RectTransform，会获取异常<Badge type="danger" text="修复功能" vertical="middle" />
- 【修复】ClassBind依赖分析热更Button的漏洞<Badge type="danger" text="修复功能" vertical="middle" />
- 【修改】ClassBind编辑器（默认展开）<Badge type="danger" text="微调功能" vertical="middle" />

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