<template>
  <div class="box-information">
    <div class="box-content text-center">
      <img :src="img">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XBoxInfo',
  props: {
    img: {
      type: String,
      default: '/img/svgs/development.svg'
    },
    title: {
      type: String,
      default () {
        return this.$t('string.underDevelopment')
      }
    }
  }
}
</script>

<style scoped>
.box-information {
  width: 100%;
  height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box-content {
  display: inline-block;
}

.box-content img {
  height: 30vh;
}
</style>
