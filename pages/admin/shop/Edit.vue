<template>
  <ShopForm :is-edit="true" :title="'label.edit'" />
</template>

<script>
import ShopForm from '@/pages/admin/shop/Form'
export default {
  name: 'ShopEdit',
  components: { ShopForm }
}
</script>

<style scoped>

</style>
