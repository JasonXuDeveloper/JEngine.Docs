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
      text: "框架文档",
      collapsible: false,
      children: [
          '/documents/',
      ]
  }],
  '/documents/0.7/': [{
    text: 'v0.7.x文档',
    collapsible: false,
    children: [
        '/documents/0.7/',
        {
            text: '入门教程',
            collapsible: false,
            children: [
                '/documents/0.7/startup',
                '/documents/0.7/Update',
                '/documents/0.7/BuildAB',
                '/documents/0.7/Updater',
                '/documents/0.7/InitJEngine',
                '/documents/0.7/Principle',
                '/documents/0.7/FAQ',
                '/documents/0.7/limits',
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
                '/documents/0.7/AssetMgr',
                '/documents/0.7/ClassBind',
                '/documents/0.7/Extension',
                '/documents/0.7/CryptoStruct',
                '/documents/0.7/JAction',
                '/documents/0.7/JBehaviour',
                '/documents/0.7/JSaver',
                '/documents/0.7/Singleton',
                '/documents/0.7/JEvent',
                '/documents/0.7/Bindable',
                '/documents/0.7/JPrefab',
                '/documents/0.7/JValidation',
                '/documents/0.7/StringifyHelper',
                '/documents/0.7/JGameObjectPool',
                '/documents/0.7/Localization',
                '/documents/0.7/JWebSocket',
            ]
        },
        {
            text: '编辑器工具',
            collapsible: false,
            children: [
                '/documents/0.7/JEnginePanel',
                '/documents/0.7/ILRuntimeTools',
                '/documents/0.7/ProtoTools',
            ]
        },
        {
            text: 'UI功能',
            collapsible: false,
            children: [
                '/documents/0.7/Jui',
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
    text: 'v0.8.x文档',
    collapsible: false,
    children: [
        '/documents/0.8/',
        {
            text: '入门教程',
            collapsible: false,
            children: [
                '/documents/0.8/startup',
                '/documents/0.8/ab',
                '/documents/0.8/deploy',
                '/documents/0.8/updater',
                '/documents/0.8/FAQ',
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
                '/documents/0.8/migrate',
            ]
        },
        {
            text: '核心功能',
            collapsible: false,
            children: [
                '/documents/0.8/assetmgr',
                '/documents/0.8/coroutinemgr',
                '/documents/0.8/cryptomgr',
                '/documents/0.8/lifecyclemgr',
            ]
        },
    ]
}, ],
  '/pro/': [{
      text: 'JEngine Pro',
      collapsible: false,
      children: [
          '/pro/',
          '/pro/price',
          '/pro/purchase',
          '/documents/pro/',
      ]
  }, ],
  '/documents/pro/': [{
    text: 'Pro最新版文档',
    collapsible: false,
    children: [
      '/documents/pro/',
      {
        text: '快速上手',
        collapsible: false,
        children: [
            '/documents/pro/StartUp',
        ]
      },
      {
        text: '功能列表',
        collapsible: false,
        children: [
            '/documents/pro/HotReload',
            '/documents/pro/ClassBind',
            '/documents/pro/HotButton',
            '/documents/pro/HotSlider',
            '/documents/pro/HotInputField',
            '/documents/pro/HotDropdown',
            '/documents/pro/HotToggle',
            '/documents/pro/HotEventTrigger',
            '/documents/pro/JActionMonitorEditor',
            '/documents/pro/ILRuntimeAdapterEditor',
            '/documents/pro/ClassBindDependentEditor',
            '/documents/pro/CustomRuntimeSerialization',
        ]
      }
    ]
}, ],
  '/documents/0.6/': [{
      text: 'v0.6.x文档',
      collapsible: false,
      children: [
          '/documents/0.6/',
          {
              text: '入门教程',
              collapsible: false,
              children: [
                  '/documents/0.6/startup',
                  '/documents/0.6/structure',
                  '/documents/0.6/hotupdate',
                  '/documents/0.6/classbind',
                  '/documents/0.6/guide',
                  '/documents/0.6/limits',
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
              text: 'UI框架',
              collapsible: false,
              children: [
                  '/documents/0.6/jui',
                  '/documents/0.6/bindable',
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
      text: 'v0.5.x文档',
      collapsible: false,
      children: [
          '/documents/0.5/',
          {
              text: '入门教程',
              collapsible: false,
              children: [
                  '/documents/0.5/startup',
                  '/documents/0.5/structure',
                  '/documents/0.5/hotupdate',
                  '/documents/0.5/classbind',
                  '/documents/0.5/guide',
                  '/documents/0.5/limits',
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
                  '/documents/0.5/jui',
                  '/documents/0.5/bindable',
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
          lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
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
                      link: '/'
                  },
                  {
                      text: "文档",
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
                          },
                          {
                              text: 'Pro',
                              link: '/documents/pro/'
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
                              link: '/pro/'
                          },
                          {
                              text: '定价',
                              link: '/pro/price'
                          },
                          {
                              text: '购买',
                              link: '/pro/purchase'
                          },
                      ]
                  },
              ]
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
