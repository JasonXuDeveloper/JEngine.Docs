<template><h1 id="新classbind" tabindex="-1"><a class="header-anchor" href="#新classbind" aria-hidden="true">#</a> 新ClassBind</h1>
<p>ClassBind是JEngine的核心功能之一，在Pro版本内，框架对该功能做了巨大优化。</p>
<h2 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器" aria-hidden="true">#</a> 编辑器</h2>
<p>与开源版本的该功能进行对比，新的面板更加简洁便捷，大幅度提高了开发效率</p>
<p><a href="https://imgtu.com/i/WxBqVf" target="_blank" rel="noopener noreferrer"><img src="https://z3.ax1x.com/2021/08/01/WxBqVf.png" alt="WxBqVf.png" style="zoom: 67%;" /><ExternalLinkIcon/></a></p>
<h2 id="支持类型" tabindex="-1"><a class="header-anchor" href="#支持类型" aria-hidden="true">#</a> 支持类型</h2>
<p>新的ClassBind，不仅包含了开源版所支持的类型，还包含了数组类型：</p>
<ul>
<li><strong>Primitive Type List</strong> 是基元类型的数组（或列表），泛指数字类型、字符串类型和布尔值类型</li>
<li><strong>Unity Object Type List</strong> 是Unity类型的数组（或列表），泛指GameObject、Transform、主工程的MonoBehaviour脚本等基于UnityEngine.Object的类型实例。但与此同时，该类型也支持往其中拖拽使用ClassBind创建的非UnityEngine.Object的实例，拖入对应ClassBind的gameObject即可，底层会自动进行获取处理</li>
</ul>
<p>与此同时，需要注意的是Unity Component类型也可以获取ClassBind创建的非UnityEngine.Object的实例，底层会自动处理</p>
<h2 id="自动匹配gameobject" tabindex="-1"><a class="header-anchor" href="#自动匹配gameobject" aria-hidden="true">#</a> 自动匹配gameObject</h2>
<p>在Pro版本内，当fieldType为GameObject或UnityComponent时，可以一键自动匹配字段名所对应的gameObject，而无需手动拖拽。</p>
<p>需要注意以下几点：</p>
<ul>
<li>只能自动匹配挂了ClassBind脚本的这个gameObject的子对象</li>
<li>默认的正则匹配规则是_，例如Canvas挂了ClassBind，字段名是a_b，那么会自动匹配Canvas/a/b这个gameObject，该正则规则可以更改，在JEngine面板内可以进行更改</li>
<li>框架提供了下划线和驼峰的匹配模式正则，只需要在面板对应部分进行填写即可，需要匹配规则和替换规则（不懂的就老老实实用框架提供的）</li>
<li>如果正则匹配不成功，没有匹配到东西，就会进行递归子对象，若是匹配到与fieldName相等的子对象名称，则结束递归，给这个字段赋值该子对象</li>
</ul>
<p>该功能可以在2个地方调用：</p>
<ul>
<li>ClassBind面板最底部</li>
<li>JEngine面板的ClassBind工具处</li>
</ul>
<h2 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时" aria-hidden="true">#</a> 运行时</h2>
<p>对比开源版，运行时现在也支持序列化数组（或列表）了。</p>
<p>但需要注意的是，热更类型的数组（或列表），只支持序列化到面板，但不能通过拖拽等方式对其值进行修改（以后可能会支持拖拽用ClassBind创建热更实例的热更实例来更新数组/列表）</p>
<p><a href="https://imgtu.com/i/WxDhwV" target="_blank" rel="noopener noreferrer"><img src="https://z3.ax1x.com/2021/08/01/WxDhwV.jpg" alt="WxDhwV.jpg"><ExternalLinkIcon/></a></p>
</template>
