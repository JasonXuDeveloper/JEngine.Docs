<template><h1 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h1>
<h2 id="browser-api-access-restrictions" tabindex="-1"><a class="header-anchor" href="#browser-api-access-restrictions" aria-hidden="true">#</a> Browser API Access Restrictions</h2>
<p>Because VuePress applications are server-rendered in Node.js when generating static builds, any Vue usage must conform to the <a href="https://ssr.vuejs.org/en/universal.html" target="_blank" rel="noopener noreferrer">universal code requirements<ExternalLinkIcon/></a>. In short, make sure to only access Browser / DOM APIs in <code>beforeMount</code> or <code>mounted</code> hooks.</p>
<p>If you are using or demoing components that are not SSR friendly (for example containing custom directives), you can wrap them inside the built-in <code>&lt;ClientOnly&gt;</code> component:</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</template>
