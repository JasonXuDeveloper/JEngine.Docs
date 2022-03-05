const { description } = require('../../package')
import {defineUserConfig} from 'vuepress'
import type {DefaultThemeOptions} from 'vuepress'

var bar = {
  '/documents/':[
    {
      text:"Documentations",
      collapsible: false,
      children: [
        '/documents/',
      ]
    }    
  ],
  '/zh/documents/':[
    {
      text:"框架文档",
      collapsible: false,
      children: [
        '/documents/',
      ]
    }    
  ],
  '/documents/0.7/':[
    {
      text: '开始使用',
      collapsible: false,
      children: [
        '/documents/0.7/',
        '/documents/features-overview',
      ]
    },

    {
      text: '功能指南',
      collapsible: false,
      children: [
        '/documents/features/game-launcher.md',
        '/documents/features/account-switch.md',
        '/documents/features/mhy-account-switch.md',
        '/documents/features/unlock-framerate.md',
        '/documents/features/wish-export.md',
        '/documents/features/customize-webpage.md'
      ],
    },

    {
      text: '常见问题',
      collapsible: false,
      children: [
        '/documents/FAQ/Dell-AWCC-error.md',
        '/documents/FAQ/dotNET-env.md',
        '/documents/FAQ/how-to-quit-program.md',
        '/documents/FAQ/launcher-path-error.md',
        '/documents/FAQ/transfer-from-other-wish-export.md',
        '/documents/FAQ/WebView2-env.md',
        '/documents/FAQ/failed-load.md',
      ],
    },
	
	{
      text: '拓展插件',
      collapsible: false,
      children: [
        '/documents/extensions/README.md',
		'/documents/extensions/GamebarWidget.md',
      ],
    },

    {
      text: '声明文档',
      collapsible: false,
      children: [
        '/documents/statement/user-privacy-notice.md',
        '/documents/statement/sponsor.md',
      ],
    }
  ],
  
  '/development': [
    {
      text: "开发指南",
      collapsible: false,
      children: [
        '/development/StandardFormat',
        '/development/DeveloperGuide',
        '/development/PluginTutorial',
      ]
    }
  ],
};

export default defineUserConfig<DefaultThemeOptions>({
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ["link", {rel: "icon", href: "/favicon.ico"}]
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
  
  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/JasonXuDeveloper/JEngine',
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'https://github.com/JasonXuDeveloper/JEngine.Docs',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'main',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    logo: '/logo.png',
    locales: {
      '/': {
        selectLanguageText: 'Languages',
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
        navbar: [
          {
            text: 'Home',
            link: '/'
          },
          {
            text: "Documentations",
            link: '/documents/',
            children:[
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
        selectLanguageText: '选择语言',
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
        navbar: [
          {
            text: '主页',
            link: '/zh/'
          },
          {
            text: "使用文档",
            link: '/documents/'
          },
        //   {
        //     text: '开发',
        //     children: [
        //       {
        //         text: '统一可交换祈愿记录标准',
        //         link: '/development/StandardFormat.md'
        //       },
        //       {
        //         text: '开发人员指南',
        //         link: '/development/DeveloperGuide.md'
        //       },
        //       {
        //         text: '插件开发',
        //         link: '/development/PluginTutorial.md'
        //       },
        //     ]
        //   },
          {
            text: '交流',
            children: [
              {
                text: 'JEngine官方QQ群',
                children: [
                  {
                    text: '921271552',
                    link: 'https://jq.qq.com/?_wv=1027&k=cF4hODjW'
                  }
                ]
              }
            ]
          },
        //   {
        //     text: '赞助项目',
        //     link: '/documents/statement/sponsor.md'
        //   },
        ],
      }
    }
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
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],

})
