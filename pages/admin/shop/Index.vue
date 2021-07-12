<template>
  <div class="row">
    <div class="col-12">
      <section class="content-header">
        <div class="row mb-2">
          <div class="col-12">
            <h1 class="m-0">
              {{ $t('menu.shop') }}
            </h1>
          </div>
        </div>
      </section>
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopIndex',
  head () {
    return {
      title: this.$t('menu.shop'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>
