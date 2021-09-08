import Vue from 'vue'
import Router from 'vue-router'
import { authRouters } from '@/routes/auth'
import { defaultRouters } from '@/routes/default'
import { mobileRouters } from '@/routes/mobile'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      authRouters,
      mobileRouters,
      defaultRouters
    ]
  })
}
