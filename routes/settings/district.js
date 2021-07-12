import Permissions from '@/permissions'
import index from '@/pages/admin/settings/district/Index'
import list from '@/pages/admin/settings/district/List'

export const districtRouters = {
  path: 'district',
  component: index,
  redirect: 'district',
  meta: {
    permissions: [Permissions.backend.setting.district.manage],
    groups: 'district'
  },
  children: [
    {
      path: '',
      name: 'list-district',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.district.list],
        groups: 'district',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'District / Khan',
            name_km: 'ស្រុក / ខណ្ឌ'
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
