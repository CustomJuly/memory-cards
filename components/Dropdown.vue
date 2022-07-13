<template>
  <div class="dropdown" :style="styles" @click.stop>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    offsetX: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    styles () {
      return `left: ${this.offsetX}px`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  background: rgba(white, 0.8);
  border: 1px solid rgba(black, 0.1);
  backdrop-filter: blur(3px);
  color: $color-black;
  padding: 6px;
  border-radius: 10px;
}
</style>
