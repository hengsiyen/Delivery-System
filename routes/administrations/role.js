import Permissions from '~/permissions'
import index from '~/pages/admin/administration/role/index'
import list from '~/pages/admin/administration/role/list'
import create from '~/pages/admin/administration/role/create'
import edit from '~/pages/admin/administration/role/edit'

export const roleRouters = {
  path: 'role',
  component: index,
  redirect: 'role',
  meta: {
    permissions: [Permissions.backend.administration.role.manage],
    groups: 'role'
  },
  children: [
    {
      path: '',
      name: 'list-role',
      component: list,
      meta: {
        permissions: [Permissions.backend.administration.role.list],
        groups: 'role',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
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
        permissions: [Permissions.backend.administration.role.store],
        groups: 'role',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
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
        permissions: [Permissions.backend.administration.role.show],
        groups: 'role',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
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
        permissions: [Permissions.backend.administration.role.edit],
        groups: 'role',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
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
