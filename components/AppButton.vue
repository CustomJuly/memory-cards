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

</style>
