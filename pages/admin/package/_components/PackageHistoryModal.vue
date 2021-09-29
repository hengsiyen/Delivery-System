<template>
  <div id="packageHistoryModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">
            {{ $t('label.package_history') }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="package_history">
            <template v-if="packageHistory && packageHistory.length">
              <div class="timeline">
                <template v-for="(item, key) in packageHistory">
                  <div :key="key">
                    <i class="fas" :class="historyIcon(item)" />
                    <div class="timeline-item">
                      <span class="time text-muted">
                        <i class="fas fa-clock" />
                        {{ $moment(item.created_at).format('llll') }}
                      </span>
                      <h3 v-if="item.user" class="timeline-header border-bottom-0">
                        <strong>{{ item.user.full_name }}</strong>
                      </h3>
                      <div class="timeline-body">
                        <div>
                          <p class="mb-1">
                            {{ $t('label.customer_name') }}: {{ item.data.customer_name }}
                          </p>
                          <p class="mb-1">
                            {{ $t('label.customer_phone') }}: {{ item.data.customer_phone }}
                          </p>
                          <p class="mb-1">
                            {{ $t('label.customer_address') }}: {{ item.data.customer_address }}
                          </p>
                          <p class="mb-1">
                            {{ $t('label.price') }}: {{ item.data.price }}
                          </p>
                          <p v-if="item.data.delivery_charge" class="mb-1">
                            {{ $t('label.delivery_charge') }}: {{ item.data.delivery_charge }}
                          </p>
                          <p v-if="item.data.extra_charge" class="mb-1">
                            {{ $t('label.extra_charge') }}: {{ item.data.extra_charge }}
                          </p>
                          <hr v-if="item.description[$i18n.locale]" class="my-2">
                          <div v-html="handleNewLine(item.description[$i18n.locale])" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <div>
                  <i class="fas fa-clock bg-gray" />
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">
            <i class="fas fa-times-circle mr-2"></i>
            <strong>{{ $t('btn.close') }}</strong>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageHistoryModal',
  props: {
    packageHistory: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
