<template><h1 id="常见问题一览" tabindex="-1"><a class="header-anchor" href="#常见问题一览" aria-hidden="true">#</a> 常见问题一览</h1>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果遇到无法解决的问题欢迎联系作者</p>
</div>
<nav class="table-of-contents"><ul><li><RouterLink to="#热更工程无法打开">热更工程无法打开</RouterLink></li><li><RouterLink to="#生成热更工程dll跳过">生成热更工程DLL跳过</RouterLink></li><li><RouterLink to="#生成热更工程后游戏没热更">生成热更工程后游戏没热更</RouterLink></li><li><RouterLink to="#cannot-find-xxx-for-yyy">Cannot find XXX for: YYY</RouterLink></li><li><RouterLink to="#没找到这个资源的handler">没找到这个资源的handler</RouterLink></li><li><RouterLink to="#生成的适配器有报错">生成的适配器有报错</RouterLink></li><li><RouterLink to="#热更工程没办法使用scriptableobject">热更工程没办法使用ScriptableObject</RouterLink></li><li><RouterLink to="#热更工程没办法继承ipointerxxxx">热更工程没办法继承IPointerXXXX</RouterLink></li><li><RouterLink to="#热更工程没办法使用编辑器代码或使用了不生效">热更工程没办法使用编辑器代码或使用了不生效</RouterLink></li><li><RouterLink to="#热更工程没办法使用主工程plugins内的代码">热更工程没办法使用主工程Plugins内的代码</RouterLink></li><li><RouterLink to="#热更工程没办法使用主工程内的代码">热更工程没办法使用主工程内的代码</RouterLink></li><li><RouterLink to="#热更工程没办法使用主工程asmdef内的代码">热更工程没办法使用主工程Asmdef内的代码</RouterLink></li><li><RouterLink to="#热更工程部分unity类型不存在">热更工程部分Unity类型不存在</RouterLink></li><li><RouterLink to="#net-framework4-6-1-安装不上">.Net Framework4.6.1 安装不上</RouterLink></li><li><RouterLink to="#dotween无法使用">DOTween无法使用</RouterLink></li></ul></nav>
<h3 id="热更工程无法打开" tabindex="-1"><a class="header-anchor" href="#热更工程无法打开" aria-hidden="true">#</a> 热更工程无法打开</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h4>
<p>JEngine是用Mac开发的，Win下用VS打开可能会出现这个问题</p>
<h4 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h4>
<p>百度/谷歌搜索以下关键词：</p>
<ul>
<li>Windows 打开Mac的C#项目</li>
<li>mac windows sln csproj不兼容</li>
<li>visual studio 无法打开sln 文件</li>
</ul>
<p>或者可以创建个C#命令行工程，然后覆盖替换sln和csprj文件，然后记得配置输出路径，参考<a href="#%E7%94%9F%E6%88%90%E7%83%AD%E6%9B%B4%E5%B7%A5%E7%A8%8B%E5%90%8E%E6%B8%B8%E6%88%8F%E6%B2%A1%E7%83%AD%E6%9B%B4">这里</a></p>
</div>
<h3 id="生成热更工程dll跳过" tabindex="-1"><a class="header-anchor" href="#生成热更工程dll跳过" aria-hidden="true">#</a> 生成热更工程DLL跳过</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<blockquote>
<p>内容提供者：清行</p>
</blockquote>
<h4 id="原因-1" tabindex="-1"><a class="header-anchor" href="#原因-1" aria-hidden="true">#</a> 原因</h4>
<p>JEngine是用Mac开发的，Win下编译DLL有可能需要重新配置</p>
<h4 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h4>
<p>方法一：VS打开热更工程后找到配置管理器，指定平台后记得勾上生成</p>
<p>方法二：删除<code>Assets/HotUpdateResources/Dlls/Hidden~</code>文件夹，然后再进一下Unity，会自动重新生成文件夹，然后再生成解决</p>
</div>
<h3 id="生成热更工程后游戏没热更" tabindex="-1"><a class="header-anchor" href="#生成热更工程后游戏没热更" aria-hidden="true">#</a> 生成热更工程后游戏没热更</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-2" tabindex="-1"><a class="header-anchor" href="#原因-2" aria-hidden="true">#</a> 原因</h4>
<p>可能是开了真机模式没打新ab，可能开了离线模式没把新ab复制到Streaming Assets，可能DLL没生成成功</p>
<h4 id="解决方案-1" tabindex="-1"><a class="header-anchor" href="#解决方案-1" aria-hidden="true">#</a> 解决方案</h4>
<ol>
<li>确保DLL生成路径在<code>UnityProject/Assets/HotUpdateResources/Dlls/Hidden~</code>下</li>
<li>确保热更工程生成DLL后Unity控制台有输出<code>Clean xxx in xxx ms</code></li>
<li>如果是离线模式，确保打了ab后复制到了Streaming Assets</li>
<li>如果是真机模式，确保打了ab后上传到了服务器</li>
</ol>
</div>
<h3 id="cannot-find-xxx-for-yyy" tabindex="-1"><a class="header-anchor" href="#cannot-find-xxx-for-yyy" aria-hidden="true">#</a> Cannot find XXX for: <strong>YYY</strong></h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-3" tabindex="-1"><a class="header-anchor" href="#原因-3" aria-hidden="true">#</a> 原因</h4>
<p>ILRuntime需要对委托、匿名函数等生成代码</p>
<h4 id="解决方案-2" tabindex="-1"><a class="header-anchor" href="#解决方案-2" aria-hidden="true">#</a> 解决方案</h4>
<ul>
<li>
<p>如果是需要生成Adapter，代表用到了跨域继承，请参考ILRuntime跨域继承文档，搭配JEngine提供的ILRuntime跨域继承适配器生成器去生成适配器</p>
</li>
<li>
<p>如果是需要生成其他的东西，在报错内会有个Please Add Following Code，复制里面的内容，黏贴到对应文件即可</p>
<img src="https://s1.ax1x.com/2020/07/14/Ut2RoD.png" alt="guide5" style="width:50%;margin-left:25%" />
<p>例如这里是<code>Cannot find Delegate Adapter</code>，那么只需要复制下面的代码，找到<code>Scripts/Helpers/RegisterDelegateAdapterHelper.cs</code>，将代码黏贴进去就好</p>
<blockquote>
<p>有的时候自动生成的代码，需要手动修改</p>
</blockquote>
</li>
</ul>
</div>
<h3 id="没找到这个资源的handler" tabindex="-1"><a class="header-anchor" href="#没找到这个资源的handler" aria-hidden="true">#</a> 没找到这个资源的handler</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-4" tabindex="-1"><a class="header-anchor" href="#原因-4" aria-hidden="true">#</a> 原因</h4>
<p>在切换场景时，会自动释放全部热更资源，若该热更资源已被释放，则会因为无法重复释放而出现该错误信息</p>
<h4 id="解决方案-3" tabindex="-1"><a class="header-anchor" href="#解决方案-3" aria-hidden="true">#</a> 解决方案</h4>
<p>忽略</p>
</div>
<h3 id="生成的适配器有报错" tabindex="-1"><a class="header-anchor" href="#生成的适配器有报错" aria-hidden="true">#</a> 生成的适配器有报错</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-5" tabindex="-1"><a class="header-anchor" href="#原因-5" aria-hidden="true">#</a> 原因</h4>
<p>如果继承了<code>MonoBehaviour</code>或其他Unity类型，生成的适配器可能会出现重复定义的方法</p>
<h4 id="解决方案-4" tabindex="-1"><a class="header-anchor" href="#解决方案-4" aria-hidden="true">#</a> 解决方案</h4>
<p>手动删除重复定义的方法即可（如同方法生成了2次，那么删除任意一个即可，需要保留一份）</p>
</div>
<h3 id="热更工程没办法使用scriptableobject" tabindex="-1"><a class="header-anchor" href="#热更工程没办法使用scriptableobject" aria-hidden="true">#</a> 热更工程没办法使用<code>ScriptableObject</code></h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-6" tabindex="-1"><a class="header-anchor" href="#原因-6" aria-hidden="true">#</a> 原因</h4>
<p>ScriptableObject需要在主工程定义，里面的字段无法热更，只能热更生成的数据配置（.asset文件）</p>
<h4 id="解决方案-5" tabindex="-1"><a class="header-anchor" href="#解决方案-5" aria-hidden="true">#</a> 解决方案</h4>
<p>在主工程定义ScriptableObject，或在热更工程用其他的代替</p>
</div>
<h3 id="热更工程没办法继承ipointerxxxx" tabindex="-1"><a class="header-anchor" href="#热更工程没办法继承ipointerxxxx" aria-hidden="true">#</a> 热更工程没办法继承<code>IPointerXXXX</code></h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-7" tabindex="-1"><a class="header-anchor" href="#原因-7" aria-hidden="true">#</a> 原因</h4>
<p>首先，跨域继承需要适配器，参考ILRuntime文档，其次，跨域不支持多继承，即不能同时在热更工程继承<code>MonoBehaviour</code>和<code>IPointerXXX</code>等接口</p>
<h4 id="解决方案-6" tabindex="-1"><a class="header-anchor" href="#解决方案-6" aria-hidden="true">#</a> 解决方案</h4>
<p>在主工程定义个类，继承这些需要继承的东西，然后用框架的ILRuntime跨域继承适配器生成器，生成该类的适配器，然后在热更工程继承该类</p>
</div>
<h3 id="热更工程没办法使用编辑器代码或使用了不生效" tabindex="-1"><a class="header-anchor" href="#热更工程没办法使用编辑器代码或使用了不生效" aria-hidden="true">#</a> 热更工程没办法使用编辑器代码或使用了不生效</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-8" tabindex="-1"><a class="header-anchor" href="#原因-8" aria-hidden="true">#</a> 原因</h4>
<p>热更工程是运行时环境，没必要使用，使用了也没效果</p>
<h4 id="解决方案-7" tabindex="-1"><a class="header-anchor" href="#解决方案-7" aria-hidden="true">#</a> 解决方案</h4>
<p>热更工程去掉编辑器代码</p>
</div>
<h3 id="热更工程没办法使用主工程plugins内的代码" tabindex="-1"><a class="header-anchor" href="#热更工程没办法使用主工程plugins内的代码" aria-hidden="true">#</a> 热更工程没办法使用主工程Plugins内的代码</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-9" tabindex="-1"><a class="header-anchor" href="#原因-9" aria-hidden="true">#</a> 原因</h4>
<p>没在热更工程引用对应代码</p>
<h4 id="解决方案-8" tabindex="-1"><a class="header-anchor" href="#解决方案-8" aria-hidden="true">#</a> 解决方案</h4>
<p>热更工程引用<code>UnityProject/Library/ScriptAssemblies/Assembly-CSharp-Firstpass.dll</code></p>
</div>
<h3 id="热更工程没办法使用主工程内的代码" tabindex="-1"><a class="header-anchor" href="#热更工程没办法使用主工程内的代码" aria-hidden="true">#</a> 热更工程没办法使用主工程内的代码</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-10" tabindex="-1"><a class="header-anchor" href="#原因-10" aria-hidden="true">#</a> 原因</h4>
<p>没在热更工程引用对应代码</p>
<h4 id="解决方案-9" tabindex="-1"><a class="header-anchor" href="#解决方案-9" aria-hidden="true">#</a> 解决方案</h4>
<p>热更工程引用<code>UnityProject/Library/ScriptAssemblies/Assembly-CSharp.dll</code></p>
</div>
<h3 id="热更工程没办法使用主工程asmdef内的代码" tabindex="-1"><a class="header-anchor" href="#热更工程没办法使用主工程asmdef内的代码" aria-hidden="true">#</a> 热更工程没办法使用主工程Asmdef内的代码</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-11" tabindex="-1"><a class="header-anchor" href="#原因-11" aria-hidden="true">#</a> 原因</h4>
<p>没在热更工程引用对应代码</p>
<h4 id="解决方案-10" tabindex="-1"><a class="header-anchor" href="#解决方案-10" aria-hidden="true">#</a> 解决方案</h4>
<p>热更工程引用<code>UnityProject/Library/ScriptAssemblies/Asmdef的名字.dll</code></p>
</div>
<h3 id="热更工程部分unity类型不存在" tabindex="-1"><a class="header-anchor" href="#热更工程部分unity类型不存在" aria-hidden="true">#</a> 热更工程部分Unity类型不存在</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<h4 id="原因-12" tabindex="-1"><a class="header-anchor" href="#原因-12" aria-hidden="true">#</a> 原因</h4>
<p>因为Unity2018后对引擎代码进行了拆分，把不同功能拆分到了不同模块的DLL内，如<code>Animatior</code>，<code>Input</code>等类型都被拆分出去了，在热更工程内如果没引用对应的模块DLL，则没办法使用</p>
<h4 id="解决方案-11" tabindex="-1"><a class="header-anchor" href="#解决方案-11" aria-hidden="true">#</a> 解决方案</h4>
<ol>
<li>
<p>用IDE打开主工程任意脚本</p>
</li>
<li>
<p>写个你要用的类，例如写个<code>public Animator a;</code>，然后按下F12，或按下Command（mac），然后左键点击你要用的类（这里的例子就是点刚刚写的<code>Animator</code></p>
</li>
<li>
<p>接着会反编译出来个程序集路径</p>
<p><img src="https://s1.ax1x.com/2020/11/07/BIwX9K.png" alt="BIwX9K.png"></p>
</li>
<li>
<p>热更工程引用该路径的DLL即可</p>
</li>
</ol>
</div>
<h3 id="net-framework4-6-1-安装不上" tabindex="-1"><a class="header-anchor" href="#net-framework4-6-1-安装不上" aria-hidden="true">#</a> <code>.Net Framework4.6.1</code> 安装不上</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<blockquote>
<p>内容提供者：清行</p>
</blockquote>
<h4 id="原因-13" tabindex="-1"><a class="header-anchor" href="#原因-13" aria-hidden="true">#</a> 原因</h4>
<p>不同电脑有不同的<code>.net framework</code>版本，需要在VS内配置对应版本</p>
<h4 id="解决方案-12" tabindex="-1"><a class="header-anchor" href="#解决方案-12" aria-hidden="true">#</a> 解决方案</h4>
<p>右键 -&gt; 解决方案 -&gt; 属性 -&gt; 应用程序 : 目标框架 选择对应的版本，需要<code>4.x</code>版本</p>
</div>
<h3 id="dotween无法使用" tabindex="-1"><a class="header-anchor" href="#dotween无法使用" aria-hidden="true">#</a> DOTween无法使用</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<blockquote>
<p>内容提供者：L-fone</p>
</blockquote>
<h4 id="原因-14" tabindex="-1"><a class="header-anchor" href="#原因-14" aria-hidden="true">#</a> 原因</h4>
<p>需要以正确的姿势去使用</p>
<h4 id="解决方案-13" tabindex="-1"><a class="header-anchor" href="#解决方案-13" aria-hidden="true">#</a> 解决方案</h4>
<p><strong>1、导入DoTween</strong></p>
<p><a href="https://imgchr.com/i/BINzo6" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BINzo6.png" alt="BINzo6.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><strong>2、拷贝Dll文件到HotFix的Dlls目录下</strong></p>
<p><a href="https://imgchr.com/i/BIwh1U" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwh1U.png" alt="BIwh1U.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwonJ" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwonJ.png" alt="BIwonJ.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwLh6" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwLh6.png" alt="BIwLh6.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwX9K" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwX9K.png" alt="BIwX9K.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwj1O" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwj1O.png" alt="BIwj1O.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwvcD" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwvcD.png" alt="BIwvcD.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><strong>3、引入dll文件到HotFix工程中</strong></p>
<p><a href="https://imgchr.com/i/BIwTB9" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwTB9.png" alt="BIwTB9.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwqtx" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwqtx.png" alt="BIwqtx.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0SnH" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0SnH.png" alt="BI0SnH.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwxje" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwxje.png" alt="BIwxje.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0pBd" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0pBd.png" alt="BI0pBd.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><strong>4、使用DoTween</strong></p>
<p><a href="https://imgchr.com/i/BI09HA" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI09HA.png" alt="BI09HA.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0PAI" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0PAI.png" alt="BI0PAI.png" style="zoom:50%;" /><ExternalLinkIcon/></a></p>
<blockquote>
<p>如果还有其他特殊情况，可以在JEngine群里求助，也可以联系QQ：275757115（L-Fone）</p>
</blockquote>
</div>
</template>
