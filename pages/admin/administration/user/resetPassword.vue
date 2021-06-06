<template>
  <div class="user">
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ $t('label.resetPassword') }}
        </h3>
      </div>
      <div class="card-body">
        <div class="form-horizontal">
          <div class="form-group row">
            <label class="required col-sm-3 col-form-label text-right">{{ $t('label.password') }}</label>
            <div class="col-sm-9">
              <input
                v-model="user.password"
                type="password"
                :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('password')}"
                :placeholder="$t('label.password')"
                class="form-control"
              >
              <div
                v-if="validations !== null && validations.hasOwnProperty('password')"
                class="invalid-feedback"
              >
                {{ validations['password'][0] }}
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="required col-sm-3 col-form-label text-right">{{ $t('label.passwordConfirmation') }}</label>
            <div class="col-sm-9">
              <input
                v-model="user.password_confirmation"
                :class="{'is-invalid' : validations !== null && validations.hasOwnProperty('password_confirmation')}"
                type="password"
                :placeholder="$t('label.passwordConfirmation')"
                class="form-control"
              >
              <div
                v-if="validations !== null && validations.hasOwnProperty('password_confirmation')"
                class="invalid-feedback"
              >
                {{ validations['password_confirmation'][0] }}
              </div>
            </div>
          </div>

          <div class="form-group row">
            <div class="offset-sm-3 col-sm-9">
              <button
                class="btn btn-info btn-sm margin-r-5"
                @click="resetPassword"
              >
                {{ $t('button.update') }}
              </button>
              <ButtonBack />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonBack from '@/components/UiElements/ButtonBack'
export default {
  name: 'ResetPassword',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('label.resetPassword'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      validations: null,
      user: {
        uuid: null,
        password: null,
        password_confirmation: null
      }
    }
  },
  methods: {
    resetPassword () {
      this.$isLoading(true)
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/reset-password', {
        ...this.user
      }).then((response) => {
        this.showToastr()
        this.$router.push({ name: 'list-user' })
      }).catch((error) => {
        if (error.response.status === 422) {
          this.validations = error.response.data.errors
        } else {
          this.onResponseError(error)
        }
      }).finally(() => {
        this.$isLoading(false)
      })
    }
  },
  mounted () {
    this.user.uuid = this.$route.params.uuid
  }
}
</script>

<style scoped>

</style>
