<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h3 class="panel-title">
        {{ title }}
      </h3>
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'XPanel',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
