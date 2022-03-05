<template><h1 id="jwebsocket" tabindex="-1"><a class="header-anchor" href="#jwebsocket" aria-hidden="true">#</a> JWebSocket</h1>
<p>JEngine针对WebSocket服务端编写的网络层</p>
<blockquote>
<p>JWebSocket能干什么？</p>
<ul>
<li>连接WebSocket服务器</li>
<li>发送信息</li>
<li>接收信息</li>
<li>自动重连</li>
</ul>
</blockquote>
<h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Net</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">new</span> <span class="token constructor-invocation class-name">JWebSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://ip:port/socket.io/?EIO=3&amp;transport=websocket"</span></span><span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】使用默认配置连接基于socket-io实现的服务端</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JSocketConfig</span> config <span class="token operator">=</span> JSocketConfig<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token constructor-invocation class-name">JSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://ip:port/socket.io/?EIO=3&amp;transport=websocket"</span></span><span class="token punctuation">,</span> config<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】使用自定义配置连接基于socket-io（nodeJS）实现的服务端JS</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">new</span> <span class="token constructor-invocation class-name">JWebSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://ip:port/demo"</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>sender<span class="token punctuation">,</span>eventArgs<span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//使用默认配置连接非基于socket-io（非nodeJS）实现的服务端，需要自己实现接收方法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name">JSocketConfig</span> config <span class="token operator">=</span> JSocketConfig<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
config<span class="token punctuation">.</span>debug <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token keyword">new</span> <span class="token constructor-invocation class-name">JWebSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://ip:port/demo"</span></span><span class="token punctuation">,</span> config<span class="token punctuation">,</span> <span class="token punctuation">(</span>sender<span class="token punctuation">,</span>eventArgs<span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//使用默认配置连接非基于socket-io（非nodeJS）实现的服务端，需要自己实现接收方法</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">//连接服务器，此方法不阻塞</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnOpen</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//websocket通道开启事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnConnect</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//连上websocket服务器事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnReconnect</span><span class="token punctuation">(</span><span class="token class-name">Action</span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//重连事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnDisconnect</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//断开连接事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnClose</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//websocket通道关闭事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">OnError</span><span class="token punctuation">(</span><span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//websocket错误事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">SocketIO_On</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> eventName<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】事件监听</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">SocketIO_Off</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> eventName<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>SocketIOEvent<span class="token punctuation">></span></span> socketIOEvent<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】关闭事件监听</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">SendToServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> Data<span class="token punctuation">)</span> <span class="token comment">//发送字符串到服务端</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">SendToServerAsJson</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> Data<span class="token punctuation">)</span> <span class="token comment">//发送JSON字符串到服务端</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token generic-method"><span class="token function">SendToServerAsProtobuf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name">T</span> Data<span class="token punctuation">)</span> <span class="token comment">//发送ProtoBuf二进制到服务端</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">SendToServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> Data<span class="token punctuation">)</span> <span class="token comment">//发送二进制到服务端</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> onComplete<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，异步并行，带发送结果回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> <span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，纯异步，返回发送结果bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并包含一个回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> onComplete<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并包含一个回调，异步并行，带发送结果回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> <span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，包含一个回调，纯异步，返回发送结果bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> onComplete<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个字符串，异步并行，带发送结果回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> <span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> str<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个字符串，纯异步，返回发送结果bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个JSON数据</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> onComplete<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个JSON数据，异步并行，带发送结果回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> <span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，并发送个JSON数据，纯异步，返回发送结果bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，发送JSON数据且包含回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> onComplete<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，发送JSON数据且包含回调，异步并行，带发送结果回调</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span><span class="token keyword">bool</span><span class="token punctuation">></span></span> <span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ev<span class="token punctuation">,</span> <span class="token class-name">JSONObject</span> data<span class="token punctuation">,</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>JSONObject<span class="token punctuation">></span></span> action<span class="token punctuation">)</span> <span class="token comment">//【socket-io服务端专属】调用服务端事件，发送JSON数据且包含回调，纯异步，返回发送结果bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> Demo</h2>
<h3 id="服务端c-及snodejs的demo" tabindex="-1"><a class="header-anchor" href="#服务端c-及snodejs的demo" aria-hidden="true">#</a> 服务端C#及SNodeJS的Demo</h3>
<p><RouterLink to="/documents/0.6/sdk_down.html">下载页面</RouterLink>，进去后选择下载服务端Demo即可</p>
<h3 id="unity客户端使用demo-热更工程" tabindex="-1"><a class="header-anchor" href="#unity客户端使用demo-热更工程" aria-hidden="true">#</a> Unity客户端使用Demo（热更工程）</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JWebSocketDemo</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 接收服务器消息的方法</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>sender<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>param</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>e<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>param</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnMessageFromNormalServer</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">object</span></span> sender<span class="token punctuation">,</span> <span class="token class-name">MessageEventArgs</span> e<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"服务端发送了："</span> <span class="token operator">+</span> e<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//二进制是e.RawData</span>

        <span class="token comment">/*在这里给个具体思路
        * 例如目前封装的socket io的消息模型
        * socketio采用的是json封装，包含了event name，event type 和 event data（这个在socket io 的packer里）
        * event name 顾名思义是事件名称
        * event type 这个可以忽略，就是事件类型，普遍是message
        * event data 是数据的json格式
        * 会返回一个JSONObject，然后可以根据这个JSONObject做你的逻辑
        * 
        * 所以这里的思路是你也封装一个这样的模型，然后写个字典来存事件
        * 以socket io 为例，先解析e.Data，得到字符串：event name，JSONObject：event data
        * 然后直接在Dictionary&lt;string,Action&lt;JSONObject>>的字典里，获取event name这个值
        * 如果存在，Invoke(data)，通过数据去Invoke回调
        * 然后没然后了，别在群里问JWebSocket非socket io 服务器怎么事件派发无效了，
        * 因为你们要自己按项目定模型，自己写的，JEngine不是双端框架，不像ET那样直接限制前后端通信方式，
        * JEngine告诉你该怎么搞，工具给你写完，后面的就要靠你自己了！
        * 
        * 所以这里建议没接触过后端的，用nodeJS服务器，用里面的socketIO，当时我从没接触过后端到能撸双端游戏，这个东西功不可没
        * 
        * 如果一定要写的，可以研究下JEvent，专门搞一个类处理事件，
        * 里面的方法全写为void xxx(string event, JSONObject data)，然后类打上[Subscriber]标签
        * 然后写个JEvent来注册，在这里获取到event name 和event data 后直接JEvent.Post就能派发了，简单的很~
        */</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 这个用于连接其他web socket服务器，需要自己实现on方法，在OnMessageFromNormalServer方法内根据自己的消息模型自己实现。</span>
    <span class="token doc-comment comment">/// 这个连接普通WebSocket服务器的方法监听，建议有服务器基础，且C#有经验的人去写监听，没经验的，也可以用这个做发送，但是监听这边会很麻烦</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunNormalServerDemo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ip<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/*
         * 这个地方也有个配套demo，到时候会上传到GitHub，估计叫做JEngine.Net WebSokcet Server Demo
         */</span>

        <span class="token comment">//直接连接，使用默认配置(中间参数null)，需要配置一个接收服务器消息的方法</span>
        <span class="token class-name">JWebSocket</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JWebSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">ip</span><span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">port</span><span class="token punctuation">}</span></span><span class="token string">/demo"</span></span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> OnMessageFromNormalServer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//带配置连接，需要配置一个接收服务器消息的方法</span>
        <span class="token comment">//JSocketConfig config = JSocketConfig.Default();</span>
        <span class="token comment">//config.debug = true;</span>
        <span class="token comment">//JSocket socket = new JSocket($"ws://{ip}:{port}/demo", config, OnMessageFromNormalServer);</span>

        socket<span class="token punctuation">.</span><span class="token function">OnConnect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"服务端连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//发送hi到服务端</span>
            socket<span class="token punctuation">.</span><span class="token function">SendToServer</span><span class="token punctuation">(</span><span class="token string">"hi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//同步</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        socket<span class="token punctuation">.</span><span class="token function">OnError</span><span class="token punctuation">(</span>e <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">PrintError</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        socket<span class="token punctuation">.</span><span class="token function">OnDisconnect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"服务端连接关闭"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//此方法不阻塞</span>
        socket<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//断线重连事件</span>
        socket<span class="token punctuation">.</span><span class="token function">OnReconnect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"断开连接后重连成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//这个地方不能用SocketIO_On来监听事件，因为不同的人的消息模型不同，所以需要在OnMessageFromNormalServer内根据服务器发来的东西自己实现</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token doc-comment comment">/// 这个用于连接socket-io服务器</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunSocketIOServerDemo</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> ip<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> port<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">/* 使用前需要建立node js 服务器，并npm按照socket io，参考socketio的官网
         * 将下面的js代码丢你nodejs服务器里并node运行
         
            let server = require('socket.io');//socket

            let io = new server(8001);//创建服务器于7999端口
            console.log('服务器已开始运行');
            //开始运行服务器
            io.on('connection', async function(socket) {
                //连接信息
                console.log("有连接了,sid: "+socket.id);

                //监听事件
                socket.on('hi',function(){
                    //发送事件
                    socket.emit("hi_back");
                    console.log("已发送hi_back");
                });


                //发送事件+数据
                var player = new Object();
                player.id = 666;
                player.name = "傑";
                socket.emit("simulate_auth",player);
            });

         */</span>

        <span class="token comment">//直接连接，使用默认配置</span>
        <span class="token class-name">JWebSocket</span> socket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">JWebSocket</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"ws://</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">ip</span><span class="token punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">port</span><span class="token punctuation">}</span></span><span class="token string">/socket.io/?EIO=3&amp;transport=websocket"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//带配置连接</span>
        <span class="token comment">//JSocketConfig config = JSocketConfig.Default();</span>
        <span class="token comment">//config.debug = true;</span>
        <span class="token comment">//JSocket socket = new JSocket($"ws://{ip}:{port}/socket.io/?EIO=3&amp;transport=websocket", config);</span>

        socket<span class="token punctuation">.</span><span class="token function">OnConnect</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"服务端连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">//发送hi到服务端</span>
            socket<span class="token punctuation">.</span><span class="token function">EmitToSocketIOServer</span><span class="token punctuation">(</span><span class="token string">"hi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//同步</span>

            socket<span class="token punctuation">.</span><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token string">"hi"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">bool</span></span> result<span class="token punctuation">)</span> <span class="token operator">=></span>
             <span class="token punctuation">{</span>
                 Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"异步并行发送"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>result <span class="token punctuation">?</span> <span class="token string">"成功"</span> <span class="token punctuation">:</span> <span class="token string">"失败"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//异步并行</span>

            <span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> socket<span class="token punctuation">.</span><span class="token function">EmitToSocketIOServerAsync</span><span class="token punctuation">(</span><span class="token string">"hi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"纯异步发送"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>result <span class="token punctuation">?</span> <span class="token string">"成功"</span> <span class="token punctuation">:</span> <span class="token string">"失败"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//纯异步</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        socket<span class="token punctuation">.</span><span class="token function">OnDisconnect</span><span class="token punctuation">(</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"服务端连接关闭"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//此方法不阻塞</span>
        socket<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//断线重连事件</span>
        socket<span class="token punctuation">.</span><span class="token function">OnReconnect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"断开连接后重连成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//监听hi_back事件</span>
        socket<span class="token punctuation">.</span><span class="token function">SocketIO_On</span><span class="token punctuation">(</span><span class="token string">"hi_back"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"这里只会收到hi_back这个字符串，作为SocketIOEvent.Name，而这个事件的data为空"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">e<span class="token punctuation">.</span>name</span><span class="token punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">e<span class="token punctuation">.</span>data</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"当前在线程：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>ManagedThreadId</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//监听simulate_auth事件</span>
        socket<span class="token punctuation">.</span><span class="token function">SocketIO_On</span><span class="token punctuation">(</span><span class="token string">"simulate_auth"</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">{</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"这里SocketIOEvent.Name是simulate_auth，而这个事件的data是js服务器发来的json数据"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">e<span class="token punctuation">.</span>name</span><span class="token punctuation">}</span></span><span class="token string">: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">e<span class="token punctuation">.</span>data<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token string">"解析JSONData也很简单"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name"><span class="token keyword">var</span></span> jsonData <span class="token operator">=</span> e<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"服务端发来的数据的json的keys是：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp"><span class="token keyword">string</span><span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">","</span><span class="token punctuation">,</span> jsonData<span class="token punctuation">.</span>keys<span class="token punctuation">)</span></span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"服务端发来的数据的id是：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jsonData<span class="token punctuation">[</span><span class="token string">"id"</span><span class="token punctuation">]</span></span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"服务端发来的数据的name是：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">jsonData<span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">]</span></span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"当前在线程：</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Thread<span class="token punctuation">.</span>CurrentThread<span class="token punctuation">.</span>ManagedThreadId</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br></div></div></template>
