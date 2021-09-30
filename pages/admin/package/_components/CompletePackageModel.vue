<template>
  <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="completePackageModalLabel" class="modal-title">
          <i class="fas fa-map-marker-alt mr-2" /> {{ $t('label.complete_delivery') }}
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="cancelCompletePackage"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>
            <span class="required text-capitalize">{{ $t('label.completeAt') }}</span>
            <span class="ml-2">{{ $moment(complete_at).format('DD/MM/YYYY hh:mm:ss A') }}</span>
          </label>
          <date-picker
            v-model="complete_at"
            type="datetime"
            :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
            :show-second="false"
            :placeholder="$t('string.select_date')"
            :lang="datePickerLang"
            :format="'DD/MM/YYYY hh:mm:ss A'"
            input-class="form-control"
            :disabled-date="notBeforeToday"
            :class="{'is-invalid': checkValidate('complete_at')}"
          />
          <div v-if="checkValidate('complete_at')" class="invalid-feedback">
            {{ validate.complete_at[0] }}
          </div>
        </div>
        <div class="form-group">
          <label><span class="required">{{ $t('menu.payment_type') }}</span></label>
          <select
            v-if="paymentTypes"
            id="payment_type"
            v-model="payment_type"
            name="payment_type"
            class="custom-select"
            :class="{'is-invalid': checkValidate('payment_type_id')}"
          >
            <option :value="null" selected hidden>
              {{ $t('label.select_one_option') }}
            </option>
            <template v-for="(item, key) in paymentTypes">
              <option :key="key" :value="item">
                {{ item['name_' + $i18n.locale] }}
              </option>
            </template>
          </select>
          <div v-if="checkValidate('payment_type_id')" class="invalid-feedback">
            {{ validate.payment_type_id[0] }}
          </div>
        </div>
        <div class="form-group">
          <label class="text-capitalize">{{ $t('label.paymentReference') }}</label>
          <div class="upload-btn-wrapper">
            <button class="btn btn-block">
              <i class="fas fa-link mr-2" />
              {{ $t('label.uploadBankTransaction') }}
              ( {{ $t('label.bankPaymentTransaction') }} )
            </button>
            <input
              ref="completePhoto"
              type="file"
              name="complete_photo"
              accept="image/*"
              @change="onUploadFile"
            >
          </div>
          <div id="preview">
            <img v-if="url" class="img-thumbnail mt-3 mx-auto" :src="url">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="cancelCompletePackage"
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
  name: 'CompletePackageModel',
  props: {
    paymentTypes: {
      type: Array,
      default: () => {
        return []
      }
    },
    packageId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      complete_at: new Date(),
      url: null,
      file: null,
      payment_type: null,
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
    onUploadFile (e) {
      const file = e.target.files[0]
      this.file = file
      this.url = URL.createObjectURL(file)
    },
    submit () {
      this.onConfirm({
        title: this.$t('label.complete_delivery'),
        text: this.$t('label.complete_delivery_sub'),
        cancelButtonColor: '#3a7afe',
        confirmButtonColor: '#ed524f',
        cancelButtonText: this.$t('button.cancel'),
        confirmButtonText: this.$t('string.ok')
      }).then((accept) => {
        if (accept) {
          this.validate = null
          const data = new FormData()
          data.append('edit_form', 'complete')
          data.append('edit_form_type', 'edit')
          if (this.packageId) {
            data.append('id', this.packageId)
          }
          if (this.complete_at) {
            data.append('complete_at', this.$moment(this.complete_at).format('YYYY-MM-DD hh:mm:ss'))
          }
          if (this.payment_type) {
            data.append('payment_type_id', this.payment_type._id)
          }
          if (this.file) {
            data.append('payment_reference', this.file)
          }
          this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
            .then((res) => {
              this.$toastr('success', this.$t('message.package_complete'), this.$t('label.complete_delivery'))
              this.cancelCompletePackage()
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
    },
    cancelCompletePackage () {
      this.url = null
      this.file = null
      this.validate = null
      this.payment_type = null
      this.complete_at = new Date()
    }
  }
}
</script>

<style scoped lang="scss">
#preview {
  text-align: center;
  width: 75%;
  margin: 0 auto;
}
</style>
