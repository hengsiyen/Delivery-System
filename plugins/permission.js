import Vue from 'vue'
import Permissions, { copyPermission } from '~/permissions'

Vue.prototype.$Permissions = Permissions

Object.defineProperty(window, 'permission', {
  get: copyPermission
})
