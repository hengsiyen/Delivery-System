import Permissions from '@/permissions'
import index from '@/pages/admin/settings/currency/Index'
import list from '@/pages/admin/settings/currency/List'

export const currencyRouters = {
  path: 'currency',
  component: index,
  redirect: 'currency',
  meta: {
    permissions: [Permissions.backend.setting.currency.manage],
    groups: 'currency'
  },
  children: [
    {
      path: '',
      name: 'list-currency',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.currency.list],
        groups: 'currency',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Currency',
            name_km: 'រូបិយប័ណ្ណ'
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
