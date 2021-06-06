<template>
  <li class="nav-item">
    <a
      href="javascript:void(0)"
      class="nav-link"
      @click="onChangeLocale"
    >
      <img :src="srcFlagImg" class="flag" alt="Flag Image">
    </a>
  </li>
</template>

<script>
export default {
  name: 'SwitchLocale',
  data () {
    return {
      config: process.env
    }
  },
  computed: {
    srcFlagImg () {
      if (this.$i18n.locale === 'km') {
        return '/img/flags/en.png'
      }
      return '/img/flags/km.png'
    }
  },
  methods: {
    onChangeLocale () {
      const locale = this.$i18n.locale === 'km' ? 'en' : 'km'
      this.$i18n.locale = locale
      this.$cookies.set('locale', locale)
    }
  }
}
</script>

<style scoped>
.flag {
  height: 16px !important;
}
</style>
