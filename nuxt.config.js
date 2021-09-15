// eslint-disable-next-line nuxt/no-cjs-in-config
const webpack = require('webpack')
require('dotenv').config()

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Delivery System',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/app.scss',
    '@/node_modules/vue2-daterange-picker/dist/vue2-daterange-picker.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/main.js', mode: 'client' },
    { src: '~/plugins/i18n.js' },
    { src: '~/plugins/axios.js', mode: 'client' },
    { src: '~/plugins/script.js', mode: 'client' },
    { src: '~/plugins/permission.js', mode: 'client' },
    { src: '~/plugins/vue-toastr.js', mode: 'client' },
    { src: '~/plugins/vue2-datepicker.js', mode: 'client' },
    { src: '~/plugins/vue-loading.js', mode: 'client' },
    { src: '~/plugins/vue-paginate.js', mode: 'client' },
    { src: '~/plugins/x-backend.js', mode: 'client' },
    { src: '~/plugins/x-chart.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-number-format.js', mode: 'client' },
    { src: '~/plugins/vue-mask.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-infinite-loading.js', mode: 'client', ssr: false },
    { src: '~/plugins/vue-crop-avatar.js', mode: 'client' },
    { src: '~/plugins/vue-croppie.js', mode: 'client', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/router',
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/moment',
    '@nuxtjs/google-fonts'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://github.com/nuxt-community/universal-storage-module
    '@nuxtjs/universal-storage',
    // https://www.npmjs.com/package/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.VUE_APP_API
  },

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  },

  sweetalert: {
    confirmButtonColor: '#3a7afe',
    cancelButtonColor: '#ed524f'
  },

  server: {
    port: 3008
  },

  extend (config, ctx) {
    config.resolve.symlinks = false
  },

  googleFonts: {
    families: {
      Nunito: true,
      Lato: true,
      'Source Sans Pro': true,
      Raleway: true
    }
  }
}
