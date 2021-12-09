<template>
  <div v-if="user">
    <div class="card">
      <div class="card-body box-profile">
        <div class="text-center d-flex flex-column">
          <img
            class="profile-user-img img-fluid img-circle border-1"
            :src="userAvatar"
            alt="User profile picture"
          >
          <a class="btn btn-link text-dark text-bold my-3" @click="toggleShow">
            <i class="fas fa-camera mr-2" />
            {{ $t('label.uploadYourAvatar') }}
          </a>
        </div>
        <div>
          <h3 class="profile-username text-center font-weight-bold">
            {{ user.full_name }}
          </h3>
          <p class="text-muted text-center">
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>
    <vue-crop-avatar
      v-model="show"
      field="avatar"
      :width="100"
      :lang-type="langType"
      :height="100"
      :url="`${apiUrl}/api/auth/backend/change-avatar`"
      :params="params"
      :headers="headers"
      img-format="png"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserProfileSidebar',
  data () {
    return {
      apiUrl: process.env.VUE_APP_API,
      show: false,
      params: {
        user_id: null,
        name: 'avatar'
      },
      imgDataUrl: '',
      img: '/img/flags/km.png',
      headers: {
        Authorization: `Bearer ${this.$cookies.get(process.env.VUE_APP_TOKEN)}`,
        Accept: 'application/json'
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    }),
    langType () {
      return this.$i18n.locale
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
      'setUser'
    ]),
    toggleShow () {
      this.show = !this.show
    },
    cropSuccess (imgDataUrl, field) {
    },
    cropUploadSuccess (jsonData, field) {
      this.$store.dispatch('user/setUser', { user: jsonData.data })
      this.imgDataUrl = this.apiUrl + '/' + jsonData.data.avatar
    },
    cropUploadFail (status, field) {
    }
  }
}
</script>

<style scoped>
.change-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10vh;
  padding-bottom: 10vh;
}

.container-avatar {
  width: 300px;
  height: 300px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  margin-bottom: 20px;
}
</style>
