export default defineNuxtConfig({
  modules: [
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/ui-pro',
  ],
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    public: {
      githubOwner: 'hywax',
      githubRepo: 'skillq',
    },
    githubToken: '',
  },
  i18n: {
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    vueI18n: 'vue-i18n.options.ts',
    experimental: {
      autoImportTranslationFunctions: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
      // { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      // { code: 'hi', language: 'hi-IN', name: 'हिंदी', file: 'hi-IN.json' },
    ],
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'ru-RU': 'ru',
    },
  },
  ui: {
    colorMode: true,
    fonts: true,
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },
  colorMode: {
    classSuffix: '',
  },
  icon: {
    customCollections: [
      { prefix: 'skillq', dir: './app/assets/icons' },
    ],
    clientBundle: {
      includeCustomCollections: true,
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  nitro: {
    storage: {
      meta: {
        driver: 'fs',
        base: './meta',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: false },
})
