import Permissions from '@/permissions'
import Index from '@/pages/mobile/assigned/Index'
import ListPackage from '@/pages/mobile/assigned/ListPackage'

export const mobileAssignedRouters = {
  path: 'assigned',
  component: Index,
  redirect: 'assigned/list-package',
  meta: {
    permissions: [Permissions.backend.delivery.manage],
    groups: 'mobile-assigned'
  },
  children: [
    {
      name: 'mobile-assigned-list-package',
      path: 'list-package',
      component: ListPackage,
      meta: {
        permissions: [Permissions.backend.delivery.listPackage],
        groups: 'mobile-assigned'
      }
    }
  ]
}
