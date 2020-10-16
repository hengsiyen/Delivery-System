<template>
  <section class="content-header">
    <h1>
      Page Header
      <small>Optional description</small>
    </h1>
    <ol v-if="$route.meta.breadcrumb" class="breadcrumb">
      <li>
        <router-link :to="{name: 'admin'}">
          <i class="fas fa-tachometer-alt" /> {{ $t('menu.dashboard') }}
        </router-link>
      </li>
      <li
        v-for="(step, index) in $route.meta.breadcrumb"
        :key="index"
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
  </section>
</template>

<script>
export default {
  name: 'Breadcrumb'
}
</script>

<style scoped>

</style>
