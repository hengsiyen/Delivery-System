import Permissions from '@/permissions'
import index from '@/pages/admin/settings/exchangeRate/Index'
import list from '@/pages/admin/settings/exchangeRate/List'

export const exchangeRateRouters = {
  path: 'exchange-rate',
  component: index,
  redirect: 'exchange-rate',
  meta: {
    permissions: [Permissions.backend.setting.exchangeRate.manage],
    groups: 'exchange-rate'
  },
  children: [
    {
      path: '',
      name: 'list-exchange-rate',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.exchangeRate.list],
        groups: 'exchange-rate',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Exchange Rate',
            name_km: 'អត្រាប្តូរប្រាក់'
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
