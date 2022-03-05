<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="游戏热更-v0-5" tabindex="-1"><a class="header-anchor" href="#游戏热更-v0-5" aria-hidden="true">#</a> 游戏热更（v0.5）</h1>
<p>该文章将告诉您如何使用JEngine热更游戏</p>
<h2 id="资源热更" tabindex="-1"><a class="header-anchor" href="#资源热更" aria-hidden="true">#</a> 资源热更</h2>
<blockquote>
<p>参考<RouterLink to="/documents/0.5/structure.html">目录结构</RouterLink>
在<code>HotUpdateResources</code>目录下，根据热更资源的类别，存放热更文件即可</p>
</blockquote>
<h2 id="代码热更" tabindex="-1"><a class="header-anchor" href="#代码热更" aria-hidden="true">#</a> 代码热更</h2>
<ol>
<li>找到并打开<strong>Project/HotUpdateScripts/HotUpdateScripts.sln</strong></li>
<li>选择<strong>Program.cs</strong> 并打开</li>
<li>更改但 <strong>不要删除RunGame()</strong> 方法</li>
<li><strong>生成解决方案</strong>（就是生成DLL，开发的时候Debug生成，发行的时候换Release，GC更少）</li>
<li>回到Unity，进行<RouterLink to="/documents/0.5/startup.html">开始使用</RouterLink>的<strong>第4和第5步</strong></li>
<li>开启开发模式，运行游戏</li>
<li>您会发现热更代码能够完美运行，恭喜！</li>
</ol>
<blockquote>
<p>下一步，<RouterLink to="/documents/0.5/classbind.html">挂载代码</RouterLink></p>
</blockquote>
</template>
