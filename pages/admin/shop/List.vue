<template>
  <div class="col-lg-12">
    <div class="form-group row mb-3">
      <div class="input-group input-group-lg col-lg-8">
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
      <div class="col-lg-2">
        <button
          class="btn btn-primary btn-lg btn-block"
          type="button"
          data-toggle="collapse"
          data-target="#advancedFilter"
          aria-expanded="false"
          aria-controls="advancedFilter"
        >
          <strong><i class="fas fa-filter mr-2" /> {{ $t('btn.advanced_filters') }}</strong>
        </button>
      </div>
      <div class="col-lg-2">
        <ButtonAddNew
          :link-to="'create-shop'"
          :custom-class="'btn btn-success btn-lg btn-block text-capitalize'"
        />
      </div>
    </div>
    <template v-if="onloading">
      <div class="onloading">
        <i class="fas fa-circle-notch fa-spin" />
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="list_items col-12">
          <template v-if="list_shops && list_shops.length">
            <template v-for="(item, key) in list_shops">
              <div :key="key" class="list_item">
                <div class="col-md-2 col-lg-2 col-xl-1">
                  <template v-if="item.logo">
                    <img :src="getSrc(item.logo)" alt="" class="img-thumbnail">
                  </template>
                  <template v-else>
                    <img :src="shop_img" alt="" class="img-thumbnail">
                  </template>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-5">
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-store mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.name_en }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-phone mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.phone }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-sticky-note mr-2" />
                    </div>
                    <div class="list_item-status text-truncate" :class="item.enabled ? 'bg-green' : 'bg-red'">
                      <span v-if="item.enabled">{{ $t('label.enabled') }}</span>
                      <span v-else>{{ $t('label.disbled') }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-5">
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-user mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.owner_name }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-map-marker-alt mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item['address_' + $i18n.locale] }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-calendar-alt mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ $moment(item.created_at).format('lll') }}
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-lg-2 col-xl-1 list_item-block-action">
                  <div class="list_item-block-btn">
                    <NuxtLink
                      class="btn btn-default btn-sm btn-block"
                      :to="{name: 'show-shop', params:{id: item._id}}"
                    >
                      <i class="fas fa-eye mr-2" />
                      <strong>{{ $t('label.view') }}</strong>
                    </NuxtLink>
                  </div>
                  <div class="list_item-block-btn">
                    <NuxtLink
                      :to="{name: 'edit-shop', params: {id: item._id}}"
                      class="btn btn-default btn-sm btn-block"
                    >
                      <i class="fas fa-edit mr-2" />
                      <strong>{{ $t('btn.edit') }}</strong>
                    </NuxtLink>
                  </div>
                  <!--                  <div class="list_item-block-btn">-->
                  <!--                    <div class="dropdown">-->
                  <!--                      <button-->
                  <!--                        id="dropdownMenuButton"-->
                  <!--                        class="btn btn-default btn-sm btn-block dropdown-toggle dropdown-no-icon"-->
                  <!--                        type="button"-->
                  <!--                        data-toggle="dropdown"-->
                  <!--                        aria-haspopup="true"-->
                  <!--                        aria-expanded="false"-->
                  <!--                      >-->
                  <!--                        <i class="fas fa-ellipsis-v mr-2" />-->
                  <!--                        <strong>Other</strong>-->
                  <!--                      </button>-->
                  <!--                      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">-->
                  <!--                        <a class="dropdown-item" href="#">Action</a>-->
                  <!--                        <a class="dropdown-item" href="#">Another action</a>-->
                  <!--                        <a class="dropdown-item" href="#">Something else here</a>-->
                  <!--                      </div>-->
                  <!--                    </div>-->
                  <!--                  </div>-->
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
      <div v-if="list_shops && list_shops.length > 1" class="row">
        <div class="col-12">
          <paginate
            v-model="page"
            :page-count="total_pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getShopList"
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
</template>
<script>
import { debounce } from 'debounce'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopList',
  components: { ButtonAddNew },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    }),
    params () {
      return {
        lang: this.$i18n.locale,
        search_query: this.search_query,
        dcid: this.dcid
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
      search_query: null
    }
  },
  mounted () {
    this.getShopList(1)
  },
  methods: {
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
@import "../../../assets/scss/components/_list_item.scss";
</style>
