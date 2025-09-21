import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Favicon generation function using Sharp
async function generateFavicons() {
  const logoPath = path.resolve('./docs/public/logo.png')
  const outputDir = path.resolve('./docs/public')

  if (!fs.existsSync(logoPath)) {
    console.warn('Logo file not found for favicon generation:', logoPath)
    return
  }

  const faviconSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ]

  for (const favicon of faviconSizes) {
    try {
      const outputPath = path.join(outputDir, favicon.name)
      await sharp(logoPath)
        .resize(favicon.size, favicon.size)
        .png()
        .toFile(outputPath)
      console.log(`Generated ${favicon.name}`)
    } catch (error) {
      console.error(`Failed to generate ${favicon.name}:`, error instanceof Error ? error.message : String(error))
    }
  }

  // Generate favicon.ico from 32x32
  try {
    const icoPath = path.join(outputDir, 'favicon.ico')
    await sharp(logoPath)
      .resize(32, 32)
      .png()
      .toFile(icoPath)
    console.log('Generated favicon.ico')
  } catch (error) {
    console.error('Failed to generate favicon.ico:', error instanceof Error ? error.message : String(error))
  }
}

// Dynamic robots.txt generation based on site structure
function generateDynamicRobotsTxt(siteConfig: any): string {
  const baseUrl = 'https://jengine.xgamedev.net'

  // Auto-discover paths from site configuration
  const allowedPaths = new Set<string>()
  const disallowedPaths = new Set<string>()

  // Discover paths from navigation
  if (siteConfig.userConfig?.themeConfig?.nav) {
    extractPathsFromNav(siteConfig.userConfig.themeConfig.nav, allowedPaths)
  }

  // Discover paths from sidebar
  if (siteConfig.userConfig?.themeConfig?.sidebar) {
    extractPathsFromSidebar(siteConfig.userConfig.themeConfig.sidebar, allowedPaths)
  }

  // Always block build artifacts and private paths
  disallowedPaths.add('/.vitepress/')
  disallowedPaths.add('/node_modules/')
  disallowedPaths.add('/.git/')
  disallowedPaths.add('/src/')

  // Convert paths to robots.txt format
  const allowRules = Array.from(allowedPaths)
    .filter(path => !Array.from(disallowedPaths).some(blocked => path.startsWith(blocked.replace('/', ''))))
    .sort()
    .map(path => `Allow: ${path}`)
    .join('\n')

  const disallowRules = Array.from(disallowedPaths)
    .sort()
    .map(path => `Disallow: ${path}`)
    .join('\n')

  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Auto-discovered documentation paths
${allowRules}

# Blocked paths
${disallowRules}

# Generated automatically from site structure
`
}

// Extract paths from navigation configuration
function extractPathsFromNav(nav: any[], allowedPaths: Set<string>) {
  nav.forEach(item => {
    if (item.link && !item.link.startsWith('http')) {
      // Extract directory path from link
      const dirPath = item.link.split('/').slice(0, -1).join('/') + '/'
      if (dirPath !== '/') {
        allowedPaths.add(dirPath)
      }
    }
    if (item.items && Array.isArray(item.items)) {
      extractPathsFromNav(item.items, allowedPaths)
    }
  })
}

// Extract paths from sidebar configuration
function extractPathsFromSidebar(sidebar: any, allowedPaths: Set<string>) {
  Object.keys(sidebar).forEach(sectionPath => {
    // Add the section path itself
    if (sectionPath !== '/') {
      allowedPaths.add(sectionPath)
    }

    // Extract paths from sidebar items
    if (Array.isArray(sidebar[sectionPath])) {
      extractPathsFromSidebarItems(sidebar[sectionPath], allowedPaths)
    }
  })
}

// Extract paths from sidebar items recursively
function extractPathsFromSidebarItems(items: any[], allowedPaths: Set<string>) {
  items.forEach(item => {
    if (item.link && !item.link.startsWith('http')) {
      // Extract directory path from link
      const dirPath = item.link.split('/').slice(0, -1).join('/') + '/'
      if (dirPath !== '/') {
        allowedPaths.add(dirPath)
      }
    }
    if (item.items && Array.isArray(item.items)) {
      extractPathsFromSidebarItems(item.items, allowedPaths)
    }
  })
}

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: 'JEngine',
  description: '使Unity开发的游戏支持热更新的解决方案',
  lang: 'zh-CN',


  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: 'JEngine - Unity热更新解决方案' }],
    ['meta', { property: 'og:description', content: '使Unity开发的游戏支持热更新的解决方案' }],
    ['meta', { property: 'og:site_name', content: 'JEngine Documentation' }],
    ['meta', { property: 'og:image', content: 'https://jengine.xgamedev.net/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://jengine.xgamedev.net/logo.png' }]
  ],

  // Dynamic head generation using transformHead hook
  transformHead({ assets }) {
    const faviconLinks: Array<[string, Record<string, string>]> = [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
    ]

    // Find favicon assets and add them dynamically
    const favicon16 = assets.find(file => file.includes('favicon-16x16'))
    const favicon32 = assets.find(file => file.includes('favicon-32x32'))
    const appleTouchIcon = assets.find(file => file.includes('apple-touch-icon'))

    if (favicon16) {
      faviconLinks.push(['link', { rel: 'icon', href: favicon16 }])
    }
    if (favicon32) {
      faviconLinks.push(['link', { rel: 'icon', href: favicon32 }])
    }
    if (appleTouchIcon) {
      faviconLinks.push(['link', { rel: 'apple-touch-icon', href: appleTouchIcon }])
    }

    return faviconLinks
  },

  // Sitemap generation
  sitemap: {
    hostname: 'https://jengine.xgamedev.net',
    transformItems: (items) => {
      // Add custom priority and changefreq for different sections
      return items.map((item) => {
        if (item.url === '/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/documents/0.8/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' }
        }
        if (item.url.includes('/documents/0.7/')) {
          return { ...item, priority: 0.6, changefreq: 'yearly' }
        }
        if (item.url.includes('/documents/0.6/') || item.url.includes('/documents/0.5/')) {
          return { ...item, priority: 0.4, changefreq: 'yearly' }
        }
        if (item.url.includes('/pro/')) {
          return { ...item, priority: 0.7, changefreq: 'monthly' }
        }
        return { ...item, priority: 0.5, changefreq: 'monthly' }
      })
    }
  },

  // Enable last updated timestamps
  lastUpdated: true,
  cleanUrls: true, 

  // Build hooks
  buildEnd: async (siteConfig) => {
    const outDir = siteConfig.outDir

    // Generate favicons from logo.png
    await generateFavicons()

    // Generate robots.txt dynamically based on site structure
    const robotsTxt = generateDynamicRobotsTxt(siteConfig)
    fs.writeFileSync(path.join(outDir, 'robots.txt'), robotsTxt)
    console.log('Generated dynamic robots.txt with auto-discovered paths')

    console.log('✅ SEO files generated successfully!')
  },

  themeConfig: {
    logo: '/logo.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '文档',
        items: [
          { text: '文档总览', link: '/documents/' },
          { text: 'v0.8.x', link: '/documents/0.8/' },
          { text: 'v0.7.x', link: '/documents/0.7/' },
          { text: 'v0.6.x', link: '/documents/0.6/' },
          { text: 'v0.5.x', link: '/documents/0.5/' },
          { text: 'Pro版本', link: '/documents/pro/' }
        ]
      },
      {
        text: '交流',
        items: [
          {
            text: 'JEngine官方QQ群',
            items: [
              { text: '921271552', link: 'https://jq.qq.com/?_wv=1027&k=cF4hODjW' }
            ]
          }
        ]
      },
      {
        text: '订阅版',
        items: [
          { text: 'Pro', link: '/pro/' },
          { text: '定价', link: '/pro/price' },
          { text: '购买', link: '/pro/purchase' }
        ]
      }
    ],

    sidebar: {
      '/documents/': [
        {
          text: '框架文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/' }
          ]
        }
      ],
      '/documents/0.8/': [
        {
          text: 'v0.8.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/0.8/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/documents/0.8/startup' },
                { text: '资源包管理', link: '/documents/0.8/ab' },
                { text: '部署', link: '/documents/0.8/deploy' },
                { text: '更新器', link: '/documents/0.8/updater' },
                { text: '常见问题', link: '/documents/0.8/FAQ' },
                { text: 'YooAsset文档', link: 'https://www.yooasset.com/' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '升级指南',
              collapsed: false,
              items: [
                { text: '迁移指南', link: '/documents/0.8/migrate' }
              ]
            },
            {
              text: '核心功能',
              collapsed: false,
              items: [
                { text: '资源管理器', link: '/documents/0.8/assetmgr' },
                { text: '协程管理器', link: '/documents/0.8/coroutinemgr' },
                { text: '加密管理器', link: '/documents/0.8/cryptomgr' },
                { text: '生命周期管理器', link: '/documents/0.8/lifecyclemgr' }
              ]
            }
          ]
        }
      ],
      '/documents/0.7/': [
        {
          text: 'v0.7.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/0.7/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/documents/0.7/startup' },
                { text: '热更新', link: '/documents/0.7/Update' },
                { text: '构建AB包', link: '/documents/0.7/BuildAB' },
                { text: '更新器', link: '/documents/0.7/Updater' },
                { text: '初始化JEngine', link: '/documents/0.7/InitJEngine' },
                { text: '原理', link: '/documents/0.7/Principle' },
                { text: '常见问题', link: '/documents/0.7/FAQ' },
                { text: '限制', link: '/documents/0.7/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: '资源管理器', link: '/documents/0.7/AssetMgr' },
                { text: '类绑定', link: '/documents/0.7/ClassBind' },
                { text: '扩展', link: '/documents/0.7/Extension' },
                { text: '加密结构', link: '/documents/0.7/CryptoStruct' },
                { text: 'JAction', link: '/documents/0.7/JAction' },
                { text: 'JBehaviour', link: '/documents/0.7/JBehaviour' },
                { text: 'JSaver', link: '/documents/0.7/JSaver' },
                { text: '单例', link: '/documents/0.7/Singleton' },
                { text: 'JEvent', link: '/documents/0.7/JEvent' },
                { text: '可绑定', link: '/documents/0.7/Bindable' },
                { text: 'JPrefab', link: '/documents/0.7/JPrefab' },
                { text: 'JValidation', link: '/documents/0.7/JValidation' },
                { text: 'StringifyHelper', link: '/documents/0.7/StringifyHelper' },
                { text: 'JGameObjectPool', link: '/documents/0.7/JGameObjectPool' },
                { text: '本地化', link: '/documents/0.7/Localization' },
                { text: 'JWebSocket', link: '/documents/0.7/JWebSocket' }
              ]
            },
            {
              text: '编辑器工具',
              collapsed: false,
              items: [
                { text: 'JEngine面板', link: '/documents/0.7/JEnginePanel' },
                { text: 'ILRuntime工具', link: '/documents/0.7/ILRuntimeTools' },
                { text: 'Proto工具', link: '/documents/0.7/ProtoTools' }
              ]
            },
            {
              text: 'UI功能',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/documents/0.7/Jui' },
                { text: 'MetaJUI', link: 'https://github.com/Meta404Dev/MetaJUI' }
              ]
            },
            {
              text: '额外插件',
              collapsed: false,
              items: [
                { text: 'Unity GUI Redis', link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis' }
              ]
            }
          ]
        }
      ],
      '/documents/0.6/': [
        {
          text: 'v0.6.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/0.6/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/documents/0.6/startup' },
                { text: '项目结构', link: '/documents/0.6/structure' },
                { text: '热更新', link: '/documents/0.6/hotupdate' },
                { text: '类绑定', link: '/documents/0.6/classbind' },
                { text: '指南', link: '/documents/0.6/guide' },
                { text: '限制', link: '/documents/0.6/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: 'JBehaviour', link: '/documents/0.6/jbehaviour' },
                { text: 'JResource', link: '/documents/0.6/jresource' },
                { text: 'JAction', link: '/documents/0.6/jaction' },
                { text: 'JSaver', link: '/documents/0.6/jsaver' },
                { text: 'JEvent', link: '/documents/0.6/jevent' },
                { text: '本地化', link: '/documents/0.6/localization' },
                { text: '加密结构', link: '/documents/0.6/crypto-struct' },
                { text: '游戏对象池', link: '/documents/0.6/gameobject-pool' },
                { text: 'ILRuntime工具', link: '/documents/0.6/ilruntime-tools' },
                { text: 'Proto工具', link: '/documents/0.6/proto-tools' },
                { text: 'JEngine面板', link: '/documents/0.6/jengine-panel' }
              ]
            },
            {
              text: 'UI框架',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/documents/0.6/jui' },
                { text: '可绑定', link: '/documents/0.6/bindable' }
              ]
            },
            {
              text: '额外插件',
              collapsed: false,
              items: [
                { text: 'Unity GUI Redis', link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis' }
              ]
            }
          ]
        }
      ],
      '/documents/0.5/': [
        {
          text: 'v0.5.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/0.5/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/documents/0.5/startup' },
                { text: '项目结构', link: '/documents/0.5/structure' },
                { text: '热更新', link: '/documents/0.5/hotupdate' },
                { text: '类绑定', link: '/documents/0.5/classbind' },
                { text: '指南', link: '/documents/0.5/guide' },
                { text: '限制', link: '/documents/0.5/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: 'JBehaviour', link: '/documents/0.5/jbehaviour' },
                { text: 'JResource', link: '/documents/0.5/jresource' },
                { text: 'JAction', link: '/documents/0.5/jaction' },
                { text: 'JSaver', link: '/documents/0.5/jsaver' },
                { text: '本地化', link: '/documents/0.5/localization' },
                { text: '加密结构', link: '/documents/0.5/crypto-struct' },
                { text: '游戏对象池', link: '/documents/0.5/gameobject-pool' },
                { text: 'ILRuntime工具', link: '/documents/0.5/ilruntime-tools' },
                { text: 'Proto工具', link: '/documents/0.5/proto-tools' }
              ]
            },
            {
              text: 'UI框架',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/documents/0.5/jui' },
                { text: '可绑定', link: '/documents/0.5/bindable' }
              ]
            },
            {
              text: '额外插件',
              collapsed: false,
              items: [
                { text: 'Unity GUI Redis', link: 'https://github.com/JasonXuDeveloper/Unity-GUI-Redis' }
              ]
            }
          ]
        }
      ],
      '/pro/': [
        {
          text: 'JEngine Pro',
          collapsed: false,
          items: [
            { text: '概述', link: '/pro/' },
            { text: '定价', link: '/pro/price' },
            { text: '购买', link: '/pro/purchase' },
            { text: '文档', link: '/documents/pro/' }
          ]
        }
      ],
      '/documents/pro/': [
        {
          text: 'Pro最新版文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/documents/pro/' },
            {
              text: '快速上手',
              collapsed: false,
              items: [
                { text: '开始使用', link: '/documents/pro/StartUp' }
              ]
            },
            {
              text: '功能列表',
              collapsed: false,
              items: [
                { text: '热重载', link: '/documents/pro/HotReload' },
                { text: '类绑定', link: '/documents/pro/ClassBind' },
                { text: 'HotButton', link: '/documents/pro/HotButton' },
                { text: 'HotSlider', link: '/documents/pro/HotSlider' },
                { text: 'HotInputField', link: '/documents/pro/HotInputField' },
                { text: 'HotDropdown', link: '/documents/pro/HotDropdown' },
                { text: 'HotToggle', link: '/documents/pro/HotToggle' },
                { text: 'HotEventTrigger', link: '/documents/pro/HotEventTrigger' },
                { text: 'JAction监视器编辑器', link: '/documents/pro/JActionMonitorEditor' },
                { text: 'ILRuntime适配器编辑器', link: '/documents/pro/ILRuntimeAdapterEditor' },
                { text: '类绑定依赖编辑器', link: '/documents/pro/ClassBindDependentEditor' },
                { text: '自定义运行时序列化', link: '/documents/pro/CustomRuntimeSerialization' }
              ]
            }
          ]
        }
      ]
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'WENHCHYVXD',
        apiKey: '76c6db7d7f76141f6b785c515a93e296',
        indexName: 'jengine-doc',
        placeholder: '搜索文档'
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JasonXuDeveloper/JEngine' }
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2020-present JasonXuDeveloper'
    },

    editLink: {
      pattern: 'https://github.com/JasonXuDeveloper/JEngine.Docs/edit/main/vitepress-docs/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '上次更新时间'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // PWA Configuration
  pwa: {
    base: '/',
    scope: '/',
    includeAssets: [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
      'android-chrome-192x192.png',
      'android-chrome-512x512.png',
      'logo.png'
    ],
    manifest: {
      name: 'JEngine Documentation',
      short_name: 'JEngine Docs',
      description: '使Unity开发的游戏支持热更新的解决方案',
      theme_color: '#3eaf7c',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      lang: 'zh-CN',
      categories: ['developer', 'productivity', 'utilities'],
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/jengine\.xgamedev\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'jengine-docs-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
            }
          }
        }
      ]
    }
  }
}))