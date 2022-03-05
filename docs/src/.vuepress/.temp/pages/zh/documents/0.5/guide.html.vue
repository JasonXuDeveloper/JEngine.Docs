<template><h1 id="开发须知" tabindex="-1"><a class="header-anchor" href="#开发须知" aria-hidden="true">#</a> 开发须知</h1>
<p>本文章包含开发过程中需要注意的地方</p>
<h2 id="开发模式" tabindex="-1"><a class="header-anchor" href="#开发模式" aria-hidden="true">#</a> 开发模式</h2>
<p>开发模式可以大量提高开发效率，开发时无需一有修改就重新打Bundles</p>
<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3>
<ol>
<li>
<p>进入<strong>Init场景</strong></p>
</li>
<li>
<p>选择<strong>Updater</strong></p>
</li>
<li>
<p>勾选<strong>Development Mode</strong>即可开启开发模式，提高开发效率</p>
<img src="https://s1.ax1x.com/2020/07/16/UBC5uD.png" alt="guide1" style="width:50%;margin-left:25%" />
</li>
</ol>
<h2 id="开发指南" tabindex="-1"><a class="header-anchor" href="#开发指南" aria-hidden="true">#</a> 开发指南</h2>
<ul>
<li>
<p>默认热更场景的<strong>Title对象</strong>，包含一个<code>LocalizationText</code>脚本，会导致该组件的<code>Text</code>无法被修改，移除<code>LocalizationText</code>脚本即可</p>
</li>
<li>
<p>进行<strong>building bundle</strong>时，会弹出一个弹窗要求输入加密密码，共<strong>16位</strong>，用于<strong>加密DLL</strong>
<img src="https://s1.ax1x.com/2020/07/26/apuoHs.png" alt="guide2" style="width:50%;margin-left:25%" /></p>
</li>
<li>
<p><strong>Init场景中</strong>，找到<strong>HotFixCode</strong>，Inspector中Init方法里的Key为DLL加密密码</p>
</li>
</ul>
<img src="https://s1.ax1x.com/2020/07/26/apu7En.png" alt="guide3" style="width:50%;margin-left:25%" />
<ul>
<li>生成项目的时候，<strong>为了避免冗余，请手动删除热更场景</strong>（开发模式会自动将热更场景加入Build Settings）</li>
</ul>
<img src="https://s1.ax1x.com/2020/07/20/Uhxcuj.jpg" alt="guide4" style="width:50%;margin-left:25%" />
<h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2>
<ul>
<li>
<p>热更工程部分Unity类型不存在</p>
<p>热更工程中需要引用不同的Unity Module，在Unity安装目录，例如JEngine提供的UnityCoreModule等</p>
</li>
<li>
<p>Cannot find Delegate Adapter for: <strong>XXX</strong>:</p>
<p>根据报错，在<strong>Assets/Scripts/Helpers/目录下，打开不同的Helper，往<code>Register(Appdomain appdomain)</code> 方法</strong>中添加报错信息里要求添加的东西即可</p>
<img src="https://s1.ax1x.com/2020/07/14/Ut2RoD.png" alt="guide5" style="width:50%;margin-left:25%" />
</li>
<li>
<p>不存在语言<strong>xx-yy</strong>，自动替换为<strong>xx-zz</strong>
多语言本地化的错误，多语言配置表格里不存在xx-yy这个语言</p>
<p>JEngine会自动匹配，相似的语种xx-zz，作为当前语言</p>
<p>该Bug可忽略，只需要在多语言表格里配置即可</p>
 <img src="https://s1.ax1x.com/2020/09/27/0kAtL4.png" alt="guide6" style="width:50%;margin-left:25%" />
</li>
</ul>
<h2 id="如何更新" tabindex="-1"><a class="header-anchor" href="#如何更新" aria-hidden="true">#</a> 如何更新</h2>
<p>更新的方法有2种，建议第一种</p>
<h3 id="方法一-推荐" tabindex="-1"><a class="header-anchor" href="#方法一-推荐" aria-hidden="true">#</a> 方法一（推荐）</h3>
<ul>
<li>双击使用项目目录/Packages/Core.unitypackage，导入Unity内资源
<blockquote>
<p>v0.5.5开始，JEngine完成了代码热更底层和业务层分离，这代表了您可以将自己项目中的适配器、注册委托、JSON转换注册、热更加载后事件等，写入Scripts/Helpers目录中的不同文件。这代表了您可以放心导入该整合包，可以放心替换Init.cs和InitILrt.cs，因为您自己的逻辑已被分离，您只需要确保，导入该整合包的时候，如果您的项目已有Scripts/Helper目录，请勿覆盖导入</p>
</blockquote>
</li>
<li>覆盖更新UnityProject/HotUpdateScripts/JEngine和UnityProject/HotUpdateScripts/Examples目录</li>
</ul>
<h3 id="方法二" tabindex="-1"><a class="header-anchor" href="#方法二" aria-hidden="true">#</a> 方法二</h3>
<ul>
<li>覆盖更新UnityProject/Assets/Dependencies，UnityProject/Assets/Scripts/Init.cs，UnityProject/Assets/Scripts/InitILrt.cs，Init场景，手动对比HotUpdateResources的差异</li>
<li>覆盖更新UnityProject/HotUpdateScripts/JEngine和UnityProject/HotUpdateScripts/Examples目录</li>
<li>对比Scripts/Helpers目录中的文件进行删减</li>
</ul>
<blockquote>
<p>注意，覆盖更新热更工程后，需要重新添加JEngine目录的文件至解决方案</p>
</blockquote>
   <img src="https://s1.ax1x.com/2020/10/18/0jZToR.png" alt="guide6" style="width:50%;margin-left:25%" />
<h2 id="游戏热更新注意事项-by-清行" tabindex="-1"><a class="header-anchor" href="#游戏热更新注意事项-by-清行" aria-hidden="true">#</a> 游戏热更新注意事项  By 清行</h2>
<h3 id="_1-资源热更" tabindex="-1"><a class="header-anchor" href="#_1-资源热更" aria-hidden="true">#</a> 1. 资源热更</h3>
<p>Updater 的 <code>development</code> 选项 表示 是否是开发环境<br>
打上对号加载的是<code>HotUpdateResources</code>资源<br>
去掉<code>对号</code>加载热更新资源</p>
<h3 id="_2-代码热更" tabindex="-1"><a class="header-anchor" href="#_2-代码热更" aria-hidden="true">#</a> 2. 代码热更</h3>
<h4 id="_1-net-framework4-6-1-安装不上" tabindex="-1"><a class="header-anchor" href="#_1-net-framework4-6-1-安装不上" aria-hidden="true">#</a> 1. <code>.Net Framework4.6.1</code> 安装不上</h4>
<blockquote>
<p>解决方法</p>
<p>右键 -&gt; 解决方案 -&gt; 属性 -&gt; 应用程序 : 目标框架 选择对应的版本，需要<code>4.x</code>版本</p>
</blockquote>
<h4 id="_2-生成解决方案dll跳过" tabindex="-1"><a class="header-anchor" href="#_2-生成解决方案dll跳过" aria-hidden="true">#</a> 2. 生成解决方案<code>DLL</code>跳过</h4>
<blockquote>
<p>解决方法</p>
<p>方法一：菜单栏 -&gt; 工具 -&gt; 配置管理器   <code>生成</code>的对勾 重新勾一下</p>
<p>方法二：删除<code>Assets/HotUpdateResources/Dlls/Hidden~</code>文件夹，然后再进一下Unity，会自动重新生成文件夹，然后再生成解决方案</p>
</blockquote>
<h2 id="接入dotween-by-l-fone" tabindex="-1"><a class="header-anchor" href="#接入dotween-by-l-fone" aria-hidden="true">#</a> 接入DoTween By L-Fone</h2>
<blockquote>
<p>前言：因DoTween插件的广泛使用，应部分JEngine用户要求，特写本篇教程教大家如何接入DoTween，如有不正确之处，还请留言指正。本人邮箱：275757115@qq.com</p>
</blockquote>
<p><strong>1、导入DoTween</strong></p>
<p><a href="https://imgchr.com/i/BINzo6" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BINzo6.png" alt="BINzo6.png"><ExternalLinkIcon/></a></p>
<p><strong>2、拷贝Dll文件到HotFix的Dlls目录下</strong></p>
<p><a href="https://imgchr.com/i/BIwh1U" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwh1U.png" alt="BIwh1U.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwonJ" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwonJ.png" alt="BIwonJ.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwLh6" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwLh6.png" alt="BIwLh6.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwX9K" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwX9K.png" alt="BIwX9K.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwj1O" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwj1O.png" alt="BIwj1O.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwvcD" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwvcD.png" alt="BIwvcD.png"><ExternalLinkIcon/></a></p>
<p><strong>3、引入dll文件到HotFix工程中</strong></p>
<p><a href="https://imgchr.com/i/BIwTB9" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwTB9.png" alt="BIwTB9.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwqtx" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwqtx.png" alt="BIwqtx.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0SnH" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0SnH.png" alt="BI0SnH.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BIwxje" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BIwxje.png" alt="BIwxje.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0pBd" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0pBd.png" alt="BI0pBd.png"><ExternalLinkIcon/></a></p>
<p><strong>4、使用DoTween</strong></p>
<p><a href="https://imgchr.com/i/BI09HA" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI09HA.png" alt="BI09HA.png"><ExternalLinkIcon/></a></p>
<p><a href="https://imgchr.com/i/BI0PAI" target="_blank" rel="noopener noreferrer"><img src="https://s1.ax1x.com/2020/11/07/BI0PAI.png" alt="BI0PAI.png"><ExternalLinkIcon/></a></p>
<blockquote>
<p>如果还有其他特殊情况，可以在JEngine群里求助，也可以联系QQ：275757115（L-Fone）</p>
</blockquote>
</template>
