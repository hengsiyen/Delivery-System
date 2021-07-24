<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="completePackageModalLabel" class="modal-title">
          <i class="fas fa-map-marker-alt mr-2" /> Complete Delivery
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Complete at : {{ $moment(complete_at).format('DD/MM/YYYY hh:mm:ss A') }}</label>
          <date-picker
            v-model="complete_at"
            type="datetime"
            :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
            :show-second="false"
            :placeholder="$t('string.select_range_date')"
            :lang="datePickerLang"
            :format="'DD/MM/YYYY hh:mm:ss A'"
            input-class="form-control"
          />
        </div>
        <div class="form-group">
          <label>Payment Method:</label>
          <select
            v-if="paymentTypes"
            id="package_type"
            v-model="package_type"
            name="package_type"
            class="custom-select"
          >
            <option :value="null" selected hidden>
              {{ $t('label.select_one_option') }} ...
            </option>
            <template v-for="(item, key) in paymentTypes">
              <option :key="key" :value="item">
                {{ item['name_' + $i18n.locale] }}
              </option>
            </template>
          </select>
        </div>
        <div class="form-group">
          <label>Payment reference:</label>
          <div class="upload-btn-wrapper">
            <button class="btn btn-block">
              <i class="fas fa-link mr-2" />
              Upload a photo ( Back transaction )
            </button>
            <input
              ref="completePhoto"
              type="file"
              name="complete_photo"
              accept="image/*"
              @change="onUploadFile"
            >
          </div>
          <div id="preview mt-3">
            <img v-if="url" class="img-thumbnail mt-3" :src="url">
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
        <button type="button" class="btn btn-primary">
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
  computed: {
    datePickerLang () {
      return this.$datepickerLocale[this.$i18n.locale].lang
    }
  },
  props: {
    paymentTypes: {
      type: Array,
      default: () => {
        return []
      }
    },
    packageId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      complete_at: new Date(),
      url: null,
      file: null,
      package_type: null
    }
  },
  methods: {
    onUploadFile (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    },
    cancelCompletePackage () {
      this.url = null
      this.file = null
      this.package_type = null
      this.complete_at = new Date()
    }
  }
}
</script>

<style scoped>

</style>
