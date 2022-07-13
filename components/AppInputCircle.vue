<template>
  <div class="digit-code">
    <input
      v-for="(num, index) in value"
      :key="index"
      ref="input"
      :value="num"
      type="number"
      maxlength="1"
      class="digit-code__control"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInputCircle',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      hasRemoved: false
    }
  },
  mounted () {
    this.$refs.input[0].focus()
  },
  methods: {
    onInput (index, event) {
      const inputType = event.inputType

      const copy = this.value.slice() // do copy of "value" array from props
      const secondChar = event.target.value.at(1)
      if (secondChar) {
        copy[index] = event.target.value.at(1)
      } else {
        copy[index] = event.target.value.at(0)
      }
      this.$emit('input', copy)

      if (inputType === 'insertText') {
        if (index < this.value.length - 1) {
          this.$refs.input[index + 1].focus()
        } else {
          this.$emit('completed', copy.join(''))
        }
      } else {
        this.hasRemoved = true
      }
    },
    onKeydown (index, event) {
      setTimeout(() => {
        if (event.code === 'Backspace' && index > 0 && !this.hasRemoved) {
          // перескакиваем на предыдущую
          this.$refs.input[index - 1].focus()
        }
        this.hasRemoved = false
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.digit-code {
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  justify-content: center;
  min-width: 240px;

  &__control {
    width: 48px;
    height: 48px;
    border: 1px solid $color-gray-light;
    border-radius: 50px;
    outline: none;
    font-size: 16px;
    line-height: 16px;
    font-weight: 400;
    text-align: center;
    padding: 16px;

    &:focus {
      border-color: $color-pink;
    }
  }
}

</style>
