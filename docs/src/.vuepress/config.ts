const {
  description
} = require('../../package')
import { defineUserConfig } from 'vuepress'
const { docsearchPlugin } = require('@vuepress/plugin-docsearch')
const { backToTopPlugin } = require('@vuepress/plugin-back-to-top')
const { mediumZoomPlugin } = require('@vuepress/plugin-medium-zoom')
const { defaultTheme } = require('@vuepress/theme-default')

var bar = {
  '/documents/': [{
      text: "Documentations",
      collapsible: false,
      children: [
          '/documents/',
      ]
  }],
  '/zh/documents/': [{
      text: "框架文档",
      collapsible: false,
      children: [
          '/zh/documents/',
      ]
  }],
  '/documents/0.7/': [{
      text: '开始使用',
      collapsible: false,
      children: [
          '/documents/0.7/',
      ]
  }, ],
  '/zh/documents/0.7/': [{
    text: 'v0.7.x文档',
    collapsible: false,
    children: [
        '/zh/documents/0.7/',
        {
            text: '入门教程',
            collapsible: false,
            children: [
                '/zh/documents/0.7/startup',
                '/zh/documents/0.7/Update',
                '/zh/documents/0.7/BuildAB',
                '/zh/documents/0.7/Updater',
                '/zh/documents/0.7/InitJEngine',
                '/zh/documents/0.7/Principle',
                '/zh/documents/0.7/FAQ',
                '/zh/documents/0.7/limits',
                {
                    text: 'ILRuntime文档',
                    link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                },
            ]
        },
        {
            text: '框架核心',
            collapsible: false,
            children: [
                '/zh/documents/0.7/AssetMgr',
                '/zh/documents/0.7/ClassBind',
                '/zh/documents/0.7/Extension',
                '/zh/documents/0.7/CryptoStruct',
                '/zh/documents/0.7/JAction',
                '/zh/documents/0.7/JBehaviour',
                '/zh/documents/0.7/JSaver',
                '/zh/documents/0.7/Singleton',
                '/zh/documents/0.7/JEvent',
                '/zh/documents/0.7/Bindable',
                '/zh/documents/0.7/JPrefab',
                '/zh/documents/0.7/JValidation',
                '/zh/documents/0.7/StringifyHelper',
                '/zh/documents/0.7/JGameObjectPool',
                '/zh/documents/0.7/Localization',
                '/zh/documents/0.7/JWebSocket',
            ]
        },
        {
            text: '编辑器工具',
            collapsible: false,
            children: [
                '/zh/documents/0.7/JEnginePanel',
                '/zh/documents/0.7/ILRuntimeTools',
                '/zh/documents/0.7/ProtoTools',
            ]
        },
        {
            text: 'UI功能',
            collapsible: false,
            children: [
                '/zh/documents/0.7/Jui',
                {
                    text: 'MetaJUI',
                    link: 'https://github.com/Meta404Dev/MetaJUI'
                },
            ]
        },
        {
            text: '额外插件',
            collapsible: false,
            children: [{
                text: 'Unity GUI Redis',
                link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis'
            }, ]
        }
    ]
}, ],
  '/documents/0.8/': [{
      text: '开始使用',
      collapsible: false,
      children: [
          '/documents/0.8/',
      ]
  }, ],
  '/zh/documents/0.8/': [{
    text: 'v0.8.x文档',
    collapsible: false,
    children: [
        '/zh/documents/0.8/',
        {
            text: '入门教程',
            collapsible: false,
            children: [
                '/zh/documents/0.8/startup',
                '/zh/documents/0.8/ab',
                '/zh/documents/0.8/deploy',
                '/zh/documents/0.8/updater',
                '/zh/documents/0.8/FAQ',
                {
                    text: 'YooAsset文档',
                    link: 'https://www.yooasset.com/'
                },
                {
                    text: 'ILRuntime文档',
                    link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                },
            ]
        },
        {
            text: '升级指南',
            collapsible: false,
            children: [
                '/zh/documents/0.8/migrate',
            ]
        },
        {
            text: '核心功能',
            collapsible: false,
            children: [
                '/zh/documents/0.8/assetmgr',
                '/zh/documents/0.8/coroutinemgr',
                '/zh/documents/0.8/cryptomgr',
                '/zh/documents/0.8/lifecyclemgr',
            ]
        },
    ]
}, ],
  '/zh/pro/': [{
      text: 'JEngine Pro',
      collapsible: false,
      children: [
          '/zh/pro/',
          '/zh/pro/price',
          '/zh/pro/purchase',
          '/zh/documents/pro/',
      ]
  }, ],
  '/zh/documents/pro/': [{
    text: 'Pro最新版文档',
    collapsible: false,
    children: [
      '/zh/documents/pro/',
      {
        text: '快速上手',
        collapsible: false,
        children: [
            '/zh/documents/pro/StartUp',
        ]
      },
      {
        text: '功能列表',
        collapsible: false,
        children: [
            '/zh/documents/pro/HotReload',
            '/zh/documents/pro/ClassBind',
            '/zh/documents/pro/HotButton',
            '/zh/documents/pro/HotSlider',
            '/zh/documents/pro/HotInputField',
            '/zh/documents/pro/HotDropdown',
            '/zh/documents/pro/HotToggle',
            '/zh/documents/pro/HotEventTrigger',
            '/zh/documents/pro/JActionMonitorEditor',
            '/zh/documents/pro/ILRuntimeAdapterEditor',
            '/zh/documents/pro/ClassBindDependentEditor',
            '/zh/documents/pro/CustomRuntimeSerialization',
        ]
      }
    ]
}, ],
  '/documents/0.6/': [{
      text: 'v0.6.x Documentation',
      collapsible: false,
      children: [
          '/documents/0.6/',
          {
              text: 'Get Started',
              collapsible: false,
              children: [
                  '/documents/0.6/startup',
                  '/documents/0.6/structure',
                  '/documents/0.6/hotupdate',
                  '/documents/0.6/classbind',
                  '/documents/0.6/guide',
                  '/documents/0.6/limits',
                  {
                      text: 'ILRuntime Document',
                      link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                  },
              ]
          },
          {
              text: 'Core Features',
              collapsible: false,
              children: [
                  '/documents/0.6/jbehaviour',
                  '/documents/0.6/jresource',
                  '/documents/0.6/jaction',
                  '/documents/0.6/jsaver',
                  '/documents/0.6/jevent',
                  '/documents/0.6/localization',
                  '/documents/0.6/crypto-struct',
                  '/documents/0.6/gameobject-pool',
                  '/documents/0.6/ilruntime-tools',
                  '/documents/0.6/proto-tools',
                  '/documents/0.6/jengine-panel',
              ]
          },
          {
              text: 'UI Components',
              collapsible: false,
              children: [
                  '/documents/0.6/jui',
                  '/documents/0.6/bindable',
              ]
          },
          {
              text: 'Additional Libraries',
              collapsible: false,
              children: [{
                  text: 'Unity GUI Redis',
                  link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis'
              }, ]
          }
      ]
  }, ],
  '/zh/documents/0.6/': [{
      text: 'v0.6.x文档',
      collapsible: false,
      children: [
          '/zh/documents/0.6/',
          {
              text: '入门教程',
              collapsible: false,
              children: [
                  '/zh/documents/0.6/startup',
                  '/zh/documents/0.6/structure',
                  '/zh/documents/0.6/hotupdate',
                  '/zh/documents/0.6/classbind',
                  '/zh/documents/0.6/guide',
                  '/zh/documents/0.6/limits',
                  {
                      text: 'ILRuntime文档',
                      link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                  },
              ]
          },
          {
              text: '框架核心',
              collapsible: false,
              children: [
                  '/zh/documents/0.6/jbehaviour',
                  '/zh/documents/0.6/jresource',
                  '/zh/documents/0.6/jaction',
                  '/zh/documents/0.6/jsaver',
                  '/zh/documents/0.6/jevent',
                  '/zh/documents/0.6/localization',
                  '/zh/documents/0.6/crypto-struct',
                  '/documents/0.6/gameobject-pool',
                  '/zh/documents/0.6/ilruntime-tools',
                  '/zh/documents/0.6/proto-tools',
                  '/zh/documents/0.6/jengine-panel',
              ]
          },
          {
              text: 'UI框架',
              collapsible: false,
              children: [
                  '/zh/documents/0.6/jui',
                  '/zh/documents/0.6/bindable',
              ]
          },
          {
              text: '额外插件',
              collapsible: false,
              children: [{
                  text: 'Unity GUI Redis',
                  link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis'
              }, ]
          }
      ]
  }, ],
  '/documents/0.5/': [{
      text: 'v0.5.x Documentation',
      collapsible: false,
      children: [
          '/documents/0.5/',
          {
              text: 'Get Started',
              collapsible: false,
              children: [
                  '/documents/0.5/startup',
                  '/documents/0.5/structure',
                  '/documents/0.5/hotupdate',
                  '/documents/0.5/classbind',
                  '/documents/0.5/guide',
                  '/documents/0.5/limits',
                  {
                      text: 'ILRuntime Document',
                      link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                  },
              ]
          },
          {
              text: 'Core Features',
              collapsible: false,
              children: [
                  '/documents/0.5/jbehaviour',
                  '/documents/0.5/jresource',
                  '/documents/0.5/jaction',
                  '/documents/0.5/jsaver',
                  '/documents/0.5/localization',
                  '/documents/0.5/crypto-struct',
                  '/documents/0.5/gameobject-pool',
                  '/documents/0.5/ilruntime-tools',
                  '/documents/0.5/proto-tools',
              ]
          },
          {
              text: 'UI Components',
              collapsible: false,
              children: [
                  '/documents/0.5/jui',
                  '/documents/0.5/bindable',
              ]
          },
          {
              text: 'Additional Libraries',
              collapsible: false,
              children: [{
                  text: 'Unity GUI Redis',
                  link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis'
              }, ]
          }
      ]
  }, ],
  '/zh/documents/0.5/': [{
      text: 'v0.5.x文档',
      collapsible: false,
      children: [
          '/zh/documents/0.5/',
          {
              text: '入门教程',
              collapsible: false,
              children: [
                  '/zh/documents/0.5/startup',
                  '/zh/documents/0.5/structure',
                  '/zh/documents/0.5/hotupdate',
                  '/zh/documents/0.5/classbind',
                  '/zh/documents/0.5/guide',
                  '/zh/documents/0.5/limits',
                  {
                      text: 'ILRuntime文档',
                      link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html'
                  },
              ]
          },
          {
              text: '框架核心',
              collapsible: false,
              children: [
                  '/documents/0.5/jbehaviour',
                  '/documents/0.5/jresource',
                  '/documents/0.5/jaction',
                  '/documents/0.5/jsaver',
                  '/documents/0.5/localization',
                  '/documents/0.5/crypto-struct',
                  '/documents/0.5/gameobject-pool',
                  '/documents/0.5/ilruntime-tools',
                  '/documents/0.5/proto-tools',
              ]
          },
          {
              text: 'UI框架',
              collapsible: false,
              children: [
                  '/zh/documents/0.5/jui',
                  '/zh/documents/0.5/bindable',
              ]
          },
          {
              text: '额外插件',
              collapsible: false,
              children: [{
                  text: 'Unity GUI Redis',
                  link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis'
              }, ]
          }
      ]
  }, ],
};

export default defineUserConfig  ({
  head: [
      ['link', {
          rel: 'manifest',
          href: '/manifest.webmanifest'
      }],
      ['meta', {
          name: 'theme-color',
          content: '#3eaf7c'
      }],
      ['meta', {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
      }],
      ['meta', {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black'
      }]
  ],

  title: 'JEngine',
  locales: {
      // 键名是该语言所属的子路径
      // 作为特例，默认语言可以使用 '/' 作为其路径。
      '/': {
          lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
          description: 'The solution that allows unity games update in runtime.'
      },
      '/zh/': {
          lang: 'zh-CN',
          description: '使Unity开发的游戏支持热更新的解决方案。'
      }
  },

theme: defaultTheme({
      repo: 'https://github.com/JasonXuDeveloper/JEngine',
      // 假如你的文档仓库和项目本身不在一个仓库：
      docsRepo: 'https://github.com/JasonXuDeveloper/JEngine.Docs',
      // 假如文档不是放在仓库的根目录下：
      docsDir: 'docs/src',
      // 假如文档放在一个特定的分支下：
      docsBranch: 'main',
      // 默认是 false, 设置为 true 来启用
      editLinks: true,
      logo: '/logo.png',
      locales: {
          '/': {
              selectLanguageText: '切换语言',
              selectLanguageName: 'English',
              ariaLabel: 'Languages',
              editLinkText: 'Edit this page on GitHub',
              serviceWorker: {
                  updatePopup: {
                      message: "New content is available.",
                      buttonText: "Refresh"
                  }
              },
              displayAllHeaders: true,
              search: true,
              searchMaxSuggestions: 10,
              lastUpdated: true,
              lastUpdatedText: 'Last Updated',
              contributors: true,
              contributorsText: 'Document Contributors',
              sidebar: bar,
              navbar: [{
                      text: 'Home',
                      link: '/'
                  },
                  {
                      text: "Documentations",
                      link: '/documents/',
                      children: [
                          {
                              text: 'Docs',
                              link: '/documents/'
                          },
                          {
                              text: '0.8.x',
                              link: '/documents/0.8/'
                          },
                          {
                              text: '0.7.x',
                              link: '/documents/0.7/'
                          },
                          {
                              text: '0.6.x',
                              link: '/documents/0.6/'
                          },
                          {
                              text: '0.5.x',
                              link: '/documents/0.5/'
                          }
                      ]
                  },
              ],

          },
          '/zh/': {
              // 多语言下拉菜单的标题
              selectLanguageText: 'Languages',
              // 该语言在下拉菜单中的标签
              selectLanguageName: '简体中文',
              // 编辑链接文字
              editLinkText: '在 GitHub 上编辑此页',
              // Service Worker 的配置
              serviceWorker: {
                  updatePopup: {
                      message: "发现新内容可用.",
                      buttonText: "刷新"
                  }
              },
              displayAllHeaders: true,
              search: true,
              searchMaxSuggestions: 10,
              lastUpdated: true,
              lastUpdatedText: '上次更新时间',
              contributors: true,
              contributorsText: '文档贡献者',
              tip: '提示',
              warning: '警告',
              danger: '危险',
              notFound: ["找不到该页面"],
              backToHome: '返回首页',
              sidebar: bar,
              navbar: [{
                      text: '主页',
                      link: '/zh/'
                  },
                  {
                      text: "文档",
                      link: '/zh/documents/',
                      children: [
                          {
                              text: 'Docs',
                              link: '/zh/documents/'
                          },
                          {
                              text: '0.8.x',
                              link: '/zh/documents/0.8/'
                          },
                          {
                              text: '0.7.x',
                              link: '/zh/documents/0.7/'
                          },
                          {
                              text: '0.6.x',
                              link: '/zh/documents/0.6/'
                          },
                          {
                              text: '0.5.x',
                              link: '/zh/documents/0.5/'
                          },
                          {
                              text: 'Pro',
                              link: '/zh/documents/pro/'
                          }
                      ]
                  },
                  {
                      text: '交流',
                      children: [{
                          text: 'JEngine官方QQ群',
                          children: [{
                              text: '921271552',
                              link: 'https://jq.qq.com/?_wv=1027&k=cF4hODjW'
                          }]
                      }]
                  },
                  {
                      text: '订阅版',
                      children: [{
                              text: 'Pro',
                              link: '/zh/pro/'
                          },
                          {
                              text: '定价',
                              link: '/zh/pro/price'
                          },
                          {
                              text: '购买',
                              link: '/zh/pro/purchase'
                          },
                      ]
                  },
              ],
          }
      }
  }),

  plugins: [
      backToTopPlugin(),
      mediumZoomPlugin({
          // options
        }),
      docsearchPlugin(
        {
            appId: 'JBM26KEULR',
            apiKey: '50021a9511cb4aaf30ecbbb54de14f26',
            indexName: 'xgamedev',
            locales: {
                '/': {
                placeholder: 'Search Documentation',
                translations: {
                    button: {
                    buttonText: 'Search Documentation',
                    },
                },
                },
                '/zh/': {
                placeholder: '搜索文档',
                translations: {
                    button: {
                    buttonText: '搜索文档',
                    },
                },
                },
            },
        }),
    ],

})
