<template>
  <div>
    <HeaderMobile />
    <div class="mt-3">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import HeaderMobile from '@/components/Layouts/HeaderMobile'
export default {
  name: 'MobileIndex',
  components: { HeaderMobile }
}
</script>

<style scoped>

</style>
