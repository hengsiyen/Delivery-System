<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header p-0">
          <ul class="nav nav-pills ml-auto p-2">
            <li class="nav-item">
              <a
                href="#profile"
                class="nav-link active"
                data-toggle="tab"
              >{{ $t('label.profile') }}</a>
            </li>
            <li class="nav-item">
              <a
                href="#resetPassword"
                class="nav-link"
                data-toggle="tab"
              >{{ $t('label.resetPassword') }}</a>
            </li>
            <li class="nav-item">
              <a
                href="#changeAvatar"
                class="nav-link"
                data-toggle="tab"
              >{{ $t('label.changeAvatar') }}</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
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
