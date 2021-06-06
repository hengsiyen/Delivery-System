<template>
  <div v-if="user">
    <div class="card card-widget widget-user">
      <div class="widget-user-header bg-info">
        <h3 class="widget-user-username">
          {{ user.first_name }} {{ user.last_name }}
        </h3>
        <h5 class="widget-user-desc">
          Web Developer
        </h5>
      </div>
      <div class="widget-user-image">
        <img
          class="img-circle elevation-2"
          :src="userAvatar"
          alt="User Avatar"
        >
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-4 border-right">
            <div class="description-block">
              <h5 class="description-header">
                3,200
              </h5>
              <span class="description-text">SALES</span>
            </div>
          </div>
          <div class="col-sm-4 border-right">
            <div class="description-block">
              <h5 class="description-header">
                13,000
              </h5>
              <span class="description-text">FOLLOWERS</span>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="description-block">
              <h5 class="description-header">
                35
              </h5>
              <span class="description-text">PRODUCTS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    userAvatar () {
      if (this.user.avatar) {
        return `${this.apiUrl}/${this.user.avatar}`
      }
      return this.avatar
    }
  }
}
</script>

<style scoped>

</style>
