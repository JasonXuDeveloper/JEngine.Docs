<template><h1 id="jevent" tabindex="-1"><a class="header-anchor" href="#jevent" aria-hidden="true">#</a> JEvent</h1>
<p>JEngine参考Google Java核心库之EventBus编写的事件派发方案</p>
<blockquote>
<p>JEvent能干什么？</p>
<ul>
<li>一键注册类型里的方法</li>
<li>一键派发</li>
<li>取消注册后缓存，方便下次注册</li>
<li>可控线程</li>
</ul>
</blockquote>
<h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Event</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">Register</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> val<span class="token punctuation">)</span> <span class="token comment">//从类型中读取需要派发事件的方法\</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">Unregister</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> val<span class="token punctuation">)</span> <span class="token comment">//取消注册某类型中全部被监听方法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Post</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name"><span class="token keyword">object</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> parameters<span class="token punctuation">)</span> <span class="token comment">//将参数广播到全部监听方法，只有参数类型匹配的方法才会被调用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Subscriber</span></span><span class="token punctuation">]</span> <span class="token comment">//监听标签，可以打到类上或方法上，无参数默认主线程派发</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Subscriber</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ThreadMode<span class="token punctuation">.</span>Main<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span> <span class="token comment">//监听标签，可以打到类上或方法上，Main参数代表主线程派发</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Subscriber</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ThreadMode<span class="token punctuation">.</span>Other<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span> <span class="token comment">//监听标签，可以打到类上或方法上，Other参数代表子线程派发</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2>
<p>参考框架源码的Game场景下，EventDemo的使用，需要搭配ClassBind</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Tasks</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Event</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">UnityEngine<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span>

<span class="token keyword">namespace</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Examples</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EventDemo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JBehaviour</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name">UIManager</span> UIManager<span class="token punctuation">;</span>

        <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token keyword">async</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> ExtensionManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ExtensionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> GMToolsManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GMToolsManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//JEvent.ShowLog = true;//是否显示一些log</span>

            JEvent<span class="token punctuation">.</span>defaultEvent<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>UIManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
            JEvent<span class="token punctuation">.</span>defaultEvent<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>ExtensionManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
            JEvent<span class="token punctuation">.</span>defaultEvent<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>GMToolsManager<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//先搞一个登录失败数据</span>
            <span class="token class-name">LoginErrorData</span> d <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LoginErrorData</span>
            <span class="token punctuation">{</span>
                username <span class="token operator">=</span> <span class="token string">"test"</span><span class="token punctuation">,</span>
                errorMsg <span class="token operator">=</span> <span class="token string">"故意让它错误的"</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>

            <span class="token comment">//广播错误数据</span>
            JEvent<span class="token punctuation">.</span>defaultEvent<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//取消注册ExtensionManager，这样下次不会post到这个实例内的方法</span>
            JEvent<span class="token punctuation">.</span>defaultEvent<span class="token punctuation">.</span><span class="token function">Unregister</span><span class="token punctuation">(</span>ExtensionManager<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token keyword">await</span> Task<span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//创建独立的JEvent</span>
            <span class="token class-name">JEvent</span> e <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//登录成功数据</span>
            <span class="token class-name">LoginSuccessData</span> dt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LoginSuccessData</span>
            <span class="token punctuation">{</span>
                username <span class="token operator">=</span> <span class="token string">"杰哥"</span><span class="token punctuation">,</span>
                money <span class="token operator">=</span> <span class="token number">10000</span>
            <span class="token punctuation">}</span><span class="token punctuation">;</span>

            <span class="token comment">//给独立的JEvent注册方法</span>
            e<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>UIManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
            e<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>GMToolsManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//广播</span>
            e<span class="token punctuation">.</span><span class="token function">Post</span><span class="token punctuation">(</span>dt<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginSuccessData</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> username<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> money<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LoginErrorData</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> username<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> errorMsg<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//监听整个类里面的方法，主线程执行，unity方法必须主线程执行，除了Debug.Log外</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Subscriber</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ThreadMode<span class="token punctuation">.</span>Main<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">UIManager</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/*
         * 只要UIManager的实例还在，这些字段就可以用
         */</span>

        <span class="token keyword">public</span> <span class="token class-name">GameObject</span> SuccessPanel<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">GameObject</span> ErrorPanel<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">GameObject</span> GamePanel<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">Text</span> UsernameText<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">Text</span> MoneyText<span class="token punctuation">;</span>
        <span class="token keyword">public</span> <span class="token class-name">Text</span> ErrorMsgText<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// 登录成功的时候的UI界面更新</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnSuccess</span><span class="token punctuation">(</span><span class="token class-name">LoginSuccessData</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            SuccessPanel<span class="token punctuation">.</span><span class="token function">SetActive</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
            <span class="token punctuation">{</span>
                SuccessPanel<span class="token punctuation">.</span><span class="token function">SetActive</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                UsernameText<span class="token punctuation">.</span>text <span class="token operator">=</span> data<span class="token punctuation">.</span>username<span class="token punctuation">;</span>
                <span class="token comment">//因为在GMTools那边更新了money数据，所以用那边的静态实例数据</span>
                <span class="token comment">//自己写的时候也要注意，每个方法的data参数哪怕进行了更改也不会影响其他方法内的data</span>
                <span class="token comment">//必须自己把它单独保存到一个其他方法也能读到的地方，才能在其他方法里同步对数据的修改</span>
                <span class="token comment">//同时多线程处理数据请自行考虑线程安全，脏数据就得自己处理了</span>
                MoneyText<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"￥</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">GMToolsManager<span class="token punctuation">.</span>successData<span class="token punctuation">.</span>money</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">;</span>
                GamePanel<span class="token punctuation">.</span><span class="token function">SetActive</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Delay</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
            <span class="token punctuation">{</span>
                GamePanel<span class="token punctuation">.</span>transform<span class="token punctuation">.</span>parent<span class="token punctuation">.</span>gameObject<span class="token punctuation">.</span><span class="token function">SetActive</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// 登录失败的时候的UI界面更新</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnError</span><span class="token punctuation">(</span><span class="token class-name">LoginErrorData</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            ErrorMsgText<span class="token punctuation">.</span>text <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"账号：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">data<span class="token punctuation">.</span>username</span><span class="token punctuation">}</span></span><span class="token string">登录失败，</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">data<span class="token punctuation">.</span>errorMsg</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">;</span>
            ErrorPanel<span class="token punctuation">.</span><span class="token function">SetActive</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//监听整个类里面的方法，子线程执行，不调用unity本身的东西就可以在子线程执行</span>
    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Subscriber</span><span class="token attribute-arguments"><span class="token punctuation">(</span>ThreadMode<span class="token punctuation">.</span>Other<span class="token punctuation">)</span></span></span><span class="token punctuation">]</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ExtensionManager</span>
    <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// Log错误信息</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ProcessErrorMsg</span><span class="token punctuation">(</span><span class="token class-name">LoginErrorData</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">PrintError</span><span class="token punctuation">(</span><span class="token string">"登录失败："</span> <span class="token operator">+</span> data<span class="token punctuation">.</span>errorMsg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// logcat测试的时候log一下登录成功的账号</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LogcatSuccessData</span><span class="token punctuation">(</span><span class="token class-name">LoginSuccessData</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">data<span class="token punctuation">.</span>username</span><span class="token punctuation">}</span></span><span class="token string">登录成功"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//个别方法被监听</span>
    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GMToolsManager</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">LoginSuccessData</span> successData<span class="token punctuation">;</span>

        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// 让钱翻一百倍</span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
        <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
        <span class="token punctuation">[</span><span class="token function">Subscriber</span><span class="token punctuation">(</span>ThreadMode<span class="token punctuation">.</span>Main<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token comment">//跑主线程</span>
        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">GetMoreMoney</span><span class="token punctuation">(</span><span class="token class-name">LoginSuccessData</span> data<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            successData <span class="token operator">=</span> data<span class="token punctuation">;</span>
            successData<span class="token punctuation">.</span>money <span class="token operator">*=</span> <span class="token number">100</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br></div></div></template>
