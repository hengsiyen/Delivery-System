import Permissions from '@/permissions'
import index from '@/pages/admin/settings/gender/Index'
import list from '@/pages/admin/settings/gender/List'
import create from '@/pages/admin/settings/gender/Create'
import edit from '@/pages/admin/settings/gender/Edit'
import show from '@/pages/admin/settings/gender/Show'

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
    },
    {
      path: 'create',
      name: 'create-gender',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.gender.create],
        groups: 'gender',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Gender',
            name_km: 'ភេទ',
            route: { name: 'list-gender' }
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
      name: 'edit-gender',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.packageType.edit],
        groups: 'gender',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Gender',
            name_km: 'ភេទ',
            route: { name: 'list-gender' }
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
      name: 'show-gender',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.packageType.show],
        groups: 'gender',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Gender',
            name_km: 'ភេទ',
            route: { name: 'list-gender' }
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
