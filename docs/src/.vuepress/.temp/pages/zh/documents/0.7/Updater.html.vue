<template><h1 id="updater使用" tabindex="-1"><a class="header-anchor" href="#updater使用" aria-hidden="true">#</a> Updater使用</h1>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是<strong>Updater</strong>和<strong>InitJEngine</strong>，本文将讲述<code>Updater</code>的API以及用法</p>
</div>
<h3 id="编辑器下配置" tabindex="-1"><a class="header-anchor" href="#编辑器下配置" aria-hidden="true">#</a> 编辑器下配置</h3>
<p>Updater有6个字段需要在编辑器下配置（Init场景），分别是：</p>
<ul>
<li>Base URL，即资源下载地址，请确保部署热更资源后<code>BaseUrl/资源分包/VersionLog.txt</code>等文件可以访问</li>
<li>Game Scene，即热更资源更新成功后跳转的场景，这个场景必须打在主包内（即<code>Assets/HotUpdateResources/Scene</code>下），该字段需要输入全路径（Assets开头），建议在Unity的Project窗口下选中对应场景然后右键<code>Copy Path</code>然后黏贴到这个字段里</li>
<li>Main Package Name，即热更主包名称，默认是Main，如果没改过热更资源配置，就不需要修改</li>
<li>Main Package Key，即热更主包加密秘钥，默认是空的，如果没改过热更资源配置或没有为热更主包配置密码，留空即可</li>
<li>Main Package Check CRC，即热更主包是否需要CRC校验，默认开启，不开启的话初始化热更资源更快，但是不能确保热更资源有没有被篡改</li>
<li>Mode，即运行模式，Develop代表开发模式，Local代表离线模式，Build代表真机模式（即下载模式）</li>
</ul>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>默认的Demo下有个Button，该Button的点击事件就是调用<code>Updater</code>的<code>StartUpdate</code>方法，即请求更新主包资源。</p>
<p><code>StartUpdate</code>方法内本质上就是更新分包的接口调用，如果需要进行一些修改（如不点击按钮，直接请求更新），在Updater的Start周期之后调用<code>StartUpdate</code>即可</p>
<div class="custom-container warning"><p class="custom-container-title">警告</p>
<p>一定要先请求更新主分包并进入主分包的场景，因为热更代码只会存在于主分包内，框架底层的设计是在进入主分包场景后启动热更代码</p>
</div>
<h3 id="接口" tabindex="-1"><a class="header-anchor" href="#接口" aria-hidden="true">#</a> 接口</h3>
<p>Updater是一个用于管理热更资源的脚本，集成了以下功能：</p>
<ul>
<li>
<p>获取分包信息</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> info <span class="token operator">=</span> <span class="token keyword">await</span> Updater<span class="token punctuation">.</span><span class="token function">CheckPackage</span><span class="token punctuation">(</span>包名字符串<span class="token punctuation">,</span> 是否校验CRC布尔值<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>更新指定分包</p>
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>bundlePackageName</td>
<td>分包名</td>
</tr>
<tr>
<td>updater</td>
<td>IUpdater对象，可以给UI界面控制脚本继承IUpdater后注册对应事件，或创建BaseUpdater对象并注册事件回调</td>
</tr>
<tr>
<td>checkCRC</td>
<td>校验CRC，默认true，开启后可防止用户篡改本地热更资源，但是会影响初始化速度</td>
</tr>
<tr>
<td>package</td>
<td>分包信息，可以通过CheckPackage获取，也可以留空自动根据分包名获取</td>
</tr>
<tr>
<td>key</td>
<td>分包加密密钥，没加密就留空或写null，或者不写该参数</td>
</tr>
<tr>
<td>nextScene</td>
<td>分包下载完毕后跳转到的分包内的场景，需要全路径，留空或null就不跳转</td>
</tr>
<tr>
<td>onMessage</td>
<td>文本提示回调</td>
</tr>
<tr>
<td>onProgress</td>
<td>下载进度回调（范围是0~1）</td>
</tr>
<tr>
<td>onVersion</td>
<td>版本提示回调</td>
</tr>
<tr>
<td>onLoadSceneProgress</td>
<td>场景跳转回调</td>
</tr>
<tr>
<td>onLoadSceneFinished</td>
<td>场景加载完毕回调</td>
</tr>
</tbody>
</table>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>Updater<span class="token punctuation">.</span><span class="token function">UpdatePackage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> bundlePackageName<span class="token punctuation">,</span> <span class="token class-name">IUpdater</span> updater<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> checkCRC <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token class-name">UpdateBundleDataInfo</span> package <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> key <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> nextScene <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>Updater<span class="token punctuation">.</span><span class="token function">UpdatePackage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> bundlePackageName<span class="token punctuation">,</span> <span class="token class-name">IUpdater</span> updater<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> checkCRC <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token class-name"><span class="token keyword">string</span></span> key <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token class-name"><span class="token keyword">string</span></span> nextScene <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>Updater<span class="token punctuation">.</span><span class="token function">UpdatePackage</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> bundlePackageName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> checkCRC <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token class-name">UpdateBundleDataInfo</span> package <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> key <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token class-name"><span class="token keyword">string</span></span> nextScene <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span> onMessage <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">float</span><span class="token punctuation">></span></span> onProgress <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">></span></span> onVersion <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
        <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">float</span><span class="token punctuation">></span></span> onLoadSceneProgress <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token class-name">Action</span> onLoadSceneFinished <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
<li>
<p>获取指定分包本地版本</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> localVer <span class="token operator">=</span> <span class="token keyword">await</span> Updater<span class="token punctuation">.</span><span class="token function">GetLocalPackageVersion</span><span class="token punctuation">(</span>包名字符串<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> localVer <span class="token operator">=</span> <span class="token keyword">await</span> Updater<span class="token punctuation">.</span><span class="token function">GetLocalPackageVersion</span><span class="token punctuation">(</span>包名字符串<span class="token punctuation">,</span> 分包信息<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取指定分包服务器版本</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> remoteVer <span class="token operator">=</span> <span class="token keyword">await</span> Updater<span class="token punctuation">.</span><span class="token function">GetRemotePackageVersion</span><span class="token punctuation">(</span>包名字符串<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> remoteVer <span class="token operator">=</span> <span class="token keyword">await</span> Updater<span class="token punctuation">.</span><span class="token function">GetRemotePackageVersion</span><span class="token punctuation">(</span>包名字符串<span class="token punctuation">,</span> 分包信息<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
</template>
