<template>
  <div class="wrapper">
    <HeaderMobile hide-button-home hide-button-logout show-navbar-text :navbar-text="$t('label.assigned')" />
    <div class="mobile-content-h">
      <div class="col-lg-12" style="padding-top: 1rem">
        <div class="form-group row mb-3">
          <div class="input-group input-group-lg col-12">
            <input
              v-model="search_query"
              :placeholder="$t('label.search') + '...'"
              class="form-control"
              type="search"
            >
            <div class="input-group-append">
              <span class="input-group-text bg-white border-left-0">
                <i class="fas fa-search" />
              </span>
            </div>
          </div>
        </div>
        <div class="w-100 d-flex align-items-center filter-items flex-wrap">
          <div v-if="search_query" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
            {{ $t('label.search') }}: {{ search_query }}
            <button class="btn btn-default btn-xs" @click="search_query= null">
              <i class="fa fa-times" />
            </button>
          </div>
        </div>
        <template v-if="onloading">
          <div class="onloading pt-5">
            <i class="fas fa-circle-notch fa-spin" />
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="list_items col-12">
              <template v-if="list_packages && list_packages.length">
                <div class="pt-3 pb-3 d-flex">
                  <button class="btn btn-link btn-block text-danger mr-1" @click="rejectDelivery">
                    <i class="fas fa-times-circle mr-2" />
                    <strong>{{ $t('btn.reject_all_packages') }}</strong>
                  </button>
                  <button class="btn btn-primary btn-block mt-0" @click="acceptDelivery">
                    <i class="fas fa-check-circle mr-2" />
                    <strong>{{ $t('btn.accept_all_packages') }}</strong>
                  </button>
                </div>
                <template v-for="(item, key) in list_packages">
                  <div :key="key" class="list_item list_item-hover">
                    <div class="d-flex px-0">
                      <div class="col-3 col-md-2 col-lg-2 col-xl-1">
                        <template v-if="item.media">
                          <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                        </template>
                        <template v-else>
                          <img :src="package_img" alt="" class="img-thumbnail">
                        </template>
                      </div>
                      <div class="col-9 col-md-4 col-lg-4 col-xl-5">
                        <div class="list_item-block m-0 font-s-13">
                          <div class="list_item-block-icon">
                            <i class="fas fa-qrcode mr-2" />
                          </div>
                          <div class="list_item-label text-truncate">
                            {{ item.code }}
                          </div>
                        </div>
                        <div class="list_item-block m-0 font-s-14">
                          <div class="list_item-block-icon">
                            <i class="fas fa-user mr-2" />
                          </div>
                          <div class="list_item-label text-truncate">
                            {{ item.customer_name }}
                          </div>
                        </div>
                        <div class="list_item-block m-0 font-s-14">
                          <div class="list_item-block-icon">
                            <i class="fas fa-phone mr-2" />
                          </div>
                          <div class="list_item-label text-truncate">
                            <strong>{{ item.customer_phone }}</strong>
                          </div>
                        </div>
                        <div class="list_item-block m-0 font-s-14">
                          <div class="list_item-block-icon">
                            <i class="fas fa-map-marker-alt mr-2" />
                          </div>
                          <div class="list_item-label">
                            <strong>{{ item.customer_address }}</strong>
                          </div>
                        </div>
                        <div v-if="item.note" class="list_item-block m-0 font-s-14">
                          <div class="list_item-block-icon">
                            <i class="fas fa-sticky-note mr-2" />
                          </div>
                          <div class="list_item-label">
                            {{ item.note }}
                          </div>
                        </div>
                        <div v-if="item.assigned_at" class="list_item-block m-0 font-s-14">
                          <div class="list_item-block-icon">
                            <i class="fas fa-user-check mr-2" />
                          </div>
                          <div class="list_item-label text-truncate">
                            {{ getDateFormat(item.assigned_at) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="pt-2 d-flex">
                      <button class="btn btn-link text-danger btn-block mr-1" @click="rejectByEachPackage(item)">
                        <i class="fas fa-times-circle mr-2" />
                        <strong>{{ $t('btn.reject') }}</strong>
                      </button>
                      <button class="btn btn-primary btn-block mt-0" @click="acceptByEachPackage(item)">
                        <i class="fas fa-check-circle mr-2" />
                        <strong>{{ $t('btn.accept') }}</strong>
                      </button>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="list_item align-items-center w-100 justify-content-center">
                  {{ $t('label.no_result_found') }}
                </div>
              </template>
            </div>
          </div>
          <div v-if="list_packages && total_pages > 1" class="row">
            <div class="col-12">
              <paginate
                v-model="page"
                :page-count="total_pages"
                :page-range="1"
                :margin-pages="1"
                :click-handler="getPackageList"
                :prev-text="`<span class='text-bold'><i class='fas fa-chevron-left'></i></span>`"
                :next-text="`<span class='text-bold'><i class='fas fa-chevron-right'></i></span>`"
                :container-class="'pagination justify-content-center mt-3'"
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
    <FooterMobile />
  </div>
</template>

<script>
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'
import FooterMobile from '@/pages/mobile/_components/Footer'
export default {
  name: 'AssignedListPackage',
  components: { FooterMobile, HeaderMobile },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      user: 'user/getUser'
    })
  },
  watch: {
    search_query (val) {
      this.onloading = true
      if (!this.awaitingSearch) {
        if (this.time_out) {
          clearTimeout(this.time_out)
        }
        this.time_out = setTimeout(() => {
          this.getPackageList(1)
          this.awaitingSearch = false
        }, 1000)
      }
      this.awaitingSearch = true
    }
  },
  data () {
    return {
      onloading: true,
      list_packages: [],
      page: 1,
      total_pages: 0,
      date_format: 'DD/MM/YYYY',
      search_query: null,
      is_enable: null,
      created_at: null,
      statuses: [
        { value: true, name_en: 'Enabled', name_km: 'បើកដំណើរការ' },
        { value: false, name_en: 'Disabled', name_km: 'បិទដំណើរការ' }
      ]
    }
  },
  mounted () {
    this.getPackageList(1)
  },
  methods: {
    selectShop (shop) {
      this.$router.push({ name: 'mobile-shop-show', params: { id: shop._id } })
    },
    clearFilter () {
      this.search_query = null
      this.is_enable = null
      this.created_at = null
      this.refreshData()
    },
    refreshData () {
      this.onloading = true
      setTimeout(() => {
        this.getPackageList(1)
      }, 500)
    },
    getPackageList: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      let userId = null
      if (this.user) {
        userId = this.user._id
      }
      this.$axios.post(this.$base_api + '/api/backend/package/list-package-by-driver', {
        page: this.page,
        number_per_page: this.number_per_page,
        dcid: this.dcid,
        driver_id: userId,
        status: ['assigned'],
        search_query: this.search_query
      })
        .then((res) => {
          this.total_pages = res.data.total_pages
          this.list_packages = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
    }, 500),
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
          let userId = null
          if (this.user) {
            userId = this.user._id
          }
          this.$axios.post(this.$base_api + '/api/backend/driver/accept-delivery', {
            id: userId,
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
          let userId = null
          if (this.user) {
            userId = this.user._id
          }
          this.$axios.post(this.$base_api + '/api/backend/driver/reject-delivery', {
            id: userId,
            package_id: packageId
          }).then((res) => {
            this.driver_data = res.data.data
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";
@import "assets/scss/components/list_item";
.mobile-content-h {
  height: calc(100vh - 60px);
}
.list_item-hover:hover {
  background-color: rgb(245, 245, 245);
}
</style>
