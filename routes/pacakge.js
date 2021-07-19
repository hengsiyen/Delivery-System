import Permissions from '@/permissions'
import index from '@/pages/admin/package/Index'
import list from '@/pages/admin/package/List'
import show from '@/pages/admin/package/Show'
import edit from '@/pages/admin/package/Edit'
import create from '@/pages/admin/package/Create'

export const packageRouters = {
  path: 'package',
  component: index,
  redirect: 'package',
  meta: {
    permissions: [Permissions.backend.package.manage],
    groups: 'package'
  },
  children: [
    {
      path: '',
      name: 'list-package',
      component: list,
      meta: {
        permissions: [Permissions.backend.package.list],
        groups: 'package',
        breadcrumb: [
          {
            name_en: 'Package',
            name_km: 'កញ្ចប់អីវ៉ាន់'
          },
          {
            name_en: 'List',
            name_km: 'បញ្ជី'
          }
        ]
      }
    },
    {
      path: 'create',
      name: 'create-package',
      component: create,
      meta: {
        permissions: [Permissions.backend.package.create],
        groups: 'package',
        breadcrumb: [
          {
            name_en: 'Package',
            name_km: 'កញ្ចប់អីវ៉ាន់'
          },
          {
            name_en: 'Add New',
            name_km: 'បន្ថែមថ្មី'
          }
        ]
      }
    },
    {
      path: 'edit/:id',
      name: 'edit-package',
      component: edit,
      meta: {
        permissions: [Permissions.backend.package.edit],
        groups: 'package',
        breadcrumb: [
          {
            name_en: 'Package',
            name_km: 'កញ្ចប់អីវ៉ាន់'
          },
          {
            name_en: 'Edit',
            name_km: 'កែសម្រួល'
          }
        ]
      }
    },
    {
      path: 'show/:id',
      name: 'show-package',
      component: show,
      meta: {
        permissions: [Permissions.backend.package.show],
        groups: 'package',
        breadcrumb: [
          {
            name_en: 'Package',
            name_km: 'កញ្ចប់អីវ៉ាន់'
          },
          {
            name_en: 'Show',
            name_km: 'បង្ហាញ'
          }
        ]
      }
    }
  ]
}
