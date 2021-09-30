<template>
  <div class="card">
    <div class="card-body bg-white rounded">
      <label v-if="title" class="font-s-16 text-muted w-100">
        <span class="text-uppercase mr-2">{{ $t(title) }}</span>
        <span class="d-block font-s-14" :class="'text-' + colorLabelCompare">
          <i class="fas mr-1" :class="classIcon" />
          <template v-if="labelCompare">{{ $t(labelCompare) }}</template>
          <template v-if="calcCompValueAsPercent">
            ({{ calcCompValueAsPercent | numFormat(numberFormat) }}%)
          </template>
        </span>
      </label>
      <div class="margin-bottom">
        <label class="d-block font-s-28 text-bold no-margin">
          <template v-if="hasFormat">
            <template v-if="hasCurrency">{{ currency ? currency.code : '' }}</template>
            {{ mainValue | numFormat(numberFormat) }} <slot name="main-value" />
          </template>
          <template v-else>
            <template v-if="hasCurrency">{{ currency ? currency.code : '' }}</template>
            {{ mainValue }} <slot name="main-value" />
          </template>
        </label>
        <small class="text-muted font-s-16 text-bold">
          <template v-if="hasFormat">
            <template v-if="hasCurrency">{{ currency ? currency.code : '' }}</template>
            {{ lastData | numFormat(numberFormat) }} <slot name="last-value" />
          </template>
          <template v-else>
            <template v-if="hasCurrency">{{ currency ? currency.code : '' }}</template>
            {{ lastData }} <slot name="last-value" />
          </template>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CardReportDashboard',
  computed: {
    ...mapGetters({
      num_format_en: 'delivery_company/num_format_en',
      num_format_km: 'delivery_company/num_format_km',
      currency: 'delivery_company/currency'
    }),
    numberFormat () {
      console.log(this.currency)
      if (this.currency) {
        return this.currency.code === 'KHR' ? this.num_format_km : this.num_format_en
      }
      return this.num_format_km
    }
  },
  props: {
    title: {
      type: String,
      default: null
    },
    mainValue: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: null
    },
    calcCompValueAsPercent: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: null
    },
    colorLabelCompare: {
      type: String,
      default: 'no_change'
    },
    labelCompare: {
      type: String,
      default: null
    },
    classIcon: {
      type: String,
      default: null
    },
    hasCurrency: {
      type: Boolean,
      default: false
    },
    hasFormat: {
      type: Boolean,
      default: false
    },
    lastData: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: null
    },
    chartData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style scoped>

.card-review-report {
  padding: 15px;
}

.text-up {
  color: #00a65a !important;
}

.text-down {
  color: #dd4b39 !important;
}

.text-no_change {
  color: #777;
}
</style>
