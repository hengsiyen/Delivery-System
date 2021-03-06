<template>
  <div>
    <HeaderMobile>
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
    </HeaderMobile>
    <div class="mobile-content-h">
      <div class="col-lg-12 mobile-body-padding pt-4">
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
          <div class="d-flex align-items-center w-100 mt-3">
            <div class="col-lg-12">
              <ButtonAddNew
                :link-to="'mobile-shop-create'"
                :custom-class="'btn btn-success btn-block text-capitalize'"
              />
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
              <template v-if="list_shops && list_shops.length">
                <template v-for="(item, key) in list_shops">
                  <div :key="key" class="list_item list_item-hover d-flex px-0" @click="selectShop(item)">
                    <div class="col-3 col-md-2 col-lg-2 col-xl-1">
                      <template v-if="item.logo">
                        <img :src="getSrc(item.logo)" alt="" class="img-thumbnail">
                      </template>
                      <template v-else>
                        <img :src="shop_img" alt="" class="img-thumbnail">
                      </template>
                    </div>
                    <div class="col-9 col-md-4 col-lg-4 col-xl-5">
                      <div class="list_item-block m-0">
                        <div class="list_item-block-icon">
                          <i class="fas fa-store mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.name_en }}
                        </div>
                      </div>
                      <div class="list_item-block m-0">
                        <div class="list_item-block-icon">
                          <i class="fas fa-user mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.owner_name }}
                        </div>
                      </div>
                      <div class="list_item-block m-0">
                        <div class="list_item-block-icon">
                          <i class="fas fa-phone mr-2" />
                        </div>
                        <div class="list_item-label text-truncate">
                          {{ item.phone }}
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <infinite-loading ref="infinite" spinner="spiral" :identifier="infiniteId" @infinite="getShopList">
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
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'
import FooterMobile from '@/pages/mobile/_components/Footer'
import NoResult from '@/components/NoResult'

export default {
  name: 'MobileShopList',
  head () {
    return {
      title: this.$t('menu.shop'),
      titleTemplate: '%s | ' + process.env.VUE_APP_NAME
    }
  },
  components: { NoResult, FooterMobile, ButtonBackMobile, HeaderMobile, ButtonAddNew },
  computed: {
    ...mapGetters({
      number_per_page: 'delivery_company/number_per_page',
      dcid: 'delivery_company/dcid'
    })
  },
  data () {
    return {
      onloading: true,
      list_shops: [],
      infiniteId: +new Date(),
      page: 1,
      total_pages: 0,
      date_format: 'DD/MM/YYYY',
      search_query: null,
      is_enable: null,
      created_at: null,
      packageInfiniteId: +new Date(),
      statuses: [
        { value: true, name_en: 'Enabled', name_km: 'បើកដំណើរការ' },
        { value: false, name_en: 'Disabled', name_km: 'បិទដំណើរការ' }
      ]
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    selectShop (shop) {
      this.$router.push({ name: 'mobile-shop-show', params: { id: shop._id } })
    },
    removeSearch () {
      this.search_query = null
      this.search()
    },
    search: debounce(function () {
      this.infiniteId += 1
      this.page = 1
      this.list_shops = []
      this.getShopList()
    }, 500),
    getShopList ($state) {
      this.$axios
        .post(this.$base_api + '/api/backend/shop/list', {
          page: this.page,
          number_per_page: this.number_per_page,
          lang: this.$i18n.locale,
          dcid: this.dcid,
          search: this.search_query
        })
        .then(({ data }) => {
          if (data.data && data.data.length) {
            this.page++
            this.list_shops.push(...data.data)
            $state.loaded()
          } else {
            $state.complete()
          }
        })
        .catch((error) => {
          this.onResponseError(error)
        })
        .finally(() => {
          this.onloading = false
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
