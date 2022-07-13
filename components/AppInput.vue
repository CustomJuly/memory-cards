<template>
  <div
    class="input"
    @click="$refs.control.focus()"
  >
    <slot name="prefix" />
    <div
      class="input__control-wrapper"
      :class="{ 'ml-16': $slots.prefix }"
    >
      <p
        class="input__placeholder"
        :class="{ 'input__placeholder--displaced': isTriggered }"
      >
        {{ placeholder }}
      </p>
      <input
        ref="control"
        :value="value"
        type="text"
        class="input__control"
        @input="$emit('input', $event.target.value)"
        @keydown.enter="$emit('enter')"
        @focus="focused = true"
        @blur="focused = false"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    isTriggered () {
      return !!this.value || this.focused
    }
  },
  mounted () {
    if (this.autofocus) {
      this.$refs.control.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.input {
  display: flex;
  align-items: center;
  height: 50px;
  border: 1px solid #E3E5E6;
  border-radius: 8px;
  padding: 16px;

  &__control-wrapper {
    flex: 1;
    height: 100%;
    position: relative;
  }

  &__placeholder {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 16px;
    line-height: 16px;
    user-select: none;
    transition: all 200ms cubic-bezier(0.62, -0.43, 0.34, 1.41);
    color: $color-sky-dark;

    &--displaced {
      top: -8px;
      font-size: 12px;
      line-height: 12px;
    }
  }

  &__control {
    width: 100%;
    height: 20px;
    padding: 0;
    position: absolute;
    top: 8px;
    left: 0;
    font-size: 16px;
    line-height: 20px;
    outline: none;
    border: none;
    background: transparent;
  }
}

</style>
