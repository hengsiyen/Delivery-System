<template>
  <div class="light-box">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'LightBox'
}
</script>

<style scoped>
.light-box {
  border-radius: 8px;
  background-color: var(--white);
  padding: 12px;
}
</style>
