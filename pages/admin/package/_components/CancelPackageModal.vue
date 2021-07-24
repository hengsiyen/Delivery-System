<template>
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
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
        <div class="row">
          <div class="col-lg-12">
            <div class="form-group">
              <textarea
                v-model="reason"
                name="cancel_reason"
                class="form-control"
                :placeholder="$t('pla.what_the_reason')"
                cols="30"
                rows="5"
              />
            </div>
          </div>
          <template v-if="reasons">
            <div v-for="(item, key) in reasons" :key="key" class="col-lg-6">
              <div class="rounded reason__item" @click="reason = item['label_' + $i18n.locale]">
                {{ item['label_' + $i18n.locale] }}
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
  name: 'CancelPackageModal',
  data () {
    return {
      reason: null,
      reasons: [
        {
          _id: '35134534534',
          label_en: 'The customer didn\'t answer the phone calls',
          label_km: 'អតិថិជនមិនបានឆ្លើយតបទូរស័ព្ទ'
        },
        {
          _id: '23513775541',
          label_en: 'The customer returned the package to the shop',
          label_km: 'អតិថិជនបានប្រគល់កញ្ចប់អីវ៉ាន់ទៅហាងវិញ'
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
    cancelPackage () {
      this.reason = null
    }
  }
}
</script>

<style scoped lang="scss">
.reason__item {
  background-color: #f8f8f8;
  border-radius: 0.25rem;
  display: flex;
  position: relative;
  margin: 8px 0;
  padding: 15px;
  color: var(--dark);
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    background-color: #e6e6e6;
  }
}
</style>
