import Permissions from '@/permissions'
import index from '@/pages/admin/settings/packageType/Index'
import list from '@/pages/admin/settings/packageType/List'

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
    }
  ]
}
