<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="completePackageModalLabel" class="modal-title">
          <i class="fas fa-map-marker-alt mr-2" /> {{ $t('label.delay_delivery') }}
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="cancelDelayPackage"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="packageData" class="form-group">
          <label v-if="packageData.request_delivery_at">
            Request Delivery Date: {{ $moment( packageData.request_delivery_at).format(date_format) }}
          </label>
          <template v-if="packageData.assigned_at">
            <label>
              Assigned Date: {{ $moment( packageData.assigned_at).format(date_format) }}
            </label>
            <template v-if="packageData.accepted_at">
              <label>
                Delivery Date: {{ $moment( packageData.accepted_at).format(date_format) }}
              </label>
            </template>
            <template v-else>
              <label>
                Delivery Date: <span class="text-red">( {{ $t('label.not_accept_delivery_yet') }} )</span>
              </label>
            </template>
          </template>
        </div>
        <div class="form-group">
          <label class="required">New Delivery Date</label>
          <date-picker
            v-model="delay_at"
            type="datetime"
            :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
            :show-second="false"
            :placeholder="$t('string.select_range_date')"
            :lang="datePickerLang"
            :disabled-date="notBeforeToday"
            :format="'DD/MM/YYYY hh:mm:ss A'"
            input-class="form-control"
            :class="{'is-invalid': checkValidate('delay_at')}"
          />
          <div v-if="checkValidate('delay_at')" class="invalid-feedback">
            {{ validate.delay_at[0] }}
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="cancelDelayPackage"
        >
          <i class="fas fa-times-circle mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="submit"
        >
          <i class="fas fa-check-circle mr-2" />
          <strong>{{ $t('btn.submit') }}</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DelayPackageModal',
  props: {
    packageData: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  computed: {
    datePickerLang () {
      return this.$datepickerLocale[this.$i18n.locale].lang
    },
    delayDeliverySub () {
      const m = {
        en: '',
        km: ''
      }

      if (this.packageData && this.packageData.request_delivery_at) {
        m.en = '<p style="line-height: 1.5;">Do you want to change the delivery date to <label>' +
          this.$moment(this.delay_at).format('DD/MM/YYYY hh:mm:ss A') + '</label> ?</p>'
        m.km = '<p style="line-height: 2;">តើអ្នកចង់ផ្លាស់ប្តូរថ្ងៃដឹកជញ្ជូនទៅថ្ងៃ <label>' +
          this.$moment(this.delay_at).format('DD/MM/YYYY hh:mm:ss A') + '</label> ?</p>'
      }

      return m[this.$i18n.locale]
    }
  },
  data () {
    return {
      date_format: 'DD/MM/YYYY hh:mm:ss A',
      delay_at: null,
      validate: null
    }
  },
  methods: {
    checkValidate (key) {
      if (key) {
        return this.validate && this.validate.hasOwnProperty(key)
      }
      return false
    },
    submit () {
      if (this.delay_at) {
        this.onConfirm({
          title: this.$t('label.delay_delivery'),
          html: this.delayDeliverySub,
          cancelButtonColor: '#3a7afe',
          confirmButtonColor: '#ed524f',
          cancelButtonText: this.$t('button.cancel'),
          confirmButtonText: this.$t('string.ok')
        }).then((accept) => {
          if (accept) {
            this.validate = null
            const data = {
              edit_form: 'delay',
              edit_form_type: 'edit',
              delay_at: null
            }
            if (this.packageData) {
              data.id = this.packageData._id
            }
            if (this.delay_at) {
              data.delay_at = this.$moment(this.delay_at).format('YYYY-MM-DD hh:mm:ss')
            }
            this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
              .then((res) => {
                this.cancelDelayPackage()
                this.$toastr('success', this.$t('message.package_delay') + ' ' + data.delay_at, this.$t('label.delay_delivery'))
                this.$emit('onSubmit', res.data.data)
                this.$refs.close.click()
              }).catch((error) => {
                if (error.response.status === 422) {
                  this.validate = error.response.data.errors
                } else {
                  this.onResponseError(error)
                }
              })
          }
        })
      } else {
        this.validate = {
          delay_at: ['The new delivery date field is required.']
        }
      }
    },
    cancelDelayPackage () {
      this.delay_at = null
      this.validate = null
    }
  }
}
</script>

<style scoped>

</style>
