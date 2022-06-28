<template>
  <button
    class="btn"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton'
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.btn {
  width: 100%;
  font-size: 18px;
  font-weight: 400;
  padding: 15px 32px;
  color: white;
  background-color: $color-pink;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}
</style>
