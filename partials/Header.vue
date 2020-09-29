<template>
  <header class="main-header">
    <nuxt-link :to="{name: 'admin'}" class="logo">
      <span class="logo-mini"><b>A</b>LT</span>
      <span class="logo-lg"><b>Admin</b>LTE</span>
    </nuxt-link>

    <nav class="navbar navbar-static-top" role="navigation">
      <a class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <switch-locale />
          <header-user />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import SwitchLocale from '@/components/SwitchLocale'
import HeaderUser from '@/components/HeaderUser'

export default {
  name: 'Header',
  components: {
    HeaderUser,
    SwitchLocale
  }
}
</script>

<style scoped>

</style>
