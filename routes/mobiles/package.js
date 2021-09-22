import Index from '@/pages/mobile/package/Index'
import Create from '@/pages/mobile/package/Create'
import Edit from '@/pages/mobile/package/Edit'

export const mobilePackageRouters = {
  path: 'package',
  component: Index,
  redirect: 'package/create',
  children: [
    {
      name: 'mobile-package-create',
      path: 'create',
      component: Create
    },
    {
      name: 'mobile-package-edit',
      path: 'edit/:id',
      component: Edit
    }
  ]
}
