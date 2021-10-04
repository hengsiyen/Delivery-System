<template>
  <div style="padding-top: 1rem">
    <template v-if="can([$Permissions.backend.dashboard.show])">
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <div class="report-title">
            <i class="fa fa-cube mr-2" />
            {{ $t('menu.package') }}
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.received_from_shop')"
            :card-value="total_package"
            icon-class="bg-teal"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.delivery_package')"
            :card-value="total_delivery_package"
            icon-class="bg-primary"
            icon="fas fa-motorcycle"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.complete_package')"
            :card-value="total_complete_package"
            icon-class="bg-success"
            icon="fas fa-check"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.cancel_package')"
            :card-value="total_cancel_package"
            icon-class="bg-red"
            icon="fas fa-times"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-xl-12">
          <div class="report-title">
            <i class="fa fa-motorcycle mr-2" />
            {{ $t('menu.driver') }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.total_driver')"
            :card-value="total_driver"
            icon-class="bg-primary"
            icon="fas fa-user-alt"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.available_driver')"
            :card-value="free_driver"
            icon-class="bg-green"
            icon="fas fa-truck"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.delivering')"
            :card-value="delivering_driver"
            icon-class="bg-red"
            icon="fas fa-shipping-fast"
          />
        </div>
        <div class="col-md-6 col-xl-3">
          <ShopCard
            :title="$t('label.total_shops')"
            :card-value="total_shop"
            icon-class="bg-orange"
            icon="fas fa-store"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                {{ $t('label.the_package_received_from_shop') }}
              </div>
              <div class="card-tools d-flex">
                <input
                  v-model="search_query"
                  type="text"
                  class="form-control mr-1"
                  :placeholder="$t('label.search')"
                  @keyup="getShopHasPackageByCreatedDate(1)"
                >
                <date-picker
                  v-model="date"
                  type="date"
                  :placeholder="$t('string.select_date')"
                  :lang="datePickerLang"
                  :format="'DD/MM/YYYY'"
                  input-class="form-control w-100"
                  :disabled-date="notAfterToday"
                  :clearable="false"
                  @input="getShopHasPackageByCreatedDate(1)"
                />
              </div>
            </div>
            <div class="card-body p-0">
              <table class="table">
                <tbody>
                  <template v-if="list_shops && list_shops.length">
                    <tr v-for="(item, key) in list_shops" :key="key">
                      <td>
                        <div>
                          <p class="mb-0 text-bold">
                            {{ item['name_' + $i18n.locale] }}
                          </p>
                          <small class="text-muted">{{ item.phone }}</small>
                        </div>
                      </td>
                      <td>
                        <p class="mb-0 text-bold">
                          {{ item.packages ? item.packages.length : 0 }}
                          {{ item.packages && item.packages.length > 1 ? $t('unit.packages') : $t('unit.package') }}
                        </p>
                      </td>
                      <td class="text-right">
                        <NuxtLink :to="{name: 'show-shop', params: {id: item._id}}" class="btn btn-default">
                          <i class="fas fa-eye" />
                        </NuxtLink>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <td colspan="3">
                      <NoResult />
                    </td>
                  </template>
                </tbody>
              </table>
            </div>
            <div v-if="list_shops && total_pages > 1" class="card-footer">
              <div class="row">
                <div class="col-12">
                  <paginate
                    v-model="page"
                    :page-count="total_pages"
                    :page-range="3"
                    :margin-pages="2"
                    :click-handler="getShopHasPackageByCreatedDate"
                    :prev-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.prev')}</span>`"
                    :next-text="`<span class='d-none d-sm-inline-block text-bold'>${$t('btn.next')}</span>`"
                    :container-class="'pagination justify-content-end m-0'"
                    :page-class="'page-item outline-none ml-0 mr-1 mx-sm-1 text-bold'"
                    :prev-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                    :next-class="'page-item outline-none ml-0 mr-1 mx-sm-1'"
                    :page-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                    :prev-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                    :next-link-class="'page-link font-bold box-shadow-none rounded border-2'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import ShopCard from '@/pages/admin/shop/_components/ShopCard'
import { debounce } from 'debounce'
import NoResult from '@/components/NoResult'

export default {
  name: 'Dashboard',
  components: { NoResult, ShopCard },
  head () {
    return {
      title: this.$t('menu.dashboard'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  data () {
    return {
      total_package: 0,
      total_delivery_package: 0,
      total_complete_package: 0,
      total_cancel_package: 0,
      total_driver: 0,
      free_driver: 0,
      delivering_driver: 0,
      total_shop: 0,
      filter_status: 'month',
      filter_date: [
        this.$moment().startOf('month')._d,
        this.$moment()._d
      ],

      list_shops: [],
      total_pages: 0,
      page: 1,
      search_query: null,
      date: new Date()
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
  },
  mounted () {
    this.getSummaryDashboard()
    this.getShopHasPackageByCreatedDate(1)
  },
  methods: {
    setDate (status) {
      this.filter_status = status
      switch (status) {
        case 'day':
          this.filter_date = [
            this.$moment()._d,
            this.$moment()._d
          ]
          this.getSummaryDashboard()
          break
        case 'week':
          this.filter_date = [
            this.$moment().startOf('week')._d,
            this.$moment()._d
          ]
          this.getSummaryDashboard()
          break
        case 'month':
          this.filter_date = [
            this.$moment().startOf('month')._d,
            this.$moment()._d
          ]
          this.getSummaryDashboard()
          break
        default:
          this.getSummaryDashboard()
          break
      }
    },
    getSummaryDashboard () {
      const data = {
        dcid: this.dcid,
        filter_date: this.filter_date
      }
      this.$axios.post(this.$base_api + '/api/backend/report/summary-dashboard', data)
        .then((res) => {
          const r = res.data.data
          this.total_package = r.total_package
          this.total_delivery_package = r.total_delivery_package
          this.total_complete_package = r.total_complete_package
          this.total_cancel_package = r.total_cancel_package
          this.total_driver = r.total_driver
          this.free_driver = r.free_driver
          this.delivering_driver = r.delivering_driver
          this.total_shop = r.total_shop
        }).catch((error) => {
          this.onResponseError(error)
        })
    },
    getShopHasPackageByCreatedDate: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      let date = null
      if (this.date) {
        date = this.$moment(this.date).format('YYYY-MM-DD')
      }
      this.$axios.post(this.$base_api + '/api/backend/shop/get-shop-has-package-by-created-date', {
        dcid: this.dcid,
        page: this.page,
        number_per_page: 15,
        search: this.search_query,
        date
      }).then((res) => {
        this.total_pages = res.data.total_pages
        this.list_shops = res.data.data
      })
    }, 500)
  }
}
</script>

<style scoped>
.report-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-left: 7.5px;
  text-transform: capitalize;
}
</style>
