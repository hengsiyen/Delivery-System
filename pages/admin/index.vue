<template>
  <h1>Admin Page</h1>
</template>

<script>
export default {
  name: 'Admin',
  head () {
    return {
      title: 'Admin',
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  }
}
</script>

<style scoped>

</style>
