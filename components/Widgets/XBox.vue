<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">
        {{ title }}
      </h3>
      <template v-if="tool">
        <div class="box-tools pull-right">
          <slot name="box-tools" />
        </div>
      </template>
    </div>
    <div class="card-body">
      <slot>{{ title }}</slot>
    </div>
    <template v-if="footer">
      <div class="box-footer">
        <slot name="box-footer" />
      </div>
    </template>
    <slot name="loading" />
  </div>
</template>

<script>
export default {
  name: 'XBox',
  props: {
    variant: {
      type: String,
      default: 'primary'
    },
    withBorder: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: false
    },
    tool: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: 'Box header'
    }
  }
}
</script>

<style scoped>

</style>
