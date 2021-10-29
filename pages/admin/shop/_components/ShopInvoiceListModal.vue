<template>
  <div
    id="shopListInvoice"
    class="modal fade"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="staticBackdropLabel" class="modal-title">
            {{ $t('label.invoices') }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <div class="form-group mb-3">
              <div>
                <input
                  v-model="search_query"
                  :placeholder="$t('label.search')"
                  class="form-control"
                  type="text"
                  @keyup="search"
                >
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
                      <div :key="key" class="list_item hover">
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
                            <button
                              class="btn btn-default btn-sm btn-block"
                              data-dismiss="modal"
                              @click="selectInvoice(item)"
                            >
                              <i class="fas fa-eye mr-2" />
                              <strong>{{ $t('label.view') }}</strong>
                            </button>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <infinite-loading ref="infinite" spinner="spiral" :identifier="invoiceInfiniteId" @infinite="getInvoiceList">
                    <div slot="spinner">
                      <i class="fas fa-circle-notch fa-spin" />
                    </div>
                    <div slot="no-more" />
                    <div slot="no-results">
                      <div class="list_item align-items-center w-100 justify-content-center">
                        {{ $t('label.no_result_found') }}
                      </div>
                    </div>
                  </infinite-loading>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">
            <i class="fas fa-times-circle mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { debounce } from 'debounce'

export default {
  name: 'ShopInvoiceListModal',
  data () {
    return {
      onloading: false,
      invoices: [],
      page: 1,
      total_pages: 0,
      search_query: null,
      invoiceInfiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters({
      number_per_page: 'delivery_company/number_per_page',
      dcid: 'delivery_company/dcid'
    })
  },
  mounted () {
    this.search()
  },
  methods: {
    selectInvoice (item) {
      this.$router.push({ name: 'show-invoice', params: { id: item._id } })
    },
    resetStateChanger () {
      if (this.$refs.infinite && this.$refs.infinite.stateChanger) {
        this.$refs.infinite.stateChanger.reset()
      }
    },
    search: debounce(function () {
      if (this.$refs.infinite) {
        this.page = 1
        this.invoices = []
        this.resetStateChanger()
      } else {
        this.getInvoiceList()
      }
    }, 500),
    getInvoiceList ($state) {
      this.$axios
        .post(this.$base_api + '/api/backend/invoice/list', {
          page: this.page,
          number_per_page: this.number_per_page,
          lang: this.$i18n.locale,
          dcid: this.dcid,
          search_query: this.search_query
        })
        .then(({ data }) => {
          if (data.data && data.data.length) {
            this.page++
            this.invoices.push(...data.data)
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
@import "assets/scss/components/_list_item";
.list_item-block {
  margin: 0;
}
</style>
