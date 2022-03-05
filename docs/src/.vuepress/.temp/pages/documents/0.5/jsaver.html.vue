<template><p>{% import &quot;views/_data.njk&quot; as data %}</p>
<h1 id="jsaver-v0-5" tabindex="-1"><a class="header-anchor" href="#jsaver-v0-5" aria-hidden="true">#</a> JSaver（v0.5）</h1>
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
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>string SaveAsString<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> T val<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>string SaveAsJSON<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> T val<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>byte<span class="token punctuation">[</span><span class="token punctuation">]</span> SaveAsProtobufBytes<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> T val<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>string <span class="token function">GetString</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">GetInt</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">short</span> <span class="token function">GetShort</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">long</span> <span class="token function">GetLong</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>decimal <span class="token function">GetDecimal</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">double</span> <span class="token function">GetDouble</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">float</span> <span class="token function">GetFloat</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>bool <span class="token function">GetBool</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>T GetObject<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>T GetObjectFromJSON<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>T GetObjectFromProtobuf<span class="token operator">&lt;</span>T<span class="token operator">></span><span class="token punctuation">(</span>string dataName<span class="token punctuation">,</span> string encryptKey<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>bool <span class="token function">HasData</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">DeleteData</span><span class="token punctuation">(</span>string dataName<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">DeleteAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<ol>
<li>
<p>在您的热更工程里，引入以下命名空间</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>using JEngine<span class="token punctuation">.</span>Core<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>保存字符串，配置加密密码和数据名称</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Set a data to local storage</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>可获取返回的加密值</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>var encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//set and get the encrypted data string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>获取数据:</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>var decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p><strong>恭喜！成功使用！</strong></p>
</li>
</ol>
<h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2>
<h3 id="demo示例-包含90-的api使用" tabindex="-1"><a class="header-anchor" href="#demo示例-包含90-的api使用" aria-hidden="true">#</a> Demo示例（包含90%的API使用）：</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>public class DataClass
<span class="token punctuation">{</span>
  public <span class="token keyword">int</span> id<span class="token punctuation">;</span>
  public string name<span class="token punctuation">;</span>
  public <span class="token keyword">long</span> money<span class="token punctuation">;</span>
  public <span class="token keyword">long</span> diamond<span class="token punctuation">;</span>
  public bool gm<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
public <span class="token keyword">static</span> class Program
<span class="token punctuation">{</span>
  public <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">RunGame</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
   <span class="token comment">/*
   * ====================================
   *           JSaver EXAMPLE
   * ====================================
   */</span>
    JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Set a data to local storage</span>
    var encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsString</span><span class="token punctuation">(</span><span class="token string">"data to save"</span><span class="token punctuation">,</span> <span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//set and get the encrypted data string</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>$<span class="token string">"[JSaver] Str Encrypted result: {encryptStr}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    var decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"dataName"</span><span class="token punctuation">,</span> <span class="token string">"1234567890987654"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>$<span class="token string">"[JSaver] Str Decrypted result: {decryptStr}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//save custom class</span>
    DataClass data <span class="token operator">=</span> new DataClass
    <span class="token punctuation">{</span>
      id <span class="token operator">=</span> <span class="token number">666</span><span class="token punctuation">,</span>
      name <span class="token operator">=</span> <span class="token string">"JEngine牛逼"</span><span class="token punctuation">,</span>
      money <span class="token operator">=</span> <span class="token number">999999</span><span class="token punctuation">,</span>
      diamond <span class="token operator">=</span> <span class="token number">999999</span><span class="token punctuation">,</span>
      gm <span class="token operator">=</span> true
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    encryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">SaveAsJSON</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>$<span class="token string">"[JSaver] Custom Class Encrypted result: {encryptStr}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    decryptStr <span class="token operator">=</span> JSaver<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span><span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Can convert to string</span>
    Log<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>$<span class="token string">"[JSaver] Str Decrypted result: {decryptStr}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    DataClass newData <span class="token operator">=</span> JSaver<span class="token punctuation">.</span>GetObject<span class="token operator">&lt;</span>DataClass<span class="token operator">></span><span class="token punctuation">(</span><span class="token string">"playerData"</span><span class="token punctuation">,</span> <span class="token string">"password_is_this"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Can covert to class</span>

  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><blockquote>
<p>下一篇，<RouterLink to="/documents/0.5/localization.html">多语言本地化Localization教程</RouterLink></p>
</blockquote>
</template>
