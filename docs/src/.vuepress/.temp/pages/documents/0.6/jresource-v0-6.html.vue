<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="jresource-v0-6" tabindex="-1"><a class="header-anchor" href="#jresource-v0-6" aria-hidden="true">#</a> JResource（v0.6）</h1>
<p>JEngine现已支持基于XAsset的资源管理方案</p>
<blockquote>
<p>为什么使用JResource？</p>
<ul>
<li>更精简的代码</li>
<li>支持开发模式</li>
<li>支持泛型加载</li>
</ul>
</blockquote>
<h2 id="apis" tabindex="-1"><a class="header-anchor" href="#apis" aria-hidden="true">#</a> APIs</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">LoadRes</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">,</span> <span class="token class-name">MatchMode</span> mode <span class="token operator">=</span> MatchMode<span class="token punctuation">.</span>AutoMatch<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">LoadResAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span> callback<span class="token punctuation">,</span> <span class="token class-name">MatchMode</span> mode <span class="token operator">=</span> MatchMode<span class="token punctuation">.</span>AutoMatch<span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UnityEngine<span class="token punctuation">.</span>Object</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">MatchMode</span>
<span class="token punctuation">{</span>
  AutoMatch <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span>
  Animation <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span>
  Material <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">,</span>
  Prefab <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span>
  Scene <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span>
  ScriptableObject <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">,</span>
  TextAsset <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">,</span>
  UI <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">,</span>
  Other <span class="token operator">=</span> <span class="token number">9</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></li>
</ul>
<h2 id="示例代码-包含90-以上的api使用" tabindex="-1"><a class="header-anchor" href="#示例代码-包含90-以上的api使用" aria-hidden="true">#</a> 示例代码（包含90%以上的API使用）</h2>
<ul>
<li>Sync Method</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> txt <span class="token operator">=</span> JResource<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadRes</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TextAsset<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"Text.txt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Get Resource with Sync method: "</span> <span class="token operator">+</span> txt<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>Async Parallel Method</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JResource<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">LoadResAsync</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>TextAsset<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"Text.txt"</span><span class="token punctuation">,</span><span class="token punctuation">(</span>txt<span class="token punctuation">)</span><span class="token operator">=></span>
<span class="token punctuation">{</span>
	Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Get Resource with Async method: "</span> <span class="token operator">+</span> txt<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><blockquote>
<p>下一篇，<RouterLink to="/documents/0.6/jaction-v0-6.html">队列解决方案JAction教程</RouterLink></p>
</blockquote>
</template>
