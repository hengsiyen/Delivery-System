<template>
  <section class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0">
            {{ appName }}
          </h1>
        </div>
        <div class="col-sm-6">
          <ol v-if="$route.meta.breadcrumb" class="breadcrumb float-sm-right">
            <li class="breadcrumb-item">
              <router-link :to="{name: 'admin'}">
                <i class="fas fa-tachometer-alt" /> {{ $t('menu.dashboard') }}
              </router-link>
            </li>
            <li
              v-for="(step, index) in $route.meta.breadcrumb"
              :key="index"
              class="breadcrumb-item"
              :class="{active: index === $route.meta.breadcrumb.length - 1}"
            >
              <template v-if="step.route">
                <router-link :to="step.route">
                  {{ getName(step) }}
                </router-link>
              </template>
              <template v-else>
                <span>{{ getName(step) }}</span>
              </template>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      appName: process.env.VUE_APP_NAME,
      appDescription: process.env.VUE_APP_DESC
    }
  }
}
</script>

<style scoped>

</style>
