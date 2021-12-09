import Index from '@/pages/mobile/history/Index'
import Show from '@/pages/mobile/history/Show'

export const mobileHistoryRouters = {
  path: 'delivery-history',
  component: Index,
  redirect: 'delivery-history/show',
  meta: {
    groups: 'mobile-delivery-history'
  },
  children: [
    {
      name: 'mobile-delivery-history-show',
      path: 'show',
      component: Show,
      meta: {
        groups: 'mobile-delivery-history'
      }
    }
  ]
}
