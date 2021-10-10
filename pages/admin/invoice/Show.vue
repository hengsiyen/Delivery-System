<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t('label.show') }}
          </h3>
          <div class="card-tools">
            <button
              class="btn btn-dark btn-sm"
              @click="printInvoice"
            >
              <i class="fas fa-print mr-1" />
              <strong>{{ $t('btn.print') }}</strong>
            </button>
            <ButtonBack />
          </div>
        </div>
        <div class="card-body shop-card_body">
          <DisplayFormInvoice :shop="shop" :invoice="invoice" :dc="dc" :packages="packages" :package-info="pck_info">
            <div class="row mt-4">
              <div class="col-12 text-right">
                <template v-if="invoice && !invoice.is_paid">
                  <button type="button" class="btn btn-success" data-toggle="modal" data-target="#payment">
                    {{ $t('btn.payment') }}
                  </button>
                </template>
              </div>
            </div>
          </DisplayFormInvoice>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title">
            {{ $t('table.invoiceHistory') }}
          </h3>
        </div>
        <div class="card-body">
          <Datatable
            ref="oTable"
            :columns="columns"
            :params="params"
            table-id="currency-table"
            url="api/backend/invoice/get-invoice-history"
          />
        </div>
      </div>
    </div>
    <div
      id="payment"
      class="modal fade"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <PaymentModal
        :invoice="invoice"
        :shop="shop"
        @PaymentSuccess="getInvoice()"
      />
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import { mapGetters } from 'vuex'
import PaymentModal from '@/pages/admin/invoice/_components/PaymentModal'
import DisplayFormInvoice from '@/pages/admin/invoice/_components/DisplayFormInvoice'

export default {
  name: 'Show',
  components: { DisplayFormInvoice, PaymentModal, ButtonBack },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid',
      currency: 'delivery_company/currency'
    }),
    params () {
      return {
        id: this.$route.params.id,
        lang: this.$i18n.locale,
        show: this.$t('label.show')
      }
    },
    columns () {
      return [
        {
          data: 'description',
          name: 'description',
          searchable: false,
          title: this.$t('label.description')
        },
        {
          data: 'created_at',
          name: 'created_at',
          searchable: false,
          title: this.$t('table.createdAt'),
          render: (data, type, row) => {
            return this.getDateFormat(data)
          }
        },
        {
          data: 'actions',
          name: 'actions',
          searchable: false,
          orderable: false,
          title: this.$t('label.action')
        }
      ]
    }
  },
  data () {
    return {
      onloading: false,
      invoice: null,
      dc: null,
      shop: null,
      pck_info: {
        count_new_packages: 0,
        count_assigned_packages: 0,
        count_reject_packages: 0,
        count_delivery_packages: 0,
        count_delay_packages: 0,
        count_complete_packages: 0,
        count_cancel_packages: 0,
        count_return_packages: 0
      },
      packages: [],
      invoice_histories: []
    }
  },
  mounted () {
    this.getInvoice()
    this.loadAction()
  },
  methods: {
    loadAction () {
      const self = this
      this.clearEventHandler([
        '.btn-show'
      ])
      $(function () {
        $(document).on('click', '.btn-show', function () {
          self.routerPush({
            name: 'show-invoice-history',
            params: {
              id: $(this).attr('data-id')
            }
          })
        })
      })
    },
    getInvoice () {
      this.$axios.post(this.$base_api + '/api/backend/invoice/show', {
        id: this.$route.params.id,
        dcid: this.dcid
      }).then((res) => {
        this.invoice = res.data.data
        if (this.invoice.delivery_company) {
          this.dc = this.invoice.delivery_company
        }
        if (this.invoice.shop) {
          this.shop = this.invoice.shop
        }
        this.pck_info = this.invoice.packages_info
        this.packages = this.invoice.packages
      }).catch((error) => {
        this.onResponseError(error)
      })
    },
    printInvoice () {
      const url = `${this.$base_api}/invoice/dc=`
      const invoiceCode = this.invoice ? this.invoice.code : null
      window.open(url + this.dcid + '&id=' + this.$route.params.id + '&c=' + invoiceCode)
    }
  }
}
</script>
<style scoped>

</style>
