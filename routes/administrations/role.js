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
            name_en: 'Role',
            name_km: 'តួនាទី'
          },
          {
            name_en: 'Role',
            name_km: 'បញ្ជី'
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
            name_en: 'Role',
            name_km: 'តួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Add New',
            name_km: 'បន្ថែមថ្មី'
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
            name_en: 'Role',
            name_km: 'តួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Show',
            name_km: 'បង្ហាញ'
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
            name_en: 'Role',
            name_km: 'តួនាទី',
            route: { name: 'list-role' }
          },
          {
            name_en: 'Edit',
            name_km: 'កែសម្រួល'
          }
        ]
      }
    }
  ]
}
