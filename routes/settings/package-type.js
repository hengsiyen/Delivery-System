import Permissions from '@/permissions'
import index from '@/pages/admin/settings/packageType/Index'
import list from '@/pages/admin/settings/packageType/List'
import create from '@/pages/admin/settings/packageType/Create'
import edit from '@/pages/admin/settings/packageType/Edit'
import show from '@/pages/admin/settings/packageType/Show'

export const packageTypeRouters = {
  path: 'package-type',
  component: index,
  redirect: 'package-type',
  meta: {
    permissions: [Permissions.backend.setting.packageType.manage],
    groups: 'package-type'
  },
  children: [
    {
      path: '',
      name: 'list-package-type',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.packageType.list],
        groups: 'package-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Package Type',
            name_km: 'ប្រភេទកញ្ចប់'
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
      name: 'create-package-type',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.packageType.create],
        groups: 'package-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Package Type',
            name_km: 'ប្រភេទកញ្ចប់',
            route: { name: 'list-package-type' }
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
      name: 'edit-package-type',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.packageType.edit],
        groups: 'package-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Package Type',
            name_km: 'ប្រភេទកញ្ចប់',
            route: { name: 'list-package-type' }
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
      name: 'show-package-type',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.packageType.show],
        groups: 'package-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Package Type',
            name_km: 'ប្រភេទកញ្ចប់',
            route: { name: 'list-package-type' }
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
