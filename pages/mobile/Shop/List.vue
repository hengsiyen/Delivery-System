<template>
  <div>
    <HeaderMobile>
      <template v-slot:btn-back>
        <ButtonBackMobile />
      </template>
    </HeaderMobile>
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
          <div class="d-flex align-items-center w-100 mt-3">
            <div class="col-lg-6">
              <ButtonAddNew
                :link-to="'create-shop'"
                :custom-class="'btn btn-success btn-block text-capitalize'"
              />
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
              </template>
              <template v-else>
                <div class="list_item align-items-center w-100 justify-content-center">
                  {{ $t('label.no_result_found') }}
                </div>
              </template>
            </div>
          </div>
          <div v-if="list_shops && total_pages > 1" class="row">
            <div class="col-12">
              <paginate
                v-model="page"
                :page-count="total_pages"
                :page-range="1"
                :margin-pages="1"
                :click-handler="getShopList"
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
import { debounce } from 'debounce'
import { mapGetters } from 'vuex'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import HeaderMobile from '@/components/Layouts/HeaderMobile'
import ButtonBackMobile from '@/components/UiElements/ButtonBackMobile'
import FooterMobile from '@/pages/mobile/_components/Footer'
export default {
  name: 'MobileShopList',
  components: { FooterMobile, ButtonBackMobile, HeaderMobile, ButtonAddNew },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    params () {
      let createdAt = null
      if (this.created_at) {
        createdAt = this.$moment(this.created_at).format('YYYY-MM-DD')
      }
      return {
        lang: this.$i18n.locale,
        dcid: this.dcid,
        search: this.search_query,
        is_enable: this.is_enable ? this.is_enable.value : null,
        created_at: createdAt
      }
    }
  },
  watch: {
    params () {
      this.refreshDatatable()
    },
    search_query (val) {
      this.onloading = true
      if (!this.awaitingSearch) {
        if (this.time_out) {
          clearTimeout(this.time_out)
        }
        this.time_out = setTimeout(() => {
          this.getShopList(1)
          this.awaitingSearch = false
        }, 1000)
      }
      this.awaitingSearch = true
    }
  },
  data () {
    return {
      onloading: true,
      list_shops: [],
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
    this.getShopList(1)
  },
  methods: {
    selectShop (shop) {
      this.$router.push({ name: 'mobile-shop-show', params: { id: shop._id } })
    },
    clearFilter () {
      this.search_query = null
      this.is_enable = null
      this.created_at = null
      this.refreshDatatable()
    },
    refreshDatatable () {
      this.onloading = true
      setTimeout(() => {
        this.getShopList(1)
      }, 500)
    },
    getShopList: debounce(function (page = null) {
      if (page) {
        this.page = page
      }
      this.$axios.post(this.$base_api + '/api/backend/shop/list',
        Object.assign({
          page: this.page,
          number_per_page: this.number_per_page,
          ...this.params
        }, this.params))
        .then((res) => {
          this.total_pages = res.data.total_pages
          this.list_shops = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
    }, 500)
  }
}
</script>

<style scoped lang="scss">
@import "assets/scss/pages/mobile";
@import "assets/scss/components/list_item";
.mobile-content-h {
  height: calc(100vh - 177px);
}
.list_item-hover:hover {
  background-color: rgb(245, 245, 245);
}
</style>
