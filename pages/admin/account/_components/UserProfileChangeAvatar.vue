<template>
  <div v-if="imgDataUrl" class="change-avatar">
    <div style="display: inline-grid">
      <img
        :src="imgDataUrl || avatar"
        alt="User Avatar"
        class="container-avatar"
      >
      <a class="btn btn-primary" @click="toggleShow">{{ $t('label.uploadYourAvatar') }}</a>
    </div>
    <vue-crop-avatar
      v-model="show"
      field="avatar"
      :width="300"
      :lang-type="langType"
      :height="300"
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
  name: 'UserProfileChangeAvatar',
  data () {
    return {
      apiUrl: process.env.VUE_APP_API,
      show: false,
      params: {
        user_id: null,
        name: 'avatar'
      },
      headers: null,
      imgDataUrl: '',
      img: '/img/flags/km.png'
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.data
    }),
    langType () {
      return this.$i18n.locale
    }
  },
  mounted () {
    this.headers = {
      Authorization: `Bearer ${this.$cookies.get(process.env.VUE_APP_TOKEN)}`,
      Accept: 'application/json'
    }

    if (this.user && this.user.avatar) {
      this.imgDataUrl = this.apiUrl + '/' + this.user.avatar
    } else {
      this.imgDataUrl = '/img/svgs/avatar.svg'
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
