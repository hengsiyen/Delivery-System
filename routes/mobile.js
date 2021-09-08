import Layout from '@/pages/mobile/Index'
import { mobilePackageRouters } from '@/routes/mobiles/package'

export const mobileRouters = {
  path: '/mobile',
  component: Layout,
  children: [
    mobilePackageRouters
  ]
}
