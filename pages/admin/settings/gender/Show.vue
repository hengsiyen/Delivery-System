<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink :to="{name: 'edit-gender', params: {id: $route.params.id}}" class="btn btn-primary btn-sm">
              <i class="fas fa-edit mr-2" />
              <strong>{{ $t('btn.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div v-if="gender" class="card-body">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>{{ $t('label.nameKm') }}</th>
                <td>{{ gender.name_km }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.nameEn') }}</th>
                <td>{{ gender.name_en }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.active') }}</th>
                <td>
                  <template v-if="gender.enabled">
                    <span class="badge badge-success">
                      {{ $t('label.enable') }}
                    </span>
                  </template>
                  <template v-else>
                    <span class="badge badge-danger">
                      {{ $t('label.disable') }}
                    </span>
                  </template>
                </td>
              </tr>
              <tr>
                <th class="text-capitalize">{{ $t('label.createdAt') }}</th>
                <td>{{ getDateFormat(gender.created_at) }}</td>
              </tr>
              <tr>
                <th class="text-capitalize">{{ $t('label.updatedAt') }}</th>
                <td>{{ getDateFormat(gender.updated_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
export default {
  name: 'PackageTypeShow',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('title.showGender'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      gender: null
    }
  },
  mounted () {
    this.getGender()
  },
  methods: {
    getGender () {
      this.$axios
        .post(this.$base_api + '/api/backend/gender/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.gender = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
