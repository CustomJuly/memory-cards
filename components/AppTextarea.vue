<template>
  <div class="ta">
   <textarea
     ref="input"
     :value="value"
     :placeholder="placeholder"
     rows="1"
     class="ta__control"
     :disabled="disabled"
     @input="onInput"
     @focus="$emit('focus')"
     @blur="$emit('blur')"
     @keydown.prevent.enter="$emit('enter')"
   />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppTextarea',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onInput(event: InputEvent) {
      const textarea = event.target as HTMLTextAreaElement
      this.$emit('input', textarea.value)
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  },
  mounted() {
    this.$emit('mounted', this.$refs.input)
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.ta {
  width: 100%;

  &__control {
    width: 100%;
    font-family: 'Inter', sans-serif;
    resize: none;
    font-size: 22px;
    line-height: 28px;
    background: transparent;
    color: $color-black;
    text-align: center;
    border: none;
    height: auto;
    outline: none;

    &:disabled {
      cursor: inherit;
      user-select: none;
    }

    &::placeholder {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
