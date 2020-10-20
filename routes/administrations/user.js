import Permissions from '~/permissions'
import index from '~/pages/admin/administration/user/index'
import list from '~/pages/admin/administration/user/list'
import create from '~/pages/admin/administration/user/create'
import edit from '~/pages/admin/administration/user/edit'
import show from '~/pages/admin/administration/user/show'
import resetPassword from '~/pages/admin/administration/user/resetPassword'

export const userRouters = {
  path: 'user',
  component: index,
  redirect: 'user',
  meta: {
    permissions: [Permissions.backend.administration.user.manage]
  },
  children: [
    {
      path: '',
      name: 'list-user',
      component: list,
      meta: {
        permissions: [Permissions.backend.administration.user.list],
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User List',
            name_km: 'បញ្ជីអ្នកប្រើប្រាស់'
          }
        ]
      }
    },
    {
      path: 'create',
      name: 'create-user',
      component: create,
      meta: {
        permissions: [Permissions.backend.administration.user.store],
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User List',
            name_km: 'បញ្ជីអ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Create User',
            name_km: 'បង្កើតអ្នកប្រើប្រាស់ថ្មី'
          }
        ]
      }
    },
    {
      path: 'edit/:uuid',
      name: 'edit-user',
      component: edit,
      meta: {
        permissions: [Permissions.backend.administration.user.edit],
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User List',
            name_km: 'បញ្ជីអ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Edit User',
            name_km: 'កែប្រែព័ត៌មានអ្នកប្រើប្រាស់'
          }
        ]
      }
    },
    {
      path: 'show/:uuid',
      name: 'show-user',
      component: show,
      meta: {
        permissions: [Permissions.backend.administration.user.show],
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User List',
            name_km: 'បញ្ជីអ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Use Detail',
            name_km: 'បង្ហាញព័ត៌មានអ្នកប្រើប្រាស់'
          }
        ]
      }
    },
    {
      path: 'reset-password/:uuid',
      name: 'reset-password',
      component: resetPassword,
      meta: {
        permissions: [Permissions.backend.administration.user.changePassword],
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User List',
            name_km: 'បញ្ជីអ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Reset User Password',
            name_km: 'កំណត់ពាក្យសម្ងាត់របស់អ្នកប្រើប្រាស់ឡើងវិញ'
          }
        ]
      }
    }
  ]
}
