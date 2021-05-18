<template>
  <div v-if="user" class="user-panel">
    <div class="pull-left image">
      <template v-if="user.avatar">
        <img :src="`${baseUrl}/${user.avatar}`" class="img-circle" alt="User Image">
      </template>
      <template v-else>
        <img :src="avatar" class="img-circle" alt="User Image">
      </template>
    </div>
    <div class="pull-left info">
      <p>{{ user.first_name }} {{ user.last_name }}</p>
      <a href="#"><i class="fa fa-circle text-success" /> {{ $t('label.online') }}</a>
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
