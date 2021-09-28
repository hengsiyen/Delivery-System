import Permissions from '@/permissions'
import index from '@/pages/admin/partner-company/Index'
import list from '@/pages/admin/partner-company/List'
import show from '@/pages/admin/partner-company/Show'
import edit from '@/pages/admin/partner-company/Edit'
import create from '@/pages/admin/partner-company/Create'

export const PartnerCompanyRouters = {
  path: 'partner-company',
  component: index,
  redirect: 'partner-company',
  meta: {
    permissions: [Permissions.backend.partnerCompany.manage],
    groups: 'partner-company'
  },
  children: [
    {
      path: '',
      name: 'list-partner-company',
      component: list,
      meta: {
        permissions: [Permissions.backend.partnerCompany.list],
        groups: 'partner-company',
        breadcrumb: [
          {
            name_en: 'Partner Company',
            name_km: 'ក្រុមហ៊ុនដៃគូ'
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
      name: 'create-partner-company',
      component: create,
      meta: {
        permissions: [Permissions.backend.partnerCompany.create],
        groups: 'partner-company',
        breadcrumb: [
          {
            name_en: 'Partner Company',
            name_km: 'ក្រុមហ៊ុនដៃគូ'
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
      name: 'edit-partner-company',
      component: edit,
      meta: {
        permissions: [Permissions.backend.partnerCompany.edit],
        groups: 'partner-company',
        breadcrumb: [
          {
            name_en: 'Partner Company',
            name_km: 'ក្រុមហ៊ុនដៃគូ'
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
      name: 'show-partner-company',
      component: show,
      meta: {
        permissions: [Permissions.backend.partnerCompany.show],
        groups: 'partner-company',
        breadcrumb: [
          {
            name_en: 'Partner Company',
            name_km: 'ក្រុមហ៊ុនដៃគូ'
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
