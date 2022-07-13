<template>
  <div class="layout dl">
    <Notifications />
    <div class="dl__page">
      <Nuxt />
    </div>
    <NavBar />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'DefaultLayout'
})
</script>

<style lang="scss" scoped>
.dl {
  display: flex;
  flex-direction: column;
  background: white;

  &__page {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
