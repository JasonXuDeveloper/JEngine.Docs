<template><h1 id="挂载代码" tabindex="-1"><a class="header-anchor" href="#挂载代码" aria-hidden="true">#</a> 挂载代码</h1>
<p>有的时候，我们会将代码挂到GameObject上，然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent太浪费时间，于是就有了自动绑定工具</p>
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
<li>
<p>如果是<strong>数字或字符串</strong>，直接写进去</p>
</li>
<li>
<p>如果是<strong>布尔值</strong>，写true或false</p>
</li>
<li>
<p>如果是<strong>热更资源</strong>，输入资源<strong>完整路径</strong>或XAsset<strong>可检测到的短路径</strong></p>
</li>
<li>
<p><code>v0.5.2</code>开始，<code>Field Type</code>为<code>GameObject</code>或<code>Unity Component</code>的时候，此处<code>Value</code>写什么都不会发生效果</p>
</li>
<li>
<p><strong><code>v0.5.2</code>和<code>v0.5.1</code>版本注意事项</strong></p>
<blockquote>
<p>如果是<strong>GameObject</strong>，请写<strong>完整路径</strong>，<strong>如果是一个GameObject的子物体，父物体要Active</strong>；<strong>如果不是子物体，本身要Active</strong>，例如：<strong>路径，Canvas/Text，其中Text可以不Active，Canvas必须Active；路径，Demo，其中Demo必须Active</strong>，可以指向自己，指向自己，输入 <strong>${this}</strong> ，<strong>右键可直接复制GameObject全路径</strong></p>
</blockquote>
<blockquote>
<p>如果是<strong>Unity Component</strong>，即不可热更的挂载脚本，和GameObject一样，输入全路径即可（参考GameObject做法）</p>
</blockquote>
</li>
<li>
<p><strong><code>v0.5.0</code>及以下版本注意事项</strong></p>
<blockquote>
<p>如果是<strong>GameObject</strong>，请写<strong>完整路径</strong>，<strong>如果是一个GameObject的子物体，父物体要Active</strong>；<strong>如果不是子物体，本身要Active</strong>，例如：<strong>路径，Canvas/Text，其中Text可以不Active，Canvas必须Active；路径，Demo，其中Demo必须Active</strong>，可以指向自己，指向自己，输入 <strong>${this}</strong> ，<strong>右键可直接复制GameObject全路径</strong></p>
</blockquote>
<blockquote>
<p>如果是 <strong><code>Unity Component</code></strong>，或需要输入<strong>完整路径，参考GameObject</strong>，<strong>加上&quot;.&quot;，最后加上脚本名称</strong>，<strong>例如：Canvas/Text.Outline，即获取这个Canvas/Text的Outline组件</strong>，可以指向自己身上的组件，输入 <strong>${this}.xxx</strong> ，xxx为组件名，<strong>右键可直接复制GameObject全路径</strong>，<strong>然后再加.绑定的脚本名称，即可提高效率</strong></p>
</blockquote>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>GameObject</code>（<code>v0.5.2</code>及以上）</p>
<ul>
<li>如果<code>Field Type</code>是<code>GameObject</code>或<code>Unity Component</code>，直接将那个场景中的GameObject拖拽到这里即可</li>
</ul>
</li>
</ul>
<h2 id="小工具" tabindex="-1"><a class="header-anchor" href="#小工具" aria-hidden="true">#</a> 小工具</h2>
<blockquote>
<p>Inspector中，ClassBind脚本的右上角有个小工具，用于老版本，手动写GameObject路径的项目</p>
</blockquote>
<ol>
<li>ClassBind右上角 -&gt; Convert Path to GameObject</li>
<li>可以把老项目中的路径变可拖拽可视化的场景GameObject，且无需关系路径变更</li>
</ol>
<h2 id="代码绑定面板示例" tabindex="-1"><a class="header-anchor" href="#代码绑定面板示例" aria-hidden="true">#</a> 代码绑定面板示例</h2>
<img src="https://s1.ax1x.com/2020/09/08/wQk0aj.png" alt="guide1" style="width:50%;margin-left:25%" />
</template>
