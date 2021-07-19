<template>
  <div class="asr">
    <div class="asr-container">
      <div class="asr-wrap rounded">
        <div class="asr-block-form">
          <div class="asr-form-create">
            <div class="row asr-block-title">
              <div class="col-md-12">
                <h2 class="asr-form-title">
                  {{ appName }}
                </h2>
                <p class="asr-form-sub-title">
                  {{ $t('string.welcome_back') }}
                </p>
              </div>

              <div v-if="isLoginFail" class="col-md-12">
                <div class="alert alert-danger alert-dismissible" role="alert">
                  <button aria-label="Close" class="close" data-dismiss="alert" type="button">
                    <span
                      aria-hidden="true"
                    >&times;</span>
                  </button>
                  <p>{{ messageLoginFail }}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 form-group"
              >
                <input
                  v-model="credentials.username"
                  :placeholder="$t('label.username')"
                  class="form-control"
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
              <div
                class="col-md-12 form-group"
              >
                <input
                  v-model="credentials.password"
                  :placeholder="$t('label.password')"
                  class="form-control"
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
                <button
                  class="btn btn-primary btn-block capitalize btn-login slide my-3"
                  @click="onLogin"
                >
                  <i class="fa fa-sign-in" /> {{ $t('button.login') }}
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <p class="text-center">
                  <a href="/">Asorasoft.com</a> © {{ (new Date).getFullYear() }}.
                  {{ $t('string.right_reserved') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="asr-block-img" style="background-image: url('/img/svgs/login.svg')" />
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
  methods: {
    onLogin (e) {
      const self = this
      self.isLoginFail = false
      self.messageLoginFail = ''
      self.validations = {}
      self.$isLoading(true)
      self.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/login', self.credentials)
        .then(({ data }) => {
          if (data) {
            const result = data.data
            const token = result.access_token
            const refresh = result.refresh_token
            const deliveryCompany = result.delivery_company

            self.$cookies.set(process.env.VUE_APP_TOKEN, token)
            self.$cookies.set(process.env.VUE_APP_REFRESH_TOKEN, refresh)

            self.$axios.setHeader('Authorization', 'Bearer ' + token)
            self.$axios.setHeader('Accept', 'application/json')

            $.ajaxSetup({
              headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
              }
            })

            if (deliveryCompany.length) {
              self.$cookies.set('dc', JSON.stringify(deliveryCompany[0]))
              this.$store.dispatch('delivery_company/setDeliveryCompany', deliveryCompany[0])
            }
            self.$store.dispatch('user/setUserRolesPermissions', result)

            self.$router.push({
              name: 'admin'
            })
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            self.validations = error.response.data.errors
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
    // getDeliveryCompany (id) {
    //   this.$axios.post(this.$base_api + '/api/backend/delivery-company/get-delivery-company-by-user', {
    //     user_id: id
    //   }).then((res) => {
    //     if (res.data.data) {
    //       this.$store.dispatch('shop/setShop', res.data.data)
    //     }
    //   })
    // },
    onPressEnter (e) {
      if (e.code === 'Enter') {
        this.onLogin()
      }
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
