<template><h1 id="button热更事件" tabindex="-1"><a class="header-anchor" href="#button热更事件" aria-hidden="true">#</a> Button热更事件</h1>
<p>JEngine Pro对Button做了扩充，使其支持在编辑器下添加热更事件，不需要通过代码注册。</p>
<h2 id="切换至热更按钮" tabindex="-1"><a class="header-anchor" href="#切换至热更按钮" aria-hidden="true">#</a> 切换至热更按钮</h2>
<ol>
<li>Unity编辑器下选中带有Button的GameObject</li>
<li>顶部菜单栏，<code>Component/Change To Hot Button</code></li>
<li>完成</li>
</ol>
<h2 id="给gameobject添加热更按钮" tabindex="-1"><a class="header-anchor" href="#给gameobject添加热更按钮" aria-hidden="true">#</a> 给GameObject添加热更按钮</h2>
<p>照常在AddComponent的地方添加Button即可</p>
<h2 id="编辑器截图" tabindex="-1"><a class="header-anchor" href="#编辑器截图" aria-hidden="true">#</a> 编辑器截图</h2>
<p><a href="https://imgtu.com/i/qvJCa4" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2022/04/06/qvJCa4.png" alt="qvJCa4.png"><ExternalLinkIcon/></a></p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<ul>
<li>非热更的按钮点击事件与常规Button一样，在OnClick下添加事件即可</li>
<li>若要添加热更对象的方法作为点击事件，需要在下方HotEvents内新增一个元素，然后进行赋值
<ul>
<li>ClassBind参数为创建热更对象的ClassBind脚本，想要给按钮添加热更对象的点击事件，该对象必须使用ClassBind创建</li>
<li>ClassName为热更对象的类型，当为ClassBind参数赋值后，会弹出该ClassBind会创建的全部热更类型，选择需要进行调用方法的热更类型即可</li>
<li>MethodName为该热更类型下的全部可以调用的方法，选择需要添加到点击事件的即可</li>
<li>Parameters为调用该方法时传的参数（支持传多个），只支持非UnityObject类型（即支持bool/number/string）</li>
</ul>
</li>
</ul>
<h2 id="参数类型" tabindex="-1"><a class="header-anchor" href="#参数类型" aria-hidden="true">#</a> 参数类型</h2>
<ul>
<li>数字类型直接写数字</li>
<li>字符串类型直接写字符串</li>
<li>布尔值写true或其他（不是true的情况下都当做false）</li>
<li>其他类型暂不支持</li>
</ul>
<h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2>
<ul>
<li>
<p>获取热更按钮可以使用<code>gameObject.GetComponent&lt;Button&gt;()</code>，这里的<code>Button</code>可以是<code>UnityEngine.UI.Button</code>也可以是<code>JEngine.Pro.Runtime.UI.Button</code>，没有区别</p>
</li>
<li>
<p>方法参数需要按定义的顺序排序</p>
</li>
<li>
<p>如果需要对方法传参，并且参数有默认值，需要分情况</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">/*...*/</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这个情况下，可以不在编辑器面板下创建方法参数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Test</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> b <span class="token operator">=</span> <span class="token string">"111"</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token comment">/*...*/</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这个情况下，a必须传参，b可以不传参</p>
</li>
</ul>
</template>
