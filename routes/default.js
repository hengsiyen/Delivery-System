import { dashboardRoutes } from '@/routes/dashboard'
import { accountRouters } from '@/routes/account'
import { settingRouters } from '@/routes/settings'
import { administrationRouters } from '@/routes/administrations'
import { unauthorizedRouters } from '@/routes/unauthorized'
import { errorsRouters } from '@/routes/error'
import { shopRouters } from '@/routes/shop'
import Permissions from '@/permissions'
import App from '@/pages/admin/index'

export const defaultRouters = {
  path: '/admin',
  name: 'primary',
  component: App,
  redirect: '/admin/dashboard',
  meta: {
    permissions: [Permissions.backend.manage]
  },
  children: [
    dashboardRoutes,
    shopRouters,
    accountRouters,
    settingRouters,
    administrationRouters,
    unauthorizedRouters,
    errorsRouters
  ]
}
