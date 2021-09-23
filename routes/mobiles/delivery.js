import Permissions from '@/permissions'
import Index from '@/pages/mobile/delivery/Index'
import ListPackage from '@/pages/mobile/delivery/ListPackage'

export const mobileDeliveryRouters = {
  path: 'delivery',
  component: Index,
  redirect: 'delivery/list-package',
  children: [
    {
      name: 'mobile-delivery-list-package',
      path: 'list-package',
      component: ListPackage,
      meta: {
        permissions: [Permissions.backend.delivery.listPackage],
        groups: 'delivery'
      }
    }
  ]
}
