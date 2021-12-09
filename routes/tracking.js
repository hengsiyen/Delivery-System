import Permissions from '@/permissions'
import index from '@/pages/admin/tracking/Index'
import list from '@/pages/admin/tracking/List'

export const trackingRouters = {
  path: 'tracking',
  component: index,
  redirect: 'tracking',
  meta: {
    permissions: [Permissions.backend.tracking.manage],
    groups: 'tracking'
  },
  children: [
    {
      path: '',
      name: 'list-tracking',
      component: list,
      meta: {
        permissions: [Permissions.backend.tracking.list],
        groups: 'tracking',
        breadcrumb: [
          {
            name_en: 'Tracking',
            name_km: 'ការតាមដាន'
          },
          {
            name_en: 'List',
            name_km: 'បញ្ជី'
          }
        ]
      }
    }
  ]
}
