module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'eslint:recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'vue/order-in-components': 'off',
    'no-prototype-builtins': 'off'
  }
}
