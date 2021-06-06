import Permissions from '~/permissions'
import index from '~/pages/admin/settings/gender/index'
import list from '~/pages/admin/settings/gender/list'

export const genderRouters = {
  path: 'gender',
  component: index,
  redirect: 'gender',
  meta: {
    permissions: [Permissions.backend.setting.gender.manage],
    groups: 'gender'
  },
  children: [
    {
      path: '',
      name: 'list-gender',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.gender.list],
        groups: 'gender',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Gender',
            name_km: 'ភេទ'
          }
        ]
      }
    }
  ]
}
