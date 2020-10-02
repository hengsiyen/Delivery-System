<template>
  <div class="row">
    <div class="col-md-12">
      <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#profile" data-toggle="tab">{{ $t('label.profile') }}</a>
          </li>
          <li><a href="#resetPassword" data-toggle="tab">{{ $t('label.resetPassword') }}</a></li>
          <li><a href="#changeAvatar" data-toggle="tab">{{ $t('label.changeAvatar') }}</a></li>
        </ul>
        <div class="tab-content">
          <div id="profile" class="active tab-pane">
            <UserProfile />
          </div>
          <div id="resetPassword" class="tab-pane">
            <UserProfileResetPassword />
          </div>
          <div id="changeAvatar" class="tab-pane">
            <UserProfileChangeAvatar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfile from '@/pages/admin/account/_components/UserProfile'
import UserProfileResetPassword from '@/pages/admin/account/_components/UserProfileResetPassword'
import UserProfileChangeAvatar from '@/pages/admin/account/_components/UserProfileChangeAvatar'

export default {
  name: 'UserProfileContent',
  components: {
    UserProfileChangeAvatar,
    UserProfileResetPassword,
    UserProfile
  }
}
</script>

<style scoped>

</style>
