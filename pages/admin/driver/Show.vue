<template>
  <div class="row">
    <div class="col-lg-3 col-xl-3">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
        </div>
        <div class="card-body">
          <template v-if="driver_data">
            <div class="row">
              <div class="col-12">
                <div class="form-group mb-0">
                  <div style="width: 65%;" class="mx-auto mb-4">
                    <template v-if="driver_data.avatar">
                      <img :src="baseUrl + '/' + driver_data.avatar" alt="" class="img-thumbnail">
                    </template>
                    <template v-else>
                      <img src="/img/avatar.png" alt="" class="img-thumbnail">
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-12 driver-header">
                {{ $t('label.personal_information') }}
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
                <i class="fas mr-2" :class="driver_data.gender['name_en'].toLowerCase() === 'female' ? 'fa-female' : 'fa-male'" />
                {{ driver_data.gender['name_' + $i18n.locale] }}
              </div>
              <div class="col-12 driver-item user_role">
                <i class="fas fa-flag mr-2" />
                <span v-for="(item, key) in driver_data.roles" :key="key" class="comma">
                  {{ item['display_name_' + $i18n.locale] }}
                </span>
              </div>
              <div class="col-12 driver-header mt-4">
                {{ $t('label.delivery_information') }}
              </div>
              <div class="col-lg-12 driver-item d-flex align-items-start">
                <label class="d-block mr-4">{{ $t('label.total_price') }}</label>
                <label class="d-block">
                  <span class="d-block">{{ total_riel | numFormat(num_format_km) }} KHR</span>
                  <span class="d-block"><small>( {{ total_dollar | numFormat(num_format_en) }} USD )</small></span>
                </label>
              </div>
              <div class="col-lg-12 driver-item d-flex align-items-start">
                <label class="d-block mr-4">{{ $t('label.collect_money_total') }}</label>
                <label class="d-block">
                  <span class="d-block">{{ collect_money_riel | numFormat(num_format_km) }} KHR</span>
                  <span class="d-block"><small>( {{ collect_money_dollar | numFormat(num_format_en) }} USD )</small></span>
                </label>
              </div>
              <div v-if="driver_data.last_deliver_date" class="col-lg-12 driver-item d-flex align-items-start">
                <label class="d-block mr-4">{{ $t('label.last_delivery_date') }}</label>
                <label class="d-block">
                  {{ $moment(driver_data.last_deliver_date).format('llll') }}
                </label>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="col-lg-9 col-xl-9">
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
          <div class="row package__delivery-content">
            <div class="col-12">
              <ul id="pills-tab" class="nav nav-pills mb-3 has-bg" role="tablist">
                <li class="nav-item" role="presentation">
                  <a
                    id="tabs-home-list"
                    class="nav-link d-flex justify-content-between align-items-center active"
                    href="#list-package_in_hand"
                    role="tab"
                    data-toggle="pill"
                    aria-controls="pills-package_in_hand"
                  >
                    <strong>{{ $t('label.delivery_packages') }}</strong>
                    <span v-if="driver_data.packages_in_hand" class="badge badge-primary badge-pill ml-3">
                      {{ driver_data.packages_in_hand.length }}
                    </span>
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tabs-reject"
                    class="nav-link d-flex justify-content-between align-items-center"
                    href="#list-package_reject"
                    role="tab"
                    data-toggle="pill"
                    aria-controls="pills-package_reject"
                  >
                    <strong>{{ $t('label.rejected_packages') }}</strong>
                    <span v-if="driver_data.reject_packages" class="badge badge-primary badge-pill ml-3">
                      {{ driver_data.reject_packages.length }}
                    </span>
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tabs-profile-list"
                    class="nav-link d-flex justify-content-between align-items-center"
                    href="#list-package_delay"
                    role="tab"
                    data-toggle="pill"
                    aria-controls="pills-package_delay"
                  >
                    <strong>{{ $t('label.delay_packages') }}</strong>
                    <span v-if="driver_data.delay_packages" class="badge badge-primary badge-pill ml-3">
                      {{ driver_data.delay_packages.length }}
                    </span>
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tabs-messages-list"
                    class="nav-link d-flex justify-content-between align-items-center"
                    href="#list-package_complete"
                    role="tab"
                    data-toggle="pill"
                    aria-controls="pills-package_complete"
                  >
                    <strong>{{ $t('label.complete_packages') }}</strong>
                    <span v-if="driver_data.complete_packages" class="badge badge-primary badge-pill ml-3">
                      {{ driver_data.complete_packages.length }}
                    </span>
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a
                    id="tabs-settings-list"
                    class="nav-link d-flex justify-content-between align-items-center"
                    href="#list-package_cancel"
                    role="tab"
                    data-toggle="pill"
                    aria-controls="pills-package_cancel"
                  >
                    <strong>{{ $t('label.cancel_packages') }}</strong>
                    <span v-if="driver_data.cancel_packages" class="badge badge-primary badge-pill ml-3">
                      {{ driver_data.cancel_packages.length }}
                    </span>
                  </a>
                </li>
              </ul>
              <div id="nav-tabContent" class="tab-content">
                <div id="list-package_in_hand" class="tab-pane fade show active" role="tabpanel" aria-labelledby="list-home-tab">
                  <div class="row">
                    <div class="col-lg-12 text-right mb-4">
                      <button
                        v-if="driver_data.have_assign_package"
                        class="btn btn-primary btn-sm"
                        @click="acceptDelivery"
                      >
                        <i class="fas fa-check-circle mr-2" />
                        <strong>{{ $t('btn.accept_all_packages') }}</strong>
                      </button>
                      <button
                        v-if="driver_data.have_assign_package"
                        class="btn btn-danger btn-sm"
                        @click="rejectDelivery"
                      >
                        <i class="fas fa-times-circle mr-2" />
                        <strong>{{ $t('btn.reject_all_packages') }}</strong>
                      </button>
                    </div>
                    <div class="col-lg-12">
                      <DriverPackageList
                        :list-packages="driver_data.packages_in_hand"
                        :show-accept-botton="true"
                        :show-reject-button="true"
                        :show-cancel-button="true"
                        :show-complete-button="true"
                        @onClickAccept="acceptByEachPackage"
                        @onClickReject="rejectByEachPackage"
                        @refreshData="refreshDriverData"
                      />
                    </div>
                  </div>
                </div>
                <div id="list-package_reject" class="tab-pane fade" role="tabpanel" aria-labelledby="list-profile-tab">
                  <div class="row">
                    <div class="col-lg-12">
                      <DriverPackageList :list-packages="driver_data.reject_packages" />
                    </div>
                  </div>
                </div>
                <div id="list-package_delay" class="tab-pane fade" role="tabpanel" aria-labelledby="list-profile-tab">
                  <div class="row">
                    <div class="col-lg-12">
                      <DriverPackageList :list-packages="driver_data.delay_packages" />
                    </div>
                  </div>
                </div>
                <div id="list-package_complete" class="tab-pane fade" role="tabpanel" aria-labelledby="list-messages-tab">
                  <div class="row">
                    <div class="col-lg-12">
                      <DriverPackageList :list-packages="driver_data.complete_packages" />
                    </div>
                  </div>
                </div>
                <div id="list-package_cancel" class="tab-pane fade" role="tabpanel" aria-labelledby="list-settings-tab">
                  <div class="row">
                    <div class="col-lg-12">
                      <DriverPackageList :list-packages="driver_data.cancel_packages" />
                    </div>
                  </div>
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
import { mapGetters } from 'vuex'
import DriverPackageList from '@/pages/admin/driver/_components/PackageList'

export default {
  name: 'DriverShow',
  components: { DriverPackageList, ButtonBack },
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
      if (this.driver_data.packages_in_hand && this.driver_data.packages_in_hand.length > 0) {
        const packages = this.driver_data.packages_in_hand
        packages.forEach((item) => {
          let currency = null
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
    },
    acceptByEachPackage (item) {
      if (item) {
        this.acceptDelivery(event, item._id)
      }
    },
    acceptDelivery (event, packageId = null) {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('menu.delivery'),
        text: packageId ? this.$t('label.start_delivery') : this.$t('label.accept_all_packages'),
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          this.$axios.post(this.$base_api + '/api/backend/driver/accept-delivery', {
            id: this.$route.params.id,
            package_id: packageId
          }).then((res) => {
            this.driver_data = res.data.data
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    rejectByEachPackage (item) {
      this.rejectDelivery(event, item._id)
    },
    rejectDelivery (event, packageId = null) {
      this.onConfirm({
        icon: 'warning',
        title: this.$t('menu.delivery'),
        text: packageId ? this.$t('label.reject_package') : this.$t('label.reject_all_packages'),
        cancelButtonColor: '#3a7afe',
        confirmButtonColor: '#ed524f',
        confirmButtonText: this.$t('string.ok'),
        cancelButtonText: this.$t('string.cancel')
      }).then((accept) => {
        if (accept) {
          this.$axios.post(this.$base_api + '/api/backend/driver/reject-delivery', {
            id: this.$route.params.id,
            package_id: packageId
          }).then((res) => {
            this.driver_data = res.data.data
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    refreshDriverData () {
      this.$axios.post(this.$base_api + '/api/backend/driver/show', {
        id: this.$route.params.id
      }).then((res) => {
        this.driver_data = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/components/list_item";
.driver-item {
  margin: 8px 0;
  border-bottom: 1px solid #efefef;
  padding-top: 8px;
  padding-bottom: 8px;
  & i {
    width: 25px;
    text-align: center;
  }
}

.checkbox-xl .custom-control-label::before,
.checkbox-xl .custom-control-label::after {
  top: 1.2rem;
  width: 1.85rem;
  height: 1.85rem;
}
</style>
