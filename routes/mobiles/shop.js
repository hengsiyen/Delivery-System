import Index from '@/pages/mobile/Shop/Index'
import List from '@/pages/mobile/Shop/List'
import Show from '@/pages/mobile/Shop/Show'

export const mobileShopRouters = {
  path: 'shop',
  component: Index,
  redirect: 'shop/list',
  meta: {
    groups: 'mobile-shop'
  },
  children: [
    {
      name: 'mobile-shop-list',
      path: 'list',
      component: List,
      meta: {
        groups: 'mobile-shop'
      }
    },
    {
      name: 'mobile-shop-show',
      path: 'show/:id',
      component: Show,
      meta: {
        groups: 'mobile-shop'
      }
    }
  ]
}
