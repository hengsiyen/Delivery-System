import Permissions from '~/permissions'
import index from '~/pages/admin/settings/role/index'
import list from '~/pages/admin/settings/role/list'
import create from '~/pages/admin/settings/role/create'
import edit from '~/pages/admin/settings/role/edit'

export const roleRouters = {
  path: 'role',
  component: index,
  redirect: 'role',
  meta: {
    permissions: [Permissions.backend.setting.role.manage]
  },
  children: [
    {
      path: '',
      name: 'list-role',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.role.list],
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Role List',
            name_km: 'បញ្ជីតួនាទី'
          }
        ]
      }
    },
    {
      path: 'create',
      name: 'create-role',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.role.store],
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Role List',
            name_km: 'បញ្ជីតួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Create Role',
            name_km: 'បង្កើតតួនាទី'
          }
        ]
      }
    },
    {
      path: 'show/:id',
      name: 'show-role',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.role.show],
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Role List',
            name_km: 'បញ្ជីតួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Role Detail',
            name_km: 'លម្អីតព័ត៌មានតួនាទី'
          }
        ]
      }
    },
    {
      path: 'edit/:id',
      name: 'edit-role',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.role.edit],
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Role List',
            name_km: 'បញ្ជីតួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Edit Role',
            name_km: 'កែប្រែព័ត៌មានតួនាទី'
          }
        ]
      }
    }
  ]
}
