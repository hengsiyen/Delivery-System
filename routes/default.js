import Permissions from '@/permissions'
import { dashboardRoutes } from '@/routes/dashboard'
import { accountRouters } from '@/routes/account'
import { settingRouters } from '@/routes/settings'
import { administrationRouters } from '@/routes/administrations'
import { unauthorizedRouters } from '@/routes/unauthorized'
import { errorsRouters } from '@/routes/error'
import { packageRouters } from '@/routes/pacakge'
import { shopRouters } from '@/routes/shop'
import { deliveryRouters } from '@/routes/delivery'
import App from '@/pages/admin/index'
import { driverRouters } from '@/routes/userdriver'
import { trackingRouters } from '@/routes/tracking'

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
    trackingRouters,
    packageRouters,
    deliveryRouters,
    driverRouters,
    shopRouters,
    accountRouters,
    settingRouters,
    administrationRouters,
    unauthorizedRouters,
    errorsRouters
  ]
}
