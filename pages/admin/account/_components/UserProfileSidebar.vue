<template>
  <div v-if="user" class="box box-primary">
    <div class="box-body box-profile">
      <template v-if="user.avatar">
        <img
          class="profile-user-img img-responsive img-circle"
          :src="`${apiUrl}/${user.avatar}`"
          alt="User profile picture"
        >
      </template>
      <template v-else>
        <img
          class="profile-user-img img-responsive img-circle"
          :src="avatar"
          alt="User profile picture"
        >
      </template>
      <h3 class="profile-username text-center">
        {{ user.full_name }}
      </h3>
      <ul class="list-group">
        <li class="list-group-item">
          <strong>
            <i class="fas fa-map-marker-alt margin-r-5" />
            {{ $t('label.location') }}
          </strong>
          <p class="text-muted">
            {{ user.address || $t('string.na') }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserProfileSidebar',
  data () {
    return {
      apiUrl: process.env.VUE_APP_API
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  },
  methods: {
    ...mapActions([
      'setToken'
    ])
  }
}
</script>

<style scoped>

</style>
