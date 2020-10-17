import Vue from 'vue'
import Vuex from 'vuex'
// eslint-disable-next-line import/default
import user from './modules/user'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    modules: {
      user
    }
  })
}
