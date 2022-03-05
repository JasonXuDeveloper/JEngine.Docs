<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="jengine-ui-by-l-fone-v0-6" tabindex="-1"><a class="header-anchor" href="#jengine-ui-by-l-fone-v0-6" aria-hidden="true">#</a> JEngine.UI（By L-Fone）（v0.6）</h1>
<p>已剔除！请忽略本文！</p>
<p>JEngine.UI 是一套剥离MonoBehaviour的UGUI框架。其主要设计目的是让UI界面开发逻辑更为便捷。</p>
<h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>UI</span><span class="token punctuation">;</span><span class="token comment">//大部分是这个命名空间</span>
<span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>UIKit</span><span class="token punctuation">;</span><span class="token comment">//UIMgr在这个命名空间（一般不需要使用）</span>
<span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>UI<span class="token punctuation">.</span>ResKit</span><span class="token punctuation">;</span><span class="token comment">//ResMgr在这个命名空间（一般不需要使用）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="快速使用" tabindex="-1"><a class="header-anchor" href="#快速使用" aria-hidden="true">#</a> 快速使用</h3>
<ol>
<li>
<p>参考<a href="#APanelBase-%E9%9D%A2%E6%9D%BF%E5%9F%BA%E7%B1%BB">APanelBase 面板基类</a>写一个View界面</p>
</li>
<li>
<p>制作UI界面，以<code>Prefab</code>保存在<code>HotUpdateResources/Prefabs</code>里面</p>
</li>
<li>
<p>定义Prefab路径</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>public static string JTestViewPath = &quot;uiview_testView&quot;;
public static string JBtnViewPath = &quot;uiview_btnview&quot;;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>使用<code>UIMgr</code>注册面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">,</span> JTestView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span>JBtnViewPath<span class="token punctuation">,</span> JBtnView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>初始化<code>UIRoot</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>UIRootView<span class="token punctuation">.</span><span class="token function">InitUIRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>显示<code>UIView</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>例子</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JumpToUIDemo</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">JBehaviour</span></span>
<span class="token punctuation">{</span>
  <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span> class binding <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
  <span class="token keyword">public</span> <span class="token class-name">GameObject</span> btn_JumpTo<span class="token punctuation">;</span>

  <span class="token preprocessor property">#<span class="token directive keyword">region</span> 声明界面</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> JTestViewPath <span class="token operator">=</span> <span class="token string">"uiview_testView"</span><span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> JBtnViewPath <span class="token operator">=</span> <span class="token string">"uiview_btnview"</span><span class="token punctuation">;</span>
  <span class="token preprocessor property">#<span class="token directive keyword">endregion</span></span>

  <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    UIUtility<span class="token punctuation">.</span><span class="token function">BindClickEvent</span><span class="token punctuation">(</span>btn_JumpTo<span class="token punctuation">,</span> OnJumpToDemo<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//UIMgr注册界面（需要的）</span>
    UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>
      <span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">,</span> JTestView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span>JBtnViewPath<span class="token punctuation">,</span> JBtnView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>        

  <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnJumpToDemo</span><span class="token punctuation">(</span><span class="token class-name">GameObject</span> go<span class="token punctuation">,</span> <span class="token class-name">PointerEventData</span> eventData<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    JResource<span class="token punctuation">.</span><span class="token function">LoadSceneAsync</span><span class="token punctuation">(</span><span class="token string">"UIDemo.unity"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
                             <span class="token punctuation">{</span>
                               UIRootView<span class="token punctuation">.</span><span class="token function">InitUIRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//初始化UIRoot是需要的</span>
                               UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
                             <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div></li>
</ol>
<h2 id="apanelbase-面板基类" tabindex="-1"><a class="header-anchor" href="#apanelbase-面板基类" aria-hidden="true">#</a> APanelBase 面板基类</h2>
<blockquote>
<p>APanelBase 为所有面板的基类，所有UI面板都继承于APanelBase ，负责面板自身的注册、打开、关闭、以及生命周期函数</p>
</blockquote>
<h3 id="_1、常用" tabindex="-1"><a class="header-anchor" href="#_1、常用" aria-hidden="true">#</a> 1、常用</h3>
<ul>
<li>
<p>[API] 注册界面相关的一些其他资源</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 打开面板函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uiName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uiName<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>APanelBase<span class="token punctuation">></span></span> openCall<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>APanelBase<span class="token punctuation">></span></span> closeCall<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 预加载界面函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PreLoadUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 清理界面函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 界面的销毁函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 界面的关闭函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CloseUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[生命周期函数] 在界面实例化的时候调用一次，类似<code>Awake</code>,<code>Start</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[生命周期函数] 界面每次被打开时自动调用，也可以外部调用刷新</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[生命周期函数] 在<code>Refresh()</code>后执行，用做清理还原面板上数据</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ResetUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[生命周期函数] 界面的帧刷新函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[生命周期函数] 界面的帧刷新函数</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">LateUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h3 id="_2、例子" tabindex="-1"><a class="header-anchor" href="#_2、例子" aria-hidden="true">#</a> 2、例子</h3>
<ul>
<li>
<p>这个是继承<code>APanelBase</code>的<code>JTestView.cs</code>的一部分，在JEngineDemo中有完整版</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JTestView</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">APanelBase</span></span>
<span class="token punctuation">{</span>
    <span class="token comment">//每个界面面板依赖于单例模式</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">JTestView</span> Instance <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Singleton<span class="token operator">&lt;</span>JTestView<span class="token operator">></span><span class="token punctuation">.</span>Instance<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 声明存放位置，属于什么类型的面板</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token function">JTestView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        isFilm <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        m_Type <span class="token operator">=</span> UIPanelType<span class="token punctuation">.</span>One<span class="token punctuation">;</span><span class="token comment">//m_type是层级，这里是第一层</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 关联注册函数</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Refer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//在面板被注册的时候，会同时注册这个面板相关的资源。</span>
        <span class="token comment">//在异步加载本面板的时候，会自动加载此处注册的资源</span>
        <span class="token comment">//在打开面板时，当所有面板被异步加载完成后，再执行生命周期函数</span>
        <span class="token function">AddRefer</span><span class="token punctuation">(</span>ResType<span class="token punctuation">.</span>UI<span class="token punctuation">,</span> <span class="token string">"相关资源"</span><span class="token punctuation">,</span> AssetType<span class="token punctuation">.</span>UIPrefab<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 初始化函数，相当于Awake</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 帧函数</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 周期函数，界面打开会自动执行一次</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 周期函数，界面关闭会自动执行，</span>
    <span class="token doc-comment comment">/// 也可以外部调用，进行关闭面板</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CloseUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">CloseUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br></div></div></li>
</ul>
<h2 id="aitembase-面板子部件的基类" tabindex="-1"><a class="header-anchor" href="#aitembase-面板子部件的基类" aria-hidden="true">#</a> AItemBase 面板子部件的基类</h2>
<blockquote>
<p>UI面板子部件。考虑用 APanelBase 管理面板所有信息有点太过于庞大，于是便有了 AItemBase ，</p>
<p>用做拆分成每个小的子部件，各自管理各自的部分，APanelBase 管理所有的 AItemBase</p>
</blockquote>
<ul>
<li>
<p>内部字段</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">protected</span> <span class="token keyword">internal</span> <span class="token class-name">GameObject</span> m_gameobj <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">protected</span> <span class="token keyword">internal</span> <span class="token class-name">Transform</span> Trans <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
<span class="token keyword">protected</span> <span class="token keyword">internal</span> <span class="token class-name">RectTransform</span> RectTrans <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<p>[生命周期函数] 初始化子部件，只执行一次</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setObj</span><span class="token punctuation">(</span><span class="token class-name">GameObject</span> obj<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 刷新子部件，注意区分<code> Refresh()</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token generic-method"><span class="token function">Refresh</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 刷新子部件，注意区分 <code>Refresh&lt;T&gt;(T data)</code></p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 帧刷新，非生命周期</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 清理</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[属性] 判断子部件是否打开</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">virtual</span> <span class="token keyword">bool</span> IsActive
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h3 id="_1、例子" tabindex="-1"><a class="header-anchor" href="#_1、例子" aria-hidden="true">#</a> 1、例子</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JTestItem</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AItemBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setObj</span><span class="token punctuation">(</span><span class="token class-name">GameObject</span> obj<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">setObj</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//持有 GameObject，Transform，RectTransform</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="_2、绑定子部件" tabindex="-1"><a class="header-anchor" href="#_2、绑定子部件" aria-hidden="true">#</a> 2、绑定子部件</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JTestView</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">APanelBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">JTestView</span> Instance <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Singleton<span class="token operator">&lt;</span>JTestView<span class="token operator">></span><span class="token punctuation">.</span>Instance<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">JTestView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        isFilm <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        m_Type <span class="token operator">=</span> UIPanelType<span class="token punctuation">.</span>One<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token class-name">JTestItem</span> testItem<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//绑定子部件。</span>
        <span class="token comment">//子部件名字=层级游戏物体名字</span>
        <span class="token comment">//绑定成功会自动执行子部件的 setObj(GameObject obj) 函数</span>
        <span class="token comment">//并且持有 GameObject 和 Transform</span>
        testItem <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateItemNoClone</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JTestItem<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"子部件名字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h2 id="uimgr-界面管理器" tabindex="-1"><a class="header-anchor" href="#uimgr-界面管理器" aria-hidden="true">#</a> UIMgr 界面管理器</h2>
<blockquote>
<p>UIMgr是所有UI界面的管理器，这里承载了UI面板的注册，打开，关闭，以及销毁。是框架的核心管理部分。</p>
</blockquote>
<h3 id="_1、界面注册" tabindex="-1"><a class="header-anchor" href="#_1、界面注册" aria-hidden="true">#</a> 1、界面注册</h3>
<ul>
<li>声明、注册面板</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">//声明UI面板，用做注册界面的Key</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">string</span></span> JTestViewPath <span class="token operator">=</span> <span class="token string">"uiview_testView"</span><span class="token punctuation">;</span>

<span class="token comment">//UIMgr注册界面（需要在游戏初始化函数中对所有面板进行注册）</span>
UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span>
     <span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">,</span> JTestView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">,</span>
     <span class="token punctuation">(</span>JBtnViewPath<span class="token punctuation">,</span> JBtnView<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul>
<li>初始化时，注册面板的函数</li>
</ul>
<div class="language-CSharp ext-CSharp line-numbers-mode"><pre v-pre class="language-CSharp"><code>/// &lt;summary&gt;
/// 注册界面
/// &lt;/summary&gt;
/// &lt;param name=&quot;panels&quot;&gt;全部界面，string是路径&lt;/param&gt;
public void Register(params (string,APanelBase)[] panels)
{
    #region 注册所有UI界面
    for(int i = 0; i &lt; panels.Length; i++)
    {
    	Register(panels[i].Item1, panels[i].Item2);
    }
    #endregion
}

private void Register&lt;T&gt;(string name, T panel) where T : APanelBase
{
    if (string.IsNullOrEmpty(name) || panel == null) return;
    if (m_uIbaseDic.ContainsKey(name))
    {
    	Log.PrintError($&quot;panel为[{panel.GetType()}]注册为{name}失败，{name}已定义为{m_uIbaseDic[name].GetType()}&quot;);
    }
    else
    {
        panel.m_strPanelViewName = name;
        panel.Refer();
        m_uIbaseDic.Add(name, panel);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><h3 id="_2、常用api" tabindex="-1"><a class="header-anchor" href="#_2、常用api" aria-hidden="true">#</a> 2、常用API</h3>
<ul>
<li>
<p>[API] 打开界面的统一入口</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">ShowUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> isSaveShow <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>APanelBase<span class="token punctuation">></span></span> closeCall <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>APanelBase<span class="token punctuation">></span></span> openCall <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> isClearAll <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 设定打开或者关闭已开UI</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">SetShowAllOpenUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> isOpen<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 预加载某个面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">PreLoadUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 获得某个面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">APanelBase</span> <span class="token function">GetUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 删除某个面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DestoryUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 关闭并删除某个面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CloseAndDestoryUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 判断面板是否打开</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">IsOpen</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> planeName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 判断面板是否存在</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">InHavePanel</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> planeName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 关闭某个面板</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CloseUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> uibaseName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 关闭所有打开面板(排除设置为保持状态的)</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CloseAllUI</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> isFilm<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>[API] 帧刷新</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h3 id="_3、例子" tabindex="-1"><a class="header-anchor" href="#_3、例子" aria-hidden="true">#</a> 3、例子</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">//执行打开面板</span>
UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//需要界面完成打开后回调时</span>
UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">,</span>
     <span class="token named-parameter punctuation">openCall</span><span class="token punctuation">:</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token operator">=></span> 
     <span class="token punctuation">{</span> 
        <span class="token comment">//界面打开后的回调</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//可以按需注册打开后回调和关闭前回调</span>
UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JTestViewPath<span class="token punctuation">,</span>
     <span class="token named-parameter punctuation">openCall</span><span class="token punctuation">:</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token operator">=></span> 
     <span class="token punctuation">{</span> 
         <span class="token comment">//界面打开后的回调</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span>
     <span class="token named-parameter punctuation">closeCall</span><span class="token punctuation">:</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token operator">=></span> 
     <span class="token punctuation">{</span>
         <span class="token comment">//界面被关闭前的回调</span>
     <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="uiutility-其他依赖工具" tabindex="-1"><a class="header-anchor" href="#uiutility-其他依赖工具" aria-hidden="true">#</a> UIUtility 其他依赖工具</h2>
<blockquote>
<p>UIUtility 能快速查找某个层级，创建点击事件，创建子部件</p>
</blockquote>
<h3 id="_1、获取某个组件" tabindex="-1"><a class="header-anchor" href="#_1、获取某个组件" aria-hidden="true">#</a> 1、获取某个组件</h3>
<ul>
<li>
<p>不需要关心层级具体位子，只保证Trans下面有该游戏物体即可</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">Image</span> img <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Image<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"组件层级名字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取游戏物体，只保证 m_gameobj 下面有该游戏物体即可</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> obj <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">Control</span><span class="token punctuation">(</span><span class="token string">"游戏物体名"</span><span class="token punctuation">,</span> m_gameobj<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取变换组件</p>
<div class="language-C ext-C line-numbers-mode"><pre v-pre class="language-C"><code>RectTransform transform = UIUtility.Control(&quot;rect&quot;, Trans);
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h3 id="_2、绑定事件" tabindex="-1"><a class="header-anchor" href="#_2、绑定事件" aria-hidden="true">#</a> 2、绑定事件</h3>
<ul>
<li>
<p>绑定点击事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindClickEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"按钮或者图片名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定双击事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindDoubleClickEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定开始拖拽事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindDragBeginEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定拖拽事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindDragEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定结束拖拽事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindDragEndEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定按下事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindPressDownEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>绑定抬起事件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">GameObject</span> button <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindPressUpEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"目标名称"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>支持自定义其他事件类型，详情参考<code> UIUtility.cs</code></p>
</li>
</ul>
<h3 id="_3、绑定子部件" tabindex="-1"><a class="header-anchor" href="#_3、绑定子部件" aria-hidden="true">#</a> 3、绑定子部件</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">//给层级绑定一个子部件脚本，子部件已存在，不需要实例化</span>
<span class="token class-name">JTestItem</span> item <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateItemNoClone</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JTestItem<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"子部件名字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//实例化子部件并且绑定子部件脚本</span>
<span class="token class-name">JTestItem</span> item <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateItem</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JTestItem<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"子部件名字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="_4、例子" tabindex="-1"><a class="header-anchor" href="#_4、例子" aria-hidden="true">#</a> 4、例子</h3>
<ul>
<li>主面板 JTestView.cs</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JTestView</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">APanelBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">JTestView</span> Instance <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> Singleton<span class="token operator">&lt;</span>JTestView<span class="token operator">></span><span class="token punctuation">.</span>Instance<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token function">JTestView</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        isFilm <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        m_Type <span class="token operator">=</span> UIPanelType<span class="token punctuation">.</span>One<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">GameObject</span> JBtnButton<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">JTestItem</span> testItem<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        JBtnButton <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token function">BindClickEvent</span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"JBtnButton"</span><span class="token punctuation">,</span> OnClick<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//注册子部件</span>
        testItem <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">CreateItem</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>JTestItem<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>Trans<span class="token punctuation">,</span> <span class="token string">"子部件名字"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">//刷新子部件</span>
        testItem<span class="token punctuation">.</span><span class="token function">Refresh</span><span class="token punctuation">(</span><span class="token string">"传递给子部件的内容"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"面板被打开会自动调用一次，也可以外部调用此函数进行刷新"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//外部调用方式</span>
        <span class="token comment">//JTestView.Instance.Refresh();</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnOpenJBtnExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>JumpToUIDemo<span class="token punctuation">.</span>JBtnViewPath<span class="token punctuation">,</span>
                              <span class="token named-parameter punctuation">openCall</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">=></span>
                              <span class="token punctuation">{</span>
                                  <span class="token function">CloseUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                              <span class="token punctuation">}</span><span class="token punctuation">,</span>
                              <span class="token named-parameter punctuation">closeCall</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">=></span>
                              <span class="token punctuation">{</span>
                                  UIMgr<span class="token punctuation">.</span>Instance<span class="token punctuation">.</span><span class="token function">ShowUI</span><span class="token punctuation">(</span>m_strPanelViewName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                              <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnClick</span><span class="token punctuation">(</span><span class="token class-name">GameObject</span> obj<span class="token punctuation">,</span> <span class="token class-name">PointerEventData</span> eventData<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">OnClick</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> eventData<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">Equals</span><span class="token punctuation">(</span>JBtnButton<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">OnOpenJBtnExample</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><ul>
<li>子部件 JTestItem.cs</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JTestItem</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">AItemBase</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Text</span> label<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">setObj</span><span class="token punctuation">(</span><span class="token class-name">GameObject</span> obj<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">setObj</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

        label <span class="token operator">=</span> UIUtility<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>Text<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>RectTrans<span class="token punctuation">,</span> <span class="token string">"名字要唯一"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">override</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token generic-method"><span class="token function">Refresh</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">base</span><span class="token punctuation">.</span><span class="token function">Refresh</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>		
        <span class="token comment">//给Text赋值，其他小功能可以查看UIUtility.cs源码</span>
        UIUtility<span class="token punctuation">.</span><span class="token function">Safe_UGUI</span><span class="token punctuation">(</span><span class="token keyword">ref</span> label<span class="token punctuation">,</span> data <span class="token keyword">as</span> <span class="token class-name"><span class="token keyword">object</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><blockquote>
<p>下一篇，<RouterLink to="/documents/0.6/jui-v0-6.html">UI解决方案JUI教程</RouterLink></p>
</blockquote>
</template>
