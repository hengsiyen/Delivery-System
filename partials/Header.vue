<template>
  <header class="main-header">
    <a class="logo">
      <span class="logo-mini"><b>A</b>LT</span>
      <span class="logo-lg"><b>Admin</b>LTE</span>
    </a>

    <nav class="navbar navbar-static-top" role="navigation">
      <a class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <header-message />
          <header-notification />
          <header-task />
          <switch-locale />
          <header-user />
          <header-gear />
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import SwitchLocale from '@/components/SwitchLocale'
import HeaderUser from '@/components/HeaderUser'
import HeaderTask from '@/components/HeaderTask'
import HeaderGear from '@/components/HeaderGear'
import HeaderNotification from '@/components/HeaderNotification'
import HeaderMessage from '@/components/HeaderMessage'

export default {
  name: 'Header',
  components: {
    HeaderMessage,
    HeaderNotification,
    HeaderGear,
    HeaderTask,
    HeaderUser,
    SwitchLocale
  }
}
</script>

<style scoped>

</style>
