import { genderRouters } from './gender'
import Permissions from '~/permissions'
import Setting from '~/pages/admin/settings/index'

export const settingRouters = {
  path: 'settings',
  name: 'settings',
  component: Setting,
  redirect: 'gender',
  meta: {
    permissions: [Permissions.backend.setting.manage]
  },
  children: [
    genderRouters
  ]
}
