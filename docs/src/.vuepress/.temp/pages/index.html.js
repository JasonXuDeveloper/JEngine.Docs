export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": 12345,
  "lang": "en-US",
  "frontmatter": {
    "title": 12345,
    "home": true,
    "lang": "en-US",
    "heroImage": "https://s4.ax1x.com/2022/01/16/7tP1V1.png",
    "heroText": "JEngine",
    "tagline": "The solution that allows unity games update in runtime.",
    "actionText": "Get Started →",
    "actionLink": "/guide/",
    "features": [
      {
        "title": "简洁至上",
        "details": "以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。"
      },
      {
        "title": "Vue驱动",
        "details": "享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。"
      },
      {
        "title": "高性能",
        "details": "VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。"
      }
    ],
    "footer": "MIT Licensed | Copyright © 2020-present JasonXuDeveloper"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "updatedTime": 1646436802000,
    "contributors": [
      {
        "name": "root",
        "email": "root@vps-023bdc5d.vps.ovh.ca",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
