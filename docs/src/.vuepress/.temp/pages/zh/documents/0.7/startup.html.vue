<template><h1 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用" aria-hidden="true">#</a> 开始使用</h1>
<p>该文章将告诉您如何初步使用JEngine</p>
<nav class="table-of-contents"><ul><li><RouterLink to="#开发环境">开发环境</RouterLink></li><li><RouterLink to="#下载方式-非常重要">下载方式-非常重要</RouterLink></li><li><RouterLink to="#修改-net版本">修改.Net版本</RouterLink></li><li><RouterLink to="#目录结构">目录结构</RouterLink></li><li><RouterLink to="#快速开始">快速开始</RouterLink></li><li><RouterLink to="#打包事项">打包事项</RouterLink></li><li><RouterLink to="#运行模式">运行模式</RouterLink></li></ul></nav>
<h2 id="开发环境" tabindex="-1"><a class="header-anchor" href="#开发环境" aria-hidden="true">#</a> 开发环境</h2>
<ul>
<li>
<p>Unity版本：2019.3.13f1 （请使用该版本及以上）</p>
</li>
<li>
<p>U3D工程.net环境： .Net Framework 4.x</p>
</li>
<li>
<p>热更工程.net环境： .Net Framework 4.x</p>
</li>
<li>
<p>开发系统：MacOS 10.15.5</p>
<blockquote>
<p>100%支持Windows</p>
</blockquote>
</li>
</ul>
<h2 id="下载方式-非常重要" tabindex="-1"><a class="header-anchor" href="#下载方式-非常重要" aria-hidden="true">#</a> 下载方式-非常重要</h2>
<blockquote>
<p>因为JEngine使用了Git的Submodule模块来安装子模块，下载本框架源码不推荐直接从网站下载zip，目前有3种下载方式：</p>
</blockquote>
<ol>
<li>
<p>方法一，直接<strong>下载zip</strong>，然后进入UnityProject/Assets/Dependencies，解压里面的zip（zip下载必看）</p>
</li>
<li>
<p>方法二，先<code>git clone</code>再<strong>安装子模块</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:JasonXuDeveloper/JEngine.git
<span class="token builtin class-name">cd</span> JEngine
<span class="token function">git</span> submodule init
<span class="token function">git</span> submodule update
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>方法三，git clone的时候顺带安装子模块   ----   <strong>推荐</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git@github.com:JasonXuDeveloper/JEngine.git --recursive
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ol>
<blockquote>
<p>注，这里的github地址可以换为gitee地址</p>
<p>如果安装submodule的时候报错了，则需要配置Github（或Gitee）的ssh key</p>
</blockquote>
<h2 id="修改-net版本" tabindex="-1"><a class="header-anchor" href="#修改-net版本" aria-hidden="true">#</a> 修改.Net版本</h2>
<p>在Unity的PlayerSetting下，将<code>API Compatibility Level</code> 修改为<code>.NET 4.X </code>即可</p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<blockquote>
<p>该结构是UnityProject目录内的结构，非热更工程的目录结构都可以凭个人喜好决定是否遵守</p>
</blockquote>
<h4 id="unity工程" tabindex="-1"><a class="header-anchor" href="#unity工程" aria-hidden="true">#</a> Unity工程</h4>
<ul>
<li><strong>Assets</strong> - Unity工程根目录
<ul>
<li><strong>Dependencies</strong> - JEngine用到的一些第三方插件，更新时替换该目录内相关的插件</li>
<li><strong>HotUpdateResources</strong> - 所有热更资源将存放在这里
<ul>
<li><strong>AddOns</strong> - 分包
<ul>
<li><strong>AddOn1</strong> - 分包1</li>
</ul>
</li>
<li><strong>Controller</strong> - 动画</li>
<li><strong>Dll</strong> - 该目录存放热更代码</li>
<li><strong>Material</strong> - 材质</li>
<li><strong>Prefab</strong> - 预制体</li>
<li><strong>Scene</strong> - 场景</li>
<li><strong>ScriptableObject</strong> - Unity的可程序化物件</li>
<li><strong>TextAsset</strong> - 文本资源</li>
<li><strong>UI</strong> - 图片资源</li>
<li><strong>Other</strong> - 其他任意东西，只要能被加载的都可以丢在这里</li>
</ul>
</li>
<li><strong>Scripts</strong> - 无法热更新的代码
<ul>
<li><strong>InitJEngine.cs&amp;LoadILRuntime.cs</strong> - <strong>十分重要</strong>的文件，用于启动游戏，每次更新必须替换该2个文件</li>
<li><strong>Helpers</strong> - 助手类文件夹，包含ILRuntime注册代码</li>
<li><strong>Adapters</strong> - 适配器类文件夹，生成ILRuntime适配器后会创建此文件夹，包含ILRuntime的适配器，用于热更工程继承本地接口和类</li>
<li><strong>APIs</strong> - 往该文件夹里放您的代码</li>
</ul>
</li>
<li><strong>Init.unity</strong> - 启动游戏的场景</li>
</ul>
</li>
</ul>
<h4 id="生成目录" tabindex="-1"><a class="header-anchor" href="#生成目录" aria-hidden="true">#</a> 生成目录</h4>
<ul>
<li><strong>Builds</strong> - 生成的客户端可以放在这里</li>
</ul>
<h4 id="热更资源生成目录" tabindex="-1"><a class="header-anchor" href="#热更资源生成目录" aria-hidden="true">#</a> 热更资源生成目录</h4>
<ul>
<li><strong>DLC</strong> - 热更资源导出目录</li>
<li><strong>EncryptsAssets</strong> - 加密热更资源导出目录</li>
</ul>
<h4 id="热更代码目录" tabindex="-1"><a class="header-anchor" href="#热更代码目录" aria-hidden="true">#</a> 热更代码目录</h4>
<ul>
<li><strong>HotUpdateScripts</strong> - 热更代码项目
<ul>
<li><strong>Program.cs</strong> - 启动游戏的代码, <strong>你可以更改里面的东西，但请不要删除或更改该脚本的SetupGame和RunGame方法</strong></li>
<li><strong>JEngine</strong> - <strong>请勿删除</strong>，JEngine部分源码在里面，<strong>每次更新覆盖该目录</strong>
<ul>
<li><strong>Examples</strong> - JEngine的Demo源码</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2>
<blockquote>
<p>请按照以下顺序进行操作</p>
</blockquote>
<ol>
<li><strong><a href="#%E4%B8%8B%E8%BD%BD%E6%96%B9%E5%BC%8F-%E9%9D%9E%E5%B8%B8%E9%87%8D%E8%A6%81">下载</a>该项目</strong></li>
<li>将项目的<strong>UnityProject目录用Unity打开</strong></li>
<li>首次打开会生成个<strong>lock文件</strong>到Assets目录下，<strong>请勿删除</strong>，同时还会有个提示</li>
<li>找到<strong>HotUpdateResources/Scene</strong>, 确保你能找到<strong>Game.unity</strong>，并且<strong>HotUpdateResources/DLL/~Hidden文件夹中有生成的DLL文件（这个文件夹Unity内看不见）</strong></li>
<li>导入后不应该有报错，如果还有报错，请看<RouterLink to="/zh/documents/0.7/FAQ.html">常见问题</RouterLink></li>
<li>无需进行任何修改，尝试在<a href="#%E8%BF%90%E8%A1%8C%E6%A8%A1%E5%BC%8F">不同的模式</a>运行自带的Demo，注意留意控制台</li>
<li>这个时候就可以打开热更工程了，也就是<code>path/to/JEngine/UnityProject/HotUpdateScripts</code>目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件</li>
<li>修改热更工程，例如在<code>Program.cs</code>的<code>RunGame</code>方法内加个Log</li>
<li>编译热更工程，如果出现问题（例如跳过），请看<RouterLink to="/zh/documents/0.7/FAQ.html">常见问题</RouterLink></li>
<li>尝试<RouterLink to="/zh/documents/0.7/BuildAB.html">打包热更资源</RouterLink></li>
<li>尝试打包游戏（APK、EXE等），注意<a href="#%E6%89%93%E5%8C%85%E4%BA%8B%E9%A1%B9">打包事项</a></li>
<li><strong>现在，运行游戏，即可体验热更功能！</strong></li>
</ol>
<blockquote>
<p>到这里，您已经完成了热更游戏的第一步，恭喜！</p>
</blockquote>
<h2 id="打包事项" tabindex="-1"><a class="header-anchor" href="#打包事项" aria-hidden="true">#</a> 打包事项</h2>
<p>生成项目的时候，<strong>为了避免冗余，请手动删除热更场景</strong>（开发模式会自动将热更场景加入Build Settings）</p>
<img src="https://s1.ax1x.com/2020/07/20/Uhxcuj.jpg" alt="guide4" style="width:50%;margin-left:25%" />
<h2 id="运行模式" tabindex="-1"><a class="header-anchor" href="#运行模式" aria-hidden="true">#</a> 运行模式</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>JEngine可以使用三种模式运行游戏，分别是：开发模式，离线模式，真机模式</p>
</div>
<ol>
<li>
<p>开发模式</p>
<ol>
<li>直接编辑器下运行游戏</li>
<li>尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更</li>
</ol>
</li>
<li>
<p>离线模式</p>
<ol>
<li>参考<RouterLink to="/zh/documents/0.7/BuildAB.html">打包热更资源</RouterLink>打出AB包</li>
<li>在Unity编辑器菜单栏选择Tools/BuildAsset/Copy资源到StreamingAssets</li>
<li>控制台输出复制成功后，进入Init场景，将<code>Updater</code>的<code>Mode</code>设置为<code>Local</code></li>
<li>尝试运行游戏</li>
<li>尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更</li>
</ol>
</li>
<li>
<p>真机模式</p>
<ol>
<li>
<p>参考<RouterLink to="/zh/documents/0.7/BuildAB.html">打包热更资源</RouterLink>打出AB包</p>
</li>
<li>
<p>在资源服务器上创建DLC目录</p>
<ul>
<li>如果未开启AB加密（默认），就将UnityProject/DLC内的文件上传到资源服务器的DLC目录下</li>
<li>如果开启了AB加密（需要自己配置），就将UnityProject/EncryptAssets内的文件上传到资源服务器的DLC目录下</li>
</ul>
</li>
<li>
<p>进入Init场景，将将<code>Updater</code>的<code>Mode</code>设置为<code>Build</code></p>
</li>
<li>
<p>将<code>Updater</code>的<code>BaseURL</code>设置为<code>http(s)://资源服务器地址/DLC</code></p>
</li>
<li>
<p>尝试运行游戏</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>资源服务器上创建的目录名字可以随意，但是<code>Updater</code>的<code>BaseURL</code>的地址必须是服务器上创建的文件夹的名字结尾</li>
<li>不论资源服务器上创建的目录是什么名字，打包热更资源后都应该根据是否使用加密将<code>UnityProject/DLC</code>或<code>UnityProject/EncryptAssets</code>下的文件上传上去</li>
<li>如果打了AB后通过菜单栏工具将其复制到了<code>StreamingAssets</code>，那么真机模式下会基于<code>StreamingAssets</code>内的资源进行增量热更</li>
</ul>
</div>
</li>
<li>
<p>尝试修改热更代码并编译，或修改热更资源，回到步骤1，尝试实现热更</p>
</li>
</ol>
</li>
</ol>
</template>
