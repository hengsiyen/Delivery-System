import Permissions from '@/permissions'
import App from '@/pages/admin/index'
import { dashboardRoutes } from '@/routes/dashboard'
import { accountRouters } from '@/routes/account'
import { settingRouters } from '@/routes/settings'
import { administrationRouters } from '@/routes/administrations'
import { unauthorizedRouters } from '@/routes/unauthorized'
import { errorsRouters } from '@/routes/error'
import { packageRouters } from '@/routes/pacakge'
import { shopRouters } from '@/routes/shop'
import { deliveryRouters } from '@/routes/delivery'
import { driverRouters } from '@/routes/userdriver'
import { trackingRouters } from '@/routes/tracking'
import { invoiceRouters } from '@/routes/invoice'
import { PartnerCompanyRouters } from '@/routes/partner-company'
import { ReportRouters } from '@/routes/report'

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
    invoiceRouters,
    PartnerCompanyRouters,
    ReportRouters,
    accountRouters,
    settingRouters,
    administrationRouters,
    unauthorizedRouters,
    errorsRouters
  ]
}
