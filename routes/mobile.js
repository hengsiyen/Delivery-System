import Layout from '@/pages/mobile/Index'
import { mobilePackageRouters } from '@/routes/mobiles/package'
import { mobileShopRouters } from '@/routes/mobiles/shop'
import { mobileDeliveryRouters } from '@/routes/mobiles/delivery'
import { mobileAssignedRouters } from '@/routes/mobiles/assigned'

export const mobileRouters = {
  path: '/mobile',
  component: Layout,
  children: [
    mobileShopRouters,
    mobilePackageRouters,
    mobileDeliveryRouters,
    mobileAssignedRouters
  ]
}
