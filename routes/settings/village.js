import Permissions from '@/permissions'
import index from '@/pages/admin/settings/village/Index'
import list from '@/pages/admin/settings/village/List'

export const villageRouters = {
  path: 'village',
  component: index,
  redirect: 'village',
  meta: {
    permissions: [Permissions.backend.setting.village.manage],
    groups: 'village'
  },
  children: [
    {
      path: '',
      name: 'list-village',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.village.list],
        groups: 'village',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Village',
            name_km: 'ភូមិ'
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
