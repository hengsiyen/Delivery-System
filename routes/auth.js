import Auth from '@/layouts/auth'
import Login from '@/pages/index'

export const authRouters = {
  path: '/',
  component: Auth,
  redirect: 'login',
  meta: {
    noAuth: true
  },
  children: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {
        noAuth: true
      }
    }
  ]
}
