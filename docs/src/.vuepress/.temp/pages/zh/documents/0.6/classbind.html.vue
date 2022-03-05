<template><h1 id="挂载代码" tabindex="-1"><a class="header-anchor" href="#挂载代码" aria-hidden="true">#</a> 挂载代码</h1>
<p>有的时候，我们会将代码挂到GameObject上，然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent太浪费时间，于是就有了自动绑定工具</p>
<blockquote>
<p>注意，主工程Instantiate一个带有ClassBind的prefab的时候一定要去手动调用该prefab上的ClassBind的BindSelf方法，否则ClassBind无法激活</p>
</blockquote>
<h2 id="挂载步骤" tabindex="-1"><a class="header-anchor" href="#挂载步骤" aria-hidden="true">#</a> 挂载步骤</h2>
<ol>
<li>给GameObject或预制体<strong>添加Class Bind脚本</strong></li>
<li>想给该GameObject加几个热更脚本，<strong>就把ScriptsToBind数组添加几次</strong></li>
<li><strong>Namespace写命名空间 (默认HotUpdateScripts，即热更命名空间)，Class写脚本类名</strong></li>
<li><strong>运行</strong>后会<strong>自动绑定</strong>，可以勾选Active After自动激活</li>
<li>继承<strong>MonoBehaviour</strong>的脚本，<strong>激活需要enabled = true 以及 调用Awake()</strong>，</li>
<li>继承<strong>JBehabviour</strong>的脚本，直接调用<strong>Activate()</strong></li>
<li>如果希望使用构造函数，在<code>use constructor</code>一栏打勾即可</li>
</ol>
<h2 id="参数介绍" tabindex="-1"><a class="header-anchor" href="#参数介绍" aria-hidden="true">#</a> 参数介绍</h2>
<ul>
<li>
<p><code>ScriptsToBind</code></p>
<ul>
<li>要添加<strong>多少个</strong>热更DLL里的<strong>脚本</strong></li>
</ul>
</li>
<li>
<p><code>Namespace</code></p>
<ul>
<li>热更脚本的<strong>命名空间</strong>，<strong>默认HotUpdateScripts</strong></li>
</ul>
</li>
<li>
<p><code>Class</code></p>
<ul>
<li>热更脚本的<strong>类名</strong></li>
</ul>
</li>
<li>
<p><code>Active After</code></p>
<ul>
<li><strong>勾选后</strong>，会在绑定后，或绑定+赋值后，只要该类具有<code>Active()</code>方法，就会<strong>自动调用激活</strong></li>
<li><strong>没勾选</strong>，需手动，<strong>参考指南第5和第6条</strong></li>
</ul>
</li>
<li>
<p><code>Require Bind Fields</code></p>
<ul>
<li><strong>勾选后</strong>，<strong>会根据Fields里的数据自动赋值</strong></li>
<li><strong>没勾选</strong>，<strong>哪怕Fields里有东西也不赋值</strong></li>
</ul>
</li>
<li>
<p><code>Use Constructor</code></p>
<ul>
<li><strong>勾选后</strong>，<strong>会使用该类的构造函数进行初始化赋值</strong></li>
</ul>
</li>
<li>
<p><code>Fields</code></p>
<ul>
<li><strong>自动赋值</strong>该脚本<strong>多少个值</strong></li>
</ul>
</li>
<li>
<p><code>Field Type</code></p>
<ul>
<li>该值的<strong>类型</strong>（支持<strong>数字类型</strong>，<strong>布尔值类型</strong>，<strong>字符串类型</strong>，<strong>GameObject</strong>和<strong>挂在GameObject上面的不可热更的脚本</strong>）</li>
</ul>
</li>
<li>
<p><code>Field Name</code></p>
<ul>
<li>
<p>该值在热更脚本里的名字</p>
<p><img src="https://s1.ax1x.com/2020/09/05/wEyk9K.png" alt="name"></p>
</li>
</ul>
</li>
<li>
<p><code>Value</code></p>
<ul>
<li>如果<code>Field Type</code>不是<code>GameObject</code>或<code>Unity Component</code>的时候，这里是该Field的数值
<ul>
<li>如果是<strong>数字或字符串</strong>，直接写进去</li>
<li>如果是<strong>布尔值</strong>，写true或false</li>
<li>如果是<strong>热更资源</strong>，输入资源<strong>完整路径</strong>或XAsset<strong>可检测到的短路径</strong></li>
<li><code>Field Type</code>为<code>GameObject</code>或<code>Unity Component</code>的时候，此处<code>Value</code>写什么都不会发生效果</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>GameObject</code></p>
<ul>
<li>如果<code>Field Type</code>是<code>GameObject</code>或<code>Unity Component</code>，直接将那个场景中的GameObject拖拽到这里即可</li>
</ul>
</li>
</ul>
<h2 id="小工具" tabindex="-1"><a class="header-anchor" href="#小工具" aria-hidden="true">#</a> 小工具</h2>
<h3 id="自动获取全部field" tabindex="-1"><a class="header-anchor" href="#自动获取全部field" aria-hidden="true">#</a> 自动获取全部Field</h3>
<p>一个类里面可能有很多Field和Property，一个个去写太费劲，在Unity编辑器下可以点击按钮一键获取</p>
<h3 id="自动匹配fieldtype" tabindex="-1"><a class="header-anchor" href="#自动匹配fieldtype" aria-hidden="true">#</a> 自动匹配FieldType</h3>
<p>如果全部field一个个去设置type太费劲，在Unity编辑器下可以点击按钮一键匹配</p>
<h3 id="路径转gameobject" tabindex="-1"><a class="header-anchor" href="#路径转gameobject" aria-hidden="true">#</a> 路径转GameObject</h3>
<blockquote>
<p>Inspector中，ClassBind脚本的右上角有个小工具，用于老版本，手动写GameObject路径的项目</p>
</blockquote>
<ol>
<li>ClassBind右上角 -&gt; Convert Path to GameObject</li>
<li>可以把老项目中的路径变可拖拽可视化的场景GameObject，且无需关系路径变更</li>
</ol>
</template>
