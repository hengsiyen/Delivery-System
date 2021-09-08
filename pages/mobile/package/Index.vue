<template>
  <div class="mobile-container">
    <section class="container-header">
      <div>
        <h1 class="m-0">
          {{ $t('menu.package') }}
        </h1>
      </div>
      <div class="text-right">
        <ButtonBack />
      </div>
    </section>
    <Nuxt />
  </div>
</template>

<script>
import ButtonBack from '@/components/UiElements/ButtonBack'
export default {
  name: 'PackageMobileIndex',
  components: { ButtonBack }
}
</script>

<style scoped lang="scss">
.mobile-container {
  padding: .5rem .5rem;
  & .container-header {
    padding: 1rem 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & h1 {
      font-size: 20px;
      font-weight: 700;
    }
  }
}
</style>
