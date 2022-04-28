<template><h1 id="classbind依赖编辑器" tabindex="-1"><a class="header-anchor" href="#classbind依赖编辑器" aria-hidden="true">#</a> ClassBind依赖编辑器</h1>
<p>该工具用于查看ClassBind在当前场景中被依赖的情况</p>
<h2 id="打开面板" tabindex="-1"><a class="header-anchor" href="#打开面板" aria-hidden="true">#</a> 打开面板</h2>
<h4 id="方法一" tabindex="-1"><a class="header-anchor" href="#方法一" aria-hidden="true">#</a> 方法一：</h4>
<ul>
<li>
<p>在Hierarchy中选择带有ClassBind的对象，然后右键JEngine/分析ClassBind依赖即可</p>
<p><a href="https://imgtu.com/i/H7SVQf" target="_blank" rel="noopener noreferrer"><img src="https://s4.ax1x.com/2022/02/18/H7SVQf.png" alt="H7SVQf.png"><ExternalLinkIcon/></a></p>
</li>
</ul>
<h4 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二" aria-hidden="true">#</a> 方法二：</h4>
<ul>
<li>选中GameObject后按下option(alt)- shift-c；或者：</li>
<li>在菜单栏选择JEngine/Pro/ClassBind依赖面板，然后对ClassBind赋值（拖拽或用下拉框赋值都可以）</li>
</ul>
<h2 id="分析依赖" tabindex="-1"><a class="header-anchor" href="#分析依赖" aria-hidden="true">#</a> 分析依赖</h2>
<p><a href="https://imgtu.com/i/H7Svhn" target="_blank" rel="noopener noreferrer"><img src="https://s4.ax1x.com/2022/02/18/H7Svhn.png" alt="H7Svhn.png"><ExternalLinkIcon/></a></p>
<ul>
<li>选好ClassBind后，选择该ClassBind挂的类型</li>
<li>会自动在该场景内搜索全部引用该类型的字段</li>
<li>会自动在该场景内搜索全部引用给类型的热更按钮事件</li>
<li>可以点击查看此ClassBind的引用关系，打开对应ClassBind的依赖关系</li>
<li>可以点击查看此Button，打开对应按钮的Inspector面板</li>
</ul>
</template>
