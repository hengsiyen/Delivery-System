<template>
  <PackageForm :is-edit="true" :title="'label.edit'" :old-data="oldDataPackage" />
</template>

<script>
import PackageForm from '@/pages/admin/package/Form'
export default {
  name: 'PackageEdit',
  components: { PackageForm },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/package/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          if (result.partner_company) {
            ctx.store.dispatch('package/setThirdParty', {
              _id: result.partner_company._id,
              name_en: result.partner_company.name_en
            })
          }
          if (result.shop) {
            ctx.store.dispatch('package/setShop', {
              _id: result.shop._id,
              name_en: result.shop.name_en
            })
          }
          return {
            oldDataPackage: result
          }
        }).catch(() => {
          return {
            oldDataPackage: null
          }
        })
    } else {
      return {
        oldDataPackage: null
      }
    }
  }
}
</script>

<style scoped>

</style>
