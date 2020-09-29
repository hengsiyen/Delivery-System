<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="content-wrapper">
      <Breadcrumb />
      <section class="content container-fluid">
        <Nuxt />
      </section>
    </div>
    <Footer />
    <ControlSidebar />
    <ControlSidebarBg />
  </div>
</template>

<script>
import Header from '~/partials/Header'
import Sidebar from '~/partials/Sidebar'
import Footer from '~/partials/Footer'
import ControlSidebar from '~/partials/ControlSidebar'
import ControlSidebarBg from '~/partials/ControlSidebarBg'
import Breadcrumb from '~/partials/Breadcrumb'

export default {
  components: {
    Breadcrumb,
    ControlSidebarBg,
    ControlSidebar,
    Footer,
    Sidebar,
    Header
  },
  head () {
    return {
      bodyAttrs: {
        class: 'hold-transition skin-blue sidebar-mini'
      }
    }
  }
}
</script>

<style>

</style>
