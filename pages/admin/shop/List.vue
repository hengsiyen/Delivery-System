<template>
  <div>
    <div class="form-group search-on_header mb-3">
      <div class="search-with_btn_2">
        <div class="input-group input-group-lg">
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
      <div class="search-_btn_2">
        <button
          class="btn btn-primary btn-lg mr-1"
          type="button"
          data-toggle="collapse"
          data-target="#advancedFilter"
          aria-expanded="false"
          aria-controls="advancedFilter"
        >
          <strong><i class="fas fa-filter mr-2" /> {{ $t('btn.advanced_filters') }}</strong>
        </button>
        <ButtonAddNew
          :link-to="'create-shop'"
          :custom-class="'btn btn-success btn-lg text-capitalize'"
        />
      </div>
    </div>
    <div id="advancedFilter" class="collapse">
      <div class="card card-body">
        <div class="row">
          <div class="col-xl-4">
            <div class="form-group">
              <label>
                {{ $t('label.status') }}
              </label>
              <select
                id="status"
                v-model="is_enable"
                name="status"
                class="custom-select"
                @change="refreshDatatable"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="statuses && statuses.length">
                  <option v-for="(item, key) in statuses" :key="key" :value="item">
                    {{ item['name_' + $i18n.locale] }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="form-group">
              <label>{{ $t('table.createdAt') }}</label>
              <date-picker
                v-model="created_at"
                :placeholder="$t('string.select_date')"
                :lang="datePickerLang"
                :format="date_format"
                input-class="form-control"
                @input="refreshDatatable"
                @clear="refreshDatatable"
              />
            </div>
          </div>
          <div class="col-xl-4">
            <div class="form-group">
              <label>
                {{ $t('label.sort_by') }}
              </label>
              <div class="d-flex align-items-center">
                <select
                  id="sort_by"
                  v-model="sort_by"
                  name="status"
                  class="custom-select w-50 mr-1"
                  @change="refreshDatatable"
                >
                  <template v-if="sort_options && sort_options.length">
                    <option v-for="(item, key) in sort_options" :key="key" :value="item.value">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
                <select
                  v-model="sort_direction"
                  name="status"
                  class="custom-select w-50"
                  @change="refreshDatatable"
                >
                  <template v-if="direction_options && direction_options.length">
                    <option v-for="(item, key) in direction_options" :key="key" :value="item.value">
                      {{ item['name_' + $i18n.locale] }}
                    </option>
                  </template>
                </select>
              </div>
            </div>
          </div>
          <div class="col-xl-12 d-flex align-items-lg-end justify-content-end">
            <div class="form-group">
              <label />
              <button class="btn btn-default" @click="clearFilter">
                <strong>
                  <i class="fas fa-eraser mr-2" />
                  {{ $t('btn.reset') }}
                </strong>
              </button>
            </div>
          </div>
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
      <div v-if="is_enable" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.status') }}: {{ is_enable['name_' + $i18n.locale] }}
        <button class="btn btn-default btn-xs" @click="is_enable = null">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="created_at" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('table.createdAt') }}: {{ $moment(created_at).format(date_format) }}
        <button class="btn btn-default btn-xs" @click="created_at = null">
          <i class="fa fa-times" />
        </button>
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
                      <span v-else>{{ $t('label.disabled') }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-4">
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
                <div class="col-md-2 col-lg-2 col-xl-2 list_item-block-action">
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
      let createdAt = null
      if (this.created_at) {
        createdAt = this.$moment(this.created_at).format('YYYY-MM-DD')
      }
      return {
        lang: this.$i18n.locale,
        dcid: this.dcid,
        search: this.search_query,
        is_enable: this.is_enable ? this.is_enable.value : null,
        created_at: createdAt,
        sort_by: this.sort_by,
        sort_direction: this.sort_direction
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
      sort_by: 'created_at',
      sort_direction: 'desc',
      sort_options: [
        { value: 'created_at', name_en: 'Created Date', name_km: 'កាលបរិច្ឆេទបង្កើត' },
        { value: 'name_en', name_en: 'Shop Name', name_km: 'ឈ្មោះហាង' }
      ],
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
@import "assets/scss/components/list_item";
</style>
