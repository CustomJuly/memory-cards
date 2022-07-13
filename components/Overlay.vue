<template>
  <div class="overlay" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Overlay'
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(black, 0.7);
  backdrop-filter: blur(5px);
  z-index: 8;
}
</style>
