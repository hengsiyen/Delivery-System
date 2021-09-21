<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars" /></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">{{ appName }}</a>
      </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <NuxtLink
          :to="{name: 'mobile-shop-list'}"
          class="nav-link"
          href="#"
          role="button"
        >
          <i class="fas fa-cube" />
        </NuxtLink>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-widget="navbar-search" href="#" role="button">
          <i class="fas fa-search" />
        </a>
        <div class="navbar-search-block">
          <form class="form-inline">
            <div class="input-group input-group-sm">
              <input
                class="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              >
              <div class="input-group-append">
                <button class="btn btn-navbar" type="submit">
                  <i class="fas fa-search" />
                </button>
                <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i class="fas fa-times" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          data-widget="fullscreen"
          href="#"
          role="button"
        >
          <i class="fas fa-expand-arrows-alt" />
        </a>
      </li>
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
      <!--      <li class="nav-item">-->
      <!--        <a-->
      <!--          class="nav-link"-->
      <!--          data-widget="control-sidebar"-->
      <!--          data-slide="true"-->
      <!--          href="#"-->
      <!--          role="button"-->
      <!--        >-->
      <!--          <i class="fas fa-th-large" />-->
      <!--        </a>-->
      <!--      </li>-->
    </ul>
  </nav>
</template>

<script>
import SwitchLocale from '@/components/Layouts/SwitchLocale'

export default {
  name: 'Header',
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

<style scoped>

</style>
