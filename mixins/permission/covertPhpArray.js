import { naming } from './naming'
import { dependencies } from './dependencies'

export const generatePhpArray = (Permissions) => {
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
        try {
          php += tabs(tab + 1) + `'display_name_en' => '${naming.manage.en.replace('$$', permission[key].name.en).replace('\'', '\\\'')}',\n`
          php += tabs(tab + 1) + `'display_name_km' => '${naming.manage.km.replace('$$', permission[key].name.km).replace('\'', '\\\'')}',\n`
        } catch (e) {
          console.log('naming', key)
        }
        php += tabs(tab + 1) + '\'children\' => [\n'
        recurse(permission[key], tab + 2)
        php += tabs(tab + 1) + '],\n'
        if (dependencies[permission[key].manage]) {
          php += tabs(tab + 1) + '\'dependencies\' => [\n'
          php += dependencies[permission[key].manage].map(dep => tabs(tab + 2) + `'${dep}'\n`)
          php += tabs(tab + 1) + '],\n'
        } else {
          php += tabs(tab + 1) + '\'dependencies\' => [],\n'
        }
        php += tabs(tab) + '],\n'
      } else if (!['manage', 'name'].includes(key)) {
        php += tabs(tab) + '[\n'
        php += tabs(tab + 1) + `'name' => '${obj[key]}',\n`
        try {
          php += tabs(tab + 1) + `'display_name_en' => '${naming[key].en.replace('$$', obj.name.en).replace('\'', '\\\'')}',\n`
          php += tabs(tab + 1) + `'display_name_km' => '${naming[key].km.replace('$$', obj.name.km).replace('\'', '\\\'')}',\n`
        } catch (e) {
          console.log('naming: ', key)
        }
        php += tabs(tab + 1) + '\'children\' => [],\n'
        if (dependencies[obj[key]]) {
          php += tabs(tab + 1) + '\'dependencies\' => [\n'
          php += dependencies[obj[key]].map(dep => tabs(tab + 2) + `'${dep}'\n`)
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
