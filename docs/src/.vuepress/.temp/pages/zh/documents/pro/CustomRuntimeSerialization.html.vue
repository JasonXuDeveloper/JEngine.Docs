<template><h1 id="自定义热更类型运行时面板序列化" tabindex="-1"><a class="header-anchor" href="#自定义热更类型运行时面板序列化" aria-hidden="true">#</a> 自定义热更类型运行时面板序列化</h1>
<p>运行时，我们经常会在Inspector上操作或查看脚本的值，但当我们想要查看热更类型的这些字段的值的时候，我们就需要自己去针对每种类型都写一个序列化方法。</p>
<p>无独有偶，JEngine Pro将运行时对热更对象的序列化方法解耦并独立了出来，可以自行扩展，任何创建到GameObject上的类型（MonoBehaviour和JBehaviour，或ClassBind挂上去的纯热更类型）都可以进行序列化来显示到面板上。</p>
<h2 id="运行时面板" tabindex="-1"><a class="header-anchor" href="#运行时面板" aria-hidden="true">#</a> 运行时面板</h2>
<p>运行时面板泛指Unity运行时某gameObject的Inspector面板上的界面内容。</p>
<img src="https://z3.ax1x.com/2021/08/06/fu96R1.png" alt="WxBqVf.png" style="zoom: 67%;" />
<h2 id="编写扩展序列化方法" tabindex="-1"><a class="header-anchor" href="#编写扩展序列化方法" aria-hidden="true">#</a> 编写扩展序列化方法</h2>
<p>使用共以下几步：</p>
<ol>
<li>
<p>在主工程进入<code>Editor/SerializeILTypeInstanceMethods</code>目录</p>
</li>
<li>
<p>复制黏贴该文件夹内现成的任意一个文件，同时给复制出来的改名</p>
<ol>
<li>命名规范：SerializeXXXType.cs，XXX是你希望扩展出来的序列化的类型的名字</li>
</ol>
</li>
<li>
<p>打开复制出来的文件</p>
</li>
<li>
<p>命名空间和类名不需要改，需要改的只有标签和方法</p>
<ol>
<li><code>[SerializeTypeMethod(1)]</code>是JEngine用来识别方法的标签，标签里的数字代表该序列化方法的权重，数字越大，权重越高，权重高的方法优先进行调用（不建议定义重复的权重，后果尚未验证）</li>
<li>方法名改成文件名，SerializeXXXType</li>
<li>方法需要返回bool，当序列化成功时返回true，当序列化失败（如不是自己想要扩展的类型）的时候返回false</li>
</ol>
</li>
<li>
<p>该方法有以下参数：</p>
<ol>
<li>AnimBool fadeGroup，这个是Unity的收缩框，可以用这个创建可收缩界面</li>
<li>Type cType，这个是一个字段的真实类型（例如JsonData，UnityEngine.Object等）</li>
<li>IType type，这个是字段的热更类型（如果该字段是热更类型的话）</li>
<li>ILTypeInstance instance，拥有参数字段的实例对象</li>
<li>string name，该字段的名字</li>
<li>object val，该字段的值，可以对其覆盖来修改热更实例</li>
</ol>
</li>
<li>
<p>这里用序列化JsonData的例子来讲解</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token punctuation">[</span><span class="token function">SerializeTypeMethod</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
public <span class="token keyword">static</span> bool <span class="token function">SerializeJsonDataType</span><span class="token punctuation">(</span>AnimBool fadeGroup<span class="token punctuation">,</span> Type cType<span class="token punctuation">,</span> IType type<span class="token punctuation">,</span> ILTypeInstance instance<span class="token punctuation">,</span> string name<span class="token punctuation">,</span> object val<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>cType <span class="token operator">==</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span>JsonData<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">//可以折叠显示Json数据</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>val <span class="token operator">!=</span> null<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      fadeGroup<span class="token punctuation">.</span>target <span class="token operator">=</span> EditorGUILayout<span class="token punctuation">.</span><span class="token function">Foldout</span><span class="token punctuation">(</span>fadeGroup<span class="token punctuation">.</span>target<span class="token punctuation">,</span> name<span class="token punctuation">,</span> true<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>EditorGUILayout<span class="token punctuation">.</span><span class="token function">BeginFadeGroup</span><span class="token punctuation">(</span>fadeGroup<span class="token punctuation">.</span>faded<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        val <span class="token operator">=</span> EditorGUILayout<span class="token punctuation">.</span><span class="token function">TextArea</span><span class="token punctuation">(</span>
          <span class="token punctuation">(</span><span class="token punctuation">(</span>JsonData<span class="token punctuation">)</span> val<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      EditorGUILayout<span class="token punctuation">.</span><span class="token function">EndFadeGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      EditorGUILayout<span class="token punctuation">.</span><span class="token function">Space</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span>
    <span class="token punctuation">{</span>
      EditorGUILayout<span class="token punctuation">.</span><span class="token function">LabelField</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> <span class="token string">"暂无值的JsonData"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> true<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> false<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div></li>
<li>
<p>这里序列化JsonData的权重是4，也就是说这个方法会在倒数第四次尝试序列化的时候被调用（就是说如果有个权重为5的方法成功序列化了该字段，那么就不会继续尝试序列化，意味着这个权重为4的方法不会被执行到）</p>
</li>
<li>
<p>方法内部做了个if判断，如果是JsonData再继续尝试，否则返回false，代表不是想要处理的类型，让框架底层继续尝试调用下一个序列化方法</p>
</li>
<li>
<p>然后类似第五步提到的方法获取了字段的真实值</p>
</li>
<li>
<p>做了个空判断，如果是空就显示Label，反之创建一个可折叠区域，内部创建TextArea，并保存到实例</p>
</li>
<li>
<p>最后返回true，代表告诉框架底层这个字段序列化了，不需要往后尝试了</p>
</li>
</ol>
<h2 id="忠告" tabindex="-1"><a class="header-anchor" href="#忠告" aria-hidden="true">#</a> 忠告</h2>
<ul>
<li>要是不会Unity序列化，不会EditorGUILayout的就别接触这个功能了，扩展写起来需要Unity编辑器编写经验。</li>
<li>建议对ILRuntime有一定了解，知道如何获取真实类型，如何对一些类型进行特定处理</li>
</ul>
</template>
