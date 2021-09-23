<template>
  <div class="asr">
    <div class="asr-container">
      <div class="asr-wrap rounded">
        <div class="row">
          <div class="col-md-12">
            <h2 class="asr-form-title">
              {{ appName }}
            </h2>
            <p class="asr-form-sub-title">
              {{ $t('string.welcome_back') }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="offset-lg-1 col-lg-10 px-md-0 pb-3">
            <div class="asr-form-create">
              <div class="row">
                <div class="col-12 text-center text-md-left">
                  <div class="form-group mb-0">
                    <label class="font-s-22">{{ $t('btn.signIn') }}</label>
                  </div>
                </div>
              </div>
              <div v-if="isLoginFail">
                <div class="alert alert-danger alert-dismissible font-s-14" role="alert">
                  <button aria-label="Close" class="close px-3" data-dismiss="alert" type="button">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  {{ messageLoginFail }}
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 form-group">
                  <label class="font-s-14 mb-0">{{ $t('label.email') }}</label>
                  <input
                    v-model="credentials.username"
                    :placeholder="$t('pla.your_email')"
                    class="form-control form-control-lg"
                    :class="{'is-invalid' : validations.username}"
                    type="text"
                  >
                  <template v-if="validations.username">
                    <div class="invalid-feedback">
                      {{ validations['username'][0] }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 form-group">
                  <label class="font-s-14 mb-0">{{ $t('label.password') }}</label>
                  <input
                    v-model="credentials.password"
                    :placeholder="$t('pla.password')"
                    class="form-control form-control-lg"
                    :class="{'is-invalid' : validations.password}"
                    type="password"
                  >
                  <template v-if="validations.password">
                    <div class="invalid-feedback">
                      {{ validations['password'][0] }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 margin-bottom">
                  <a href="#" class="forget-password">{{ $t('label.forget_password') }}</a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 item-center margin-bottom">
                  <button class="btn btn-primary capitalize btn-lg slide my-3 btn-block mr-1" @click="onLogin">
                    <strong>{{ $t('btn.signIn') }}</strong>
                  </button>
                  <!--                  <a href="#" class="btn btn-outline-secondary capitalize bnt-lg slide my-3 btn-block">
                    <strong>{{ $t('btn.signUp') }}</strong>
                  </a>-->
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="col-lg-6 px-md-0">-->
          <!--            <div class="asr-form-create">-->
          <!--              <div class="row">-->
          <!--                <div class="col-12">-->
          <!--                  <div class="form-group mb-0">-->
          <!--                    <label class="font-s-22">{{ $t('label.signInOrRegisterWith') }}</label>-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="col-lg-12 mt-4">
            <p class="text-center mb-0">
              <a href="/">Asorasoft.com</a> © 2021. {{ $t('string.right_reserved') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  head () {
    return {
      title: this.$t('string.login'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      appName: process.env.VUE_APP_NAME,
      credentials: {
        username: '',
        password: ''
      },
      validations: {},
      isLoginFail: false,
      messageLoginFail: '',
      config: process.env
    }
  },
  beforeCreate () {
    const token = this.$cookies.get(process.env.VUE_APP_TOKEN)
    if (token) {
      // eslint-disable-next-line handle-callback-err
      this.$router.push({ name: 'admin' }).catch((error) => {})
    }
  },
  mounted () {
    window.addEventListener('keypress', this.onPressEnter)
  },
  methods: {
    onLogin (e) {
      this.isLoginFail = false
      this.messageLoginFail = ''
      this.validations = {}
      this.$isLoading(true)
      this.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/login', this.credentials)
        .then(({ data }) => {
          if (data) {
            const result = data.data
            const token = result.access_token
            const refresh = result.refresh_token
            const deliveryCompany = result.delivery_company
            this.$cookies.set(process.env.VUE_APP_TOKEN, token)
            this.$cookies.set(process.env.VUE_APP_REFRESH_TOKEN, refresh)

            this.$axios.setHeader('Authorization', 'Bearer ' + token)
            this.$axios.setHeader('Accept', 'application/json')

            $.ajaxSetup({
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            })
            if (result.user && result.user.roles) {
              this.$cookies.set('user', JSON.stringify(result.user))
              this.$cookies.set('roles', JSON.stringify(result.user.roles))
            }
            if (deliveryCompany) {
              this.$cookies.set('dc_currency', JSON.stringify(deliveryCompany.currency))
              this.$cookies.set('dc_exchange', JSON.stringify(deliveryCompany.exchange_rate_enabled))

              this.$store.dispatch('delivery_company/setDeliveryCompany', deliveryCompany)
              this.$store.dispatch('delivery_company/setCurrency', deliveryCompany.currency)
              this.$store.dispatch('delivery_company/setExchangeRate', deliveryCompany.exchange_rate_enabled)
            }
            this.getCurrency()
            this.$store.dispatch('user/setUserRolesPermissions', result)
            this.$router.push({ name: 'admin' })
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.validations = error.response.data.errors
          } else if (error.response.status === 500) {
            this.onResponseError(error)
          } else {
            this.isLoginFail = true
            const message = error.response.data.message
            this.messageLoginFail = message['message_' + this.$i18n.locale]
          }
        })
        .finally(() => {
          this.$isLoading(false)
        })
    },
    getCurrency () {
      this.$axios.post(this.$base_api + '/api/backend/currency/get-options')
        .then((res) => {
          this.$cookies.set('currencies', JSON.stringify(res.data.data))
          this.$store.dispatch('delivery_company/setCurrencies', res.data.data)
        })
        .catch((error) => {
          this.onResponseError(error)
        })
    },
    onPressEnter (e) {
      if (e.code === 'Enter') {
        this.onLogin()
      }
    }
  },
  destroyed () {
    window.removeEventListener('keypress', this.onPressEnter)
  }
}
</script>

<style>
.login-page {
  background-color: #f5f5f5 !important;
}
</style>
