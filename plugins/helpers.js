import { mapGetters, mapState } from 'vuex'
import { datePickerLocale } from '@/mixins/datePickerLocale'
import Permissions from '../permissions'

const helpers = {
  install (Vue, options) {
    Vue.prototype.$Permissions = Permissions
    Vue.prototype.$datepickerLocale = datePickerLocale
    Vue.prototype.$base_api = process.env.VUE_APP_API
    Vue.prototype.$token = process.env.VUE_APP_TOKEN
    Vue.prototype.$env = process.env

    Vue.mixin({
      data () {
        return {
          administrators: [
            process.env.VUE_APP_ROLE_ADMIN,
            'admin'
          ],
          avatar: '/img/svgs/avatar.svg',
          appName: process.env.VUE_APP_NAME
        }
      },
      computed: {
        ...mapState({
          userRoles: state => state.user.data ? state.user.data.roles : null,
          userPermissions: state => state.user.data ? state.user.data.permissions : null
        }),
        ...mapGetters({
          dc_exchange_rate: 'delivery_company/dc_exchange_rate'
        }),
        baseUrl () {
          return process.env.VUE_APP_API
        }
      },
      methods: {
        getDateFormat (date, format = process.env.VUE_APP_DATE_FORMAT) {
          try {
            if (this.$moment(date, 'YYYY-MM-DD').isValid()) {
              return this.$moment(date, 'YYYY-MM-DD hh:mm:ss A').format(format)
            }
            return this.$t('string.na')
          } catch (error) {
            return date
          }
        },
        // Return value that can be used in img tag. both src or image file
        createObjectURL (media) {
          if (media instanceof File) {
            return URL.createObjectURL(media)
          } else {
            return this.getSrc(media)
          }
        },
        exchangeMoney (from, to, value) {
          if (value === '' || value === 0 || value === null) {
            value = 0
          }
          if (from === to) {
            return parseFloat(value)
          }
          switch (from) {
            case 'USD':
              switch (to) {
                case 'KHR':
                  return value * parseFloat(this.dc_exchange_rate.value)
              }
            // eslint-disable-next-line no-fallthrough
            case 'KHR':
              switch (to) {
                case 'USD':
                  // eslint-disable-next-line no-case-declarations
                  const result = value / parseFloat(this.dc_exchange_rate.value)
                  if (this.countDecimals(result)) {
                    return parseFloat(result) + 0.005
                  } else {
                    return parseFloat(result)
                  }
              }
          }
        },
        countDecimals (value) {
          return value % 1 ? value.toString().split('.')[1].length : 0
        },
        validateEmail (email) {
          // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          // return re.test(String(email).toLowerCase())
        },
        // Append API url in front of url if not exist
        getSrc (url) {
          if (!url) {
            return ''
          } else if (url.startsWith('http')) {
            return url
          } else if (url.startsWith('/')) {
            return process.env.VUE_APP_API + url
          } else {
            return process.env.VUE_APP_API + '/' + url
          }
        },
        // Prompt confirm promise
        onConfirm (options) {
          const self = this
          return new Promise((resolve, reject) => {
            this.$swal(Object.assign({
              title: self.$t('label.swal.title'),
              text: self.$t('label.swal.desc'),
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: self.$t('label.swal.no'),
              confirmButtonText: self.$t('label.swal.yes')
            }, options)).then((result) => {
              if (result.value) {
                resolve({
                  accept: true
                })
              } else {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                  accept: false
                })
              }
            })
          })
        },
        // Convert javascript object includes file to formdata
        getFormData (value, includeNull = true, exceptFields = [], keyTransforms, mappings) {
          const formData = new FormData()

          const appender = (value, prefixKey = '') => {
            const getStrippedKey = key => (key.replace(/\[[0-9]+\]/g, '[]'))

            // get key eg: fruit[0][apple] -> fruit[][apple]
            const strippedKey = getStrippedKey(prefixKey)

            // Exclude key
            if (exceptFields.includes(strippedKey)) {
              return
            }

            // map
            if (mappings && mappings[strippedKey] !== undefined) {
              value = mappings[strippedKey](value)
            }

            if (Array.isArray(value)) {
              value.forEach((data, index) => {
                appender(data, prefixKey + '[' + index + ']')
              })
            } else if (value === null || value === undefined) {
              if (includeNull) {
                formData.append(prefixKey, '')
              }
            } else if (value instanceof File) {
              formData.append(prefixKey, value)
            } else if (typeof value === 'object') {
              for (const key in value) {
                let formDataKey = prefixKey ? prefixKey + '[' + key + ']' : key
                const strippedPreKey = getStrippedKey(formDataKey)

                // Transform key
                if (keyTransforms && keyTransforms[strippedPreKey] !== undefined) {
                  formDataKey = prefixKey ? prefixKey + '[' + keyTransforms[strippedPreKey] + ']' : keyTransforms[strippedPreKey]
                }

                appender(value[key], formDataKey)
              }
            } else {
              formData.append(prefixKey, value)
            }
          }
          appender(value)
          return formData
        },
        // Convert text area content to HTML text
        getTextareaHtml (content) {
          if (!content) {
            return this.$t('label.na')
          }
          return content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            // .replace(/ /g, "&nbsp;")
            .replace(/\n/g, '<br/>')
        },
        // get name_en or name_km for object base on current locale
        getName (object) {
          if (object) {
            // eslint-disable-next-line no-prototype-builtins
            if (object.hasOwnProperty('name_' + this.$i18n.locale)) {
              return object['name_' + this.$i18n.locale]
              // eslint-disable-next-line no-prototype-builtins
            } else if (object.hasOwnProperty('name')) {
              return object.name
              // eslint-disable-next-line no-prototype-builtins
            } else if (object.hasOwnProperty('title')) {
              return object.title
            }
          }
          return this.$t('label.na')
        },
        showSwalSuccess () {
          this.$swal({
            text: this.$t('label.swal.deleteLabel'),
            icon: 'success',
            title: this.$t('label.swal.success'),
            confirmButtonText: this.$t('button.ok')
          })
        },
        showToastr () {
          this.$toastr('success', this.$t('string.theRequestHaveBeenProcessed'), this.$t('string.success'))
        },
        onResponseError (error) {
          if (error.statusText) {
            this.$toastr('error', error.statusText, this.$t('string.error'))
          } else if (error.response) {
            if (error.response.status === 403) {
              this.$toastr('error', error.response.data.message, this.$t('string.error'))
            } else {
              try {
                if (error.response.data.message && error.response.data.message['message_' + this.$i18n.locale]) {
                  this.$toastr('error', error.response.data.message['message_' + this.$i18n.locale], this.$t('string.error'))
                } else {
                  this.$toastr('error', error.response.statusText, this.$t('string.error'))
                }
              } catch (e) {
                console.log('got error')
                this.$toastr('error', this.$t('string.somethingWentWrong'), this.$t('string.error'))
              }
            }
          }
        },
        getUserInfo () {
          const self = this
          const token = this.$cookies.get(process.env.VUE_APP_TOKEN)

          if (!token) {
            this.$router.push('/login').then()
            this.$cookies.remove(process.env.VUE_APP_TOKEN)
            this.$cookies.remove(process.env.VUE_APP_REFRESH_TOKEN)
          }

          self.$axios.setHeader('Authorization', 'Bearer ' + token)
          self.$axios.setHeader('Accept', 'application/json')

          $.ajaxSetup({
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          })

          this.$axios.post(this.$base_api + '/api/backend/user/get-roles-and-permissions')
            .then(async ({ data }) => {
              if (data.data) {
                const result = data.data

                await self.$store.dispatch('user/setUserRolesPermissions', result)
              }
            }).catch(async (error) => {
              self.onResponseError(error)
              self.$cookies.remove(process.env.VUE_APP_TOKEN)
              self.$cookies.remove(process.env.VUE_APP_REFRESH_TOKEN)
              await self.$router.push('/login')
            })
        },
        clearEventHandler (classNames) {
          classNames.map((className) => {
            return $(document).off('click', className)
          })
        },
        can (permissions) {
          if (!permissions || permissions.length === 0 || this.$store.getters['user/isAdmin']) {
            return true
          }

          if (!this.userPermissions) {
            return false
          }

          return this.userPermissions.some(permission => permissions.includes(permission))
        },
        hasRoles (roles) {
          return this.$store.getters['user/isAdmin'] || this.onlyHasRoles(roles)
        },
        onlyHasRoles (roles) {
          if (!roles || roles.length === 0) {
            return true
          }

          if (!this.userRoles) {
            return false
          }

          return this.userRoles.some(role => roles.includes(role))
        },
        isAdmin () {
          if (!this.userRoles) {
            return false
          }
          return this.userRoles.some(role => this.administrators.includes(role))
        },
        routerPush (route) {
          if (this.$route.name !== route.name) {
            this.$router.push(route)
          }
        },
        replaceImgUrl (string, type = 'original') {
          if (string) {
            return string.replace('storage', 'media/' + type)
          }
          return null
        },
        historyIcon (item) {
          let type = null
          if (item && item.type) {
            type = item.type
          }
          switch (type) {
            case 'create':
              return 'fa-cube bg-green'
            case 'edit':
              return 'fa-edit bg-blue'
            case 'delete':
              return 'fa-trash-alt bg-red'
            default:
              return 'fa-ellipsis-h bg-gray'
          }
        },

        statusIcon (item) {
          let status = null
          if (item && item.status) {
            status = item.status
          }
          switch (status) {
            case 'new_package':
              return 'fa-cube bg-teal'
            case 'assigned':
              return 'fa-user-check bg-info'
            case 'delivery':
              return 'fa-motorcycle bg-blue'
            case 'success':
              return 'fa-check bg-green'
            case 'failed':
              return 'fa-exclamation bg-yellow'
            case 'cancel':
              return 'fa-times bg-red'
            case 'return':
              return 'fa-undo-alt  fa-flip-horizontal bg-dark'
            default:
              return 'fa-ellipsis-h bg-gray'
          }
        },
        handleNewLine (str) {
          return str.replace(/(\\r)*\\n/g, '<br>')
        },
        checkStatus (status) {
          let st = {
            en: '',
            km: ''
          }
          switch (status) {
            case 'new_package':
              st = {
                en: 'New Package',
                km: 'កញ្ចប់អីវ៉ាន់ថ្មី'
              }
              break
            case 'assigned':
              st = {
                en: 'Assigned Package',
                km: 'បានបែងចែកកញ្ចប់អីវ៉ាន់'
              }
              break
            case 'delivery':
              st = {
                en: 'Delivering',
                km: 'កំពុងដឹកជញ្ជូន'
              }
              break
            case 'success':
              st = {
                en: 'Delivered Package',
                km: 'បានប្រគល់ជូនកញ្ចប់អីវ៉ាន់'
              }
              break
            case 'failed':
              st = {
                en: 'Delivery Failed',
                km: 'ការដឹកជញ្ជូនបរាជ័យ'
              }
              break
            case 'cancel':
              st = {
                en: 'Cancel Package',
                km: 'បោះបង់កញ្ចប់អីវ៉ាន់'
              }
              break
            case 'return':
              st = {
                en: 'Return to Shop',
                km: 'បញ្ជូនទៅហាងវិញ'
              }
              break
          }

          return st[this.$i18n.locale]
        }
      }
    })
  }
}

export default helpers
