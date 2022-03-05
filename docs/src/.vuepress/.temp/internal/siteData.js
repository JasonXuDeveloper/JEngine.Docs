export const siteData = {
  "base": "/",
  "lang": "en-US",
  "title": "JEngine",
  "description": "",
  "head": [
    [
      "meta",
      {
        "name": "theme-color",
        "content": "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-capable",
        "content": "yes"
      }
    ],
    [
      "meta",
      {
        "name": "apple-mobile-web-app-status-bar-style",
        "content": "black"
      }
    ],
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ]
  ],
  "locales": {
    "/": {
      "lang": "en-US",
      "description": "The solution that allows unity games update in runtime."
    },
    "/zh/": {
      "lang": "zh-CN",
      "description": "使Unity开发的游戏支持热更新的解决方案。"
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
