<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink :to="{name: 'edit-exchange-rate', params: {id: $route.params.id}}" class="btn btn-primary btn-sm">
              <i class="fas fa-edit mr-2" />
              <strong>{{ $t('btn.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div v-if="exchange_rate" class="card-body">
          <table class="table table-striped">
            <tbody>
              <tr v-if="exchange_rate.currency">
                <th>{{ $t('label.currency') }}</th>
                <td>
                  {{ exchange_rate.currency['name_' + $i18n.locale] }}
                </td>
              </tr>
              <tr>
                <th>{{ $t('label.amount') }}</th>
                <td>{{ exchange_rate.value | numFormat('0,0') }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.active') }}</th>
                <td>
                  <template v-if="exchange_rate.enabled">
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
                <td>{{ getDateFormat(exchange_rate.created_at) }}</td>
              </tr>
              <tr>
                <th class="text-capitalize">{{ $t('label.updatedAt') }}</th>
                <td>{{ getDateFormat(exchange_rate.updated_at) }}</td>
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
  name: 'ExchangeRateShow',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('title.showExchangeRate'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      exchange_rate: null
    }
  },
  mounted () {
    this.getPackageType()
  },
  methods: {
    getPackageType () {
      this.$axios
        .post(this.$base_api + '/api/backend/exchange-rate/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.exchange_rate = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
