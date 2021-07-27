<template>
  <div class="row">
    <div class="col-lg-3 col-xl-2">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
        </div>
        <div class="card-body">
          <template v-if="driver_data">
            <div class="row mb-4">
              <div class="col-12">
                <div class="form-group mb-0">
                  <div style="width: 100%;" class="mx-auto mb-4">
                    <template v-if="driver_data.avatar">
                      <img :src="baseUrl + '/' + driver_data.avatar" alt="" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <img src="/img/avatar.png" alt="" class="img-thumbnail">
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-12 driver-item">
                <i class="fas fa-user mr-2" />
                {{ driver_data.full_name }}
              </div>
              <div class="col-12 driver-item">
                <i class="fas fa-phone fa-flip-horizontal mr-2" />
                {{ driver_data.phone }}
              </div>
              <div v-if="driver_data.gender" class="col-12 driver-item">
                <i class="fas mr-2" :class=" 'fa-' + driver_data.gender['name_en'].lowercase()" />
                {{ driver_data.gender['name_' + $i18n.locale] }}
              </div>
              <div class="col-12 driver-item user_role">
                <span v-for="(item, key) in driver_data.roles" :key="key" class="d-block">
                  <i class="fas fa-flag mr-2" />
                  {{ item['display_name_' + $i18n.locale] }}
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="col-lg-9 col-xl-10">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.package_for_deliver') }}
          </h3>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body package__delivery">
          <div class="row">
            <dl v-if="driver_data.packages" class="row col-12 col-lg-6">
              <dt class="col-sm-5 text-capitalize text-truncate">
                {{ $t('label.delivery_packages') }}
              </dt>
              <dd class="col-sm-7 text-bold">
                {{ driver_data.packages.length }}
              </dd>
            </dl>
            <div class="col-12 col-lg-6 text-right">
              <button class="btn btn-primary btn-sm">
                <strong>Confirm Delivery</strong>
              </button>
            </div>
          </div>
          <div class="row">
            <dl class="row col-12 col-lg-6">
              <dt class="col-sm-5 text-capitalize text-truncate">
                {{ $t('label.total_price') }}
              </dt>
              <dd class="col-sm-7">
                <span class="d-block">{{ total_riel | numFormat(num_format_km) }} KHR</span>
                <span class="d-block"><small>( {{ total_dollar | numFormat(num_format_en) }} USD )</small></span>
              </dd>
            </dl>
            <dl class="row col-12 col-lg-6">
              <dt class="col-sm-5 text-capitalize text-truncate">
                {{ $t('label.collect_money_total') }}
              </dt>
              <dd class="col-sm-7">
                <span class="d-block">{{ collect_money_riel | numFormat(num_format_km) }} KHR</span>
                <span class="d-block"><small>( {{ collect_money_dollar | numFormat(num_format_en) }} USD )</small></span>
              </dd>
            </dl>
          </div>
          <div v-if="driver_data && driver_data.packages.length" class="row package__delivery-content">
            <div class="col-lg-12">
              <template v-if="driver_data.packages && driver_data.packages.length">
                <template v-for="(item, key) in driver_data.packages">
                  <div :key="key" class="list_item">
                    <div class="col-md-2 col-lg-2">
                      <template v-if="item.media">
                        <div>sdfsf</div>
                      </template>
                      <template v-else>
                        <div class="package__item-image">
                          <img src="/img/package.png" alt="" width="100%">
                        </div>
                      </template>
                    </div>
                    <div class="col-md-4 col-lg-4">
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-user mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_name }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-phone mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_phone }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-dollar-sign mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.price | numFormat(item.currency && item.currency.code === 'KHR' ? num_format_km : num_format_en ) }}
                          {{ item.currency ? item.currency.code : null }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-sticky-note mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ checkStatus(item.final_status) }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 col-lg-4">
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-store mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.shop ? item.shop.name_en : '' }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-map-marker-alt mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.customer_address }}
                        </div>
                      </div>
                      <div v-if="item.partner_company" class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-truck mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.partner_company.name_en }}
                        </div>
                      </div>
                      <div class="list_item-block">
                        <div class="list_item-block-icon">
                          <i class="fas fa-calendar-alt mr-2" />
                        </div>
                        <div v-if="item.request_delivery_at" class="package_item-label text-truncate">
                          {{ $moment(item.request_delivery_at).format('lll') }}
                        </div>
                        <div v-else class="package_item-label text-truncate">
                          {{ $moment(item.created_at).format('lll') }}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2 col-lg-2 list_item-block-action">
                      <div class="list_item-block-btn">
                        <NuxtLink
                          class="btn btn-default btn-sm btn-block"
                          :to="{name: 'show-package', params:{id: item._id}}"
                        >
                          <i class="fas fa-eye mr-2" />
                          <strong>{{ $t('label.view') }}</strong>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import { mapGetters } from 'vuex'

export default {
  name: 'DriverShow',
  components: { ButtonBack },
  computed: {
    ...mapGetters({
      num_format_en: 'delivery_company/num_format_en',
      num_format_km: 'delivery_company/num_format_km'
    })
  },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/driver/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            driver_data: result
          }
        })
    } else {
      return {
        driver_data: null
      }
    }
  },
  data () {
    return {
      total_riel: 0,
      total_dollar: 0,
      collect_money_riel: 0,
      collect_money_dollar: 0,
      package_data: null,
      pLoading: false
    }
  },
  mounted () {
    this.calculatePrice()
  },
  methods: {
    selectPackage (item) {
      this.pLoading = true
      setTimeout(() => {
        this.package_data = item
        this.pLoading = false
      }, 1500)
    },
    calculatePrice () {
      if (this.driver_data.packages && this.driver_data.packages.length > 0) {
        const packages = this.driver_data.packages
        packages.forEach((item) => {
          let currency = null
          console.log('asdadsa')
          if (item.currency) {
            currency = item.currency
            this.total_riel += this.exchangeMoney(currency.code, 'KHR', item.price)
            this.total_dollar += this.exchangeMoney(currency.code, 'USD', item.price)
            if (!item.is_paid) {
              this.collect_money_riel += this.exchangeMoney(currency.code, 'KHR', item.price)
              this.collect_money_dollar += this.exchangeMoney(currency.code, 'USD', item.price)
            }
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/components/list_item";
.package__item-image {
  width: 80%;
}

.driver-item {
  margin-bottom: 8px;
  border-bottom: 2px solid lightgray;
  padding: 0 0 8px;
  & i {
    width: 25px;
    text-align: center;
  }
}
</style>
