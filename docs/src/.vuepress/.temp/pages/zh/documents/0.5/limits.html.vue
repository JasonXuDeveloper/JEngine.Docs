<template><h1 id="ilruntime限制" tabindex="-1"><a class="header-anchor" href="#ilruntime限制" aria-hidden="true">#</a> ILRuntime限制</h1>
<h2 id="针对ilruntime环境下的建议" tabindex="-1"><a class="header-anchor" href="#针对ilruntime环境下的建议" aria-hidden="true">#</a> 针对ILRuntime环境下的建议</h2>
<ul>
<li>
<p>数学计算最好放到主工程</p>
<p>计算慢的一匹</p>
</li>
<li>
<p>少用<code>{get;set;}</code>这种索引器</p>
<p>有额外GC</p>
</li>
<li>
<p>多线程调用需要预热优化性能（非必须）</p>
<p>参考ILRuntime文档</p>
</li>
</ul>
<h2 id="不能进行的骚操作" tabindex="-1"><a class="header-anchor" href="#不能进行的骚操作" aria-hidden="true">#</a> 不能进行的骚操作</h2>
<ul>
<li>
<p><s>不能使用可空类型修饰符(?)</s></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span><span class="token punctuation">?</span></span> a <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span><span class="token comment">//这种在热更里已经支持了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>不能使用<code>volatile</code>关键词</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">volatile</span> <span class="token class-name"><span class="token keyword">int</span></span> number<span class="token punctuation">;</span><span class="token comment">//这种在热更里也不行</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>委托只能调用<code>Invoke</code>方法</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>Delegate<span class="token punctuation">.</span><span class="token function">BeginInvoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//会出错</span>
Delegate<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//可以</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p><s>LitJson反序列化限制</s>（已经在v0.6.2修复并支持了）</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token preprocessor property">#<span class="token directive keyword">region</span> 本地工程</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Generic<span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Data</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

<span class="token preprocessor property">#<span class="token directive keyword">region</span> 热更工程</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HotData</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token range operator">..</span><span class="token punctuation">.</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token comment">//序列化本地泛型类型，泛型参数为热更类型，是没问题的</span>
      <span class="token class-name">Generic<span class="token punctuation">&lt;</span>HotData<span class="token punctuation">></span></span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Generic<span class="token punctuation">&lt;</span>HotData<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">var</span></span> json <span class="token operator">=</span> JsonMapper<span class="token punctuation">.</span><span class="token function">ToJson</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//OK</span>

      <span class="token comment">//序列化本地泛型类型，泛型参数为本地类型，是没问题的</span>
      <span class="token class-name">Generic<span class="token punctuation">&lt;</span>Data<span class="token punctuation">></span></span> d2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Generic<span class="token punctuation">&lt;</span>Data<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name"><span class="token keyword">var</span></span> json2 <span class="token operator">=</span> JsonMapper<span class="token punctuation">.</span><span class="token function">ToJson</span><span class="token punctuation">(</span>d2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//OK</span>

      <span class="token comment">//反序列化Generic&lt;HotData> v0.6.2开始就支持了</span>
      d <span class="token operator">=</span> JsonMapper<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ToObject</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Generic<span class="token punctuation">&lt;</span>HotData<span class="token punctuation">></span><span class="token punctuation">></span></span></span><span class="token punctuation">(</span>json<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//v0.6.2开始就支持了</span>
      
      <span class="token comment">//反序列化Generic&lt;Data>可以的</span>
      d2 <span class="token operator">=</span> JsonMapper<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">ToObject</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Generic<span class="token punctuation">&lt;</span>Data<span class="token punctuation">></span><span class="token punctuation">></span></span></span><span class="token punctuation">(</span>json2<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//OK</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div></li>
<li>
<p>跨域继承类型强转限制</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">/*
* 热更工程
*/</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">IClass</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MonoClass</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span><span class="token punctuation">,</span> <span class="token class-name">IClass</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NormalClass</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">IClass</span></span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
      <span class="token class-name">List<span class="token punctuation">&lt;</span>IClass<span class="token punctuation">></span></span> lst <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>IClass<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      lst<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">NormalClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//OK</span>
      lst<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">MonoClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//出错，因为Mono跨域继承了，无法强转类型</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></li>
<li>
<p>欢迎提交更多ILRuntime的限制！</p>
</li>
</ul>
<blockquote>
<p>恭喜，JEngine入门篇已完成！</p>
</blockquote>
</template>
