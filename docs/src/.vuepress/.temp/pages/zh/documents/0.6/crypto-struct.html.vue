<template><h1 id="内存加密结构" tabindex="-1"><a class="header-anchor" href="#内存加密结构" aria-hidden="true">#</a> 内存加密结构</h1>
<p>JEngine针对特定情况制作了内存加密结构</p>
<blockquote>
<p>内存加密结构能干什么？</p>
<ul>
<li>防止内存修改（例如GG修改器）</li>
<li>内存加密结构进行数学运算时：
<ul>
<li><code>10</code>次计算，加密结构耗时与原生<code>无区别</code>；</li>
<li><code>100</code>次计算，加密结构耗时是原生<code>1~3</code>倍；</li>
<li><code>1000</code>次计算，加密结构耗时是原生<code>18~20</code>倍；</li>
<li><code>10000</code>次计算，加密结构耗时是原生<code>19~21</code>倍；</li>
<li><code>100000</code>次计算，加密结构耗时是原生<code>19~21</code>倍</li>
</ul>
</li>
</ul>
</blockquote>
<p><img src="https://s1.ax1x.com/2020/10/01/0M6fMV.png" alt="compare"></p>
<h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>AntiCheat</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AntiCheatHelper<span class="token punctuation">.</span><span class="token function">OnMemoryCheatDetected</span><span class="token punctuation">(</span><span class="token class-name">Action</span> toDo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//如果被发现玩家有修改内存，执行toDo</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="请勿调用" tabindex="-1"><a class="header-anchor" href="#请勿调用" aria-hidden="true">#</a> 请勿调用</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>AntiCheatHelper<span class="token punctuation">.</span><span class="token function">OnDetected</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//该方法是内部方法，请勿调用！</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="支持类型" tabindex="-1"><a class="header-anchor" href="#支持类型" aria-hidden="true">#</a> 支持类型</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JBool 对应 <span class="token keyword">bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JChar 对应 <span class="token keyword">char</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JString 对应 <span class="token keyword">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JByte 对应 <span class="token keyword">byte</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JSByte 对应 <span class="token keyword">sbyte</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JShort 对应 <span class="token keyword">short</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JUShort 对应 <span class="token keyword">ushort</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JInt 对应 <span class="token keyword">int</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JUInt 对应 <span class="token keyword">uint</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JLong 对应 <span class="token keyword">long</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JULong 对应 <span class="token keyword">ulong</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JFloat 对应 <span class="token keyword">float</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JDecimal 对应 <span class="token keyword">decimal</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JDouble 对应 <span class="token keyword">double</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<p>和正常数值结构一样，直接使用</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token class-name">JInt</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
b<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">//b会是2</span>
b <span class="token operator">*=</span> a<span class="token punctuation">;</span> <span class="token comment">//b会是0</span>
a<span class="token operator">++</span><span class="token punctuation">;</span> <span class="token comment">//a会是1</span>
b <span class="token operator">=</span> a<span class="token punctuation">;</span> <span class="token comment">//b也会是1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>从上面的示范里，可以看到，内存加密数据结构会自动转换为正常结构，进行运算时也是如此</p>
<h2 id="推荐写法" tabindex="-1"><a class="header-anchor" href="#推荐写法" aria-hidden="true">#</a> 推荐写法</h2>
<p>最简化JSON和Protobuf序列化的长度</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ProtoBuf<span class="token punctuation">.</span>ProtoContract</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SafeData</span>
    <span class="token punctuation">{</span>
        <span class="token comment">//Use this format to serialize and deserialize safe data</span>
        <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">float</span></span> realA<span class="token punctuation">;</span>
        <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">long</span></span> realB<span class="token punctuation">;</span>

        <span class="token comment">//Use this format to declare safe data</span>
        <span class="token keyword">public</span> <span class="token class-name">JFloat</span> a<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">JLong</span> b<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token function">SafeData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            a <span class="token operator">=</span> realA<span class="token punctuation">;</span>
            b <span class="token operator">=</span> realB<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">BeforeSerialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            realA <span class="token operator">=</span> a<span class="token punctuation">;</span>
            realB <span class="token operator">=</span> b<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>需要在序列化前，调用<code>BeforeSerialize()</code>，这样一来可以最简化序列化长度。</p>
<blockquote>
<p>下一篇，<a href="jprefab">热更预制体JPrefab教程</a></p>
</blockquote>
</template>
