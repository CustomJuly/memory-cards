export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'MemoryCards',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1' },
      { hid: 'description', name: 'description', content: 'Flip & learn languages faster' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss',
    '@/assets/helpers.scss',
    '@/assets/vars.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/store.ts',
    '~/plugins/persisted-state.ts',
    '~/plugins/click-outside.ts',
    `~/plugins/vh-calculator.ts`,
    `~/plugins/chartjs.ts`,
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/svg-sprite'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'MemoryCards',
      short_name: 'MemoryCards',
      description: 'Flip & learn languages faster',
      theme_color: '#6B4EFF'
    },
    meta: {
      author: 'Julia',
      theme_color: '#6B4EFF',
      ogTitle: 'MemoryCards',
      ogDescription: 'Flip & learn languages faster',
      ogImage: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },

  i18n: {
    defaultLocale: 'en',
    langDir: '~/i18n/',
    locales: [
      { code: 'en', file: 'en.ts' },
      { code: 'ru', file: 'ru.ts' },
      { code: 'fr', file: 'fr.ts' },
    ]
  }
}
