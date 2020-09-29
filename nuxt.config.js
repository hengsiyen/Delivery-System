export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'box-backend-nuxtjs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic' }
    ],
    script: [
      { src: '/js/adminlte/jquery.min.js' },
      { src: '/js/adminlte/bootstrap.min.js' },
      { src: '/js/adminlte/adminlte.min.js' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    { src: 'bootstrap/dist/css/bootstrap.min.css', lang: 'css' },
    { src: 'font-awesome/css/font-awesome.min.css', lang: 'css' },
    { src: 'adminlte/dist/css/AdminLTE.min.css', lang: 'css' },
    { src: 'adminlte/dist/css/skins/skin-blue.min.css', lang: 'css' },
    '@/assets/css/fonts.css',
    '@/assets/css/login.css',
    '@/assets/css/app.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/i18n.js',
    { src: '~/plugins/vue-toastr.js', mode: 'client' },
    { src: '~/plugins/vue-loading.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
