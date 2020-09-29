<template>
  <li class="dropdown tasks-menu">
    <a
      href="javascript:void(0)"
      data-toggle="dropdown"
      class="dropdown-toggle"
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
      if (this.$i18n.locale === 'km') {
        this.$i18n.locale = 'en'
        localStorage.setItem('locale', 'en')
        // this.$moment.locale('en')
      } else {
        this.$i18n.locale = 'km'
        localStorage.setItem('locale', 'km')
        // this.$moment.locale('km')
      }
    }
  }
}
</script>

<style scoped>
.flag {
  height: 16px !important;
}
</style>
