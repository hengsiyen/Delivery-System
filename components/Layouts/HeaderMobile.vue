<template>
  <nav class="main-modile-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <NuxtLink :to="{name: 'admin'}" class="nav-link">
          {{ appName }}
        </NuxtLink>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <SwitchLocale />
      <li
        class="nav-item"
        @click="logout"
      >
        <a
          class="nav-link text-red"
          href="#"
          role="button"
        >
          <i class="fas fa-power-off" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import SwitchLocale from '@/components/Layouts/SwitchLocale'

export default {
  name: 'HeaderMobile',
  components: {
    SwitchLocale
  },
  methods: {
    logout () {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('string.confirm_logout'),
        text: this.$t('string.are_you_sure_want_to_logout'),
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          this.$isLoading(true)
          this.$store.dispatch('user/clearUser')
          this.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/logout')
            .finally(() => {
              this.$router.push({ path: '/' })
              this.$cookies.remove(process.env.VUE_APP_TOKEN)
              this.$cookies.remove(process.env.VUE_APP_REFRESH_TOKEN)
              localStorage.removeItem('dc')
              localStorage.clear()
              this.$cookies.remove('dc_currency')
              this.$cookies.remove('dc_exchange')
              this.$cookies.remove('currencies')
              this.$isLoading(false)
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-modile-header {
  border-bottom: 1px solid #dee2e6;
  z-index: 1034;
}
</style>
