<template><h1 id="常见问题一览" tabindex="-1"><a class="header-anchor" href="#常见问题一览" aria-hidden="true">#</a> 常见问题一览</h1>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果遇到无法解决的问题欢迎联系作者</p>
</div>
<nav class="table-of-contents"><ul><li><RouterLink to="#热更工程无法打开">热更工程无法打开</RouterLink></li><li><RouterLink to="#生成热更工程dll跳过">生成热更工程DLL跳过</RouterLink></li><li><RouterLink to="#生成热更工程后游戏没热更">生成热更工程后游戏没热更</RouterLink></li></ul></nav>
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
<h4 id="原因-1" tabindex="-1"><a class="header-anchor" href="#原因-1" aria-hidden="true">#</a> 原因</h4>
<p>JEngine是用Mac开发的，Win下编译DLL有可能需要重新配置</p>
<h4 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h4>
<p>VS打开热更工程后找到配置管理器，指定平台后记得勾上生成</p>
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
</template>
