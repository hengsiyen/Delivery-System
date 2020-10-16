import Permissions from '~/permissions'
import index from '~/pages/admin/settings/permission/index'
import list from '~/pages/admin/settings/permission/list'

export const permissionRouters = {
  path: 'permission',
  component: index,
  redirect: 'permission',
  meta: {
    permissions: [Permissions.backend.setting.permission.manage]
  },
  children: [
    {
      path: '',
      name: 'list-permission',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.permission.list],
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Permission',
            name_km: 'សិទ្ធិ'
          }
        ]
      }
    }
  ]
}
