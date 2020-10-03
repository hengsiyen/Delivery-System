import { mapState } from 'vuex'

const helpers = {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          administrators: [
            process.env.VUE_APP_ROLE_ADMIN,
            'admin'
          ]
        }
      },
      computed: {
        ...mapState({
          userRoles: state => state.user.data ? state.user.data.roles : null,
          userPermissions: state => state.user.data ? state.user.data.permissions : null
        }),
        baseUrl () {
          return process.env.VUE_APP_API
        },
        i18nDeactive () {
          return this.$t('label.deactive')
        },
        i18nChangePassword () {
          return this.$t('label.changePassword')
        },
        i18nActive () {
          return this.$t('label.active')
        },
        i18nEdit () {
          return this.$t('label.edit')
        },
        i18nShow () {
          return this.$t('label.show')
        },
        i18nDelete () {
          return this.$t('label.delete')
        },
        i18nSwalTitle () {
          return this.$t('label.swal.title')
        },
        i18nSwalDesc () {
          return this.$t('label.swal.desc')
        },
        i18nSwalYes () {
          return this.$t('label.swal.yes')
        },
        i18nSwalNo () {
          return this.$t('label.swal.no')
        },
        i18nSwalSuccess () {
          return this.$t('label.swal.success')
        },
        i18nSwalDeleteLabel () {
          return this.$t('label.swal.deleteLabel')
        }
      },
      methods: {
        getDateFormat (date, format = process.env.VUE_APP_DATE_FORMAT) {
          if (this.$moment(date).isValid()) {
            return this.$moment(date).format(format)
          }
          return this.$t('string.na')
        },
        // Return value that can be used in img tag. both src or image file
        createObjectURL (media) {
          if (media instanceof File) {
            return URL.createObjectURL(media)
          } else {
            return this.getSrc(media)
          }
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
            this.$swal.fire(Object.assign({
              title: self.i18nSwalTitle,
              text: self.i18nSwalDesc,
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              cancelButtonText: self.i18nSwalNo,
              confirmButtonText: self.i18nSwalYes
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
            if (exceptFields.includes(strippedKey)) { return }

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
          this.$swal(this.i18nSwalDeleteLabel, this.i18nSwalSuccess, 'success')
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
          this.$axios.post(this.$base_api + '/api/backend/user/get-roles-and-permissions')
            .then((response) => {
              const result = response.data.data
              self.$store.dispatch('user/setUser', { user: result.user })
              // store roles
              self.$store.commit('user/setRoles', result.roles)

              // store permission
              self.$store.commit('user/setPermissions', result.permissions)
            }).catch((error) => {
              self.onResponseError(error)
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
        }
      }
    })
  }
}

export default helpers
