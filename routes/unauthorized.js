import unauthorized from '~/pages/admin/errors/unauthorized'

export const unauthorizedRouters = {
  path: 'unauthorized',
  name: 'unauthorized',
  component: unauthorized,
  meta: {
    noAuth: true,
    breadcrumb: [
      {
        name_en: 'Unauthorized',
        name_km: 'គ្មានការអនុញ្ញាត'
      },
      {
        name_en: '404',
        name_km: '៤០៤'
      }
    ]
  }
}
