import { userRouters } from './user'
import { roleRouters } from './role'
import { permissionRouters } from './permission'
import Permissions from '~/permissions'
import Administration from '~/pages/admin/administration/index'

export const administrationRouters = {
  path: 'administration',
  name: 'administration',
  component: Administration,
  redirect: '',
  meta: {
    permissions: [Permissions.backend.administration.manage]
  },
  children: [
    userRouters,
    roleRouters,
    permissionRouters
  ]
}
