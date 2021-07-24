<template>
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="completePackageModalLabel" class="modal-title">
          <i class="fas fa-map-marker-alt mr-2" /> Delay Delivery
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="packageData" class="form-group">
          <label v-if="packageData.created_at">
            Package Created Date: {{ $moment( packageData.created_at).format(date_format) }}
          </label>
          <label v-if="packageData.request_delivery_at">
            Delivery Date: {{ $moment( packageData.request_delivery_at).format(date_format) }}
          </label>
          <label v-if="packageData.assigned_at">
            Assigned Date: {{ $moment( packageData.assigned_at).format(date_format) }}
          </label>
        </div>
        <div class="form-group">
          <label>New Delivery Date :</label>
          <date-picker
            v-model="delay_at"
            type="datetime"
            :time-picker-options="{start: '06:00', step:'00:30' , end: '23:00', format: 'hh:mm A' }"
            :show-second="false"
            :placeholder="$t('string.select_range_date')"
            :lang="datePickerLang"
            :format="'DD/MM/YYYY hh:mm:ss A'"
            input-class="form-control"
          />
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
    }
  },
  data () {
    return {
      date_format: 'DD/MM/YYYY hh:mm:ss A',
      delay_at: null
    }
  },
  methods: {
    cancelDelayPackage () {
      this.delay_at = null
    }
  }
}
</script>

<style scoped>

</style>
