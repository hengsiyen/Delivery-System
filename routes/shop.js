import Permissions from '@/permissions'
import index from '@/pages/admin/shop/Index'
import list from '@/pages/admin/shop/List'
import show from '@/pages/admin/shop/Show'
import edit from '@/pages/admin/shop/Edit'
import create from '@/pages/admin/shop/Create'

export const shopRouters = {
  path: 'shop',
  component: index,
  redirect: 'shop',
  meta: {
    permissions: [Permissions.backend.shop.manage],
    groups: 'shop'
  },
  children: [
    {
      path: '',
      name: 'list-shop',
      component: list,
      meta: {
        permissions: [Permissions.backend.shop.list],
        groups: 'shop',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Shop',
            name_km: 'ហាង'
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
      name: 'create-shop',
      component: create,
      meta: {
        permissions: [Permissions.backend.shop.create],
        groups: 'shop',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Shop',
            name_km: 'ហាង'
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
      name: 'edit-shop',
      component: edit,
      meta: {
        permissions: [Permissions.backend.shop.edit],
        groups: 'shop',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Shop',
            name_km: 'ហាង'
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
      name: 'show-shop',
      component: show,
      meta: {
        permissions: [Permissions.backend.shop.show],
        groups: 'shop',
        breadcrumb: [
          {
            name_en: 'Settings',
            name_km: 'ការកំណត់'
          },
          {
            name_en: 'Shop',
            name_km: 'ហាង'
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
