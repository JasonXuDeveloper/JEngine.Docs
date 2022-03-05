<template><h1 id="jengine-ui-jui" tabindex="-1"><a class="header-anchor" href="#jengine-ui-jui" aria-hidden="true">#</a> JEngine.UI (JUI)</h1>
<p>JEngine已推出提高UI开发效率的功能(支持操作任何UGUI组件, 例如：Button, Text, Slider,等)</p>
<blockquote>
<p>为什么使用JUI？</p>
<ul>
<li>链式编程</li>
<li>数据绑定</li>
<li>循环更新</li>
<li>精简强大</li>
<li>基类使用JBehaviour，低GC高性能</li>
</ul>
</blockquote>
<img src="https://s1.ax1x.com/2020/07/19/URWIwq.png" alt="JUI" style="zoom:50%;" />
<h2 id="apis" tabindex="-1"><a class="header-anchor" href="#apis" aria-hidden="true">#</a> APIs</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">onInit</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>JUI<span class="token punctuation">></span></span> init<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">onRun</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>JUI<span class="token punctuation">></span></span> run<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">onLoop</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>JUI<span class="token punctuation">></span></span> loop<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">onEnd</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>JUI<span class="token punctuation">></span></span> end<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">onMessage</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>JUI<span class="token punctuation">></span></span> message<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">Bind</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">BindableProperty<span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span> val<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">where</span> <span class="token class-name">T</span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">UIBehaviour</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>用<code>JUI.CreateOn(GameObject gameObject)</code>方法创建JUI</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">//Here it is an example of adding JUI</span>
<span class="token class-name">JUI</span> t <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/AnyGameObject"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>可以对JUI的生命周期进行分配：</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>       <span class="token comment">//To Init it</span>
       t<span class="token punctuation">.</span><span class="token function">onInit</span><span class="token punctuation">(</span>t <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                  
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//To Run it</span>
       t<span class="token punctuation">.</span><span class="token function">onRun</span><span class="token punctuation">(</span>t <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                  
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//When it has ended</span>
       t<span class="token punctuation">.</span><span class="token function">onEnd</span><span class="token punctuation">(</span>t <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                  
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//To Loop it</span>
       t<span class="token punctuation">.</span><span class="token function">onLoop</span><span class="token punctuation">(</span>t <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                  
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// To Bind a Data</span>
      <span class="token class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span> i <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      t<span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Bind JUI to an data</span>
      <span class="token comment">//What to do when data has updated</span>
      t<span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span>t <span class="token operator">=></span>
                  <span class="token punctuation">{</span>
                    
                  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div></li>
<li>
<p><strong>激活JUI（必备）</strong>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>t<span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p><strong>恭喜！成功使用</strong> （记住第四步激活JUI）</p>
</li>
<li>
<p>删除，可以直接删GameObject，或使用JBehaviour的销毁方法：<code>JBehaviour.RemoveJBehaviour(jui);</code></p>
</li>
</ol>
<h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2>
<h3 id="链式编程" tabindex="-1"><a class="header-anchor" href="#链式编程" aria-hidden="true">#</a> 链式编程</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JUIText</span> t <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/Text"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onInit</span><span class="token punctuation">(</span>t1 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onRun</span><span class="token punctuation">(</span>t2 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onLoop</span><span class="token punctuation">(</span>t3 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onEnd</span><span class="token punctuation">(</span>t4 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="demo示例-包含90-的api使用" tabindex="-1"><a class="header-anchor" href="#demo示例-包含90-的api使用" aria-hidden="true">#</a> Demo示例（包含90%的API使用）</h3>
<h4 id="使用循环来实现倒计时" tabindex="-1"><a class="header-anchor" href="#使用循环来实现倒计时" aria-hidden="true">#</a> 使用循环来实现倒计时</h4>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Example</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">/*
             * ========================================================================
             * 10 seconds countdown demo
             * 10秒倒计时例子
             * ========================================================================
             */</span>

            <span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

            <span class="token class-name">JUI</span> t <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/Text"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//给一个GameObject绑定JUI，该GameObject可以不包含任何UI控件</span>
                <span class="token punctuation">.</span><span class="token function">onInit</span><span class="token punctuation">(</span>t1 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">var</span></span> text <span class="token operator">=</span> t1<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    text<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"I have been Inited!"</span><span class="token punctuation">;</span>
                    Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onRun</span><span class="token punctuation">(</span>t2 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                    <span class="token class-name"><span class="token keyword">var</span></span> text <span class="token operator">=</span> t2<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    text<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"I am Running!"</span><span class="token punctuation">;</span>
                    Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span>text<span class="token punctuation">.</span>text<span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token comment">//Set the loop mode and frequency</span>
                    t2<span class="token punctuation">.</span>FrameMode <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span><span class="token comment">//Run in milliseconds</span>
                    t2<span class="token punctuation">.</span>Frequency <span class="token operator">=</span> <span class="token number">1000</span><span class="token punctuation">;</span><span class="token comment">//Run in every 1000 ms (1 second)</span>

                    UnityEngine<span class="token punctuation">.</span>Object<span class="token punctuation">.</span><span class="token function">Destroy</span><span class="token punctuation">(</span>t2<span class="token punctuation">.</span>gameObject<span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onLoop</span><span class="token punctuation">(</span>t3 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                    i<span class="token operator">--</span><span class="token punctuation">;</span>
                    <span class="token class-name"><span class="token keyword">var</span></span> text <span class="token operator">=</span> t3<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    text<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"I will be destroyed in "</span> <span class="token operator">+</span> i <span class="token operator">+</span><span class="token string">" seconds!"</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">onEnd</span><span class="token punctuation">(</span>t4 <span class="token operator">=></span>
                <span class="token punctuation">{</span>
                    Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"My lifecycle has been ended!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h4 id="数据绑定" tabindex="-1"><a class="header-anchor" href="#数据绑定" aria-hidden="true">#</a> 数据绑定</h4>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Serializable</span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Data</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// This showcase shows how JUI works if an UI needs to update frequently</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">:</span><span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Demo</span> Instance<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token class-name">Data</span> data<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Awake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Instance <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
            data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Create data</span>
        <span class="token punctuation">}</span>

        <span class="token comment">//You need Start here in ILRuntime so that it leads to update</span>
        <span class="token comment">//If you dont have Start method when you inherit MonoBehaviour, ILRuntime will not call Update (It is an unknown bug and i will fix it soon as possible)</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            
        <span class="token punctuation">}</span>

        <span class="token class-name"><span class="token keyword">float</span></span> seconds <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">//pretends to modify data every second</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            seconds <span class="token operator">+=</span> Time<span class="token punctuation">.</span>deltaTime<span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>seconds <span class="token operator">>=</span> <span class="token number">1</span><span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                data<span class="token punctuation">.</span>a<span class="token operator">++</span><span class="token punctuation">;</span><span class="token comment">//Pretending modifing data</span>
                data<span class="token punctuation">.</span>b<span class="token punctuation">.</span>Value<span class="token operator">++</span><span class="token punctuation">;</span><span class="token comment">//Pretending modifing data</span>
                seconds <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>



    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JUIShowcase</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span>
    <span class="token punctuation">{</span>
        <span class="token class-name">GameObject</span> a<span class="token punctuation">;</span>
        <span class="token class-name">GameObject</span> b<span class="token punctuation">;</span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> NORMAL WAY TO UPDATE UI</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Awake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">//Add showcase data</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GameObject</span><span class="token punctuation">(</span><span class="token string">"BindShowcase"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Demo<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            a <span class="token operator">=</span> GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/A"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Bind the gameobject which has the UI element</span>
        <span class="token punctuation">}</span>
        <span class="token comment">//In normal way you need to update your UI in every frame so that you can make your text acurately present your data</span>
        <span class="token class-name"><span class="token keyword">int</span></span> times <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            a<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"(Without JUI)a="</span><span class="token operator">+</span>Demo<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span>data<span class="token punctuation">.</span>a<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">"\n&lt;size=20>I have been run for "</span><span class="token operator">+</span>times<span class="token operator">+</span><span class="token string">" times&lt;/size>"</span><span class="token punctuation">;</span><span class="token comment">//Update UI</span>
            times<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

        <span class="token preprocessor property">#<span class="token directive keyword">region</span> USE JUI TO </span><span class="token return-type class-name">UPDATE</span> <span class="token function">UI</span><span class="token punctuation">(</span><span class="token class-name">With</span> Bind<span class="token punctuation">)</span>
        <span class="token comment">/*
         * ========================================================================
         * JUI bind demo
         * JUI绑定数据例子
         * ========================================================================
        */</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            b <span class="token operator">=</span> GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/B"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Bind gameobject to show data</span>

            <span class="token comment">//In JUI it is easy to bind data with text</span>
            <span class="token class-name"><span class="token keyword">int</span></span> times2 <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> JUI <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token comment">//Add JUI to an gameobject</span>
            <span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>Demo<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span>data<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token comment">//Bind data.b to this gameobject</span>
            <span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span>t1 <span class="token operator">=></span><span class="token comment">//Tells JUI what to do when the binded data has updated</span>
            <span class="token punctuation">{</span>
                <span class="token comment">//EG. we have update UI here</span>
                t1<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token string">"(With JUI)b="</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>Demo<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span>data<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">"\n&lt;size=20>I have been run for "</span> <span class="token operator">+</span> times2 <span class="token operator">+</span> <span class="token string">" times&lt;/size>"</span><span class="token punctuation">;</span>
                <span class="token comment">//You can convert bindable properties easily and get their values</span>
                times2<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Activate the UI</span>
        <span class="token punctuation">}</span>
        <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br></div></div><h3 id="控制循环频率-如果你想要ui循环更新的话" tabindex="-1"><a class="header-anchor" href="#控制循环频率-如果你想要ui循环更新的话" aria-hidden="true">#</a> 控制循环频率 <em>(如果你想要UI循环更新的话)</em></h3>
<p><strong>JUI</strong>继承自<strong>JUIBehaviour</strong>，可以控制循环模式和频率。</p>
<ul>
<li><code>FrameMode</code>: <code>bool</code>，如果为true，<strong>帧循环</strong>；反之，<strong>毫秒循环</strong> ，默认为<code>true</code></li>
<li><code>Frequency</code>: <code>int</code>，代表循环的<strong>间隔时间</strong>，代表毫秒或帧数，默认为<code>1</code></li>
</ul>
<h3 id="如何绑定数据到jui" tabindex="-1"><a class="header-anchor" href="#如何绑定数据到jui" aria-hidden="true">#</a> 如何绑定数据到JUI</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyJUIExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token class-name">MyData</span> data<span class="token punctuation">;</span><span class="token comment">//Create a data</span>
  <span class="token class-name">JUI</span> jui <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/MyUIElement"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token comment">//Add JUI to an UI element</span>
    <span class="token punctuation">.</span><span class="token function">Bind</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token comment">//Bind a data</span>
    <span class="token punctuation">.</span><span class="token function">onMessage</span><span class="token punctuation">(</span>t<span class="token operator">=></span>		<span class="token comment">//Tell what to do when data has changed</span>
    <span class="token punctuation">{</span>
      Debug<span class="token punctuation">.</span><span class="token function">Log</span><span class="token punctuation">(</span><span class="token string">"b has changed!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Activate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//Activate JUI</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="如何获得jui组件上的其他ui组件" tabindex="-1"><a class="header-anchor" href="#如何获得jui组件上的其他ui组件" aria-hidden="true">#</a> 如何获得JUI组件上的其他UI组件</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JUI</span> jui <span class="token operator">=</span> JUI<span class="token punctuation">.</span><span class="token function">CreateOn</span><span class="token punctuation">(</span>GameObject<span class="token punctuation">.</span><span class="token function">Find</span><span class="token punctuation">(</span><span class="token string">"Canvas/MyUIElement"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Add JUI to an UI element</span>
<span class="token class-name">Button</span> btn <span class="token operator">=</span> jui<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">Element</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Button<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//It is a generic method to get an UI element</span>
<span class="token comment">//If you dont have this component on the element, JUI will automatically add one</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="重要-数据绑定和频率循环-只能二选一" tabindex="-1"><a class="header-anchor" href="#重要-数据绑定和频率循环-只能二选一" aria-hidden="true">#</a> <strong>重要：数据绑定和频率循环，只能二选一</strong></h3>
<blockquote>
<p>下一篇，<RouterLink to="/zh/documents/0.5/bindable.html">可绑定数据教程</RouterLink></p>
</blockquote>
</template>
