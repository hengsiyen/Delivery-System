<template>
  <div class="container-fluid text-right">
    <ol v-if="$route.meta.breadcrumb" class="breadcrumb mb-0 bg-unset justify-content-end w-100 pr-0">
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
.breadcrumb-item {
  color: #6c757d;
}
.breadcrumb-item.active {
  font-weight: 700;
  color: black;
}
</style>
