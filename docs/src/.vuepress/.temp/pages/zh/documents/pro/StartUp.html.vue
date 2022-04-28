<template><h1 id="开始使用" tabindex="-1"><a class="header-anchor" href="#开始使用" aria-hidden="true">#</a> 开始使用</h1>
<blockquote>
<p>JEngine无论是开源版还是Pro版本，下载下来后都是可以很轻松跑通的。</p>
</blockquote>
<nav class="table-of-contents"><ul><li><RouterLink to="#要求">要求</RouterLink></li><li><RouterLink to="#下载">下载</RouterLink></li><li><RouterLink to="#更新">更新</RouterLink></li><li><RouterLink to="#使用">使用</RouterLink></li><li><RouterLink to="#加载热更资源">加载热更资源</RouterLink></li></ul></nav>
<h3 id="要求" tabindex="-1"><a class="header-anchor" href="#要求" aria-hidden="true">#</a> 要求</h3>
<ul>
<li>Unity 2019及以上</li>
<li>Odin Inspector插件</li>
</ul>
<h3 id="下载" tabindex="-1"><a class="header-anchor" href="#下载" aria-hidden="true">#</a> 下载</h3>
<p>下载可以直接在<a href="https://github.com/JasonXuDeveloper/JEngine-Pro" target="_blank" rel="noopener noreferrer">GitHub仓库<ExternalLinkIcon/></a>上下载zip文件，或者使用Git工具进行Clone。</p>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<ol>
<li>
<p>请使用仓库授权的GitHub账号</p>
</li>
<li>
<p>由于git现在需要用ssh访问private仓库了，使用<code>git clone</code>时请确保当前的电脑的ssh key上传到了GitHub账号下，不然没办法拉取代码</p>
</li>
</ol>
</div>
<h3 id="更新" tabindex="-1"><a class="header-anchor" href="#更新" aria-hidden="true">#</a> 更新</h3>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>因为更新比较复杂，建议用版本控制工具保存项目，这样如果修改过源码，更新后也不怕遗漏</p>
</div>
<p>更新需要替换以下内容：</p>
<ul>
<li><code>UnityProject/Assets/Dependencies</code>全部内容</li>
<li><code>UnityProject/Assets/Scripts/InitJEngine.cs</code>、<code>UnityProject/Assets/Scripts/Updater.cs</code>、<code>UnityProject/Assets/Scripts/LoadILRuntime.cs</code>、<code>UnityProject/Assets/Scripts/UI</code>、<code>UnityProject/Assets/Scripts/Helpers</code></li>
<li><code>UnityProject/HotUpdateScripts/JEngine</code></li>
</ul>
<blockquote>
<p>其中替换<code>UnityProject/Assets/Scripts/Helpers</code>时需注意保留自己之前注册过的代码，覆盖更新后记得重新注册回去</p>
</blockquote>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<ol>
<li><a href="#%E4%B8%8B%E8%BD%BD">下载</a>完成后，使用Unity打开UnityProject</li>
<li>这个时候应该会有很多报错，深吸一口气，不要慌，调整心态</li>
<li>导入Odin Inspector（自备unitypackage或从Asset Store导入）</li>
<li>导入后不应该有报错，如果还有报错，请看<RouterLink to="/zh/documents/0.7/FAQ.html">常见问题</RouterLink></li>
<li>这个时候就可以打开热更工程了，也就是<code>path/to/JEngine-Pro/UnityProject/HotUpdateScripts</code>目录，用IDE（推荐vs或rider，因为vscode需要自己配dotnet build来编译）打开里面的sln文件</li>
<li>尝试在<RouterLink to="/zh/documents/0.7/startup.html#%E8%BF%90%E8%A1%8C%E6%A8%A1%E5%BC%8F">不同的模式</RouterLink>运行Demo，注意留意控制台</li>
<li>修改热更工程，例如在<code>Program.cs</code>的<code>RunGame</code>方法内加个Log</li>
<li>编译热更工程，如果出现问题（例如跳过），请看<RouterLink to="/zh/documents/0.7/FAQ.html">常见问题</RouterLink></li>
<li>尝试<RouterLink to="/zh/documents/0.7/BuildAB.html">打包热更资源</RouterLink></li>
<li>尝试打包游戏，真机运行</li>
</ol>
<h3 id="加载热更资源" tabindex="-1"><a class="header-anchor" href="#加载热更资源" aria-hidden="true">#</a> 加载热更资源</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>加载热更资源或场景需要用全路径，建议使用热更工程的<code>BPath.cs</code>内的字段加载资源</p>
</div>
<p>请参考<code>AssetMgr</code>内的接口，详细说明请参考<RouterLink to="/zh/documents/0.7/">开源版0.7文档</RouterLink></p>
</template>
