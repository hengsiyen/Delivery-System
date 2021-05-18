<template>
  <div class="wrapper">
    <Header />
    <Sidebar />
    <div class="content-wrapper">
      <Breadcrumb />
      <section class="content container-fluid">
        <div class="row">
          <div class="col-md-12">
            <XBoxInfo
              :title="page.title"
              :img="page.img"
            />
          </div>
        </div>
      </section>
    </div>
    <Footer />
    <ControlSidebar />
    <ControlSidebarBg />
  </div>
</template>

<script>

import XBoxInfo from '@/components/XBoxInfo'
import Sidebar from '@/components/Layouts/Sidebar'
import Header from '@/components/Layouts/Header'
import Footer from '@/components/Layouts/Footer'
import ControlSidebar from '@/components/Layouts/ControlSidebar'
import ControlSidebarBg from '@/components/Layouts/ControlSidebarBg'
import Breadcrumb from '@/components/Layouts/Breadcrumb'

export default {
  name: 'PageError',
  head () {
    return {
      title: this.$t('string.pageError'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME,
      bodyAttrs: {
        class: 'hold-transition skin-blue sidebar-mini'
      }
    }
  },
  components: {
    XBoxInfo,
    Breadcrumb,
    ControlSidebarBg,
    ControlSidebar,
    Footer,
    Sidebar,
    Header
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    page () {
      let error = {
        title: this.$t('string.pageNotFound'),
        img: '/img/svgs/notfound.svg'
      }
      switch (this.statusCode) {
        case 500:
          error = {
            title: this.$t('string.internalServerError'),
            img: '/img/svgs/notfound'
          }
          break
      }
      return error
    },
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    },
    message () {
      return this.error.message || 'Page Error'
    }
  }
}
</script>

<style>
</style>
