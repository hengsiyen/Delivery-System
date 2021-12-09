<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink :to="{name: 'edit-package-type', params: {id: $route.params.id}}" class="btn btn-primary btn-sm">
              <i class="fas fa-edit mr-2" />
              <strong>{{ $t('btn.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div v-if="package_type" class="card-body">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>{{ $t('label.nameKm') }}</th>
                <td>{{ package_type.name_km }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.nameEn') }}</th>
                <td>{{ package_type.name_en }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.active') }}</th>
                <td>
                  <template v-if="package_type.enabled">
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
                <th class="text-capitalize">
                  {{ $t('label.createdAt') }}
                </th>
                <td>{{ getDateFormat(package_type.created_at) }}</td>
              </tr>
              <tr>
                <th class="text-capitalize">
                  {{ $t('label.updatedAt') }}
                </th>
                <td>{{ getDateFormat(package_type.updated_at) }}</td>
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
      title: this.$t('title.showPackageType'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      package_type: null
    }
  },
  mounted () {
    this.getPackageType()
  },
  methods: {
    getPackageType () {
      this.$axios
        .post(this.$base_api + '/api/backend/package-type/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.package_type = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
