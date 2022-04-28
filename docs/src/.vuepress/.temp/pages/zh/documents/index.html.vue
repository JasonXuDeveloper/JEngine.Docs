<template><h1 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h1>
<p>JEngine是一个于2020年7月15日初次提交的Unity框架。大约每年会进行一次大版本更新。</p>
<p>目前有超过30家企业使用JEngine制作商业项目，同时有数百位游戏开发者（或工作室）使用JEngine开发独立游戏。</p>
<ul style="list-style:none;padding:0">
  <li style="display:inline-block">
    <iframe src="https://ghbtns.com/github-btn.html?user=JasonXuDeveloper&amp;repo=JEngine&amp;type=star&amp;count=true" frameborder="0" scrolling="0" width="102px" height="21px"></iframe>
  </li>
  <li style="display:inline-block">
    <iframe src="https://ghbtns.com/github-btn.html?user=JasonXuDeveloper&amp;repo=JEngine&amp;type=fork&amp;count=true" frameborder="0" scrolling="0" width="110px" height="21px"></iframe>
  </li>
</ul>
<h2 id="稳定版本" tabindex="-1"><a class="header-anchor" href="#稳定版本" aria-hidden="true">#</a> 稳定版本</h2>
<p>JEngine目前正在维护的版本</p>
<h3 id="最新版本" tabindex="-1"><a class="header-anchor" href="#最新版本" aria-hidden="true">#</a> <RouterLink to="/zh/documents/0.7/">最新版本</RouterLink> <Badge type="tip" text="v0.7.x" vertical="middle" /></h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<blockquote>
<p>该版本对应的是JEngine的master分支</p>
</blockquote>
<p>最新版本是开发者认为的可以正常使用，不会有太大问题的最新版本，建议使用，功能最为强大，同时修复了0.6和0.5版本的bug。</p>
<h4 id="核心功能" tabindex="-1"><a class="header-anchor" href="#核心功能" aria-hidden="true">#</a> 核心功能</h4>
<ul>
<li>新增可扩展验证器 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>新增UI扩展工具 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>新生命周期 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>优化编辑器流程  <Badge type="warning" text="优化功能" vertical="middle" /></li>
<li>优化框架性能  <Badge type="warning" text="优化功能" vertical="middle" /></li>
<li>JEngine功能更新  <Badge type="warning" text="优化功能" vertical="middle" />
<ul>
<li>JUI</li>
<li>JAction</li>
<li>JBehaviour</li>
</ul>
</li>
</ul>
<h4 id="快速开始-→" tabindex="-1"><a class="header-anchor" href="#快速开始-→" aria-hidden="true">#</a> <RouterLink to="/zh/documents/0.7/">快速开始 →</RouterLink></h4>
</div>
<h3 id="专业版本" tabindex="-1"><a class="header-anchor" href="#专业版本" aria-hidden="true">#</a> <RouterLink to="/zh/documents/pro/">专业版本</RouterLink> <Badge type="tip" text="PRO v1.2" vertical="middle" /></h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<blockquote>
<p>该版本对应的是JEngine Pro的master分支</p>
</blockquote>
<p>专业版是针对JEngine开源版设计的加强版本，<RouterLink to="/zh/pro/">点击了解详情</RouterLink></p>
<h4 id="本次更新" tabindex="-1"><a class="header-anchor" href="#本次更新" aria-hidden="true">#</a> 本次更新</h4>
<ul>
<li>【新增】ClassBind依赖管理面板 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>【新增】ClassBind对象智能检测（类型不存在时自动提示） <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>【新增】将Button替换为可拖拽热更事件的Button的方法 <Badge type="tip" text="新功能" vertical="middle" />
<ul>
<li>选中带Button的gameObject后按下快捷键shift alt r进行替换，替换后依然可以用<code>GetComponent&lt;UnityEngine.UI.Button&gt;()</code>获取</li>
</ul>
</li>
<li>【新增】支持在Inspector下对Button添加热更事件 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>【新增】支持ClassBind直接选择命名空间和类名，无需输入 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>【新增】Vecotr2/3/4类型在ClassBind和运行时Inspector的支持 <Badge type="tip" text="新功能" vertical="middle" /></li>
<li>【同步】开源版从10月16日至2月5日全部更新 <Badge type="warning" text="同步功能" vertical="middle" /></li>
<li>【修复】ClassBind排序工具删不干净的问题<Badge type="danger" text="修复功能" vertical="middle" /></li>
<li>【修复】ClassBind中如果有字段的类型是Transfrom，但赋值的gameObject是个RectTransform，会获取异常<Badge type="danger" text="修复功能" vertical="middle" /></li>
<li>【修复】ClassBind依赖分析热更Button的漏洞<Badge type="danger" text="修复功能" vertical="middle" /></li>
<li>【修改】ClassBind编辑器（默认展开）<Badge type="danger" text="微调功能" vertical="middle" /></li>
</ul>
<h4 id="快速开始-→-1" tabindex="-1"><a class="header-anchor" href="#快速开始-→-1" aria-hidden="true">#</a> <RouterLink to="/zh/documents/pro/">快速开始 →</RouterLink></h4>
</div>
<h2 id="历史版本" tabindex="-1"><a class="header-anchor" href="#历史版本" aria-hidden="true">#</a> 历史版本</h2>
<p>JEngine历史版本，不再维护，使用需谨慎，建议更新到稳定版本</p>
<h3 id="_0-6-x版本" tabindex="-1"><a class="header-anchor" href="#_0-6-x版本" aria-hidden="true">#</a> <RouterLink to="/zh/documents/0.6/">0.6.x版本</RouterLink> <Badge type="warning" text="v0.6.x" vertical="middle" /></h3>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<blockquote>
<p>该版本对应的是JEngine的0.6.x分支</p>
</blockquote>
<p>0.6.x版本是目前大部分商业项目正在使用，内容完善，文档视频充足，需要注意这个版本不是LTS版本，不会再进行任何更新或维护，建议使用<a href="#%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC">最新版本</a>。</p>
<h4 id="快速开始-→-2" tabindex="-1"><a class="header-anchor" href="#快速开始-→-2" aria-hidden="true">#</a> <RouterLink to="/zh/documents/0.6/">快速开始 →</RouterLink></h4>
</div>
<h3 id="_0-5-x版本" tabindex="-1"><a class="header-anchor" href="#_0-5-x版本" aria-hidden="true">#</a> <RouterLink to="/zh/documents/0.5/">0.5.x版本</RouterLink> <Badge type="danger" text="v0.5.x" vertical="middle" /></h3>
<div class="custom-container danger"><p class="custom-container-title">危险</p>
<blockquote>
<p>该版本对应的是JEngine的0.5分支</p>
</blockquote>
<p>0.5.x版本有部分商业项目正在使用，这个版本是JEngine保留下来的最老的版本，与0.6.x一样，该版本不是LTS版本，不会再进行更新或维护，建议使用<a href="#%E6%9C%80%E6%96%B0%E7%89%88%E6%9C%AC">最新版本</a>因为这个版本有很大概率会遇到莫名其妙的Bug。</p>
<h4 id="快速开始-→-3" tabindex="-1"><a class="header-anchor" href="#快速开始-→-3" aria-hidden="true">#</a> <RouterLink to="/documents/0.5/">快速开始 →</RouterLink></h4>
</div>
</template>
