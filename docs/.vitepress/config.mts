import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { generateThemeConfig } from './config-helpers.mts'

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

  // Discover paths from sidebar for all locales
  if (siteConfig.userConfig?.locales) {
    Object.values(siteConfig.userConfig.locales).forEach((locale: any) => {
      if (locale.themeConfig?.sidebar) {
        extractPathsFromSidebar(locale.themeConfig.sidebar, allowedPaths)
      }
    })
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

// Get the docs path
const docsPath = path.resolve('./docs')

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: 'JEngine',
  description: 'Unity Hot Update Solution - Enable hot updates for Unity games with runtime support',

  // Multi-language configuration
  locales: {
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'JEngine',
      description: 'Unity Hot Update Solution - Enable hot updates for Unity games with runtime support',
      themeConfig: {
        ...generateThemeConfig('en', docsPath)
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'JEngine',
      description: '使Unity开发的游戏支持热更新的解决方案',
      themeConfig: {
        ...generateThemeConfig('zh', docsPath)
      }
    }
  },

  // Default to English
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'msapplication-TileColor', content: '#3eaf7c' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'JEngine - Unity Hot Update Solution' }],
    ['meta', { property: 'og:description', content: 'Enable hot updates for Unity games with runtime support' }],
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

  // Sitemap generation with locale support
  sitemap: {
    hostname: 'https://jengine.xgamedev.net',
    transformItems: (items) => {
      // Add custom priority and changefreq for different sections
      return items.map((item) => {
        if (item.url === '/' || item.url === '/en/' || item.url === '/zh/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' }
        }
        if (item.url.includes('/v1.0/')) {
          return { ...item, priority: 0.9, changefreq: 'weekly' }
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

  // Common theme configuration
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'algolia',
      options: {
        appId: 'WENHCHYVXD',
        apiKey: '76c6db7d7f76141f6b785c515a93e296',
        indexName: 'jengine-doc',
        locales: {
          en: {
            placeholder: 'Search documentation',
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                searchBox: {
                  clearButtonTitle: 'Clear search',
                  clearButtonAriaLabel: 'Clear search',
                  closeButtonText: 'Cancel',
                  closeButtonAriaLabel: 'Cancel'
                },
                startScreen: {
                  recentSearchesTitle: 'Recent searches',
                  noRecentSearchesText: 'No recent searches',
                  saveRecentSearchButtonTitle: 'Save this search',
                  removeRecentSearchButtonTitle: 'Remove this search from history',
                  favoriteSearchesTitle: 'Favorites',
                  removeFavoriteSearchButtonTitle: 'Remove this search from favorites'
                },
                errorScreen: {
                  titleText: 'Unable to fetch results',
                  helpText: 'You might want to check your network connection.'
                },
                footer: {
                  selectText: 'to select',
                  navigateText: 'to navigate',
                  closeText: 'to close'
                },
                noResultsScreen: {
                  noResultsText: 'No results for',
                  suggestedQueryText: 'Try searching for',
                  reportMissingResultsText: 'Believe this query should return results?',
                  reportMissingResultsLinkText: 'Let us know.'
                }
              }
            }
          },
          zh: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  clearButtonTitle: '清除查询条件',
                  clearButtonAriaLabel: '清除查询条件',
                  closeButtonText: '取消',
                  closeButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
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
      description: 'Unity Hot Update Solution - Enable hot updates for Unity games',
      theme_color: '#3eaf7c',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/',
      lang: 'en-US',
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