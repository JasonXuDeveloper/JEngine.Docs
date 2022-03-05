export const themeData = {
  "repo": "https://github.com/JasonXuDeveloper/JEngine",
  "docsRepo": "https://github.com/JasonXuDeveloper/JEngine.Docs",
  "docsDir": "docs",
  "docsBranch": "main",
  "editLinks": true,
  "logo": "/logo.png",
  "sidebar": "auto",
  "locales": {
    "/": {
      "selectText": "Languages",
      "label": "English",
      "ariaLabel": "Languages",
      "editLinkText": "Edit this page on GitHub",
      "serviceWorker": {
        "updatePopup": {
          "message": "New content is available.",
          "buttonText": "Refresh"
        }
      },
      "displayAllHeaders": true,
      "search": true,
      "searchMaxSuggestions": 10,
      "lastUpdated": "Last Updated",
      "contributors": true,
      "contributorsText": "Document Contributors",
      "navbar": [
        {
          "text": "主页",
          "link": "/zh/"
        },
        {
          "text": "使用文档",
          "link": "/documents/"
        },
        {
          "text": "交流",
          "children": [
            {
              "text": "JEngine官方QQ群",
              "children": [
                {
                  "text": "921271552",
                  "link": "https://jq.qq.com/?_wv=1027&k=cF4hODjW"
                }
              ]
            }
          ]
        },
        {
          "text": "下载",
          "children": [
            {
              "text": "国内用户",
              "children": [
                {
                  "text": "腾讯云",
                  "link": "https://download.snapgenshin.com/latest/Publish.zip"
                }
              ]
            },
            {
              "text": "海外用户",
              "children": [
                {
                  "text": "Github",
                  "link": "https://github.com/DGP-Studio/Snap.Genshin/releases/latest/download/Publish.zip"
                }
              ]
            }
          ]
        }
      ],
      "selectLanguageName": "English"
    },
    "/zh/": {
      "selectText": "选择语言",
      "label": "简体中文",
      "editLinkText": "在 GitHub 上编辑此页",
      "serviceWorker": {
        "updatePopup": {
          "message": "发现新内容可用.",
          "buttonText": "刷新"
        }
      },
      "displayAllHeaders": true,
      "search": true,
      "searchMaxSuggestions": 10,
      "lastUpdated": "上次更新时间",
      "contributors": true,
      "contributorsText": "文档贡献者",
      "tip": "提示",
      "warning": "警告",
      "danger": "危险",
      "notFound": [
        "找不到该页面"
      ],
      "backToHome": "返回首页",
      "navbar": [
        {
          "text": "主页",
          "link": "/zh/"
        },
        {
          "text": "使用文档",
          "link": "/documents/"
        },
        {
          "text": "交流",
          "children": [
            {
              "text": "JEngine官方QQ群",
              "children": [
                {
                  "text": "921271552",
                  "link": "https://jq.qq.com/?_wv=1027&k=cF4hODjW"
                }
              ]
            }
          ]
        },
        {
          "text": "下载",
          "children": [
            {
              "text": "国内用户",
              "children": [
                {
                  "text": "腾讯云",
                  "link": "https://download.snapgenshin.com/latest/Publish.zip"
                }
              ]
            },
            {
              "text": "海外用户",
              "children": [
                {
                  "text": "Github",
                  "link": "https://github.com/DGP-Studio/Snap.Genshin/releases/latest/download/Publish.zip"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "navbar": [],
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
