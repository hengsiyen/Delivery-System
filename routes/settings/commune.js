import Permissions from '@/permissions'
import index from '@/pages/admin/settings/commune/Index'
import list from '@/pages/admin/settings/commune/List'

export const communeRouters = {
  path: 'commune',
  component: index,
  redirect: 'commune',
  meta: {
    permissions: [Permissions.backend.setting.commune.manage],
    groups: 'commune'
  },
  children: [
    {
      path: '',
      name: 'list-commune',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.commune.list],
        groups: 'commune',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Commune / Sangkat',
            name_km: 'ឃុំ / សង្កាត់'
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
