<template>
  <section v-if="header" class="content-header">
    <div class="container-fluid">
      <div class="row mb-2">
        <div class="col-sm-6">
          <h1 class="m-0 font-secondary">
            {{ header }}
          </h1>
        </div>
        <div class="col-sm-6">
          <ol
            v-if="$route.meta.breadcrumb"
            class="breadcrumb float-sm-right text-xs"
          >
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
  computed: {
    header () {
      if (this.$route.meta) {
        if (this.$route.meta.header) {
          return this.$route.meta.header[this.$i18n.locale]
        } else if (this.$route.meta.breadcrumb) {
          const breadcrumb = this.$route.meta.breadcrumb
          if (Array.isArray(breadcrumb) && breadcrumb.length > 0) {
            return breadcrumb[0]['name_' + this.$i18n.locale]
          }
        }
      }
      return null
    }
  },
  data () {
    return {
      appName: process.env.VUE_APP_NAME,
      appDescription: process.env.VUE_APP_DESC
    }
  }
}
</script>
