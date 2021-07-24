import Permissions from '@/permissions'
import index from '@/pages/admin/delivery/Index'
import assign from '@/pages/admin/delivery/Assign'

export const deliveryRouters = {
  path: 'delivery',
  component: index,
  redirect: 'delivery',
  meta: {
    permissions: [Permissions.backend.delivery.manage],
    groups: 'delivery'
  },
  children: [
    {
      path: '',
      name: 'assign-package',
      component: assign,
      meta: {
        permissions: [Permissions.backend.delivery.assign],
        groups: 'delivery',
        breadcrumb: [
          {
            name_en: 'Delivery',
            name_km: 'ការដឹកជញ្ជូន'
          },
          {
            name_en: 'Assign Package',
            name_km: 'បែងចែកកញ្ចប់អីវ៉ាន់'
          }
        ]
      }
    }
  ]
}
