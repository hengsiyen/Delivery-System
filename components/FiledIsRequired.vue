<template>
  <div class="invalid-feedback">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'FiledIsRequired',
  props: {
    msg: {
      type: String,
      default: null
    }
  },
  computed: {
    message () {
      if (this.msg) {
        if (!this.msg.includes('field is required.')) {
          return this.msg
        }
      }
      return this.$t('validation.fieled_is_required')
    }
  }
}
</script>

<style scoped>

</style>
