import Permissions from '@/permissions'
import index from '@/pages/admin/settings/companyInfo/Index'
import edit from '@/pages/admin/settings/companyInfo/Edit'
import show from '@/pages/admin/settings/companyInfo/Show'
import showHistory from '@/pages/admin/settings/companyInfo/ShowCompanyHistory'

export const companyInfoRouters = {
  path: 'company-info',
  component: index,
  redirect: 'company-info',
  meta: {
    permissions: [Permissions.backend.setting.about.manage],
    groups: 'company-info'
  },
  children: [
    {
      path: '/edit',
      name: 'edit-company-info',
      component: edit,
      meta: {
        permissions: [Permissions.backend.setting.about.edit],
        groups: 'company-info',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Company Info',
            name_km: 'ព័ត៌មានក្រុមហ៊ុន'
          },
          {
            name_en: 'Edit',
            name_km: 'កែសម្រួល'
          }
        ]
      }
    },
    {
      path: '',
      name: 'show-company-info',
      component: show,
      meta: {
        permissions: [Permissions.backend.setting.about.show],
        groups: 'company-info',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Company Info',
            name_km: 'ព័ត៌មានក្រុមហ៊ុន'
          },
          {
            name_en: 'Show',
            name_km: 'បង្ហាញ'
          }
        ]
      }
    },
    {
      path: '/show-history/:id',
      name: 'show-company-history',
      component: showHistory,
      meta: {
        permissions: [Permissions.backend.setting.about.showHistory],
        groups: 'company-info',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Company Info',
            name_km: 'ព័ត៌មានក្រុមហ៊ុន'
          },
          {
            name_en: 'Show History',
            name_km: 'បង្ហាញប្រវត្តិកែប្រែ'
          }
        ]
      }
    }
  ]
}
