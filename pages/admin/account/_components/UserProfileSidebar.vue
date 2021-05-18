<template>
  <div v-if="user">
    <x-user-header
      :user-avatar="userAvatar"
      :name="`${user.first_name} ${user.last_name}`"
      position="Web Developer"
    />
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
    }),
    properties () {
      if (this.user) {
        return [
          { label: this.$t('label.location'), value: this.user.address || this.$t('string.na') }
        ]
      }
      return []
    },
    userAvatar () {
      if (this.user.avatar) {
        return `${this.apiUrl}/${this.user.avatar}`
      }
      return this.avatar
    }
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
