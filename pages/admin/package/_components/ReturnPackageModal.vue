<template>
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="completePackageModalLabel" class="modal-title">
          <i class="fas fa-share fa-flip-vertical mr-2" /> {{ $t('label.return_package') }}
        </h5>
        <button
          ref="close"
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <label class="required">Return Date</label>
              <date-picker
                v-model="return_at"
                type="datetime"
                :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
                :show-second="false"
                :placeholder="$t('string.select_date')"
                :lang="datePickerLang"
                :disabled-date="notBeforeToday"
                :clearable="false"
                :format="'DD/MM/YYYY hh:mm:ss A'"
                input-class="form-control"
                :class="{'is-invalid': checkValidate('return_at')}"
              />
              <div v-if="checkValidate('return_at')" class="invalid-feedback">
                {{ validate.return_at[0] }}
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div class="form-group">
              <label class="required">Reason</label>
              <textarea
                v-model="reason"
                name="cancel_reason"
                class="form-control"
                :placeholder="$t('pla.what_the_reason')"
                cols="30"
                rows="5"
                :class="{'is-invalid': checkValidate('reason')}"
              />
              <div v-if="checkValidate('reason')" class="invalid-feedback">
                {{ validate.reason[0] }}
              </div>
            </div>
          </div>
          <template v-if="reasons">
            <div v-for="(item, key) in reasons" :key="key" class="col-lg-6">
              <div
                class="rounded reason__item"
                :title="item['label_' + $i18n.locale]"
                @click="reason = item['label_' + $i18n.locale]"
              >
                <span class="text-truncate">{{ item['label_' + $i18n.locale] }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="cancelPackage"
        >
          <i class="fas fa-times-circle mr-2" />
          <strong>{{ $t('btn.cancel') }}</strong>
        </button>
        <button
          type="button"
          class="btn btn-primary"
          :class="{'disabled': !reason}"
          :disabled="!reason"
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
  name: 'ReturnPackageModal',
  props: {
    packageId: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      return_at: new Date(),
      reason: null,
      validate: null,
      reasons: [
        {
          _id: '35134534534',
          label_en: 'No one received this package for a long time.',
          label_km: 'គ្មាននរណាម្នាក់មកទទួលកញ្ចប់នេះជាយូរមកហើយ។'
        },
        {
          _id: '23513775541',
          label_en: 'The customer asks to return the package to the shop.',
          label_km: 'អតិថិជនស្នើឱ្យប្រគល់កញ្ចប់នេះទៅហាងវិញ។'
        },
        {
          _id: '65686754033',
          label_en: 'The package is broken',
          label_km: 'កញ្ចប់អីវ៉ាន់ខូចខាត'
        },
        {
          _id: '65686754033',
          label_en: 'The shop owner cancel delivery',
          label_km: 'ម្ចាស់ហាងលុបចោលការដឹកជញ្ជូន'
        }
      ]
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
      this.onConfirm({
        title: this.$t('label.return_package'),
        text: this.$t('label.return_package_sub'),
        cancelButtonColor: '#3a7afe',
        confirmButtonColor: '#ed524f',
        cancelButtonText: this.$t('button.cancel'),
        confirmButtonText: this.$t('string.ok')
      }).then((accept) => {
        if (accept) {
          this.validate = null
          const data = new FormData()
          data.append('edit_form', 'return')
          data.append('edit_form_type', 'edit')
          if (this.packageId) {
            data.append('id', this.packageId)
          }
          if (this.return_at) {
            data.append('return_at', this.$moment(this.return_at).format('YYYY-MM-DD hh:mm:ss A'))
          }
          if (this.reason) {
            data.append('reason', this.reason)
          }
          this.$axios.post(this.$base_api + '/api/backend/package/edit', data)
            .then((res) => {
              this.$toastr('success', this.$t('message.package_cancel'), this.$t('label.cancel_delivery'))
              this.cancelPackage()
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
    cancelPackage () {
      this.reason = null
      this.validate = null
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../assets/scss/components/reason_item";
</style>
