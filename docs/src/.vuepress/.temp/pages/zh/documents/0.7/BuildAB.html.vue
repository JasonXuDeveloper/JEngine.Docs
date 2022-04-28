<template><h1 id="打包热更资源" tabindex="-1"><a class="header-anchor" href="#打包热更资源" aria-hidden="true">#</a> 打包热更资源</h1>
<p>热更管理模块基于<a href="https://github.com/mister91jiao/BundleMaster_IntegrateETTask" target="_blank" rel="noopener noreferrer">Bundle Master<ExternalLinkIcon/></a>，可以在其官网找到相关视频/文档，</p>
<p>JEngine修改了Bundle Master的代码，使其变得更简单易用，</p>
<nav class="table-of-contents"><ul><li><RouterLink to="#开始之前">开始之前</RouterLink></li><li><RouterLink to="#创建分包">创建分包</RouterLink></li><li><RouterLink to="#配置打包">配置打包</RouterLink></li><li><RouterLink to="#打包资源">打包资源</RouterLink></li><li><RouterLink to="#其他工具">其他工具</RouterLink></li></ul></nav>
<h3 id="开始之前" tabindex="-1"><a class="header-anchor" href="#开始之前" aria-hidden="true">#</a> 开始之前</h3>
<ul>
<li>Main分包配置不建议修改</li>
<li>Main分包指向了<code>Assets/HotUpdateResources</code>下除了<code>AddOns</code>之外全部的已存在的子目录（自己在<code>Assets/HotUpdateResources</code>下新建的目录需要自行配置到Main分包的资源路径内</li>
<li>在<code>Assets/HotUpdateResources/AddOns</code>内可以创建新文件夹，用来存放新分包内容，同时创建分包配置后将其资源路径指向创建到AddOns下的新分包资源目录</li>
<li>热更DLL会被加密，<strong>首次打AB包会有个弹窗要求输入16位DLL加密密钥</strong>，后续打包时的加密密钥可以在JEngine面板配置，同时Init场景下InitJEngine的加密密钥记得与打包时加密DLL的密码一致</li>
<li><strong>加密DLL的秘钥和加密热更包的秘钥可以不一样</strong></li>
<li>首包开启加密后，首包加密秘钥请输入到Updater，参考<RouterLink to="/zh/documents/0.7/Updater.html">Updater使用</RouterLink></li>
<li>创建分包后，加载该分包资源时，需要传入资源全路径以及分包名（如果是主包资源，不需要填分包名，或者填写主包名称都可以）</li>
</ul>
<h3 id="创建分包" tabindex="-1"><a class="header-anchor" href="#创建分包" aria-hidden="true">#</a> 创建分包</h3>
<ol>
<li>进入<code>Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/</code></li>
<li>右键，<code>Create/BuildAssets/创建分包配置文件</code></li>
<li>给新建的文件改个名</li>
<li>在Unity的Inspector下进行配置</li>
<li>基础使用只需要配置分包名，资源路径和场景资源即可，参考Main分包和AddOn1分包的配置</li>
<li>建议启用hash，压缩模式建议<code>Chunk Based Compression</code></li>
<li>如果需要加密，则需要勾上加密资源，并输入秘钥（长度不限）</li>
</ol>
<h3 id="配置打包" tabindex="-1"><a class="header-anchor" href="#配置打包" aria-hidden="true">#</a> 配置打包</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>只有编辑器下才需要配置，该操作不影响真机
只有创建了新分包才需要对打包进行配置</p>
</div>
<ol>
<li>进入<code>Assets/Dependencies/BundleMaster/Editor/BundleMasterEditor/BuildSettings/</code></li>
<li>找到<code>AssetLoadTable</code>，在Unity的Inspector下开始配置</li>
<li>将所有需要打包的分包写入<code>Assets Load Setting</code>即可</li>
<li>建议不要使用绝对路径，建议生成路径代码，不建议修改除了步骤3提到的字段以外的内容</li>
</ol>
<h3 id="打包资源" tabindex="-1"><a class="header-anchor" href="#打包资源" aria-hidden="true">#</a> 打包资源</h3>
<p>请在Unity菜单栏选择：</p>
<p><code>Tools/BuildAsset/构建AssetBundle</code></p>
<h3 id="其他工具" tabindex="-1"><a class="header-anchor" href="#其他工具" aria-hidden="true">#</a> 其他工具</h3>
<ul>
<li><code>Copy资源到StreamingAssets</code>，用于离线模式</li>
<li><code>View/Built Bundles</code>，打开生成的热更资源的目录</li>
<li><code>View/Caches</code>，用于打开运行时下载的缓存的目录</li>
</ul>
</template>
