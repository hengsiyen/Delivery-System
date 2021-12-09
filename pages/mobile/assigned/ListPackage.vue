<template>
  <div class="wrapper">
    <HeaderMobile hide-button-home hide-button-logout show-navbar-text :navbar-text="$t('label.assigned')" />
    <div class="mobile-content-h">
      <div class="col-lg-12" style="padding-top: 1rem">
        <div class="form-group row mb-3">
          <div class="input-group col-12">
            <input
              v-model="search_query"
              :placeholder="$t('label.search')"
              class="form-control"
              type="text"
              @keyup="search"
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
            <button class="btn btn-default btn-xs" @click="removeSearch">
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
                    <div class="d-flex px-0 w-100" @click="showPackage(item)">
                      <div class="col-3 col-md-2 col-lg-2 col-xl-1">
                        <template v-if="item.media">
                          <img :src="getSrc(item.media.src)" alt="" class="img-thumbnail">
                        </template>
                        <template v-else>
                          <img :src="package_img" alt="" class="img-thumbnail">
                        </template>
                      </div>
                      <div class="col-9 col-md-4 col-lg-4 col-xl-5">
                        <div class="list_item-block m-0 font-s-14">
                          <div class="list_item-label text-truncate">
                            <strong>{{ item.customer_phone }} - {{ item.customer_name }}</strong>
                          </div>
                        </div>
                        <div class="list_item-block m-0 font-s-13">
                          <div class="list_item-block-icon">
                            <i class="fas fa-qrcode mr-2" />
                          </div>
                          <div class="list_item-label text-truncate">
                            {{ item.code }}
                          </div>
                        </div>
                        <div class="list_item-block m-0 font-s-13">
                          <div class="list_item-block-icon">
                            <i class="fas fa-map-marker-alt mr-2" />
                          </div>
                          <div class="list_item-label">
                            <strong>{{ item.customer_address }}</strong>
                          </div>
                        </div>
                        <div v-if="item.note" class="list_item-block m-0 font-s-13">
                          <div class="list_item-block-icon">
                            <i class="fas fa-sticky-note mr-2" />
                          </div>
                          <div class="list_item-label">
                            {{ item.note }}
                          </div>
                        </div>
                        <div v-if="item.assigned_at" class="list_item-block m-0 font-s-13">
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
                <infinite-loading ref="infinite" spinner="spiral" :identifier="infiniteId" @infinite="getPackageList">
                  <div slot="spinner">
                    <i class="fas fa-circle-notch fa-spin" />
                  </div>
                  <div slot="no-more" />
                  <div slot="no-results" />
                </infinite-loading>
              </template>
              <template v-else>
                <NoResult />
              </template>
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
import NoResult from '@/components/NoResult'

export default {
  name: 'AssignedListPackage',
  head () {
    return {
      title: this.$t('label.assigned'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { NoResult, FooterMobile, HeaderMobile },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      user: 'user/getUser'
    })
  },
  data () {
    return {
      onloading: true,
      list_packages: [],
      page: 1,
      total_pages: 0,
      date_format: 'DD/MM/YYYY',
      search_query: null,
      infiniteId: +new Date(),
      is_enable: null,
      created_at: null
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    showPackage (item) {
      this.$router.push({ name: 'mobile-package-show', params: { id: item._id } })
    },
    removeSearch () {
      this.search_query = null
      this.search()
    },
    search: debounce(function () {
      this.page = 1
      this.infiniteId += 1
      this.list_packages = []
      this.getPackageList()
    }, 500),
    getPackageList ($state) {
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
        .then(({ data }) => {
          if (data.data && data.data.length) {
            this.page++
            this.list_packages.push(...data.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
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
          let userId = null
          if (this.user) {
            userId = this.user._id
          }
          this.$axios.post(this.$base_api + '/api/backend/driver/accept-delivery', {
            id: userId,
            package_id: packageId
          }).then((res) => {
            this.search()
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      })
    },
    rejectByEachPackage (item) {
      if (item) {
        this.rejectDelivery(event, item._id)
      }
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
            this.search()
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
  height: calc(100vh - 117px);
}

.list_item-hover:hover {
  background-color: rgb(245, 245, 245);
}
</style>
