<template><h1 id="classbind" tabindex="-1"><a class="header-anchor" href="#classbind" aria-hidden="true">#</a> ClassBind</h1>
<p>有的时候，我们会将代码挂到GameObject上（包括Prefab），然而，如果一个GameObject会包含很多热更脚本，一个个手动AddComponent再去赋值太浪费时间，于是就有了自动绑定工具</p>
<blockquote>
<p>Pro版本ClassBind进行了大幅度升级优化，请参考<RouterLink to="/zh/documents/pro/ClassBind.html">这里</RouterLink></p>
</blockquote>
<nav class="table-of-contents"><ul><li><RouterLink to="#强大之处">强大之处</RouterLink></li><li><RouterLink to="#应用场景">应用场景</RouterLink></li><li><RouterLink to="#使用方法">使用方法</RouterLink></li><li><RouterLink to="#参数介绍">参数介绍</RouterLink></li><li><RouterLink to="#小工具">小工具</RouterLink></li><li><RouterLink to="#注意事项">注意事项</RouterLink></li></ul></nav>
<h2 id="强大之处" tabindex="-1"><a class="header-anchor" href="#强大之处" aria-hidden="true">#</a> 强大之处</h2>
<ul>
<li>可以将<strong>任意热更类型</strong>实例<strong>绑定到GameObject上</strong></li>
<li><strong>自动调用</strong>绑定的热更类型的<strong>构造函数</strong></li>
<li>可以对<strong>绑定的</strong>任意热更类型<strong>实例</strong>的<strong>字段</strong>进行<strong>赋值</strong></li>
<li>可选<strong>调用</strong>绑定的任意热更<strong>类型实例</strong>的<strong>Awake方法</strong></li>
<li><strong>字段赋值</strong>时<strong>支持</strong>其他用<strong>ClassBind创建的热更类型</strong></li>
</ul>
<h2 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h2>
<ul>
<li>UI预制体可以使用ClassBind挂上热更的面板类型，然后对其中的字段（例如Text组件、Button组件等）进行赋值</li>
<li>场景内可以使用ClassBind给GameObject挂上热更的Manager并激活，例如实现个AudioMgr来管理热更的AudioClip的播放，并通过ClassBind创建并激活</li>
<li>有A、B、C、D四个非单例热更类型，D类内部new了A和B类型的实例，C有分别是A和B类型的字段，创建C后需要对A和B赋值，而A和B的实例在D内，C无法访问，这个时候可以在游戏场景下创建3个GameObject，然后使用ClassBind分别创建A、B与C类型，同时对C实例的字段进行赋值（拖拽使用ClassBind挂A和B类型实例的GameObject到ClassBind挂C的地方的字段里即可）然后D的A和B字段指向<code>gameObject.GetHotClass&lt;A&gt;()</code>和<code>gameObject.GetHotClass&lt;B&gt;()</code>即可</li>
</ul>
<blockquote>
<p>简单来说，ClassBind打破了传统的使用lua和ILRuntime进行热更的开发思路，即主工程（非热更环境）和热更工程必须分离</p>
<p>ClassBind的存在使得在非热更环境下也能创建热更环境的类型实例，并对热更实例进行赋值，不像在标准Unity环境下只能给GameObject挂载MonoBehaviour脚本，ClassBind甚至支持挂载任意类型的热更实例</p>
<p>也就是说，哪怕你觉得MonoBehaviour性能差，不想使用，你也可以使用ClassBind去挂载非MonoBehaviour派生类的类型，去进行实例化和赋值，彻底打破了热更工程和Unity工程的次元壁，建立了一条道路使得能在Unity工程使用热更工程</p>
<p>这也意味着，开发时完全可以安排一个人去写热更工程，另外一个人去编辑Unity的场景或预制体，然后只需要挂个ClassBind，再问开发热更工程的人要个热更工程DLL，另一个人就可以在Unity场景或预制体上创建热更类型实例了，不需要让另一个人写什么代码去创建类型实例并赋值之类的乱七八糟的</p>
</blockquote>
<h2 id="使用方法" tabindex="-1"><a class="header-anchor" href="#使用方法" aria-hidden="true">#</a> 使用方法</h2>
<ol>
<li>给GameObject或预制体<strong>添加Class Bind脚本</strong></li>
<li>ClassBind脚本的<strong>ScriptsToBind数组</strong>中每一个元素代表了一个热更类的实例（不支持同时挂多个ClassBind到同GameObject）</li>
<li><strong>Namespace写命名空间 (默认HotUpdateScripts，即热更命名空间，也可以留空)，Class写脚本类名</strong></li>
<li><strong>Fields</strong>是需要给该热更类型实例赋值的字段，可以添加多个，需要选择该字段的类型，填写字段名，以及赋值</li>
<li><strong>运行</strong>后会<strong>自动创建热更实例并赋值</strong>，可以勾选Active After自动调用该实例的<code>Awake</code>方法（不管该实例是什么类型，有定义这个方法就会被调用 ）</li>
<li><strong>不勾选自动调用的话需要参考下面的步骤</strong>，如果勾选了自动调用可以忽略下面的步骤</li>
<li>代码里获取ClassBind创建的对象，比如<code>gameObject.GetComponent&lt;ClassBind挂的类型&gt;()</code>，或<code>gameObject.GetJBehaviour&lt;ClassBind挂的类型&gt;()</code></li>
<li>继承<strong>MonoBehaviour</strong>的脚本，<strong>激活需要enabled = true 以及 调用Awake()</strong>，</li>
<li>继承<strong>JBehabviour</strong>的脚本，直接调用<strong>Activate()</strong></li>
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
<li><strong>没勾选</strong>，需手动，<strong>参考使用方法</strong></li>
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
<li>该值的<strong>类型</strong>（支持<strong>数字类型</strong>，<strong>布尔值类型</strong>，<strong>字符串类型</strong>，<strong>GameObject</strong>和<strong>挂在GameObject上面的脚本</strong>）</li>
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
<li>如果是<strong>热更资源</strong>，输入资源<strong>完整路径</strong></li>
<li><code>Field Type</code>为<code>GameObject</code>或<code>Unity Component</code>或<code>其他ClassBind创建的类型</code>的时候，此处<code>Value</code>写什么都不会发生效果</li>
</ul>
</li>
</ul>
</li>
<li>
<p><code>GameObject</code></p>
<ul>
<li>如果<code>Field Type</code>是<code>GameObject</code>或<code>Unity Component</code>或<code>其他ClassBind创建的类型</code>，直接将那个场景中的GameObject拖拽到这里即可</li>
</ul>
</li>
</ul>
<h2 id="小工具" tabindex="-1"><a class="header-anchor" href="#小工具" aria-hidden="true">#</a> 小工具</h2>
<h4 id="自动获取全部field" tabindex="-1"><a class="header-anchor" href="#自动获取全部field" aria-hidden="true">#</a> 自动获取全部Field</h4>
<p>一个类里面可能有很多Field和Property，一个个去写太费劲，在Unity编辑器下可以点击按钮一键获取</p>
<h4 id="自动矫正field的type" tabindex="-1"><a class="header-anchor" href="#自动矫正field的type" aria-hidden="true">#</a> 自动矫正field的type</h4>
<p>如果全部field一个个去设置type太费劲，在Unity编辑器下可以点击按钮一键匹配每个字段的类型，需要注意的是有的时候无法正确判断，例如GameObject类型的字段，可能是个热更资源，也可能是个场景内GameObject或预制体的子GameObject，这种时候会给个提示，需要自己判断</p>
<h4 id="重新排序全部fields" tabindex="-1"><a class="header-anchor" href="#重新排序全部fields" aria-hidden="true">#</a> 重新排序全部fields</h4>
<p>如果热更工程对某个ClassBind挂载的类型的字段进行了删减，可以使用该功能自动删除不存在的字段，同时该功能还会根据字段的名字对每个字段的位置进行排序</p>
<h2 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h2>
<ul>
<li>主工程Instantiate一个带有ClassBind的prefab的时候一定要去手动调用该prefab上的ClassBind的BindSelf方法，否则ClassBind无法激活</li>
</ul>
</template>
