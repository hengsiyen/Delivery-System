import dashboard from '~/pages/admin/dashboard/index'
import Permissions from '~/permissions'

export const dashboardRoutes = {
  path: 'dashboard',
  name: 'admin',
  component: dashboard,
  meta: {
    permissions: [Permissions.backend.manage],
    groups: 'dashboard'
  }
}
