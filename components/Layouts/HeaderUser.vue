<template>
  <li class="dropdown user user-menu">
    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
      <template v-if="user && user.avatar">
        <img :src="`${baseUrl}/${user.avatar}`" class="user-image" alt="User Image">
      </template>
      <template v-else>
        <img :src="avatar" class="user-image" alt="User Image">
      </template>
      <span v-if="user" class="hidden-xs">{{ user.first_name }} {{ user.last_name }}</span>
      <span v-else>[UNKNOWN]</span>
    </a>
    <ul class="dropdown-menu">
      <li v-if="user" class="user-header">
        <template v-if="user.avatar">
          <img :src="`${baseUrl}/${user.avatar}`" class="user-image" alt="User Image">
        </template>
        <template v-else>
          <img :src="avatar" class="user-image" alt="User Image">
        </template>
        <div class="user-header-txt">
          <div class="user-name">
            {{ user.first_name }} {{ user.last_name }}
          </div>
          <div class="user-email">
            {{ user.email }}
          </div>
          <div>
            <small>{{ $t('string.memberSince') }} Nov. 2019</small>
          </div>
        </div>
      </li>
      <li class="user-body">
        <a href="javascript:void(0)" @click="profile">
          <div class="user-body-item">
            <i class="fa fa-cog" /> <span>{{ $t('label.profile') }}</span>
          </div>
        </a>
        <a href="javascript:void(0)" @click="signOut">
          <div class="user-body-item">
            <i class="fa fa-sign-out" /> <span>{{ $t('label.signOut') }}</span>
          </div>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderUser',
  computed: {
    ...mapState({
      user: state => state.user.data
    })
  },
  mounted () {
    if (localStorage.getItem('user') && localStorage.getItem(this.$token)) {
      this.$store.dispatch('user/setUser', {
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem(this.$token)
      })
    }
  },
  methods: {
    profile () {
      this.$router.push({ name: 'account' })
    },
    signOut () {
      this.$isLoading(true)
      this.$store.dispatch('user/clearUser')
      this.$axios.post(process.env.VUE_APP_API + '/api/auth/backend/logout')
        .finally(() => {
          this.$router.push({ path: '/' })
          this.$cookies.remove(process.env.VUE_APP_TOKEN)
          this.$cookies.remove(process.env.VUE_APP_REFRESH_TOKEN)
          localStorage.removeItem('dc')
          this.$cookies.remove('dc_currency')
          this.$cookies.remove('dc_exchange')
          this.$cookies.remove('currencies')
          this.$isLoading(false)
        })
    }
  }
}
</script>

<style scoped>
.navbar-nav > .user-menu > .dropdown-menu > li.user-header {
  height: auto;
  min-height: 90px;
  position: relative;
  padding: 16px;
}

.navbar-nav > .user-menu > .dropdown-menu > li.user-header > img {
  height: 50px;
  width: 50px;
  border: none;
  margin-right: 16px;
}

.user-header-txt {
  min-width: 0;
  display: flex;
  text-align: left;
  -ms-flex-direction: column;
  -webkit-flex-direction: column;
  flex-direction: column;
  color: white;
}

.user-name {
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2rem;
}

.user-email {
  color: white;
  overflow: hidden;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.1rem;
}

.navbar-nav > .user-menu > .dropdown-menu > .user-body {
  padding: 0;
  border-bottom: 0;
  border-top: 0;
  margin: 10px 0;
}

.user-body-item {
  height: 40px;
  display: flex;
  align-items: center;
}

.user-body-item:hover,
.user-body-item:focus {
  background-color: #e7e7e7;
}

.user-body-item i {
  margin-right: 16px;
  font-size: 20px;
}
</style>
