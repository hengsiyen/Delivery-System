import Permissions from '@/permissions'
import index from '@/pages/admin/settings/province/Index'
import list from '@/pages/admin/settings/province/List'

export const provinceRouters = {
  path: 'province',
  component: index,
  redirect: 'province',
  meta: {
    permissions: [Permissions.backend.setting.province.manage],
    groups: 'province'
  },
  children: [
    {
      path: '',
      name: 'list-province',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.province.list],
        groups: 'province',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Province / Capital',
            name_km: 'ខេត្ត / រាជធានី'
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
