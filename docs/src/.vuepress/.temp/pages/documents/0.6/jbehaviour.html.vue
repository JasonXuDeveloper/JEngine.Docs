<template><h1 id="jbehaviour" tabindex="-1"><a class="header-anchor" href="#jbehaviour" aria-hidden="true">#</a> JBehaviour</h1>
<p>JEngine<s>现已支持基于MonoBehaviour，却<strong>更强大</strong>的基类</s>已经制作了比使用MonoBehaviour更优化性能的基类，JBehaviour已经不基于MonoBehaviour了</p>
<blockquote>
<p>为什么使用JBehaviour？</p>
<ul>
<li>更简单的周期处理</li>
<li>少量代码，更强功能，API丰富</li>
<li>以异步代替Update，节约开销</li>
<li>更可控的循环，可以调整循环模式和频率</li>
<li>对比热更内继承MonoBehaviour，更少GC，性能更强，执行更快</li>
</ul>
</blockquote>
<img src="https://s1.ax1x.com/2020/07/19/URW5mn.png" alt="JBehaviour" style="zoom:50%;" />
<h2 id="继承使用" tabindex="-1"><a class="header-anchor" href="#继承使用" aria-hidden="true">#</a> 继承使用</h2>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>继承<strong>JBehaviour</strong></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">namespace</span> <span class="token namespace">HotUpdateScripts</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Sample</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JBehaviour</span></span>
    <span class="token punctuation">{</span>
    	<span class="token comment">//ToDo</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li>
<li>
<p><strong>JBehaviour</strong>有四个可overrdie方法</p>
<ul>
<li><code>Init</code> =&gt; 当类被添加到GameObject，可以参考<code>Awake</code></li>
<li><code>Run</code> =&gt; Init之后，参考<code>Start</code></li>
<li><code>Loop</code> =&gt; 频率循环事件，参考<code>Update</code></li>
<li><code>End</code> =&gt; 当脚本被销毁，参考<code>OnDestory</code></li>
</ul>
</li>
<li>
<p>注意：JBehaviour不推荐用gameObject.GetComponent获取，因为JBehaviour原理的缘故，真机这么操作无效，所以建议就用gameObject.GetJBehaviour获取</p>
</li>
</ol>
<h2 id="demo示例-包含90-以上的api使用" tabindex="-1"><a class="header-anchor" href="#demo示例-包含90-以上的api使用" aria-hidden="true">#</a> Demo示例（包含90%以上的API使用）</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Examples</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JBehaviourExample</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JBehaviour</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"JBehaviour has been created!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"JBehaviour is running!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//Change the frequency of loop</span>
            FrameMode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span><span class="token comment">//Don't loop in frame</span>
            Frequency <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span><span class="token comment">//Run every 1000 milliseconds</span>

            i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

            <span class="token function">Destroy</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>gameObject<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"Hello JBehaviour * "</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">" times!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            i<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">End</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"I have been destroyed!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><ol start="5">
<li>
<p>显而易见，在<strong>Run</strong>方法中，分配了<code>frame</code>和<code>frequency</code>数值，这两个数值影响<code>loop</code>方法的频率。</p>
<ul>
<li><code>FrameMode</code>: <code>bool</code>，如果为true，<strong>帧循环</strong>；反之，<strong>毫秒循环</strong> ，默认为<code>true</code></li>
<li><code>Frequency</code>: <code>int</code>，代表循环的<strong>间隔时间</strong>，代表毫秒或帧数，默认为<code>1</code></li>
</ul>
</li>
</ol>
<h2 id="其他接口" tabindex="-1"><a class="header-anchor" href="#其他接口" aria-hidden="true">#</a> 其他接口</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Total time that this JBehaviour has run</span>
<span class="token doc-comment comment">/// 该JBehaviour运行总时长</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> TotalTime <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Deltatime of loop</span>
<span class="token doc-comment comment">/// 循环耗时</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> LoopDeltaTime <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Loop counts</span>
<span class="token doc-comment comment">/// 循环次数</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">long</span></span> LoopCounts <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Time scale</span>
<span class="token doc-comment comment">/// 时间倍速</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">float</span></span> TimeScale <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Hides the UI gameObject</span>
<span class="token doc-comment comment">/// 隐藏UI对象</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">JBehaviour</span> <span class="token function">Hide</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Shows the UI gameObject</span>
<span class="token doc-comment comment">/// 显示UI对象</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">JBehaviour</span> <span class="token function">Show</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Pause the loop</span>
<span class="token doc-comment comment">/// 暂停循环</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">JBehaviour</span> <span class="token function">Pause</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Resume the loop</span>
<span class="token doc-comment comment">/// 恢复循环</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">JBehaviour</span> <span class="token function">Resume</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// Activate the JBehaviour</span>
<span class="token doc-comment comment">/// 激活</span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
<span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>returns</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>returns</span><span class="token punctuation">></span></span></span>
<span class="token keyword">public</span> <span class="token return-type class-name">JBehaviour</span> <span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="实例化" tabindex="-1"><a class="header-anchor" href="#实例化" aria-hidden="true">#</a> 实例化</h2>
<ul>
<li>创建实例（3种方法）
<ol>
<li>直接在编辑器内使用ClassBind挂载脚本<RouterLink to="/documents/0.6/classbind.html">参考这里</RouterLink></li>
<li>使用JBehaviour的创造方法<code>JBehaviour.CreateOn&lt;T&gt;(GameObject gameObject, bool activeAfter = true) where T : JBehaviour</code></li>
<li>直接<code>new()</code>，会创建以唯一实例ID命名的GameObject，并挂上该JBehaviour</li>
</ol>
</li>
<li>获取实例
<ol>
<li>获取单个实例<code>T GetJBehaviour&lt;T&gt;(GameObject gameObject) where T : JBehaviour</code></li>
<li>获取单个实例<code>T GetJBehaviour&lt;T&gt;(string instanceID) where T : JBehaviour</code></li>
<li>获取某GameObject上多个实例<code>T[] GetJBehaviours&lt;T&gt;(GameObject gameObject) where T : JBehaviour</code></li>
</ol>
</li>
<li>删除实例
<code>RemoveJBehaviour(JBehaviour jBehaviour)</code></li>
<li>Demo示范</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> go <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UnityEngine<span class="token punctuation">.</span>GameObject</span><span class="token punctuation">(</span><span class="token string">"Test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//创建实例</span>
<span class="token class-name">JBehaviourExample</span> jb1 <span class="token operator">=</span> JBehaviour<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateOn</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JBehaviourExample<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>go<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">JBehaviourExample</span> jb2 <span class="token operator">=</span> JBehaviour<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateOn</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JBehaviourExample<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>go<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//创建后有唯一实例ID</span>
Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"jb1: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jb1<span class="token punctuation">.</span>InstanceID</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"jb2: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jb2<span class="token punctuation">.</span>InstanceID</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>


<span class="token comment">//通过实例ID获取</span>
<span class="token class-name">JBehaviourExample</span> getJb1 <span class="token operator">=</span> JBehaviour<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetJBehaviour</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JBehaviourExample<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>jb1<span class="token punctuation">.</span>InstanceID<span class="token punctuation">)</span><span class="token punctuation">;</span>
Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"jb1 == getJb1 is </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jb1 <span class="token operator">==</span> getJb1</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//通过GameObject获取第一个挂在上面的JBehaviour</span>
<span class="token class-name">JBehaviourExample</span> getJb1GO <span class="token operator">=</span> JBehaviour<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetJBehaviour</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JBehaviourExample<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>go<span class="token punctuation">)</span><span class="token punctuation">;</span>
Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"jb1 == getJb1GO is </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jb1 <span class="token operator">==</span> getJb1GO</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//获取某GameObject上全部挂着的JBehaviour</span>
<span class="token class-name">JBehaviourExample<span class="token punctuation">[</span><span class="token punctuation">]</span></span> allJbsOnGO <span class="token operator">=</span>
  JBehaviour<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetJBehaviours</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JBehaviourExample<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>go<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> allJbsIds <span class="token operator">=</span> <span class="token keyword">from</span> jb <span class="token keyword">in</span> allJbsOnGO <span class="token keyword">select</span> jb<span class="token punctuation">.</span>InstanceID<span class="token punctuation">;</span>

Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"Test go has </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">allJbsOnGO<span class="token punctuation">.</span>Length</span><span class="token punctuation">}</span></span><span class="token string"> JBehaviours, "</span></span> <span class="token operator">+</span>
          <span class="token interpolation-string"><span class="token string">$"which are </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">,</span> allJbsIds<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//删除JBehvaiour</span>
JBehaviour<span class="token punctuation">.</span><span class="token function">RemoveJBehaviour</span><span class="token punctuation">(</span>jb1<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div></template>
