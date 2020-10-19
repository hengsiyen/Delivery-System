<template>
  <div class="asr">
    <div class="asr-container">
      <div class="asr-wrap">
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
                :class="{'has-error' : validations.hasOwnProperty('email')}"
              >
                <input
                  v-model="credentials.email"
                  :placeholder="$t('label.email')"
                  class="form-control"
                  type="email"
                >
                <template v-if="validations.hasOwnProperty('email')">
                  <span class="label-error">
                    {{ validations['email'][0] }}
                  </span>
                </template>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 form-group"
                :class="{'has-error' : validations.hasOwnProperty('password')}"
              >
                <input
                  v-model="credentials.password"
                  :placeholder="$t('label.password')"
                  class="form-control"
                  type="password"
                >
                <template v-if="validations.hasOwnProperty('password')">
                  <span class="label-error">
                    {{ validations['password'][0] }}
                  </span>
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
                  class="btn btn-primary btn-block capitalize btn-login slide"
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
  name: 'Index',
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
        email: '',
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
      this.messageLoginFail = ''
      self.validations = {}
      self.$isLoading(true)
      self.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/login', self.credentials)
        .then((response) => {
          if (response.data && response.data.data) {
            const result = response.data.data
            const token = result.access_token
            const refresh = result.refresh_token

            localStorage.setItem(process.env.VUE_APP_TOKEN, token)
            localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, refresh)

            self.$axios.setHeader('Authorization', 'Bearer ' + token)
            self.$axios.setHeader('Accept', 'application/json')

            $.ajaxSetup({
              headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem(process.env.VUE_APP_TOKEN)
              }
            })

            // store user, roles and permissions
            self.$store.dispatch('user/setUser', { user: result.user })
            self.$store.dispatch('user/setRoles', result.roles)
            self.$store.commit('user/setPermissions', result.permissions)

            self.$router.push({
              name: 'admin'
            })
            // path: localStorage.getItem('fromRoutePath')
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
    onPressEnter (e) {
      if (e.code === 'Enter') {
        this.onLogin()
      }
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

</style>
