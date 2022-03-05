<template><h1 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用" aria-hidden="true">#</a> 开始使用</h1>
<p>该文章将告诉您如何初步使用JEngine</p>
<h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2>
<ul>
<li>
<p>Unity版本：2019.3.13f1 （请使用该版本及以上）</p>
</li>
<li>
<p>U3D工程.net环境： .Net Framework 4.x</p>
</li>
<li>
<p>热更工程.net环境： .Net Framework 4.x</p>
</li>
<li>
<p>开发系统：MacOS 10.15.5</p>
<blockquote>
<p>100%支持Windows</p>
</blockquote>
</li>
</ul>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2>
<blockquote>
<p>请按照以下顺序进行操作</p>
</blockquote>
<ol>
<li>
<p><strong>Clone该项目</strong></p>
</li>
<li>
<p>将<strong>Project目录用Unity打开</strong></p>
</li>
<li>
<p>找到<strong>HotUpdateResources/Scene</strong>, 确保你能找到<strong>Game.unity</strong>，并且<strong>HotUpdateResources/DLL/~Hidden文件夹中有生成的DLL文件（这个文件夹Unity内看不见）</strong></p>
<img src="https://s1.ax1x.com/2020/07/14/Ut6vWR.png" alt="check1" style="width:50%;margin-left:25%" />
</li>
<li>
<p>找到并点击顶部导航栏中<strong>JEngine/XAsset/Bundles/Build Bundles</strong>选项</p>
<img src="https://s1.ax1x.com/2020/11/10/BqjoIf.png" alt="menu" style="width:75%;margin-left:12.5%" />
</li>
<li>
<p>~~根据弹窗，<strong>输入DLL加密密码</strong>，点击<strong>Build</strong>~~如果要自定义打包密码，请打开JEngine面板以配置打包密码</p>
</li>
<li>
<p>生成成功后，资源将进入<strong>DLC目录</strong>，将该目录传入您的资源服务器（如果不知道如何操作，请百度搜索如何搭建资源服务器）</p>
</li>
<li>
<p>进入<strong>Init场景</strong>，在阶级中选择<strong>Updater</strong></p>
<img src="https://s1.ax1x.com/2020/07/14/UtcuOf.png" alt="hierarchy" style="width:50%;margin-left:25%" />
<blockquote>
<p>注：Updater组件中有3个勾选框：</p>
<ul>
<li>development，是否为编辑器开发模式，勾选后不需要打ab包即可运行游戏，反之需要打ab包，上传到服务器或通过菜单栏工具拷贝到本地才可以运行游戏</li>
<li>vfs，是否启用vfs，安卓建议开启，ios可以看情况，这个vfs是把所有ab整一起，防止小白用asset studio破解资源</li>
<li>offline，离线模式，勾选后把ab的资源通过菜单栏工具复制到本地后，即可打包使用，无需部署服务器（适用于测试模拟，或暂时不需要热更的游戏）</li>
</ul>
<p>热更ab拷贝到本地的流程：</p>
<ol>
<li>打ab</li>
<li>菜单栏，JEngine/XAsset/Bundles/Copy Bundles to Streaming Assets</li>
</ol>
</blockquote>
</li>
<li>
<p>在<strong>Inspector</strong>中，将<strong>BaseURL</strong>换为您<strong>存放资源的地址</strong></p>
<blockquote>
<p>格式: <code>http://your-ip:your-port/DLC/</code> 或 <code>http://your-domain/DLC/</code></p>
<img src="https://s1.ax1x.com/2020/07/16/UBC5uD.png" alt="inspector" style="width:50%;margin-left:25%" />
</blockquote>
</li>
<li>
<p><strong>Init场景中</strong>，找到 <strong><s>HotFixCode</s> 现已改名InitJEngine</strong>，Inspector中Init方法里的Key为DLL加密密码</p>
</li>
</ol>
  <img src="https://s1.ax1x.com/2020/07/26/apu7En.png" alt="guide1" style="width:50%;margin-left:25%" />
<ol start="10">
<li><strong>现在，运行游戏，即可体验热更功能！</strong></li>
</ol>
<blockquote>
<p>到这里，您已经完成了热更游戏的第一步，恭喜！</p>
</blockquote>
<blockquote>
<p>下一步，<a href="structure">目录结构</a></p>
</blockquote>
</template>
