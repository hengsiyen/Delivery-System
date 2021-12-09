<template>
  <div>
    <div class="form-group search-on_header mb-3">
      <div class="search-with_btn_3">
        <div class="input-group input-group-lg">
          <input
            v-model="search_query"
            :placeholder="$t('label.search')"
            class="form-control"
            type="search"
            @keyup="getInvoiceList(1)"
          >
          <div class="input-group-append">
            <span class="input-group-text bg-white border-left-0">
              <i class="fas fa-search" />
            </span>
          </div>
        </div>
      </div>
      <div class="search-_btn_3">
        <button
          class="btn btn-primary btn-lg mr-1"
          type="button"
          data-toggle="collapse"
          data-target="#advancedFilter"
          aria-expanded="false"
          aria-controls="advancedFilter"
        >
          <i class="fas fa-filter mr-2" />
          <strong>{{ $t('btn.filters') }}</strong>
        </button>
        <button class="btn btn-secondary btn-lg mr-1" @click="generateDailyInvoice">
          <i class="fas fa-file-invoice-dollar mr-2" />
          <strong class="text-capitalize">
            {{ $t('label.generateDailyInvoice') }}
          </strong>
        </button>
        <ButtonAddNew
          :link-to="'create-invoice'"
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
                v-model="is_paid"
                name="status"
                class="custom-select"
                @change="getInvoiceList(1)"
              >
                <option :value="null">
                  {{ $t('label.all') }}
                </option>
                <template v-if="paid_status && paid_status.length">
                  <option v-for="(item, key) in paid_status" :key="key" :value="item">
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
                @input="getInvoiceList(1)"
                @clear="getInvoiceList(1)"
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
                  @change="getInvoiceList(1)"
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
                  @change="getInvoiceList(1)"
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
        <button class="btn btn-default btn-xs" @click="removeKeyword('search_query')">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="is_paid" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('label.status') }}: {{ is_paid['name_' + $i18n.locale] }}
        <button class="btn btn-default btn-xs" @click="removeKeyword('is_paid')">
          <i class="fa fa-times" />
        </button>
      </div>
      <div v-if="created_at" class="mb-3 rounded py-1 px-2 text-white bg-white shadow-item">
        {{ $t('table.createdAt') }}: {{ $moment(created_at).format(date_format) }}
        <button class="btn btn-default btn-xs" @click="removeKeyword('created_at')">
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
          <template v-if="invoices && invoices.length">
            <template v-for="(item, key) in invoices">
              <div :key="key" class="list_item">
                <div class="col-md-2 col-lg-2 col-xl-1">
                  <template v-if="item.shop && item.shop.logo">
                    <img :src="getSrc(item.shop.logo)" alt="" class="img-thumbnail">
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
                    <div v-if="item.shop" class="list_item-label text-truncate">
                      {{ item.shop.name_en }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-phone mr-2" />
                    </div>
                    <div v-if="item.shop" class="list_item-label text-truncate">
                      {{ item.shop.phone }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-sticky-note mr-2" />
                    </div>
                    <div class="list_item-status text-truncate" :class="item.is_paid ? 'bg-green' : 'bg-red'">
                      <span v-if="item.is_paid">{{ $t('label.paid') }}</span>
                      <span v-else>{{ $t('label.not_pay_yet') }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-lg-4 col-xl-4">
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-hashtag mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      {{ item.code }}
                    </div>
                  </div>
                  <div class="list_item-block">
                    <div class="list_item-block-icon">
                      <i class="fas fa-donate mr-2" />
                    </div>
                    <div class="list_item-label text-truncate">
                      <strong>
                        {{ item.total_price_riel | numFormat(numFormatKm) }} KHR
                      </strong>
                      <small>
                        ( <strong>{{ item.total_price_dollar | numFormat(numFormatEn) }} USD</strong> )
                      </small>
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
                      :to="{name: 'show-invoice', params:{id: item._id}}"
                    >
                      <i class="fas fa-eye mr-2" />
                      <strong>{{ $t('label.view') }}</strong>
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
      <div v-if="invoices && total_pages > 1" class="row">
        <div class="col-12">
          <paginate
            v-model="page"
            :page-count="total_pages"
            :page-range="3"
            :margin-pages="2"
            :click-handler="getInvoiceList"
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
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'
import ButtonAddNew from '@/components/UiElements/ButtonAddNew'

export default {
  name: 'List',
  components: { ButtonAddNew },
  data () {
    return {
      onloading: false,
      invoices: [],
      page: 1,
      total_pages: 0,
      date_format: 'DD/MM/YYYY',
      search_query: null,
      is_paid: null,
      created_at: null,
      sort_by: 'created_at',
      sort_direction: 'desc',
      sort_options: [
        { value: 'created_at', name_en: 'Created Date', name_km: 'កាលបរិច្ឆេទបង្កើត' }
      ],
      paid_status: [
        { name_en: 'Paid', name_km: 'បង់ប្រាក់ហើយ', value: true },
        { name_en: 'Not pay yet', name_km: 'មិនទាន់បង់ប្រាក់', value: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      number_per_page: 'delivery_company/number_per_page',
      dcid: 'delivery_company/dcid'
    })
  },
  mounted () {
    this.getInvoiceList(1)
  },
  methods: {
    clearFilter () {
      this.search_query = null
      this.is_paid = null
      this.created_at = null
      this.getInvoiceList(1)
    },
    removeKeyword (keyword) {
      switch (keyword) {
        case 'search_query':
          this.search_query = null
          break
        case 'is_paid':
          this.is_paid = null
          break
        case 'created_at':
          this.created_at = null
          break
      }
      this.getInvoiceList(1)
    },
    getInvoiceList: debounce(function (page = 1) {
      this.onloading = true
      if (page) {
        this.page = page
      }
      let createdAt = null
      if (this.created_at) {
        createdAt = this.$moment(this.created_at).format('YYYY-MM-DD')
      }
      this.$axios.post(this.$base_api + '/api/backend/invoice/list', {
        page: this.page,
        number_per_page: this.number_per_page,
        lang: this.$i18n.locale,
        dcid: this.dcid,
        search_query: this.search_query,
        is_paid: this.is_paid ? this.is_paid.value : null,
        created_at: createdAt,
        sort_by: this.sort_by,
        sort_direction: this.sort_direction
      })
        .then((res) => {
          this.total_pages = res.data.total_pages
          this.invoices = res.data.data
        }).catch((error) => {
          this.onResponseError(error)
        }).finally(() => {
          this.onloading = false
        })
    }, 500),
    generateDailyInvoice () {
      this.$swal({
        html: `<label class="mb-3 font-s-20 d-block">${this.$t('swal.generateTodayInvoices')}</label>` +
          `<label class="mb-3 font-s-20 d-block">${this.$t('swal.generateTodayInvoicesDes')}</label>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        confirmButtonText: this.$t('swal.yes_create_it'),
        cancelButtonText: this.$t('swal.no_cancel')
      }).then((result) => {
        if (result.value) {
          this.$axios.post(this.$base_api + '/api/backend/invoice/generate-daily-invoice', {
            dcid: this.dcid
          }).then((res) => {
            this.getInvoiceList(1)
          }).catch((error) => {
            this.onResponseError(error)
          })
        }
      }, (dismiss) => {
        if (!(dismiss === 'cancel')) {
          throw dismiss
        }
      }).catch(function (err) {
        console.error(err)
        throw err
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/scss/components/_list_item.scss";
</style>
