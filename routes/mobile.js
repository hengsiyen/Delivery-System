import Layout from '@/pages/mobile/Index'
import { mobilePackageRouters } from '@/routes/mobiles/package'
import { mobileShopRouters } from '@/routes/mobiles/shop'

export const mobileRouters = {
  path: '/mobile',
  component: Layout,
  children: [
    mobileShopRouters,
    mobilePackageRouters
  ]
}
