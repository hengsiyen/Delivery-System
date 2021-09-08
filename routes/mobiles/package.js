import Index from '@/pages/mobile/package/Index'
import Create from '@/pages/mobile/package/Create'

export const mobilePackageRouters = {
  path: 'package',
  component: Index,
  redirect: 'package/create',
  children: [
    {
      name: 'mobile-package-create',
      path: 'create',
      component: Create
    }
  ]
}
