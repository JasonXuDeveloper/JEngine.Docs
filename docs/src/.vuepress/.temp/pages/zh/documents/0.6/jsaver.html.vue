<template><h1 id="jsaver" tabindex="-1"><a class="header-anchor" href="#jsaver" aria-hidden="true">#</a> JSaver</h1>
<p>JEngine现已支持JSaver，是数据持久化的工具</p>
<blockquote>
<p>JSaver能干什么？</p>
<ul>
<li>将数据转字符串/JSON字符串</li>
<li>AES加密</li>
<li>存储本地</li>
<li>从本地加载（支持泛型）</li>
<li>获取本地是否有Key</li>
<li>删除本地Key</li>
</ul>
</blockquote>
<h2 id="apis" tabindex="-1"><a class="header-anchor" href="#apis" aria-hidden="true">#</a> APIs</h2>
<ul>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token generic-method"><span class="token function">SaveAsString</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name">T</span> val<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token generic-method"><span class="token function">SaveAsJSON</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name">T</span> val<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> <span class="token generic-method"><span class="token function">SaveAsProtobufBytes</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name">T</span> val<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">string</span></span> <span class="token function">GetString</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">GetInt</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">short</span></span> <span class="token function">GetShort</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">long</span></span> <span class="token function">GetLong</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">decimal</span></span> <span class="token function">GetDecimal</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">double</span></span> <span class="token function">GetDouble</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">float</span></span> <span class="token function">GetFloat</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">GetBool</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">GetObject</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">GetObjectFromJSON</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">T</span> <span class="token generic-method"><span class="token function">GetObjectFromProtobuf</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">HasData</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">DeleteData</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> dataName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">DeleteAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">JEngine<span class="token punctuation">.</span>Core</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>保存字符串，配置加密密码和数据名称</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Set a data to local storage</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>可获取返回的加密值</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//set and get the encrypted data string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取数据:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p><strong>恭喜！成功使用！</strong></p>
</li>
</ol>
<h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2>
<h3 id="demo示例-包含90-的api使用" tabindex="-1"><a class="header-anchor" href="#demo示例-包含90-的api使用" aria-hidden="true">#</a> Demo示例（包含90%的API使用）：</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataClass</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> name<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">long</span></span> money<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">long</span></span> diamond<span class="token punctuation">;</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">bool</span></span> gm<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Program</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">RunGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   <span class="token comment">/*
   * ====================================
   *           JSaver EXAMPLE
   * ====================================
   */</span>
    JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Set a data to local storage</span>
    <span class="token class-name"><span class="token keyword">var</span></span> encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//set and get the encrypted data string</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[JSaver] Str Encrypted result: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">encryptStr</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[JSaver] Str Decrypted result: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">decryptStr</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//save custom class</span>
    <span class="token class-name">DataClass</span> data <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DataClass</span>
    <span class="token punctuation">{</span>
      id <span class="token operator">=</span> <span class="token number">666</span><span class="token punctuation">,</span>
      name <span class="token operator">=</span> <span class="token string">"JEngine牛逼"</span><span class="token punctuation">,</span>
      money <span class="token operator">=</span> <span class="token number">999999</span><span class="token punctuation">,</span>
      diamond <span class="token operator">=</span> <span class="token number">999999</span><span class="token punctuation">,</span>
      gm <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsJSON</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[JSaver] Custom Class Encrypted result: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">encryptStr</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Can convert to string</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"[JSaver] Str Decrypted result: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">decryptStr</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">DataClass</span> newData <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetObject</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>DataClass<span class="token punctuation">></span></span></span><span class="token punctuation">(</span><span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Can covert to class</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><blockquote>
<p>下一篇，<a href="localization">多语言本地化Localization教程</a></p>
</blockquote>
</template>
