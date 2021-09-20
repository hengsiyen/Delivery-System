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
    delivery: {
      name: {
        en: 'Delivery',
        km: 'ការដឹកជញ្ជូន'
      },
      manage: 'manage-delivery',
      assign: 'assign-delivery'
    },
    shop: {
      name: {
        en: 'Shop',
        km: 'ហាង'
      },
      manage: 'manage-shop',
      list: 'list-shop',
      create: 'create-shop',
      edit: 'edit-shop',
      show: 'show-shop',
      delete: 'delete-shop'
    },
    package: {
      name: {
        en: 'Package',
        km: 'កញ្ចប់អីវ៉ាន់'
      },
      manage: 'manage-package',
      list: 'list-package',
      create: 'create-package',
      edit: 'edit-package',
      show: 'show-package',
      delete: 'delete-package'
    },
    invoice: {
      name: {
        en: 'Invoice',
        km: 'វិក្កយបត្រ'
      },
      manage: 'manage-invoice',
      list: 'list-invoice',
      create: 'create-invoice',
      edit: 'edit-invoice',
      show: 'show-invoice',
      delete: 'delete-invoice'
    },
    tracking: {
      name: {
        en: 'Tracking',
        km: 'ការតាមដាន'
      },
      manage: 'manage-racking',
      list: 'list-racking'
    },
    driver: {
      name: {
        en: 'Driver',
        km: 'អ្នកដឹកជញ្ជូន'
      },
      manage: 'manage-driver',
      list: 'list-package',
      create: 'create-driver',
      edit: 'edit-driver',
      show: 'show-driver',
      delete: 'delete-driver'
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
        list: 'list-gender',
        create: 'create-gender',
        edit: 'edit-gender',
        show: 'show-gender',
        delete: 'delete-gender'
      },
      packageType: {
        name: {
          en: 'Package Type',
          km: 'ប្រភេទកញ្ចប់'
        },
        manage: 'manage-package-type',
        list: 'list-package-type',
        create: 'create-package-type',
        edit: 'edit-package-type',
        show: 'show-package-type',
        delete: 'delete-package-type'
      },
      currency: {
        name: {
          en: 'Currency',
          km: 'រូបិយប័ណ្ណ'
        },
        manage: 'manage-currency',
        list: 'list-currency',
        create: 'create-currency',
        edit: 'edit-currency',
        show: 'show-currency',
        delete: 'delete-currency'
      },
      exchangeRate: {
        name: {
          en: 'Exchange Rate',
          km: 'អត្រាប្តូរប្រាក់'
        },
        manage: 'manage-exchange-rate',
        list: 'list-exchange-rate',
        create: 'create-exchange-rate',
        edit: 'edit-exchange-rate',
        show: 'show-exchange-rate',
        delete: 'delete-exchange-rate'
      },
      paymentType: {
        name: {
          en: 'Payment Type',
          km: 'ប្រភេទការទូទាត់'
        },
        manage: 'manage-payment-type',
        list: 'list-payment-type',
        create: 'create-payment-type',
        edit: 'edit-payment-type',
        show: 'show-payment-type',
        delete: 'delete-payment-type'
      },
      village: {
        name: {
          en: 'Village',
          km: 'ភូមិ'
        },
        manage: 'manage-village',
        list: 'list-village',
        create: 'create-village',
        edit: 'edit-village',
        show: 'show-village',
        delete: 'delete-village'
      },
      commune: {
        name: {
          en: 'Commune / Sangkat',
          km: 'ឃុំ / សង្កាត់'
        },
        manage: 'manage-commune',
        list: 'list-commune',
        create: 'create-commune',
        edit: 'edit-commune',
        show: 'show-commune',
        delete: 'delete-commune'
      },
      district: {
        name: {
          en: 'District / Khan',
          km: 'ស្រុក / ខណ្ឌ'
        },
        manage: 'manage-district',
        list: 'list-district',
        create: 'create-district',
        edit: 'edit-district',
        show: 'show-district',
        delete: 'delete-district'
      },
      province: {
        name: {
          en: 'Province / Capital',
          km: 'ខេត្ត / រាជធានី'
        },
        manage: 'manage-province',
        list: 'list-province',
        create: 'create-province',
        edit: 'edit-province',
        show: 'show-province',
        delete: 'delete-province'
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
