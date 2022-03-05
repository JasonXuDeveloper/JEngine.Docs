<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="localization-v0-6" tabindex="-1"><a class="header-anchor" href="#localization-v0-6" aria-hidden="true">#</a> Localization（v0.6）</h1>
<p>JEngine现已支持多语言本地化</p>
<blockquote>
<p>Localization能干什么？</p>
<ul>
<li>切换语言</li>
<li>获取不同语言的字符串</li>
<li>缓存语言到本地，下次运行直接使用缓存语言</li>
<li>绑定到Text上，自动切换文本</li>
</ul>
</blockquote>
<h2 id="apis" tabindex="-1"><a class="header-anchor" href="#apis" aria-hidden="true">#</a> APIs</h2>
<ul>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">ChangeLanguage</span><span class="token punctuation">(</span>string lang<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">GetString</span><span class="token punctuation">(</span>string key<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<h3 id="代码内使用" tabindex="-1"><a class="header-anchor" href="#代码内使用" aria-hidden="true">#</a> 代码内使用</h3>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>using JEngine<span class="token punctuation">.</span>Core<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取字符串</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>string val <span class="token operator">=</span> Localization<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>切换语言</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>Localization<span class="token punctuation">.</span><span class="token function">ChangeLanguage</span><span class="token punctuation">(</span><span class="token string">"en-us"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ol>
<h3 id="text绑定多语言" tabindex="-1"><a class="header-anchor" href="#text绑定多语言" aria-hidden="true">#</a> Text绑定多语言</h3>
<p>给GameObject添加LocalizedText，输入key即可</p>
<h3 id="配置多语言" tabindex="-1"><a class="header-anchor" href="#配置多语言" aria-hidden="true">#</a> 配置多语言</h3>
<p>打开HotUpdateResources/TextAsset/Localization.csv即可</p>
<blockquote>
<p>下一篇，<RouterLink to="/documents/0.6/crypto-struct-v0-6.html">内存加密结构教程</RouterLink></p>
</blockquote>
</template>
