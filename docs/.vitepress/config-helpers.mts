import fs from 'fs'
import path from 'path'
import type { DefaultTheme } from 'vitepress'

export interface SidebarItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

export interface SidebarConfig {
  [key: string]: SidebarItem[]
}

// Scan directory structure and generate sidebar automatically
export function generateSidebar(docsPath: string, basePath: string = ''): SidebarConfig {
  const sidebar: SidebarConfig = {}

  // Helper function to extract title from markdown file
  function extractMarkdownTitle(filePath: string): string {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')

      // Try to extract title from frontmatter first
      const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const titleMatch = frontmatter.match(/^title:\s*(.+)$/m)
        if (titleMatch) {
          return titleMatch[1].replace(/['"]/g, '').trim()
        }
      }

      // Fall back to first # heading
      const headingMatch = content.match(/^#\s+(.+)$/m)
      if (headingMatch) {
        return headingMatch[1].trim()
      }

      // If no title found, use filename
      return path.basename(filePath, '.md')
    } catch (error) {
      // If file can't be read, use filename
      return path.basename(filePath, '.md')
    }
  }

  // Helper function to scan a single directory level (non-recursive)
  function scanDirectoryLevel(dirPath: string, relativePath: string): SidebarItem[] {
    const items: SidebarItem[] = []

    if (!fs.existsSync(dirPath)) {
      return items
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(entry => !entry.name.startsWith('.'))
      .sort((a, b) => {
        // index.md first, then other files, then directories
        if (a.name === 'index.md') return -1
        if (b.name === 'index.md') return 1
        if (a.isFile() && b.isDirectory()) return -1
        if (a.isDirectory() && b.isFile()) return 1
        return a.name.localeCompare(b.name)
      })

    // Add index first if it exists
    const indexPath = path.join(dirPath, 'index.md')
    if (fs.existsSync(indexPath)) {
      const indexTitle = extractMarkdownTitle(indexPath)
      items.push({
        text: indexTitle,
        link: `/${relativePath}/`
      })
    }

    for (const entry of entries) {
      const entryPath = path.join(dirPath, entry.name)
      const entryRelativePath = path.join(relativePath, entry.name).replace(/\\/g, '/')

      if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        const title = extractMarkdownTitle(entryPath)
        items.push({
          text: title,
          link: `/${entryRelativePath.replace('.md', '')}`
        })
      }
    }

    return items
  }

  // Recursively generate sidebars for all directory levels
  function generateSidebarsRecursively(currentPath: string, currentRelativePath: string) {
    if (!fs.existsSync(currentPath)) {
      return
    }

    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))

    for (const entry of entries) {
      const dirPath = path.join(currentPath, entry.name)
      const relativePath = path.join(currentRelativePath, entry.name).replace(/\\/g, '/')

      // Generate sidebar for this directory level
      const sidebarKey = `/${relativePath}/`
      const directoryContents = scanDirectoryLevel(dirPath, relativePath)

      if (directoryContents.length > 0) {
        sidebar[sidebarKey] = [{
          text: entry.name,
          collapsed: false,
          items: directoryContents
        }]
      }

      // Recursively generate for subdirectories
      generateSidebarsRecursively(dirPath, relativePath)
    }
  }

  // Start generation from the base path
  const baseDir = path.join(docsPath, basePath)
  generateSidebarsRecursively(baseDir, basePath)

  return sidebar
}

// Generate navigation configuration
export function generateNav(locale: 'en' | 'zh'): DefaultTheme.NavItem[] {
  if (locale === 'en') {
    return [
      { text: 'Home', link: '/en/' },
      {
        text: 'Documentation',
        items: [
          { text: 'v1.0 (Latest)', link: '/en/documents/1.0/' }
        ]
      }
    ]
  } else {
    return [
      { text: '主页', link: '/zh/' },
      {
        text: '文档',
        items: [
          { text: '文档总览', link: '/zh/documents/' },
          { text: 'v1.0 (最新)', link: '/zh/documents/1.0/' },
          { text: 'v0.8.x', link: '/zh/documents/0.8/' },
          { text: 'v0.7.x', link: '/zh/documents/0.7/' },
          { text: 'v0.6.x', link: '/zh/documents/0.6/' },
          { text: 'v0.5.x', link: '/zh/documents/0.5/' },
          { text: 'Pro版本', link: '/zh/documents/pro/' }
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
          { text: 'Pro', link: '/zh/pro/' },
          { text: '定价', link: '/zh/pro/price' },
          { text: '购买', link: '/zh/pro/purchase' }
        ]
      }
    ]
  }
}

// Generate theme configuration for a specific locale
export function generateThemeConfig(locale: 'en' | 'zh', docsPath: string) {
  const isEnglish = locale === 'en'

  let customSidebar: SidebarConfig = {}

  if (isEnglish) {
    // English sidebars (structured)
    customSidebar = {
      '/en/documents/1.0/': [
        {
          text: 'v1.0 Documentation',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/en/documents/1.0/' },
            {
              text: 'Getting Started',
              collapsed: false,
              items: [
                { text: 'Quick Start', link: '/en/documents/1.0/startup' },
                { text: 'Installation Guide', link: '/en/documents/1.0/installation' },
                { text: 'Core Concepts', link: '/en/documents/1.0/concepts' }
              ]
            },
            {
              text: 'Core Features',
              collapsed: false,
              items: [
                { text: 'Asset Management', link: '/en/documents/1.0/assetmgr' },
                { text: 'Hot Update', link: '/en/documents/1.0/hotupdate' },
                { text: 'Build & Deploy', link: '/en/documents/1.0/build' }
              ]
            },
            {
              text: 'Tools & Extensions',
              collapsed: false,
              items: [
                { text: 'Editor Tools', link: '/en/documents/1.0/editor-tools' },
                { text: 'Debugging', link: '/en/documents/1.0/debugging' },
                { text: 'Performance Optimization', link: '/en/documents/1.0/optimization' }
              ]
            },
            {
              text: 'Migration Guide',
              collapsed: false,
              items: [
                { text: 'From v0.8.x', link: '/en/documents/1.0/migrate-from-0.8' }
              ]
            }
          ]
        }
      ]
    }
  } else {
    // Chinese sidebars (hardcoded structured)
    customSidebar = {
      '/zh/documents/': [
        {
          text: '框架文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/' }
          ]
        }
      ],
      '/zh/documents/0.8/': [
        {
          text: 'v0.8.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/0.8/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/zh/documents/0.8/startup' },
                { text: '资源包管理', link: '/zh/documents/0.8/ab' },
                { text: '部署', link: '/zh/documents/0.8/deploy' },
                { text: '更新器', link: '/zh/documents/0.8/updater' },
                { text: '常见问题', link: '/zh/documents/0.8/FAQ' },
                { text: 'YooAsset文档', link: 'https://www.yooasset.com/' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '升级指南',
              collapsed: false,
              items: [
                { text: '迁移指南', link: '/zh/documents/0.8/migrate' }
              ]
            },
            {
              text: '核心功能',
              collapsed: false,
              items: [
                { text: '资源管理器', link: '/zh/documents/0.8/assetmgr' },
                { text: '协程管理器', link: '/zh/documents/0.8/coroutinemgr' },
                { text: '加密管理器', link: '/zh/documents/0.8/cryptomgr' },
                { text: '生命周期管理器', link: '/zh/documents/0.8/lifecyclemgr' }
              ]
            }
          ]
        }
      ],
      '/zh/documents/0.7/': [
        {
          text: 'v0.7.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/0.7/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/zh/documents/0.7/startup' },
                { text: '热更新', link: '/zh/documents/0.7/Update' },
                { text: '构建AB包', link: '/zh/documents/0.7/BuildAB' },
                { text: '更新器', link: '/zh/documents/0.7/Updater' },
                { text: '初始化JEngine', link: '/zh/documents/0.7/InitJEngine' },
                { text: '原理', link: '/zh/documents/0.7/Principle' },
                { text: '常见问题', link: '/zh/documents/0.7/FAQ' },
                { text: '限制', link: '/zh/documents/0.7/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: '资源管理器', link: '/zh/documents/0.7/AssetMgr' },
                { text: '类绑定', link: '/zh/documents/0.7/ClassBind' },
                { text: '扩展', link: '/zh/documents/0.7/Extension' },
                { text: '加密结构', link: '/zh/documents/0.7/CryptoStruct' },
                { text: 'JAction', link: '/zh/documents/0.7/JAction' },
                { text: 'JBehaviour', link: '/zh/documents/0.7/JBehaviour' },
                { text: 'JSaver', link: '/zh/documents/0.7/JSaver' },
                { text: '单例', link: '/zh/documents/0.7/Singleton' },
                { text: 'JEvent', link: '/zh/documents/0.7/JEvent' },
                { text: '可绑定', link: '/zh/documents/0.7/Bindable' },
                { text: 'JPrefab', link: '/zh/documents/0.7/JPrefab' },
                { text: 'JValidation', link: '/zh/documents/0.7/JValidation' },
                { text: 'StringifyHelper', link: '/zh/documents/0.7/StringifyHelper' },
                { text: 'JGameObjectPool', link: '/zh/documents/0.7/JGameObjectPool' },
                { text: '本地化', link: '/zh/documents/0.7/Localization' },
                { text: 'JWebSocket', link: '/zh/documents/0.7/JWebSocket' }
              ]
            },
            {
              text: '编辑器工具',
              collapsed: false,
              items: [
                { text: 'JEngine面板', link: '/zh/documents/0.7/JEnginePanel' },
                { text: 'ILRuntime工具', link: '/zh/documents/0.7/ILRuntimeTools' },
                { text: 'Proto工具', link: '/zh/documents/0.7/ProtoTools' }
              ]
            },
            {
              text: 'UI功能',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/zh/documents/0.7/Jui' },
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
      '/zh/documents/0.6/': [
        {
          text: 'v0.6.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/0.6/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/zh/documents/0.6/startup' },
                { text: '项目结构', link: '/zh/documents/0.6/structure' },
                { text: '热更新', link: '/zh/documents/0.6/hotupdate' },
                { text: '类绑定', link: '/zh/documents/0.6/classbind' },
                { text: '指南', link: '/zh/documents/0.6/guide' },
                { text: '限制', link: '/zh/documents/0.6/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: 'JBehaviour', link: '/zh/documents/0.6/jbehaviour' },
                { text: 'JResource', link: '/zh/documents/0.6/jresource' },
                { text: 'JAction', link: '/zh/documents/0.6/jaction' },
                { text: 'JSaver', link: '/zh/documents/0.6/jsaver' },
                { text: 'JEvent', link: '/zh/documents/0.6/jevent' },
                { text: '本地化', link: '/zh/documents/0.6/localization' },
                { text: '加密结构', link: '/zh/documents/0.6/crypto-struct' },
                { text: '游戏对象池', link: '/zh/documents/0.6/gameobject-pool' },
                { text: 'ILRuntime工具', link: '/zh/documents/0.6/ilruntime-tools' },
                { text: 'Proto工具', link: '/zh/documents/0.6/proto-tools' },
                { text: 'JEngine面板', link: '/zh/documents/0.6/jengine-panel' }
              ]
            },
            {
              text: 'UI框架',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/zh/documents/0.6/jui' },
                { text: '可绑定', link: '/zh/documents/0.6/bindable' }
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
      '/zh/documents/0.5/': [
        {
          text: 'v0.5.x文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/0.5/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/zh/documents/0.5/startup' },
                { text: '项目结构', link: '/zh/documents/0.5/structure' },
                { text: '热更新', link: '/zh/documents/0.5/hotupdate' },
                { text: '类绑定', link: '/zh/documents/0.5/classbind' },
                { text: '指南', link: '/zh/documents/0.5/guide' },
                { text: '限制', link: '/zh/documents/0.5/limits' },
                { text: 'ILRuntime文档', link: 'https://ourpalm.github.io/ILRuntime/public/v1/guide/tutorial.html' }
              ]
            },
            {
              text: '框架核心',
              collapsed: false,
              items: [
                { text: 'JBehaviour', link: '/zh/documents/0.5/jbehaviour' },
                { text: 'JResource', link: '/zh/documents/0.5/jresource' },
                { text: 'JAction', link: '/zh/documents/0.5/jaction' },
                { text: 'JSaver', link: '/zh/documents/0.5/jsaver' },
                { text: '本地化', link: '/zh/documents/0.5/localization' },
                { text: '加密结构', link: '/zh/documents/0.5/crypto-struct' },
                { text: '游戏对象池', link: '/zh/documents/0.5/gameobject-pool' },
                { text: 'ILRuntime工具', link: '/zh/documents/0.5/ilruntime-tools' },
                { text: 'Proto工具', link: '/zh/documents/0.5/proto-tools' }
              ]
            },
            {
              text: 'UI框架',
              collapsed: false,
              items: [
                { text: 'JUI', link: '/zh/documents/0.5/jui' },
                { text: '可绑定', link: '/zh/documents/0.5/bindable' }
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
      '/zh/pro/': [
        {
          text: 'JEngine Pro',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/pro/' },
            { text: '定价', link: '/zh/pro/price' },
            { text: '购买', link: '/zh/pro/purchase' },
            { text: '文档', link: '/zh/documents/pro/' }
          ]
        }
      ],
      '/zh/documents/1.0/': [
        {
          text: 'v1.0文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/1.0/' },
            {
              text: '入门教程',
              collapsed: false,
              items: [
                { text: '快速开始', link: '/zh/documents/1.0/startup' },
                { text: '安装指南', link: '/zh/documents/1.0/installation' },
                { text: '基本概念', link: '/zh/documents/1.0/concepts' }
              ]
            },
            {
              text: '核心功能',
              collapsed: false,
              items: [
                { text: '资源管理', link: '/zh/documents/1.0/assetmgr' },
                { text: '热更新', link: '/zh/documents/1.0/hotupdate' },
                { text: '构建部署', link: '/zh/documents/1.0/build' }
              ]
            },
            {
              text: '工具与扩展',
              collapsed: false,
              items: [
                { text: '编辑器工具', link: '/zh/documents/1.0/editor-tools' },
                { text: '调试工具', link: '/zh/documents/1.0/debugging' },
                { text: '性能优化', link: '/zh/documents/1.0/optimization' }
              ]
            },
            {
              text: '升级指南',
              collapsed: false,
              items: [
                { text: '从v0.8.x迁移', link: '/zh/documents/1.0/migrate-from-0.8' }
              ]
            }
          ]
        }
      ],
      '/zh/documents/pro/': [
        {
          text: 'Pro最新版文档',
          collapsed: false,
          items: [
            { text: '概述', link: '/zh/documents/pro/' },
            {
              text: '快速上手',
              collapsed: false,
              items: [
                { text: '开始使用', link: '/zh/documents/pro/StartUp' }
              ]
            },
            {
              text: '功能列表',
              collapsed: false,
              items: [
                { text: '热重载', link: '/zh/documents/pro/HotReload' },
                { text: '类绑定', link: '/zh/documents/pro/ClassBind' },
                { text: 'HotButton', link: '/zh/documents/pro/HotButton' },
                { text: 'HotSlider', link: '/zh/documents/pro/HotSlider' },
                { text: 'HotInputField', link: '/zh/documents/pro/HotInputField' },
                { text: 'HotDropdown', link: '/zh/documents/pro/HotDropdown' },
                { text: 'HotToggle', link: '/zh/documents/pro/HotToggle' },
                { text: 'HotEventTrigger', link: '/zh/documents/pro/HotEventTrigger' },
                { text: 'JAction监视器编辑器', link: '/zh/documents/pro/JActionMonitorEditor' },
                { text: 'ILRuntime适配器编辑器', link: '/zh/documents/pro/ILRuntimeAdapterEditor' },
                { text: '类绑定依赖编辑器', link: '/zh/documents/pro/ClassBindDependentEditor' },
                { text: '自定义运行时序列化', link: '/zh/documents/pro/CustomRuntimeSerialization' }
              ]
            }
          ]
        }
      ]
    }
  }

  const baseTheme = {
    nav: generateNav(locale),
    sidebar: customSidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JasonXuDeveloper/JEngine' }
    ],

    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2020-present JasonXuDeveloper'
    }
  }

  if (isEnglish) {
    return {
      ...baseTheme,
      editLink: {
        pattern: 'https://github.com/JasonXuDeveloper/JEngine.Docs/edit/main/docs/:path',
        text: 'Edit this page on GitHub'
      },
      lastUpdated: {
        text: 'Last updated'
      },
      docFooter: {
        prev: 'Previous page',
        next: 'Next page'
      },
      outline: {
        label: 'On this page',
        level: [2, 3] as [number, number]
      },
      returnToTopLabel: 'Return to top',
      sidebarMenuLabel: 'Menu',
      darkModeSwitchLabel: 'Theme',
      lightModeSwitchTitle: 'Switch to light theme',
      darkModeSwitchTitle: 'Switch to dark theme',
      notFound: {
        title: 'PAGE NOT FOUND',
        quote: 'But if you don\'t change your direction, and if you keep looking, you may end up where you are heading.',
        linkLabel: 'Go to home',
        linkText: 'Take me home'
      }
    }
  } else {
    return {
      ...baseTheme,
      editLink: {
        pattern: 'https://github.com/JasonXuDeveloper/JEngine.Docs/edit/main/docs/:path',
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
        level: [2, 3] as [number, number]
      },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
      notFound: {
        title: '页面未找到',
        quote: '但是，如果你不改变方向，继续寻找，你可能会到达你要去的地方。',
        linkLabel: '返回首页',
        linkText: '回到首页'
      }
    }
  }
}