<template>
  <div class="w-100 text-right mb-3">
    <button
      class="btn btn-default"
      @click="cancel"
    >
      <i class="fas fa-times-circle mr-2" />
      <strong>{{ $t('btn.cancel') }}</strong>
    </button>
    <button
      class="btn btn-primary"
      :class="{'disabled': disabledButton}"
      :disabled="disabledButton"
      @click="save"
    >
      <i class="fas fa-save mr-2" />
      <strong>{{ $t('btn.save') }}</strong>
    </button>
  </div>
</template>

<script>
export default {
  name: 'PackageFormItemButton',
  props: {
    disabledButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancel () {
      this.$emit('onClickCancel')
    },
    save () {
      this.$emit('onClickSave')
    }
  }
}
</script>

<style scoped>

</style>
