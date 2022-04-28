<template><h1 id="jgameobject对象池" tabindex="-1"><a class="header-anchor" href="#jgameobject对象池" aria-hidden="true">#</a> JGameObject对象池</h1>
<p>JGameObjectPool是一个GameObject对象池</p>
<blockquote>
<p>JGameObjectPool能干什么？</p>
<ul>
<li>创建GameObject</li>
<li>从池内取GameObject</li>
<li>灵活使用优化性能</li>
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
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token class-name">GameObject</span> PoolObject<span class="token punctuation">;</span> <span class="token comment">//从对象池内获取对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<ol>
<li>在Unity编辑器下，进入一个场景</li>
<li>选中一个要挂载对象池的GameObject</li>
<li>挂上ClassBind</li>
<li>命名空间写<code>JEngine.Core</code>，类名写<code>JGameObjectPool</code></li>
<li>点击ClassBind内的自动匹配字段</li>
<li>给字段赋值
<ol>
<li><code>OriginalObj</code>是池的对象的原对象，可以是Prefab或场景内的GameObject</li>
<li><code>Parent</code>是对象池生成<code>OriginalObj</code>后生成出来的东西的父Transform</li>
<li><code>pooledAmount</code>是池子初始化时的总数（即初始化是生成几次<code>OriginalObj</code>）</li>
<li><code>lockPool</code>是是否需要锁池子，如果池子被锁了，且没有空余的对象去返回，就会返回null，而如果没锁池子，如果没空余的对象去返回就会生成新的，并给池子扩容</li>
</ol>
</li>
<li>代码里获取到<code>JGameObjectPool</code>后调用其<code>PoolObject</code>即可</li>
<li>使用完毕后将gameObject的active设为false自动释放，否则不会释放</li>
</ol>
</template>
