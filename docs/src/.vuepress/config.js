const { description } = require('../../package')
const sidebar = require('vuepress-auto-sidebar')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'JEngine Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ["link", {rel: "icon", href: "/logo/favicon.ico"}]
  ],


  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'JEngine Documentation',
      description: 'Documentation for Unity Hot Update Framework JEngine'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'JEngine文档',
      description: 'Unity热更新框架JEngine文档网站'
    }
  },
  
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/JasonXuDeveloper/JEngine.Docs',
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/JasonXuDeveloper/JEngine.Docs',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'main',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
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
        lastUpdated: 'Last Updated',
        contributors: true,
        contributorsText: 'Document Contributors',
        nav: [
          {
            text: '主页',
            link: '/home/'
          },
          {
            text: "帮助文档",
            link: '/documents'
          },
          {
            text: '开发',
            children: [
              {
                text: '统一可交换祈愿记录标准',
                link: '/development/StandardFormat.md'
              },
              {
                text: '开发人员指南',
                link: '/development/DeveloperGuide.md'
              },
              {
                text: '插件开发',
                link: '/development/PluginTutorial.md'
              },
            ]
          },
          {
            text: '交流',
            children: [
              {
                text: '问题反馈-主群',
                children: [
                  {
                    text: '910780153',
                    link: 'https://jq.qq.com/?_wv=1027&k=MHLNhhYJ'
                  }
                ]
              },
              {
                text: '游戏交流-二群',
                children: [
                  {
                    text: '547288075',
                    link: 'https://jq.qq.com/?_wv=1027&k=cgh9S2XW'
                  },
                ]
              },
              {
                text: '游戏交流-三群',
                children: [
                  {
                    text: '240095771',
                    link: 'https://jq.qq.com/?_wv=1027&k=DUkB0Nyx'
                  },
                ]
              },
              {
                text: '程序开发',
                children: [
                  {
                    text: '982424236',
                    link: 'https://jq.qq.com/?_wv=1027&k=pCOEg7fJ'
                  },
                ]
              },
            ]
          },
          {
            text: '下载',
            children: [
              {
                text: '国内用户',
                children: [
                  {
                    text: '腾讯云',
                    link: 'https://download.snapgenshin.com/latest/Publish.zip'
                  }
                ]
              },
              {
                text: '海外用户',
                children: [
                  {
                    text: 'Github',
                    link: 'https://github.com/DGP-Studio/Snap.Genshin/releases/latest/download/Publish.zip'
                  }
                ]
              },
            ],
          },
          {
            text: '赞助项目',
            link: '/documents/statement/sponsor.md'
          },
        ],
        sidebar: "auto"
      },
      '/zh/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
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
        lastUpdated: '上次更新时间',
        contributors: true,
        contributorsText: '文档贡献者',
        tip: '提示',
        warning: '警告',
        danger: '危险',
        notFound: ["找不到该页面"],
        backToHome: '返回首页',
        nav: [
          {
            text: '主页',
            link: '/home/'
          },
          {
            text: "帮助文档",
            link: '/documents'
          },
          {
            text: '开发',
            children: [
              {
                text: '统一可交换祈愿记录标准',
                link: '/development/StandardFormat.md'
              },
              {
                text: '开发人员指南',
                link: '/development/DeveloperGuide.md'
              },
              {
                text: '插件开发',
                link: '/development/PluginTutorial.md'
              },
            ]
          },
          {
            text: '交流',
            children: [
              {
                text: '问题反馈-主群',
                children: [
                  {
                    text: '910780153',
                    link: 'https://jq.qq.com/?_wv=1027&k=MHLNhhYJ'
                  }
                ]
              },
              {
                text: '游戏交流-二群',
                children: [
                  {
                    text: '547288075',
                    link: 'https://jq.qq.com/?_wv=1027&k=cgh9S2XW'
                  },
                ]
              },
              {
                text: '游戏交流-三群',
                children: [
                  {
                    text: '240095771',
                    link: 'https://jq.qq.com/?_wv=1027&k=DUkB0Nyx'
                  },
                ]
              },
              {
                text: '程序开发',
                children: [
                  {
                    text: '982424236',
                    link: 'https://jq.qq.com/?_wv=1027&k=pCOEg7fJ'
                  },
                ]
              },
            ]
          },
          {
            text: '下载',
            children: [
              {
                text: '国内用户',
                children: [
                  {
                    text: '腾讯云',
                    link: 'https://download.snapgenshin.com/latest/Publish.zip'
                  }
                ]
              },
              {
                text: '海外用户',
                children: [
                  {
                    text: 'Github',
                    link: 'https://github.com/DGP-Studio/Snap.Genshin/releases/latest/download/Publish.zip'
                  }
                ]
              },
            ],
          },
          {
            text: '赞助项目',
            link: '/documents/statement/sponsor.md'
          },
        ],
        sidebar: "auto"
      }
    }
    // nav: [
    //   {
    //     text: 'Guide',
    //     link: '/guide/',
    //   },
    //   {
    //     text: 'Config',
    //     link: '/config/'
    //   },
    //   {
    //     text: 'VuePress',
    //     link: 'https://v1.vuepress.vuejs.org'
    //   }
    // ],
    // sidebar: {
    //   '/guide/': [
    //     {
    //       title: 'Guide',
    //       collapsable: false,
    //       children: [
    //         '',
    //         'using-vue',
    //       ]
    //     }
    //   ],
    // }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search for document',
            hotKeys: ['/']
          },
          '/zh/': {
            placeholder: '搜索文档',
            hotKeys: ['/zh/']
          }
        }
      }
    ],
    [
      "vuepress-plugin-clipboard",
      {
        align: "top"
      }
    ]
  ],

}
