import Permissions from '~/permissions'
import index from '~/pages/admin/administration/permission/index'
import list from '~/pages/admin/administration/permission/list'

export const permissionRouters = {
  path: 'permission',
  component: index,
  redirect: 'permission',
  meta: {
    permissions: [Permissions.backend.administration.permission.manage],
    groups: 'permission'
  },
  children: [
    {
      path: '',
      name: 'list-permission',
      component: list,
      meta: {
        permissions: [Permissions.backend.administration.permission.list],
        groups: 'permission',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
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
