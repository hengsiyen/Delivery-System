<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <NuxtLink
              class="btn btn-primary btn-sm"
              :to="{name: 'edit-shop', params: {id: this.$route.params.id}}"
            >
              <i class="fas fa-edit mr-1" />
              <strong>{{ $t('button.edit') }}</strong>
            </NuxtLink>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <div v-if="shop" class="row">
            <div class="col-lg-8 col-xl-9 shop_package-report">
              <div class="row mb-3">
                <div class="col-lg-12">
                  <div class="form-inline justify-content-center">
                    <div class="form-group w-35 mr-3">
                      <date-picker
                        v-model="filter_date"
                        type="date"
                        :range="true"
                        :placeholder="$t('string.select_range_date')"
                        :lang="datePickerLang"
                        :format="'DD/MM/YYYY'"
                        input-class="form-control w-100"
                        :disabled-date="notAfterToday"
                        :clearable="false"
                        @input="setDate('other')"
                      />
                    </div>
                    <div class="form-group mr-3">
                      <div class="btn-group" role="group" aria-label="Basic example">
                        <button
                          type="button"
                          class="btn"
                          :class="filter_status === 'day' ? 'btn-primary' : 'btn-default'"
                          @click="setDate('day')"
                        >
                          <strong>{{ $t('date.today') }}</strong>
                        </button>
                        <button
                          type="button"
                          class="btn"
                          :class="filter_status === 'week' ? 'btn-primary' : 'btn-default'"
                          @click="setDate('week')"
                        >
                          <strong>{{ $t('date.this_week') }}</strong>
                        </button>
                        <button
                          type="button"
                          class="btn"
                          :class="filter_status === 'month' ? 'btn-primary' : 'btn-default'"
                          @click="setDate('month')"
                        >
                          <strong>{{ $t('date.this_month') }}</strong>
                        </button>
                      </div>
                    </div>
                    <div class="form-group mr-3">
                      <select
                        id="status"
                        v-model="status"
                        name="status"
                        class="custom-select"
                        @change="refreshData"
                      >
                        <option :value="null">
                          {{ $t('label.all') }}
                        </option>
                        <template v-if="package_statuses && package_statuses.length">
                          <option v-for="(item, key) in package_statuses" :key="key" :value="item">
                            {{ item['name_' + $i18n.locale] }}
                          </option>
                        </template>
                      </select>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-lg-12">
                  <div class="shop_package-report-title">
                    <i class="fa fa-cube mr-2" />
                    {{ $t('label.total_package') }} : {{ shop.count_packages }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.new_packages')"
                    :card-value="count_new_packages"
                    icon-class="bg-teal"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.assigned_packages')"
                    :card-value="count_assigned_packages"
                    icon="fas fa-user-check"
                    icon-class="bg-info"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.reject_packages')"
                    :card-value="count_reject_packages"
                    icon="fas fa-user-times"
                    icon-class="bg-orange"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.delivery_package')"
                    :card-value="count_delivery_packages"
                    icon-class="bg-primary"
                    icon="fas fa-motorcycle"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.delay_package')"
                    :card-value="count_delay_packages"
                    icon-class="bg-yellow"
                    icon="fas fa-hourglass-half"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.complete_package')"
                    :card-value="count_complete_packages"
                    icon-class="bg-success"
                    icon="fas fa-check"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.cancel_package')"
                    :card-value="count_cancel_packages"
                    icon-class="bg-red"
                    icon="fas fa-times"
                  />
                </div>
                <div class="col-lg-6 col-xl-3">
                  <ShopCard
                    :title="$t('label.return_package')"
                    :card-value="count_return_packages"
                    icon="fas fa-undo-alt fa-flip-horizontal"
                  />
                </div>
              </div>

              <div class="row mt-5 mb-3">
                <div class="col-lg-12">
                  <div class="shop_package-report-title">
                    <i class="fa fa-cube mr-2" />
                    {{ $t('label.list_package') }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <template v-if="onloading">
                    <div class="onloading">
                      <i class="fas fa-circle-notch fa-spin" />
                    </div>
                  </template>
                  <template v-else>
                    <ShopPackageList :list-packages="packages" />
                    <div v-if="packages && total_pages > 1" class="row">
                      <div class="col-12">
                        <paginate
                          v-model="page"
                          :page-count="total_pages"
                          :page-range="3"
                          :margin-pages="2"
                          :click-handler="getShopReport"
                          :prev-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.prev')}</span>`"
                          :next-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.next')}</span>`"
                          :container-class="'pagination justify-content-end mt-3'"
                          :page-class="'page-item outline-none ml-0 mr-1 mx-sm-1 text-bold'"
                          :prev-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                          :next-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                          :page-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                          :prev-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                          :next-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-xl-3 shop-info-block">
              <div class="row">
                <div class="col-lg-12">
                  <div class="shop-image-logo">
                    <template v-if="shop.logo">
                      <img :src="base_api + '/' + shop.logo" alt="" class="img-thumbnail rounded-circle">
                    </template>
                    <template v-else>
                      <div
                        class="img-thumbnail rounded-circle shop-no-img"
                        :style="`background-image: url('${require('../../../static/img/shop.png')}')`"
                      />
                    </template>
                  </div>
                  <div class="col-12">
                    <div class="shop_name text-center">
                      <h4 class="text-bold">
                        {{ shop.name_en }}
                      </h4>
                    </div>
                    <div class="shop_code">
                      <small class="text-bold text-muted">
                        {{ shop.code }}
                      </small>
                      <small class="ml-3 badge" :class="shop.enabled ? 'badge-success' : 'badge-danger'">
                        {{ shop.enabled ? $t('label.enable') : $t('label.disable') }}
                      </small>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="shop_owner">
                      <div class="shop_owner-image">
                        <template v-if="shop.avatar">
                          <img :src="base_api + '/' + shop.avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                        <template v-else>
                          <img :src="avatar" alt="" class="img-thumbnail rounded-circle">
                        </template>
                      </div>
                      <div class="shop_owner-info">
                        <div class="text-bold ">
                          {{ shop.owner_name }}
                        </div>
                        <small class="d-block">{{ shop.phone }}</small>
                        <small class="d-block">{{ shop.email }}</small>
                        <small class="d-block">{{ shop['address_' + $i18n.locale] }}</small>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div>
                      <div class="text-bold mb-2">
                        {{ $t('label.description') }}
                      </div>
                      <div>
                        {{ shop.description }}
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
  </div>
</template>

<script>
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import ButtonBack from '@/components/UiElements/ButtonBack'
import ShopCard from '@/pages/admin/shop/_components/ShopCard'
import ShopPackageList from '@/pages/admin/shop/_components/ShopPackageList'

export default {
  name: 'ShopShow',
  components: { ShopPackageList, ShopCard, ButtonBack },
  asyncData (ctx) {
    if (ctx.route.params.id) {
      return ctx.$axios
        .post(ctx.env.VUE_APP_API + '/api/backend/shop/show', {
          id: ctx.route.params.id
        })
        .then((res) => {
          const result = res.data.data
          return {
            shop: result
          }
        })
    } else {
      return {
        shop: null
      }
    }
  },
  head () {
    return {
      title: this.metadata.title,
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      number_per_page: 'delivery_company/number_per_page'
    }),
    metadata () {
      const data = {
        title: this.$t('menu.shop')
      }

      if (this.shop) {
        data.title = this.shop.name_en
      }
      return data
    }
  },
  data () {
    return {
      base_api: this.$base_api,
      filter_status: 'month',
      filter_date: [
        this.$moment().startOf('month')._d,
        this.$moment()._d
      ],
      onloading: false,
      status: null,
      package_statuses: [],
      page: 1,
      total_pages: 0,
      packages: [],
      count_new_packages: 0,
      count_assigned_packages: 0,
      count_reject_packages: 0,
      count_delivery_packages: 0,
      count_delay_packages: 0,
      count_complete_packages: 0,
      count_cancel_packages: 0,
      count_return_packages: 0
    }
  },
  mounted () {
    this.getFetchData()
    this.refreshData()
  },
  methods: {
    getFetchData () {
      this.$axios.get(this.$base_api + '/api/backend/fetch-data/data-for-tracking')
        .then((res) => {
          const r = res.data.data
          this.package_statuses = r.package_statuses
          this.drivers = r.drivers
          this.payment_statuses = r.payment_statuses
          this.partner_companies = r.partner_companies
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    setDate (status) {
      this.filter_status = status
      switch (status) {
        case 'day':
          this.filter_date = [
            this.$moment()._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        case 'week':
          this.filter_date = [
            this.$moment().startOf('week')._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        case 'month':
          this.filter_date = [
            this.$moment().startOf('month')._d,
            this.$moment()._d
          ]
          this.refreshData()
          break
        default:
          this.refreshData()
          break
      }
    },
    refreshData () {
      this.onloading = true
      setTimeout(() => {
        this.getShopReport(1)
      }, 500)
    },
    getShopReport: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      const data = {
        dcid: this.dcid,
        filter_date: this.filter_date,
        number_per_page: this.number_per_page,
        page: this.page,
        status: this.status ? this.status.value : null
      }
      if (this.shop) {
        data.sid = this.shop._id
      }
      this.$axios.post(this.$base_api + '/api/backend/shop/shop-report', data)
        .then((res) => {
          this.packages = res.data.data
          if (this.packages) {
            this.count_new_packages = this.countPackageByStatus(this.packages).new_p.length
            this.count_assigned_packages = this.countPackageByStatus(this.packages).assigned_p.length
            this.count_reject_packages = this.countPackageByStatus(this.packages).reject_p.length
            this.count_delivery_packages = this.countPackageByStatus(this.packages).delivery_p.length
            this.count_delay_packages = this.countPackageByStatus(this.packages).delay_p.length
            this.count_complete_packages = this.countPackageByStatus(this.packages).complete_p.length
            this.count_cancel_packages = this.countPackageByStatus(this.packages).cancel_p.length
            this.count_return_packages = this.countPackageByStatus(this.packages).return_p.length
          }
        }).finally(() => {
          this.onloading = false
        })
    }, 500),
    countPackageByStatus (packages) {
      const result = {
        new_p: [],
        assigned_p: [],
        reject_p: [],
        delivery_p: [],
        delay_p: [],
        complete_p: [],
        cancel_p: [],
        return_p: []
      }
      if (packages) {
        packages.forEach((item) => {
          switch (item.final_status) {
            case 'new_package':
              result.new_p.push(item)
              break
            case 'assigned':
              result.assigned_p.push(item)
              break
            case 'reject':
              result.reject_p.push(item)
              break
            case 'delivery':
              result.delivery_p.push(item)
              break
            case 'delay':
              result.delay_p.push(item)
              break
            case 'success':
              result.complete_p.push(item)
              break
            case 'cancel':
              result.cancel_p.push(item)
              break
            case 'return':
              result.return_p.push(item)
              break
          }
        })
      }
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.shop-card_body {
  padding: 0 8px;
}

.shop_package-report {
  padding: 15px;

  & .shop_package-report-title {
    font-size: 20px;
    font-weight: 700;
  }
}

.shop-info-block {
  padding: 15px;
  background-color: #f9f9f99c;

  & .shop_name {
    margin: 12px 0 0;
  }

  & .shop_code {
    display: flex;
    align-items: center;
    justify-content: center;

    & small {
      font-size: 75%;
    }
  }
}

.shop-image-logo {
  width: 150px;
  height: 150px;
  margin: 0 auto;

  & .img-thumbnail {
    width: 100%;
    height: 100%;

    &.shop-no-img {
      background-repeat: no-repeat;
      background-size: 68%;
      background-position: center;
    }
  }
}

.shop_owner {
  display: flex;
  border: 1px solid #dfdfdf;
  border-radius: 0.2rem;
  width: 100%;
  padding: 15px;
  margin: 3rem 0;
  background-color: white;

  & .shop_owner-image {
    width: 90px;
    height: 90px;

    & .img-thumbnail {
      width: 100%;
      height: 100%;
    }
  }

  & .shop_owner-info {
    padding-left: 20px;
    width: calc(100% - 75px);
  }
}
</style>
