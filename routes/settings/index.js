import { provinceRouters } from '@/routes/settings/province'
import { districtRouters } from '@/routes/settings/district'
import { communeRouters } from '@/routes/settings/commune'
import { villageRouters } from '@/routes/settings/village'
import { genderRouters } from '@/routes/settings/gender'
import Setting from '@/pages/admin/settings/index'
import Permissions from '@/permissions'
import { packageTypeRouters } from '@/routes/settings/package-type'
import { paymentTypeRouters } from '@/routes/settings/payment-type'
import { currencyRouters } from '@/routes/settings/currency'
import { exchangeRateRouters } from '@/routes/settings/exchange-rate'
import { companyInfoRouters } from '@/routes/settings/company-info'

export const settingRouters = {
  path: 'settings',
  name: 'settings',
  component: Setting,
  redirect: 'gender',
  meta: {
    permissions: [Permissions.backend.setting.manage]
  },
  children: [
    packageTypeRouters,
    paymentTypeRouters,
    currencyRouters,
    exchangeRateRouters,
    genderRouters,
    provinceRouters,
    districtRouters,
    communeRouters,
    villageRouters,
    companyInfoRouters
  ]
}
