<template>
  <div
    v-if="user"
    class="user-panel mt-3 pb-3 mb-3 d-flex"
  >
    <div class="image">
      <template v-if="user.avatar">
        <img
          :src="`${baseUrl}/${user.avatar}`"
          class="img-circle elevation-2"
          alt="User Image"
        >
      </template>
      <template v-else>
        <img
          :src="avatar"
          class="img-circle elevation-2"
          alt="User Image"
        >
      </template>
    </div>
    <div class="info">
      <NuxtLink
        :to="{name: 'account'}"
        class="d-block"
      >
        {{ user.first_name }} {{ user.last_name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SidebarUser',
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  }
}
</script>

<style scoped>

</style>
