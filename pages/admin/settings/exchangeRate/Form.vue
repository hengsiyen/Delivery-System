<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header with-border">
          <h3 class="card-title text-capitalize">
            {{ $t(title) }}
          </h3>
          <div class="card-tools">
            <ButtonBack />
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="required col-lg-3 col-form-label text-lg-right">{{ $t('label.currency') }}</label>
                <div class="col-lg-9">
                  <select
                    v-model="selected_currency"
                    id="currency"
                    name="currency"
                    class="form-control"
                    :class="{'is-invalid': checkValidate('currency')}"
                  >
                    <option :value="null">
                      {{ $t('label.select_one_option') }} ...
                    </option>
                    <template v-for="(item, key) in currencies">
                      <option :key="key" :value="item">
                        {{ item['name_' + $i18n.locale] }}
                      </option>
                    </template>
                  </select>
                  <small v-if="checkValidate('currency')" class="invalid-feedback">
                    {{ validate.currency[0] }}
                  </small>
                </div>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="required col-lg-3 col-form-label text-lg-right">{{ $t('label.amount') }}</label>
                <div class="col-lg-9">
                  <input
                    v-model="amount"
                    type="number"
                    class="form-control"
                    :class="{'is-invalid': checkValidate('amount')}"
                    :placeholder="$t('pla.exchange_amount')"
                  >
                  <small v-if="checkValidate('amount')" class="invalid-feedback">
                    {{ validate.amount[0] }}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="form-group row">
                <label class="col-lg-3 col-form-label text-lg-right">{{ $t('label.active') }}</label>
                <div class="col-lg-9">
                  <toggle-button
                    class="mb-0"
                    :value="enabled"
                    color="#1876f2"
                    :sync="true"
                    :width="$i18n.locale === 'km' ? 135 : 95"
                    :height="30"
                    :font-size="16"
                    :labels="{checked: $t('label.enable'), unchecked: $t('label.disable')}"
                    @change="toggleEnabled"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-right">
          <button class="btn btn-light" @click="$router.back()">
            <i class="fas fa-times mr-2" />
            <strong>{{ $t('btn.cancel') }}</strong>
          </button>
          <button
            class="btn"
            :class="isEdit ? 'btn-primary' : 'btn-success'"
            @click="storeOrEdit"
          >
            <i class="fas fa-save mr-2" />
            <strong>{{ isEdit ? $t('btn.update') : $t('btn.save') }}</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
import { mapGetters } from 'vuex'

export default {
  name: 'ExchangeRateForm',
  components: { ButtonBack },
  props: {
    title: {
      type: String,
      default: 'label.add_new'
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      validate: null,
      currencies: [],
      id: null,
      selected_currency: null,
      amount: null,
      enabled: true
    }
  },
  computed: {
    ...mapGetters({
      dcid: 'delivery_company/dcid'
    })
  },
  created () {
    this.getCurrencyOptions()
    if (this.isEdit && this.$route.params.id) {
      this.getExchangeRate()
    }
  },
  methods: {
    getCurrencyOptions () {
      let excludedId = null
      if (this.$route.params.id) {
        excludedId = this.$route.params.id
      }
      this.$axios.post(this.$base_api + '/api/backend/exchange-rate/currency-options', {
        dcid: this.dcid,
        exid: excludedId
      }).then((res) => {
        this.currencies = res.data.data
      }).catch((error) => {
        this.onResponseError(error)
      })
    },
    checkValidate (key) {
      return this.validate && this.validate.hasOwnProperty(key)
    },
    toggleEnabled () {
      this.enabled = !this.enabled
    },
    storeOrEdit () {
      this.$isLoading(true)
      this.validate = null
      let cuId = null
      if (this.selected_currency) {
        cuId = this.selected_currency._id
      }
      this.$axios.post(this.$base_api + '/api/backend/exchange-rate/store-or-edit', {
        id: this.id,
        currency: cuId,
        amount: this.amount,
        enabled: this.enabled,
        dcid: this.dcid
      }).then((res) => {
        this.$router.push({ name: 'list-exchange-rate' })
      }).catch((error) => {
        if (error.response.status === 422) {
          this.validate = error.response.data.errors
        } else {
          this.onResponseError(error)
        }
      }).finally(() => {
        this.$isLoading(false)
      })
    },
    getExchangeRate () {
      this.$axios
        .post(this.$base_api + '/api/backend/exchange-rate/show', {
          id: this.$route.params.id
        })
        .then((res) => {
          this.exchange_rate = res.data.data
          if (this.exchange_rate) {
            this.id = this.exchange_rate._id
            this.amount = parseFloat(this.exchange_rate.value)
            this.enabled = this.exchange_rate.enabled
            if (this.exchange_rate.currency) {
              this.selected_currency = this.exchange_rate.currency
            }
          }
        }).catch((error) => {
          this.onResponseError(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
