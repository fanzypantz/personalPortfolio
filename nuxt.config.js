const env = require('dotenv').config();

export default {
  mode: 'universal',

  env: env.parsed,

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1'
      },
      {
        hid: 'description',
        name: 'Andreas Tollånes - A Personal Portfolio',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Inconsolata&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.typekit.net/vrp7ipo.css'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],

  styleResources: {
    sass: ['~assets/sass/_variables.sass']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vue-scrollto.js',
    { src: '~plugins/v-waypoint.client.js', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/markdownit',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    '@nuxtjs/svg'
  ],

  proxy: [
    // Proxies /foo to http://example.com/foo
    'http://localhost:1337/graphql'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3000',
    credentials: true,
    debug: true
  },

  apollo: {
    cookieAttributes: {
      secure: process.env.USE_SSL || false
    },

    clientConfigs: {
      default: {
        httpEndpoint: process.env.BACKEND_URL || 'http://localhost:1337/graphql'
      }
    }
  },

  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },

  serverMiddleware: [{ path: '~/api', handler: '~/clientServer/index.js' }],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
