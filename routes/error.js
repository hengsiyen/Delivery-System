import notfound from '~/pages/admin/errors/notfound'

export const errorsRouters = {
  path: '*',
  name: 'notfound',
  meta: {
    noAuth: true,
    breadcrumb: [
      {
        name_en: 'Error',
        name_km: 'ទំព័ររកមិនឃើញ'
      },
      {
        name_en: '404',
        name_km: '៤០៤'
      }
    ]
  },
  component: notfound
}
