<template>
  <div>
    <PackageForm />
  </div>
</template>

<script>
import PackageForm from '@/pages/admin/package/Form'
export default {
  name: 'PackageCreate',
  components: { PackageForm },
  mounted () {
    this.$store.dispatch('package/setThirdParty', null)
    this.$store.dispatch('package/setShop', null)
  }
}
</script>

<style scoped>

</style>
