<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink :to="{name: 'edit-currency', params: {id: $route.params.id}}" class="btn btn-primary btn-sm">
              <i class="fas fa-edit mr-2" />
              <strong>{{ $t('btn.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div v-if="currency" class="card-body">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>{{ $t('label.nameKm') }}</th>
                <td>{{ currency.name_km }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.nameEn') }}</th>
                <td>{{ currency.name_en }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.code') }}</th>
                <td>{{ currency.code }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.symbol') }}</th>
                <td>{{ currency.symbol }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.active') }}</th>
                <td>
                  <template v-if="currency.enabled">
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
                <td>{{ getDateFormat(currency.created_at) }}</td>
              </tr>
              <tr>
                <th class="text-capitalize">{{ $t('label.updatedAt') }}</th>
                <td>{{ getDateFormat(currency.updated_at) }}</td>
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
  name: 'CurrencyShow',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('title.showCurrency'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      currency: null
    }
  },
  mounted () {
    this.getCurrency()
  },
  methods: {
    getCurrency () {
      this.$axios
        .post(this.$base_api + '/api/backend/currency/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.currency = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
