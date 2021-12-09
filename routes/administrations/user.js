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
    permissions: [Permissions.backend.administration.user.manage],
    groups: 'user'
  },
  children: [
    {
      path: '',
      name: 'list-user',
      component: list,
      meta: {
        permissions: [Permissions.backend.administration.user.list],
        groups: 'user',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User',
            name_km: 'អ្នកប្រើប្រាស់'
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
      name: 'create-user',
      component: create,
      meta: {
        permissions: [Permissions.backend.administration.user.store],
        groups: 'user',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User',
            name_km: 'អ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Add New',
            name_km: 'បន្ថែមថ្មី'
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
        groups: 'user',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User',
            name_km: 'អ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Edit',
            name_km: 'កែសម្រួល'
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
        groups: 'user',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User',
            name_km: 'អ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Show',
            name_km: 'បង្ហាញ'
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
        groups: 'user',
        breadcrumb: [
          {
            name_en: 'Administration',
            name_km: 'រដ្ឋបាល'
          },
          {
            name_en: 'User',
            name_km: 'អ្នកប្រើប្រាស់',
            route: { name: 'list-user' }
          },
          {
            name_en: 'Reset Password',
            name_km: 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ'
          }
        ]
      }
    }
  ]
}
