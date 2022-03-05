<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="热更预制体解决方案-jprefab-v0-5" tabindex="-1"><a class="header-anchor" href="#热更预制体解决方案-jprefab-v0-5" aria-hidden="true">#</a> 热更预制体解决方案 JPrefab（v0.5）</h1>
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
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>using JEngine<span class="token punctuation">.</span>Core<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<ul>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public <span class="token function">JPrefab</span><span class="token punctuation">(</span>string path<span class="token punctuation">)</span> <span class="token comment">//从热更资源里读取prefab</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public bool Loaded<span class="token punctuation">;</span> <span class="token comment">//Prefab是否加载（如果有错误，这里也会是加载）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public bool Error<span class="token punctuation">;</span> <span class="token comment">//加载时是否有错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public string ErrorMessage<span class="token punctuation">;</span> <span class="token comment">//错误时的错误信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public <span class="token keyword">float</span> Progress<span class="token punctuation">;</span> <span class="token comment">//加载prefab的进度</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public LoadState State<span class="token punctuation">;</span> <span class="token comment">//加载prefab的状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject Instance<span class="token punctuation">;</span> <span class="token comment">//Prefab游戏对象（这个并不在场景中，也没被生成）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public List<span class="token operator">&lt;</span>GameObject<span class="token operator">></span> InstantiatedGameObjects<span class="token punctuation">;</span> <span class="token comment">//全部被生成到场景中的游戏对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>生成预制体</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject <span class="token function">Instantiate</span><span class="token punctuation">(</span>string name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject <span class="token function">Instantiate</span><span class="token punctuation">(</span>Transform parent<span class="token punctuation">,</span> string name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject <span class="token function">Instantiate</span><span class="token punctuation">(</span>Transform parent<span class="token punctuation">,</span> bool instantiateInWorldSpace<span class="token punctuation">,</span> string name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject <span class="token function">Instantiate</span><span class="token punctuation">(</span>Vector3 position<span class="token punctuation">,</span> Quaternion rotation<span class="token punctuation">,</span> string name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public GameObject <span class="token function">Instantiate</span><span class="token punctuation">(</span>Vector3 position<span class="token punctuation">,</span> Quaternion rotation<span class="token punctuation">,</span>Transform parent<span class="token punctuation">,</span> string name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>释放</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public <span class="token keyword">void</span> <span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<blockquote>
<p>下一篇，<RouterLink to="/documents/0.5/ilruntime-tools.html">ILRuntime工具</RouterLink></p>
</blockquote>
</template>
