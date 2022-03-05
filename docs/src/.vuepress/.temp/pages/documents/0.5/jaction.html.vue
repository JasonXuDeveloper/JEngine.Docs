<template><h1 id="jaction" tabindex="-1"><a class="header-anchor" href="#jaction" aria-hidden="true">#</a> JAction</h1>
<p>JEngine现已支持JAction，为Action队列扩展</p>
<blockquote>
<p>JAction能干什么？</p>
<ul>
<li>更少的代码，实现更强大的功能</li>
<li>链式编程</li>
<li>条件等待</li>
<li>延时等待</li>
<li>次数循环</li>
<li>条件循环</li>
<li>取消队列</li>
<li>同步异步运行</li>
<li>可主线程运行</li>
</ul>
</blockquote>
<h2 id="apis" tabindex="-1"><a class="header-anchor" href="#apis" aria-hidden="true">#</a> APIs</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Do</span><span class="token punctuation">(</span><span class="token class-name">Action</span> action<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">float</span></span> time<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Until</span><span class="token punctuation">(</span><span class="token class-name">Func<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> condition<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> frequency <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> timeout <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Repeat</span><span class="token punctuation">(</span><span class="token class-name">Action</span> action<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> counts<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> duration <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">RepeatUntil</span><span class="token punctuation">(</span><span class="token class-name">Action</span> action<span class="token punctuation">,</span> <span class="token class-name">Func<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> condition<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> frequency <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> timeout <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">RepeatWhen</span><span class="token punctuation">(</span><span class="token class-name">Action</span> action<span class="token punctuation">,</span> <span class="token class-name">Func<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> condition<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> frequency <span class="token operator">=</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">float</span></span> timeout <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> onMainThread <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> onMainThread <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">ExecuteAsyncParallel</span><span class="token punctuation">(</span><span class="token class-name">Action</span> callback <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> onMainThread <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnCancel</span><span class="token punctuation">(</span><span class="token class-name">Action</span> action<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> force<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Dispose</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>创建新的<strong>JAction</strong>对象</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JAction</span> j <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>给JAction分配任务</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>j<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Hello from JAction!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Bye from JAction"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p><strong>让JAction执行（必备）</strong>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>j<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p><strong>恭喜！成功使用！</strong>（记得第四步，让JAction执行）</p>
</li>
</ol>
<h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2>
<h3 id="链式编程" tabindex="-1"><a class="header-anchor" href="#链式编程" aria-hidden="true">#</a> 链式编程：</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JAction</span> j <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
j<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Repeat</span><span class="token punctuation">(</span>xxx<span class="token punctuation">,</span>times<span class="token punctuation">,</span>frequecny<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span>duration<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>xxx<span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="demo示例-包含90-的api使用" tabindex="-1"><a class="header-anchor" href="#demo示例-包含90-的api使用" aria-hidden="true">#</a> Demo示例（包含90%的API使用）：</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Example</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token comment">/*
    * ====================================
    *           JAction EXAMPLE
    * ====================================
    */</span>
    <span class="token class-name"><span class="token keyword">int</span></span> num <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">int</span></span> repeatCounts <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">float</span></span> repeatDuration <span class="token operator">=</span> <span class="token number">0.5f</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">float</span></span> timeout <span class="token operator">=</span> <span class="token number">10f</span><span class="token punctuation">;</span>

    <span class="token comment">//Simple use</span>
    <span class="token class-name">JAction</span> j <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j] Hello from JAction!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Until</span>
    <span class="token class-name">JAction</span> j1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j1<span class="token punctuation">.</span><span class="token function">Until</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j1] until condition has done"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Repeat</span>
    <span class="token class-name">JAction</span> j2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j2<span class="token punctuation">.</span><span class="token function">Repeat</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
              <span class="token punctuation">{</span>
                num<span class="token operator">++</span><span class="token punctuation">;</span>
                Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[j2] num is: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">num</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span> repeatCounts<span class="token punctuation">,</span> repeatDuration<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Repeat when</span>
    <span class="token class-name">JAction</span> j3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j3<span class="token punctuation">.</span><span class="token function">RepeatWhen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
                  <span class="token punctuation">{</span>
                    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[j3] num is more than 0, num--"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    num<span class="token operator">--</span><span class="token punctuation">;</span>
                  <span class="token punctuation">}</span><span class="token punctuation">,</span>
                  <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> num <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">,</span> repeatDuration<span class="token punctuation">,</span> timeout<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Repeat until</span>
    <span class="token class-name">JAction</span> j4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j4<span class="token punctuation">.</span><span class="token function">RepeatUntil</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
                   <span class="token punctuation">{</span>
                     Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[j4] num is less than 3, num++"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                     num<span class="token operator">++</span><span class="token punctuation">;</span>
                   <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> num <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">,</span> repeatDuration<span class="token punctuation">,</span> timeout<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Delay</span>
    <span class="token class-name">JAction</span> j5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j5<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j5] JAction will do something else in 3 seconds"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">3.0f</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j5] Bye from JAction"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Execute Async</span>
    <span class="token class-name">JAction</span> j6 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    _ <span class="token operator">=</span> j6<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j6] This is an async JAction"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Execute Async Parallel</span>
    <span class="token class-name">JAction</span> j7 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j7<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j7] This is an async JAction but runs parallel, callback will be called after it has done"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j7] Done"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//Cancel a JAction</span>
    <span class="token class-name">JAction</span> j8 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j8<span class="token punctuation">.</span><span class="token function">RepeatWhen</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j8] I am repeating!!!"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> timeout<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">ExecuteAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//You can either add a cancel callback</span>
    j8<span class="token punctuation">.</span><span class="token function">OnCancel</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j8] has been cancelled!"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">JAction</span> j9 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    j9<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
          <span class="token punctuation">{</span>
            j8<span class="token punctuation">.</span><span class="token function">Cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"[j9] cancelled j8"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">//Reset a JAction</span>
    j8<span class="token punctuation">.</span><span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br></div></div><blockquote>
<p>下一篇，<RouterLink to="/documents/0.5/jsaver.html">数据持久化JSaver教程</RouterLink></p>
</blockquote>
</template>
