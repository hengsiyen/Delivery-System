/* eslint no-use-before-define: 0 */
const Permissions = {
  backend: {
    name: {
      en: 'Backend',
      km: 'ផ្ទាំងក្រោយ'
    },
    manage: 'manage-backend',
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
      },
      privacyPolicy: {
        name: {
          en: 'Privacy Policy',
          km: 'គោលការណ៍ឯកជនភាព'
        },
        manage: 'manage-privacy-policy',
        list: 'list-privacy-policy',
        store: 'store-privacy-policy',
        edit: 'edit-privacy-policy',
        delete: 'delete-privacy-policy',
        show: 'show-privacy-policy',
        toggle: 'toggle-privacy-policy'
      },
      termsAndConditions: {
        name: {
          en: 'Terms and Conditions',
          km: 'កិច្ចព្រមព្រៀង និង លក្ខខណ្ឌ'
        },
        manage: 'manage-term-and-condition',
        list: 'list-term-and-condition',
        store: 'store-term-and-condition',
        edit: 'edit-term-and-condition',
        delete: 'delete-term-and-condition',
        show: 'show-term-and-condition',
        toggle: 'toggle-term-and-condition'
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

export const dependencies = {
  'show-user': [
    'list-user'
  ],
  'edit-user': [
    'show-user'
  ],
  'change-user-password': [
    'show-user'
  ],
  'delete-user': [
    'show-user'
  ],
  'edit-role': [
    'show-role'
  ]
}

export const naming = {
  manage: {
    en: 'Manage $$',
    km: 'គ្រប់គ្រង$$'
  },
  list: {
    en: 'List $$',
    km: 'មើលបញ្ជី$$'
  },
  show: {
    en: 'View $$ Detail',
    km: 'បង្ហាញព័ត៌មានលម្អិត$$'
  },
  store: {
    en: 'Store $$',
    km: 'រក្សាទិន្នន័យ$$'
  },
  edit: {
    en: 'Edit $$',
    km: 'កែសម្រួលទិន្នន័យ$$'
  },
  delete: {
    en: 'Delete $$',
    km: 'លុបទិន្នន័យ$$'
  },
  changePassword: {
    en: 'Change $$\'s Password',
    km: 'កែពាក្យសម្ងាត់របស់$$'
  },
  toggle: {
    en: 'Toggle $$',
    km: 'បិទ ឬ បើក $$'
  },
  showHistory: {
    en: 'Show $$\'s History',
    km: 'បង្ហាញប្រវត្តិរបស់$$'
  },
  search: {
    en: 'Search $$',
    km: 'ស្វែងរក$$'
  },
  makeVisibility: {
    en: 'Change $$ Visibility',
    km: 'កែប្រែភាពមើលឃើញនៃ$$'
  },
  sendEmail: {
    en: 'Send E-mail about $$',
    km: 'ផ្ញើអ៊ីមែលអំពី$$'
  },
  activate: {
    en: 'Activate $$',
    km: 'បើកឲ្យដំណើរការ$$'
  },
  archive: {
    en: 'Archive $$',
    km: 'ទុក$$នៅមួយឡែក'
  },
  unarchive: {
    en: 'Unarchive $$',
    km: 'យក$$ទៅទុកវិញ'
  },
  add: {
    en: 'Add $$',
    km: 'បន្ថែម$$'
  },
  remove: {
    en: 'Remove $$',
    km: 'ដកចេញ$$'
  },
  undraft: {
    en: 'Undraft $$',
    km: 'រក្សាទុក$$ពិតប្រាកដ'
  },
  process: {
    en: 'Process $$',
    km: 'ដំណើរការ$$'
  }
}

export const generatePhpArray = () => {
  // Permissions convert to PHP array
  let php = ''
  let obj

  const tabs = (count = 1) => {
    let t = ''
    for (let i = 0; i < count; i++) {
      t += '\t'
    }
    return t
  }

  const recurse = (permission, tab = 1) => {
    const keyOrder = []
    for (const key in permission) {
      if (typeof permission[key] === 'object' && key !== 'name') {
        keyOrder.unshift(key)
      } else if (!['manage', 'name'].includes(key)) {
        keyOrder.push(key)
      }
    }
    for (const key of keyOrder) {
      if (typeof permission[key] === 'object' && key !== 'name') {
        obj = permission[key]
        php += tabs(tab) + '[\n'
        php += tabs(tab + 1) + `'name' => '${permission[key].manage}',\n`
        php += tabs(tab + 1) + `'display_name_en' => '${naming.manage.en.replace('$$', permission[key].name.en).replace('\'', '\\\'')}',\n`
        php += tabs(tab + 1) + `'display_name_km' => '${naming.manage.km.replace('$$', permission[key].name.km).replace('\'', '\\\'')}',\n`
        php += tabs(tab + 1) + '\'children\' => [\n'
        recurse(permission[key], tab + 2)
        php += tabs(tab + 1) + '],\n'
        if (dependencies[permission[key].manage]) {
          php += tabs(tab + 1) + '\'dependencies\' => [\n'
          php += dependencies[permission[key].manage].map(dep => tabs(tab + 2) + `'${dep}',\n`)
          php += tabs(tab + 1) + '],\n'
        } else {
          php += tabs(tab + 1) + '\'dependencies\' => [],\n'
        }
        php += tabs(tab) + '],\n'
      } else if (!['manage', 'name'].includes(key)) {
        php += tabs(tab) + '[\n'
        php += tabs(tab + 1) + `'name' => '${obj[key]}',\n`
        php += tabs(tab + 1) + `'display_name_en' => '${naming[key].en.replace('$$', obj.name.en).replace('\'', '\\\'')}',\n`
        php += tabs(tab + 1) + `'display_name_km' => '${naming[key].km.replace('$$', obj.name.km).replace('\'', '\\\'')}',\n`
        php += tabs(tab + 1) + '\'children\' => [],\n'
        if (dependencies[obj[key]]) {
          php += tabs(tab + 1) + '\'dependencies\' => [\n'
          php += dependencies[obj[key]].map(dep => tabs(tab + 2) + `'${dep}',\n`)
          php += tabs(tab + 1) + '],\n'
        } else {
          php += tabs(tab + 1) + '\'dependencies\' => [],\n'
        }
        php += tabs(tab) + '],\n'
      }
    }
  }

  php += '$permissions = [\n'
  recurse(Permissions)
  php += '];'
  return php
}

export const copyPermission = () => {
  const textArea = document.createElement('textarea')
  textArea.value = generatePhpArray()
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  document.execCommand('copy')
  document.body.removeChild(textArea)
}

export default Permissions
