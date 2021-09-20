import Permissions from '@/permissions'
import index from '@/pages/admin/settings/currency/Index'
import list from '@/pages/admin/settings/currency/List'
import create from '@/pages/admin/settings/currency/Create'
import edit from '@/pages/admin/settings/currency/Edit'
import show from '@/pages/admin/settings/currency/Show'

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
    },
    {
      path: 'create',
      name: 'create-currency',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.currency.create],
        groups: 'currency',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Currency',
            name_km: 'រូបិយប័ណ្ណ',
            route: { name: 'list-currency' }
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
      name: 'edit-currency',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.currency.edit],
        groups: 'currency',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Currency',
            name_km: 'រូបិយប័ណ្ណ',
            route: { name: 'list-currency' }
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
      name: 'show-currency',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.currency.show],
        groups: 'currency',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Currency',
            name_km: 'រូបិយប័ណ្ណ',
            route: { name: 'list-currency' }
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
