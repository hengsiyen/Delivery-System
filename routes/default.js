import { dashboardRoutes } from '@/routes/dashboard'
import Permissions from '@/permissions'
import { accountRouters } from '@/routes/account'
import { settingRouters } from '@/routes/settings'
import { administrationRouters } from '@/routes/administrations'
import { unauthorizedRouters } from './unauthorized'
import { errorsRouters } from './error'
import App from '~/pages/admin/index'

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
    accountRouters,
    settingRouters,
    administrationRouters,
    unauthorizedRouters,
    errorsRouters
  ]
}
