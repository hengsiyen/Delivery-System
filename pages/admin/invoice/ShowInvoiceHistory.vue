<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header">
          <div class="card-title with-border">
            {{ $t('label.invoiceHistoryShow') }}
          </div>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <DisplayFormInvoice :shop="shop" :invoice="invoice" :dc="dc" :packages="packages" :package-info="pck_info" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayFormInvoice from '@/pages/admin/invoice/_components/DisplayFormInvoice'
import ButtonBack from '@/components/UiElements/ButtonBack'
export default {
  name: 'ShowInvoiceHistory',
  components: { ButtonBack, DisplayFormInvoice },
  data () {
    return {
      dc: null,
      packages: [],
      pck_info: null,
      shop: null,
      invoice: null
    }
  },
  mounted () {
    this.getInvoiceHistory()
  },
  methods: {
    getInvoiceHistory () {
      this.$axios.post(this.$base_api + '/api/backend/invoice/show-invoice-history', {
        id: this.$route.params.id
      }).then((res) => {
        this.dc = res.data.data.delivery_company
        this.packages = res.data.data.data_decode.packages
        this.pck_info = res.data.data.data_decode.packages_info
        this.shop = res.data.data.shop
        this.invoice = res.data.data.data_decode
      })
    }
  }
}
</script>

<style scoped>

</style>
