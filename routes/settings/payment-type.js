import Permissions from '@/permissions'
import index from '@/pages/admin/settings/paymentType/Index'
import list from '@/pages/admin/settings/paymentType/List'
import create from '@/pages/admin/settings/paymentType/Create'
import edit from '@/pages/admin/settings/paymentType/Edit'
import show from '@/pages/admin/settings/paymentType/Show'

export const paymentTypeRouters = {
  path: 'payment-type',
  component: index,
  redirect: 'payment-type',
  meta: {
    permissions: [Permissions.backend.setting.paymentType.manage],
    groups: 'payment-type'
  },
  children: [
    {
      path: '',
      name: 'list-payment-type',
      component: list,
      meta: {
        permissions: [Permissions.backend.setting.paymentType.list],
        groups: 'payment-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Payment Type',
            name_km: 'ប្រភេទការទូទាត់'
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
      name: 'create-payment-type',
      component: create,
      meta: {
        permissions: [Permissions.backend.setting.paymentType.create],
        groups: 'payment-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Payment Type',
            name_km: 'ប្រភេទការទូទាត់',
            route: { name: 'list-payment-type' }
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
      name: 'edit-payment-type',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.paymentType.edit],
        groups: 'payment-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Payment Type',
            name_km: 'ប្រភេទកញ្ចប់',
            route: { name: 'list-payment-type' }
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
      name: 'show-payment-type',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.paymentType.show],
        groups: 'payment-type',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Payment Type',
            name_km: 'ប្រភេទកញ្ចប់',
            route: { name: 'list-payment-type' }
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
