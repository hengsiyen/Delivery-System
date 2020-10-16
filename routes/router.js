import Vue from 'vue'
import Router from 'vue-router'
import { authRouters } from '@/routes/auth'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      authRouters
    ]
  })
}
