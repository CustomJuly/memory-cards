<template>
  <div
    class="icon"
    :class="{ 'cursor-pointer': pointer }"
    :style="style"
    @click="$emit('click', $event)"
  >
    <svg-icon
      :name="name"
      class="icon__svg"
    />
  </div>
</template>

<script>
import { toNumerableValue } from '@/utils/style.ts'

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    pointer: {
      type: Boolean,
      required: false,
      default: false
    },
    size: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    formattedSize () {
      return toNumerableValue(this.size)
    },
    style () {
      return `width: ${this.formattedSize}; height: ${this.formattedSize}`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  &__svg {
    width: 100%;
    height: 100%;
  }
}
</style>
