<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink :to="{name: 'edit-payment-type', params: {id: $route.params.id}}" class="btn btn-primary btn-sm">
              <i class="fas fa-edit mr-2" />
              <strong>{{ $t('btn.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div v-if="payment_type" class="card-body">
          <table class="table table-striped">
            <tbody>
              <tr>
                <th>{{ $t('label.nameKm') }}</th>
                <td>{{ payment_type.name_km }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.nameEn') }}</th>
                <td>{{ payment_type.name_en }}</td>
              </tr>
              <tr>
                <th>{{ $t('label.active') }}</th>
                <td>
                  <template v-if="payment_type.enabled">
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
                <td>{{ getDateFormat(payment_type.created_at) }}</td>
              </tr>
              <tr>
                <th class="text-capitalize">
                  {{ $t('label.updatedAt') }}
                </th>
                <td>{{ getDateFormat(payment_type.updated_at) }}</td>
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
  name: 'PaymentTypeShow',
  components: { ButtonBack },
  head () {
    return {
      title: this.$t('title.showPaymentType'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      payment_type: null
    }
  },
  mounted () {
    this.getPaymentType()
  },
  methods: {
    getPaymentType () {
      this.$axios
        .post(this.$base_api + '/api/backend/payment-type/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.payment_type = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
