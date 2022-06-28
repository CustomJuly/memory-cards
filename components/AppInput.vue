<template>
  <div
    class="input"
    @click="$refs.control.focus()"
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
      @focus="focused = true"
      @blur="focused = false"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    placeholder: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      focused: false
    }
  },
  computed: {
    isTriggered() {
      return !!this.value || this.focused
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.input {
  min-width: 280px;
  height: 48px;
  border: 1px solid #E3E5E6;
  position: relative;
  border-radius: 8px;
  padding: 8px 16px;

  &__placeholder {
    position: absolute;
    top: 14px;
    left: 14px;
    font-size: 16px;
    line-height: 16px;
    user-select: none;
    transition: all 200ms cubic-bezier(0.62, -0.43, 0.34, 1.41);

    &--displaced {
      top: 8px;
      left: 16px;
      font-size: 12px;
      line-height: 12px;
    }
  }

  &__control {
    padding: 0;
    position: absolute;
    top: 24px;
    left: 16px;
    font-size: 16px;
    line-height: 16px;
    outline: none;
    border: none;
    background: transparent;
  }
}

</style>
