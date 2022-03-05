<template><h1 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h1>
<p>该文章将告诉您JEngine的目录结构是什么样子的</p>
<h2 id="unity工程目录" tabindex="-1"><a class="header-anchor" href="#unity工程目录" aria-hidden="true">#</a> Unity工程目录</h2>
<ul>
<li><strong>Assets</strong> - Unity工程根目录
<ul>
<li><strong>Dependencies</strong> - JEngine用到的一些第三方插件，更新时替换该目录</li>
<li><strong>HotUpdateResources</strong> - 所有热更资源将存放在这里
<ul>
<li><strong>Controller</strong> - 动画</li>
<li><strong>Dll</strong> - 该目录存放热更代码</li>
<li><strong>Material</strong> - 材质</li>
<li><strong>Prefab</strong> - 预制体</li>
<li><strong>Scene</strong> - 场景</li>
<li><strong>ScriptableObject</strong> - Unity的可程序化物件</li>
<li><strong>TextAsset</strong> - 文本资源</li>
<li><strong>UI</strong> - 图片资源</li>
<li><strong>Other</strong> - 其他任意东西，只要能被加载的都可以丢在这里</li>
</ul>
</li>
<li><strong>Scripts</strong> - 无法热更新的代码
<ul>
<li><strong>InitJEngine.cs&amp;LoadILRuntime.cs</strong> - <strong>十分重要</strong>的文件，用于启动游戏，每次更新替换该2个文件</li>
<li><strong>Helpers</strong> - 助手类文件夹，包含ILRuntime注册代码</li>
<li><strong>Adapters</strong> - 适配器类文件夹，生成ILRuntime适配器后会创建此文件夹，包含ILRuntime的适配器，用于热更工程继承本地接口和类</li>
<li><strong>APIs</strong> - 往该文件夹里放您的代码</li>
</ul>
</li>
<li><strong>Init.unity</strong> - 启动游戏的场景</li>
</ul>
</li>
</ul>
<h2 id="生成目录" tabindex="-1"><a class="header-anchor" href="#生成目录" aria-hidden="true">#</a> 生成目录</h2>
<ul>
<li><strong>Builds</strong> - 生成的客户端可以放在这里</li>
</ul>
<h2 id="热更资源生成目录" tabindex="-1"><a class="header-anchor" href="#热更资源生成目录" aria-hidden="true">#</a> 热更资源生成目录</h2>
<ul>
<li><strong>DLC</strong> - 热更资源导出目录</li>
</ul>
<h2 id="热更代码目录" tabindex="-1"><a class="header-anchor" href="#热更代码目录" aria-hidden="true">#</a> 热更代码目录</h2>
<ul>
<li><strong>HotUpdateScripts</strong> - 热更代码项目
<ul>
<li><strong>Program.cs</strong> - 启动游戏的代码, <strong>你可以更改里面的东西，但请不要删除或更改该脚本的RunGame方法</strong></li>
<li><strong>JEngine</strong> - <strong>请勿删除</strong>，JEngine部分源码在里面，<strong>每次更新覆盖该目录</strong></li>
<li><strong>Examples</strong> - JEngine的Demo源码</li>
</ul>
</li>
</ul>
</template>
