import pkg from './package';

export default {
  mode: 'universal',

  env: {
    APOLLO_HTTP_ENDPOINT: process.env.APOLLO_HTTP_ENDPOINT,
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
  },

  /*
   ** Router options
   */
  router: {
    middleware: ['categories', 'pages'],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '@/plugins/vue-infinite-scroll.js', ssr: false }],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    'vue-scrollto/nuxt',
    'nuxt-i18n',
  ],

  devModules: ['@nuxtjs/vuetify'],

  /*
   ** Vuetify options
   ** Doc: https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/style/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#555555', // TODO: Choose proper color
        },
      },
    },
  },

  /*
   ** Moment module configuration
   */
  i18n: {
    locales: [
      {
        code: 'ca',
        file: '/ca.js',
      },
    ],
    defaultLocale: 'ca',
    langDir: 'lang',
    detectBrowserLanguage: false,
    lazy: true,
    vueI18n: {
      fallbackLocale: 'ca',
    },
  },

  /*
   ** Moment module configuration
   */
  moment: {
    locales: ['ca'],
    defaultLocale: 'ca',
  },

  /*
   ** Apollo module configuration
   */
  apollo: {
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  /*
   ** Manifest
   */
  manifest: {
    name: 'Criticat',
    short_name: 'Criticat',
    lang: 'ca',
    start_url: '/',
    background_color: '#424242',
    theme_color: '#424242',
  },
};
