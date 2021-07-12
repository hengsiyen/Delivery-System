import Permissions from '@/permissions'
import index from '@/pages/admin/settings/paymentType/Index'
import list from '@/pages/admin/settings/paymentType/List'

export const paymentTypeRouters = {
  path: 'payment-type',
  component: index,
  redirect: 'payment-type',
  meta: {
    permissions: [Permissions.backend.setting.paymentType.manage],
    groups: 'payment-type'
  },
  children: [
    {
      path: '',
      name: 'list-payment-type',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.paymentType.list],
        groups: 'payment-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Payment Type',
            name_km: 'ប្រភេទការទូទាត់'
          },
          {
            name_en: 'List',
            name_km: 'បញ្ជី'
          }
        ]
      }
    }
  ]
}
