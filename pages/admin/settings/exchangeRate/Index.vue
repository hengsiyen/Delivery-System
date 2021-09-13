<template>
  <div class="row">
    <div class="col-lg-6">
      <section class="content-header">
        <div class="row mb-2">
          <div class="col-12">
            <h1 class="m-0">
              {{ $t('menu.exchange_rate') }}
            </h1>
          </div>
        </div>
      </section>
    </div>
    <div class="col-lg-6 d-flex align-items-center">
      <Breadcrumb />
    </div>
    <div class="col-lg-12">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Layouts/Breadcrumb'
export default {
  name: 'ExchangeRateIndex',
  components: { Breadcrumb }
}
</script>

<style scoped>

</style>
