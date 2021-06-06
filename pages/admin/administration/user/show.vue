<template>
  <div
    v-if="user"
    class="user"
  >
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">
          {{ $t('label.showUser') }}
        </h3>
        <div class="pull-right box-tools">
          <ButtonBack />
        </div>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              aria-controls="profile"
              data-toggle="tab"
              href="#profile"
              role="tab"
              class="nav-link active"
            >
              <i class="fa fa-user" /> {{ $t('label.profile') }}
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div
            id="profile"
            class="tab-pane active"
            role="tabpanel"
          >
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>{{ $t('label.avatar') }}</td>
                        <td>
                          <template v-if="user.avatar">
                            <img
                              :src="`${getSrc(user.avatar)}`"
                              class="user-image"
                              alt="User Avatar"
                              width="200px"
                            >
                          </template>
                          <template v-else>
                            <img
                              :src="avatar"
                              class="user-image"
                              alt="User Avatar"
                              width="200px"
                            >
                          </template>
                        </td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.firstName') }}</td>
                        <td>: {{ user.first_name }}</td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.lastName') }}</td>
                        <td>: {{ user.last_name }}</td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.gender') }}</td>
                        <td>: {{ user.gender !== null ? user.gender.name_en : 'N/A' }}</td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.updatedAt') }}</td>
                        <td>: {{ user.updated_at || 'N/A' }}</td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.role') }}</td>
                        <td>
                          <template v-if="user.roles && Array.isArray(user.roles) && user.roles.length">
                            <ul>
                              <li v-for="(role, key) in user.roles" :key="key">
                                {{ role['display_name_' + $i18n.locale] || role.name }}
                              </li>
                            </ul>
                          </template>
                          <template v-else>
                            {{ $t('string.na') }}
                          </template>
                        </td>
                      </tr>
                      <tr>
                        <td>{{ $t('label.additionalPermissions') }}</td>
                        <td>
                          <template v-if="user.permissions && Array.isArray(user.permissions) && user.permissions.length">
                            <ul>
                              <li v-for="(permission, key) in user.permissions" :key="key">
                                {{ permission['display_name_' + $i18n.locale] || role.name }}
                              </li>
                            </ul>
                          </template>
                          <template v-else>
                            {{ $t('string.na') }}
                          </template>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
export default {
  name: 'Show',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('label.showUser'),
      titleTemplate: '%s | ' + this.$t('string.appName')
    }
  },
  data () {
    return {
      user: null
    }
  },
  methods: {
    fetchUserByUuid () {
      this.$axios.post(process.env.VUE_APP_API + '/api/backend/user/get-user-by-uuid', {
        uuid: this.$route.params.uuid
      }).then((response) => {
        this.user = response.data.data
      }).catch((error) => {
        this.onResponseError(error)
      })
    }
  },
  mounted () {
    this.fetchUserByUuid()
  }
}
</script>

<style scoped>

</style>
