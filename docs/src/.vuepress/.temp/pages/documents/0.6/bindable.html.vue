<template><h1 id="可绑定数据" tabindex="-1"><a class="header-anchor" href="#可绑定数据" aria-hidden="true">#</a> 可绑定数据</h1>
<p>该类型可以将数值与事件绑定，当数值出现变化，会调用绑定的事件，JUI需要这个实现数据绑定</p>
<h2 id="创建可绑定数据" tabindex="-1"><a class="header-anchor" href="#创建可绑定数据" aria-hidden="true">#</a> 创建可绑定数据</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyData</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> a<span class="token punctuation">;</span><span class="token comment">//Normal data</span>
  <span class="token keyword">public</span> <span class="token class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">int</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//Bindable data</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="获得bindableproperty的值-如何改变" tabindex="-1"><a class="header-anchor" href="#获得bindableproperty的值-如何改变" aria-hidden="true">#</a> 获得BindableProperty的值，如何改变</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">MyMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token comment">//To get a BindableProperty's value:</span>
  <span class="token class-name"><span class="token keyword">int</span></span> newB <span class="token operator">=</span> b<span class="token punctuation">;</span><span class="token comment">//Automatically convert from BindableProperty</span>
  
  <span class="token comment">//To change a BindableProperty's value:</span>
  b<span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//Use fieldName.Value to change a value</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="推荐写法-可以最简化json和protobuf序列化的长度" tabindex="-1"><a class="header-anchor" href="#推荐写法-可以最简化json和protobuf序列化的长度" aria-hidden="true">#</a> 推荐写法，可以最简化JSON和Protobuf序列化的长度</h2>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code> <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">System<span class="token punctuation">.</span>Serializable</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoContract</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
 <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DataClass</span>
 <span class="token punctuation">{</span>
     <span class="token comment">/*
      * Fields to serialize in Protobuf
      */</span>
     <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
     <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">string</span></span> name <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
     <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">private</span> <span class="token class-name"><span class="token keyword">long</span></span> money <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
     <span class="token punctuation">[</span><span class="token keyword">global</span><span class="token punctuation">::</span>ProtoBuf<span class="token punctuation">.</span><span class="token function">ProtoMember</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">bool</span></span> gm <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

     <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">></span></span></span>
     <span class="token doc-comment comment">/// Property which holds the real value and will be serialized in JSON</span>
     <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">></span></span></span>
     <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">long</span></span> Money
     <span class="token punctuation">{</span>
         <span class="token keyword">get</span>
         <span class="token punctuation">{</span>
             <span class="token keyword">return</span> money<span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">set</span>
         <span class="token punctuation">{</span>
             money <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
             <span class="token keyword">if</span> <span class="token punctuation">(</span>BindableMoney <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
             <span class="token punctuation">{</span>
                 BindableMoney<span class="token punctuation">.</span>Value <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
             <span class="token keyword">else</span>
             <span class="token punctuation">{</span>
                 BindableMoney <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token keyword">value</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>

     <span class="token comment">/*
     * Fields to bind but won't be serialized
     */</span>
     <span class="token keyword">internal</span> <span class="token class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">></span></span> BindableMoney<span class="token punctuation">;</span>


     <span class="token comment">//将可序列化的值变可绑定的值</span>
     <span class="token keyword">public</span> <span class="token function">DataClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
     <span class="token punctuation">{</span>
         id <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
         money <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
         BindableMoney <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">BindableProperty<span class="token punctuation">&lt;</span><span class="token keyword">long</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>money<span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div></template>
