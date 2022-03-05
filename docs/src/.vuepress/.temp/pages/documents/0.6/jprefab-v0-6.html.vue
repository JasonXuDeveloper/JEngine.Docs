<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="热更预制体解决方案-jprefab-v0-6" tabindex="-1"><a class="header-anchor" href="#热更预制体解决方案-jprefab-v0-6" aria-hidden="true">#</a> 热更预制体解决方案 JPrefab（v0.6）</h1>
<p>JPrefab是针对热更Prefab制作的类型</p>
<blockquote>
<p>JPrefab能干什么？</p>
<ul>
<li>加载热更预制体</li>
<li>检测状态</li>
<li>检测错误信息</li>
<li>生成实例</li>
<li>获取全部通过JPrefab方法生成的预制体实例</li>
<li>优越的GC管理</li>
<li>可手动释放</li>
</ul>
</blockquote>
<h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token function">JPrefab</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> path<span class="token punctuation">)</span> <span class="token comment">//从热更资源里读取prefab</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">bool</span></span> Loaded<span class="token punctuation">;</span> <span class="token comment">//Prefab是否加载（如果有错误，这里也会是加载）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">bool</span></span> Error<span class="token punctuation">;</span> <span class="token comment">//加载时是否有错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> ErrorMessage<span class="token punctuation">;</span> <span class="token comment">//错误时的错误信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> Progress<span class="token punctuation">;</span> <span class="token comment">//加载prefab的进度</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name">LoadState</span> State<span class="token punctuation">;</span> <span class="token comment">//加载prefab的状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name">GameObject</span> Instance<span class="token punctuation">;</span> <span class="token comment">//Prefab游戏对象（这个并不在场景中，也没被生成）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name">List<span class="token punctuation">&lt;</span>GameObject<span class="token punctuation">></span></span> InstantiatedGameObjects<span class="token punctuation">;</span> <span class="token comment">//全部被生成到场景中的游戏对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>生成预制体</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">GameObject</span> <span class="token function">Instantiate</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">GameObject</span> <span class="token function">Instantiate</span><span class="token punctuation">(</span><span class="token class-name">Transform</span> parent<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">GameObject</span> <span class="token function">Instantiate</span><span class="token punctuation">(</span><span class="token class-name">Transform</span> parent<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> instantiateInWorldSpace<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">GameObject</span> <span class="token function">Instantiate</span><span class="token punctuation">(</span><span class="token class-name">Vector3</span> position<span class="token punctuation">,</span> <span class="token class-name">Quaternion</span> rotation<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">GameObject</span> <span class="token function">Instantiate</span><span class="token punctuation">(</span><span class="token class-name">Vector3</span> position<span class="token punctuation">,</span> <span class="token class-name">Quaternion</span> rotation<span class="token punctuation">,</span><span class="token class-name">Transform</span> parent<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>释放</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<blockquote>
<p>下一篇，<RouterLink to="/documents/0.6/jevent-v0-6.html">事件派发JEvent教程</RouterLink></p>
</blockquote>
</template>
