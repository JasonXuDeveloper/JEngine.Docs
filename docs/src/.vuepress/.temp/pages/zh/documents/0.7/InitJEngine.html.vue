<template><h1 id="initjengine使用" tabindex="-1"><a class="header-anchor" href="#initjengine使用" aria-hidden="true">#</a> InitJEngine使用</h1>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>JEngine在Init场景下有2个脚本决定了游戏的热更新，分别是<strong>Updater</strong>和<strong>InitJEngine</strong>，本文将讲述<code>InitJEngine</code>的用法</p>
</div>
<h3 id="编辑器配置" tabindex="-1"><a class="header-anchor" href="#编辑器配置" aria-hidden="true">#</a> 编辑器配置</h3>
<p>InitJEngine有4个字段需要在编辑器下配置（Init场景），分别是：</p>
<ul>
<li>Key，即热更代码的加密秘钥，16位，应该与打包热更资源时给热更DLL配置的密码一样，可以在JEngine面板（菜单栏里找）内设置</li>
<li>Use JIT，即代码热更模块ILRuntime加载热更代码时使用的模式，默认使用<code>JIT On Demand</code>，即一个代码被多次使用后开启寄存器提高性能，相关部分请自行从ILRuntime文档了解</li>
<li>Use Pdb，即是否使用pdb调试，勾选后才能在Windows的Visual Studio下开启断点调试（需下载安装ILRuntime Debugger并运行游戏进入热更代码后开始调试），该字段仅在编辑器下的开发模式下生效</li>
<li>Debug，即是否输出调试信息，JEngine有个分块解密热更代码模块会频繁输出相关信息</li>
</ul>
</template>
