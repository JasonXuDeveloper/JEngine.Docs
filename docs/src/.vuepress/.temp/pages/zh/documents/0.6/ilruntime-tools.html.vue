<template><h1 id="ilruntime工具" tabindex="-1"><a class="header-anchor" href="#ilruntime工具" aria-hidden="true">#</a> ILRuntime工具</h1>
<p>JEngine提供了ILRuntime可视化工具面板</p>
<h2 id="ilruntime-clr绑定生成" tabindex="-1"><a class="header-anchor" href="#ilruntime-clr绑定生成" aria-hidden="true">#</a> ILRuntime CLR绑定生成</h2>
<p>IL2CPP出包前，进行该操作可防裁剪</p>
<h3 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h3>
<p>在顶部菜单栏，选择<code>JEngine/ILRuntime/Generator/CLR Bind</code>即可自动生成</p>
<h2 id="ilruntime适配器生成" tabindex="-1"><a class="header-anchor" href="#ilruntime适配器生成" aria-hidden="true">#</a> ILRuntime适配器生成</h2>
<p>JEngine现已支持自动生成ILRuntime适配器</p>
<h3 id="如何使用-1" tabindex="-1"><a class="header-anchor" href="#如何使用-1" aria-hidden="true">#</a> 如何使用</h3>
<ol>
<li>
<p>在Unity顶部，选择JEngine/ILRuntime/Generator/Cross Bind Adapter</p>
</li>
<li>
<p>会弹出面板，输入想给适配器分配的命名空间，所在程序名，需要生成适配器的类名
<img src="https://s1.ax1x.com/2020/11/10/Bqvmo6.png" alt="guide1" style="width:50%;margin-left:25%" /></p>
</li>
<li>
<p>点击生成，会自动创建</p>
</li>
<li>
<p>在Unity工程，Assets/Scripts/Helpers/RegisterCrossBindingAdaptorHelper.cs里，加入适配器注册到<code>Register(AppDomain appdomain)</code>方法</p>
</li>
</ol>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>appdomain<span class="token punctuation">.</span><span class="token function">RegisterCrossBindingAdaptor</span><span class="token punctuation">(</span><span class="token keyword">new</span> 你的适配器类<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
