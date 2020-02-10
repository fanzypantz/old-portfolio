export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  env: {
    nodeEnv: process.env.NODE_ENV || 'development',
    backendURL:
      process.env.BACKEND_URL || 'http://andreas-tollanes.com/graphql',
    useSSL: process.env.USE_SSL || false
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
  plugins: [],
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
    '@nuxtjs/proxy'
  ],

  proxy: [
    // Proxies /foo to http://example.com/foo
    'http://andreas-tollanes.com/graphql',
    'https://andreas-tollanes.com/graphql',
    'http://localhost:1337/graphql',
    'https://localhost:1337/graphql'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  apollo: {
    cookieAttributes: {
      secure: process.env.useSSL || false
    },

    clientConfigs: {
      default: {
        httpEndpoint: process.env.backendURL || 'http://localhost:1337/graphql'
      }
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    injected: true
  },
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
