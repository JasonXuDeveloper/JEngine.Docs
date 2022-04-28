<template><h1 id="assetmgr" tabindex="-1"><a class="header-anchor" href="#assetmgr" aria-hidden="true">#</a> AssetMgr</h1>
<p>AssetMgr是JEngine封装的加载热更资源/场景的工具</p>
<p>AssetMgr需要先初始化分包才可使用，需要参考<RouterLink to="/zh/documents/0.7/Updater.html">Updater使用</RouterLink></p>
<nav class="table-of-contents"><ul><li><RouterLink to="#使用接口">使用接口</RouterLink></li><li><RouterLink to="#bpath">BPath</RouterLink></li></ul></nav>
<h3 id="使用接口" tabindex="-1"><a class="header-anchor" href="#使用接口" aria-hidden="true">#</a> 使用接口</h3>
<ul>
<li>
<p>是否是真机模式</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span>RuntimeMode
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>同步加载主包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>同步加载指定分包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span>分包名称<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>同步加载主包泛型资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Load</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>同步加载指定分包泛型资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Load</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span>分包名称<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>异步加载主包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> AssetMgr<span class="token punctuation">.</span><span class="token function">LoadAsync</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>异步加载指定分包资源（会被装箱为UnityEngine.Object类型，需要自己拆箱）</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> AssetMgr<span class="token punctuation">.</span><span class="token function">LoadAsync</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span>分包名称<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>异步加载主包泛型资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> AssetMgr<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>异步加载指定分包泛型资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> AssetMgr<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span>分包名称<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>卸载路径资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">Unload</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span>分包名称 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>同步加载场景</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">LoadScene</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span> 是否以Additive加载 <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> 分包名称 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>异步加载场景</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">LoadSceneAsync</span><span class="token punctuation">(</span>资源全路径<span class="token punctuation">,</span> 是否以Additive加载 <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> 分包名称 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
            Action<span class="token operator">&lt;</span><span class="token keyword">float</span><span class="token operator">></span> 加载中的回调 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
            Action<span class="token operator">&lt;</span>AsyncOperation<span class="token operator">></span> 加载完成的回调 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>卸载全部当前场景资源</p>
<blockquote>
<p>该接口会在切换场景时自动调用</p>
</blockquote>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AssetMgr<span class="token punctuation">.</span><span class="token function">RemoveUnusedAssets</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h3 id="bpath" tabindex="-1"><a class="header-anchor" href="#bpath" aria-hidden="true">#</a> BPath</h3>
<p>BPath是每次<RouterLink to="/zh/documents/0.7/BuildAb.html">打AB</RouterLink>后自动生成的文件，会生成到热更工程，里面包含了全部打入AB的资源的全路径，可以使用BPath的字段来快速加载指定路径的资源</p>
</template>
