import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const files = require.context('../locales/', false, /\.json$/i)
const messages = {}
files.keys().forEach((key) => {
  const lang = key.split('/')[1].split('.')[0]
  messages[lang] = files(key)
})

let locale = 'en'

if (process.browser) {
  locale = localStorage.getItem('locale')
}

export default ({ app }) => {
  app.i18n = new VueI18n({
    locale,
    fallbackLocale: 'en',
    messages
  })
}
