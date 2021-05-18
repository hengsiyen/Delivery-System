import { generatePhpArray } from './mixins/permission/covertPhpArray'

/* eslint no-use-before-define: 0 */
const Permissions = {
  backend: {
    name: {
      en: 'Backend',
      km: 'ផ្ទាំងក្រោយ'
    },
    manage: 'manage-backend',
    dashboard: {
      name: {
        en: 'Dashboard',
        km: 'ទំព័រដើម'
      },
      manage: 'manage-dashboard',
      show: 'show-dashboard'
    },
    setting: {
      name: {
        en: 'Settings',
        km: 'ការកំណត់'
      },
      manage: 'manage-setting',
      gender: {
        name: {
          en: 'Gender',
          km: 'ភេទ'
        },
        manage: 'manage-gender',
        list: 'list-gender'
      }
    },
    administration: {
      name: {
        en: 'Administration',
        km: 'រដ្ឋបាល'
      },
      manage: 'manage-administration',
      user: {
        name: {
          en: 'User',
          km: 'អ្នកប្រើប្រាស់'
        },
        manage: 'manage-user',
        list: 'list-user',
        show: 'show-user',
        store: 'store-user',
        edit: 'edit-user',
        changePassword: 'change-user-password'
      },
      role: {
        name: {
          en: 'Role',
          km: 'តួនាទី'
        },
        manage: 'manage-role',
        list: 'list-role',
        show: 'show-role',
        store: 'store-role',
        edit: 'edit-role',
        delete: 'delete-role'
      },
      permission: {
        name: {
          en: 'Permission',
          km: 'សិទ្ធិ'
        },
        manage: 'manage-permission',
        list: 'list-permission'
      }
    }
  }
}

export const copyPermission = () => {
  const textArea = document.createElement('textarea')
  textArea.value = generatePhpArray(Permissions)
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

export default Permissions
