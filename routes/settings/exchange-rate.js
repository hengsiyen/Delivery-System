import Permissions from '@/permissions'
import index from '@/pages/admin/settings/exchangeRate/Index'
import list from '@/pages/admin/settings/exchangeRate/List'
import create from '@/pages/admin/settings/exchangeRate/Create'
import edit from '@/pages/admin/settings/exchangeRate/Edit'
import show from '@/pages/admin/settings/exchangeRate/Show'

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
    },
    {
      path: 'create',
      name: 'create-exchange-rate',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.exchangeRate.create],
        groups: 'exchange-rate',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Exchange Rate',
            name_km: 'អត្រាប្តូរប្រាក់',
            route: { name: 'list-exchange-rate' }
          },
          {
            name_en: 'Add New',
            name_km: 'បន្ថែមថ្មី'
          }
        ]
      }
    },
    {
      path: 'edit/:id',
      name: 'edit-exchange-rate',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.exchangeRate.edit],
        groups: 'exchange-rate',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Exchange Rate',
            name_km: 'អត្រាប្តូរប្រាក់',
            route: { name: 'list-exchange-rate' }
          },
          {
            name_en: 'Edit',
            name_km: 'កែសម្រួល'
          }
        ]
      }
    },
    {
      path: 'show/:id',
      name: 'show-exchange-rate',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.exchangeRate.show],
        groups: 'exchange-rate',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Exchange Rate',
            name_km: 'អត្រាប្តូរប្រាក់',
            route: { name: 'list-exchange-rate' }
          },
          {
            name_en: 'Show',
            name_km: 'បង្ហាញ'
          }
        ]
      }
    }
  ]
}
