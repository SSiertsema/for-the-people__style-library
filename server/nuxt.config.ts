import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: [
    'tippy.js/dist/tippy.css',
    // Design tokens CSS custom properties
    resolve(__dirname, '../dist/css/tokens.css'),
    resolve(__dirname, '../dist/css/theme-dark.css'),
    '~/assets/scss/main.scss'
  ],

  // Auto-import components from src/components
  components: [
    '~/components',
    {
      path: resolve(__dirname, '../src/components'),
      pathPrefix: false
    }
  ],

  // Auto-import composables from vue-components
  imports: {
    dirs: [
      resolve(__dirname, '../vue-components/composables')
    ]
  },

  app: {
    head: {
      link: [
        // Load icon fonts from CDN
        { rel: 'stylesheet', href: 'https://cdn-pzh.azureedge.net/web/icons/icons-light.css' },
        { rel: 'stylesheet', href: 'https://cdn-pzh.azureedge.net/web/icons/icons-solid.css' }
      ]
    }
  },

  vite: {
    resolve: {
      alias: {
        '@pzh-temporary/style-library': resolve(__dirname, '../')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          loadPaths: [
            resolve(__dirname, '../dist/scss'),
            resolve(__dirname, '../src/scss')
          ]
        }
      }
    }
  },

  modules: ['~/modules/scss-parser']
})
