<template>
  <ShopForm :is-edit="true" :title="'label.edit'" :old-data="oldDataShop" />
</template>

<script>
import ShopForm from '@/pages/admin/shop/Form'
export default {
  name: 'ShopEdit',
  components: { ShopForm },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/shop/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            oldDataShop: result
          }
        })
    } else {
      return {
        oldDataShop: null
      }
    }
  }
}
</script>

<style scoped>

</style>
