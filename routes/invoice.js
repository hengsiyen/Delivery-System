import Permissions from '@/permissions'
import index from '@/pages/admin/invoice/Index'
import list from '@/pages/admin/invoice/List'
import show from '@/pages/admin/invoice/Show'
import create from '@/pages/admin/invoice/Create'
// import edit from '@/pages/admin/Invoice/Edit'

export const invoiceRouters = {
  path: 'invoice',
  component: index,
  redirect: 'invoice',
  meta: {
    permissions: [Permissions.backend.invoice.manage],
    groups: 'invoice'
  },
  children: [
    {
      path: '',
      name: 'list-invoice',
      component: list,
      meta: {
        permissions: [Permissions.backend.invoice.list],
        groups: 'invoice',
        breadcrumb: [
          {
            name_en: 'Invoice',
            name_km: 'វិក្កយបត្រ'
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
      name: 'create-invoice',
      component: create,
      meta: {
        permissions: [Permissions.backend.invoice.create],
        groups: 'invoice',
        breadcrumb: [
          {
            name_en: 'Invoice',
            name_km: 'វិក្កយបត្រ'
          },
          {
            name_en: 'Add New',
            name_km: 'បន្ថែមថ្មី'
          }
        ]
      }
    },
    // {
    //   path: 'edit/:id',
    //   name: 'edit-invoice',
    //   component: edit,
    //   meta: {
    //     permissions: [Permissions.backend.invoice.edit],
    //     groups: 'invoice',
    //     breadcrumb: [
    //       {
    //         name_en: 'Invoice',
    //         name_km: 'វិក្កយបត្រ'
    //       },
    //       {
    //         name_en: 'Edit',
    //         name_km: 'កែសម្រួល'
    //       }
    //     ]
    //   }
    // },
    {
      path: 'show/:id',
      name: 'show-invoice',
      component: show,
      meta: {
        permissions: [Permissions.backend.invoice.show],
        groups: 'invoice',
        breadcrumb: [
          {
            name_en: 'Invoice',
            name_km: 'វិក្កយបត្រ'
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
