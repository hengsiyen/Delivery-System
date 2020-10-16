export const authRouters = {
  path: '',
  component: () => import('~/layouts/auth'),
  children: [
    {
      name: 'login',
      path: 'login',
      component: () => import('~/pages/index')
    }
  ]
}
