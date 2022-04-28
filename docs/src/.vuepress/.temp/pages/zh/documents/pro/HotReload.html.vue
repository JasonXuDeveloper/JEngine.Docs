<template><h1 id="热重载" tabindex="-1"><a class="header-anchor" href="#热重载" aria-hidden="true">#</a> 热重载</h1>
<p>该功能支持不需重启游戏即可进行热更操作</p>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<p>该功能共3步实现：</p>
<ol>
<li>销毁热更资源</li>
<li>更新热更资源和代码</li>
<li>重载热更代码</li>
</ol>
<p>注意，这里的热重载指的是回到下载场景去更新资源，然后重新进入热更场景，而非原封不动即可更新资源和代码</p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p>使用共2步：</p>
<ol>
<li>自行销毁创建的<code>DontDestoryOnLoad</code>的GameObject</li>
<li>调用<code>InitJEngine.HotReload()</code></li>
</ol>
</template>
