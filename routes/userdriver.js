import Permissions from '@/permissions'
import index from '@/pages/admin/driver/Index'
import list from '@/pages/admin/driver/List'
import show from '@/pages/admin/driver/Show'
import edit from '@/pages/admin/driver/Edit'
import create from '@/pages/admin/driver/Create'

export const driverRouters = {
  path: 'driver',
  component: index,
  redirect: 'driver',
  meta: {
    permissions: [Permissions.backend.driver.manage],
    groups: 'driver'
  },
  children: [
    {
      path: '',
      name: 'list-driver',
      component: list,
      meta: {
        permissions: [Permissions.backend.driver.list],
        groups: 'driver',
        breadcrumb: [
          {
            name_en: 'Driver',
            name_km: 'អ្នកដឹកជញ្ជូន'
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
      name: 'create-driver',
      component: create,
      meta: {
        permissions: [Permissions.backend.driver.create],
        groups: 'driver',
        breadcrumb: [
          {
            name_en: 'Driver',
            name_km: 'អ្នកដឹកជញ្ជូន'
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
      name: 'edit-driver',
      component: edit,
      meta: {
        permissions: [Permissions.backend.driver.edit],
        groups: 'driver',
        breadcrumb: [
          {
            name_en: 'Driver',
            name_km: 'អ្នកដឹកជញ្ជូន'
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
      name: 'show-driver',
      component: show,
      meta: {
        permissions: [Permissions.backend.driver.show],
        groups: 'driver',
        breadcrumb: [
          {
            name_en: 'Driver',
            name_km: 'អ្នកដឹកជញ្ជូន'
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
