import Permissions from '@/permissions'
import index from '@/pages/admin/report/Index'
import dashboard from '@/pages/admin/report/Dashboard'

export const ReportRouters = {
  path: 'report',
  component: index,
  redirect: 'report',
  meta: {
    permissions: [Permissions.backend.report.manage],
    groups: 'report'
  },
  children: [
    {
      path: '',
      name: 'report-dashboard',
      component: dashboard,
      meta: {
        permissions: [Permissions.backend.report.dashboard],
        groups: 'report',
        breadcrumb: [
          {
            name_en: 'Report',
            name_km: 'របាយការណ៍'
          },
          {
            name_en: 'Dashboard',
            name_km: 'ផ្ទាំងគ្របគ្រង'
          }
        ]
      }
    }
  ]
}
