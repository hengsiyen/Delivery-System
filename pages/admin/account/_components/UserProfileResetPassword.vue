<template>
  <div class="reset-password">
    <div class="row">
      <div class="col-md-12">
        <form method="POST" action="/">
          <div class="form-group row" :class="{'has-error' : validations.hasOwnProperty('old_password')}">
            <label for="email" class="col-md-4 col-form-label text-md-right">{{ $t('label.oldPassword') }}</label>
            <div class="col-md-6">
              <input
                id="email"
                v-model="user.old_password"
                type="password"
                :placeholder="$t('label.oldPassword')"
                class="form-control"
                name="email"
                autofocus
              >
              <template v-if="validations.hasOwnProperty('old_password')">
                <span class="help-block" role="alert">
                  <strong>{{ validations['old_password'][0] }}</strong>
                </span>
              </template>
            </div>
          </div>

          <div class="form-group row" :class="{'has-error' : validations.hasOwnProperty('password')}">
            <label for="password" class="col-md-4 col-form-label text-md-right">{{ $t('label.password') }}</label>
            <div class="col-md-6">
              <input
                id="password"
                v-model="user.password"
                type="password"
                :placeholder="$t('label.password')"
                class="form-control"
                name="password"
              >
              <template v-if="validations.hasOwnProperty('password')">
                <span class="help-block" role="alert">
                  <strong>{{ validations['password'][0] }}</strong>
                </span>
              </template>
            </div>
          </div>

          <div class="form-group row" :class="{'has-error' : validations.hasOwnProperty('password')}">
            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ $t('label.confirmPassword') }}</label>
            <div class="col-md-6">
              <input
                id="password-confirm"
                v-model="user.password_confirmation"
                type="password"
                :placeholder="$t('label.confirmPassword')"
                class="form-control"
                name="password_confirmation"
              >
              <template v-if="validations.hasOwnProperty('password')">
                <span class="help-block" role="alert">
                  <strong>{{ validations['password'][0] }}</strong>
                </span>
              </template>
            </div>
          </div>

          <div class="form-group row">
            <div class="col-md-4" />
            <div class="col-md-6">
              <button
                type="submit"
                class="btn btn-primary"
                @click="resetPassword"
              >
                {{ $t('button.resetPassword') }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserProfileResetPassword',
  data () {
    return {
      user: {
        password: '',
        old_password: '',
        password_confirmation: ''
      },
      validations: {}
    }
  },
  methods: {
    ...mapActions([
      'setToken'
    ]),
    resetPassword (e) {
      e.preventDefault()
      this.validations = {}
      this.$isLoading(true)
      this.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/reset-password', this.user)
        .then((response) => {
          if (response.data && response.data.data) {
            const result = response.data.data
            const token = result.access_token
            const refresh = result.refresh_token

            localStorage.setItem(this.$token, token)
            localStorage.setItem(process.env.VUE_APP_REFRESH_TOKEN, refresh)

            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + token
            /* $.ajaxSetup({
              headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token
              }
            }) */
          }
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.validations = error.response.data.errors
          } else {
            this.onResponseError(error)
          }
        })
        .finally(() => {
          this.$isLoading(false)
        })
    }
  }
}
</script>

<style scoped>
  .reset-password {
    padding: 10px;
  }

  .text-md-right {
    text-align: right;
  }
</style>
