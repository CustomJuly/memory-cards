<template>
  <div class="input">
    <p
      class="input__placeholder"
    >
      {{ placeholder }}
    </p>
    <input
      :value="value"
      :placeholder="placeholder"
      type="text"
      class="input__control"
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
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.input {
  border: 1px solid #E3E5E6;
  border-radius: 8px;
  padding: 8px 16px;

  &__placeholder {
    font-size: 16px;
    line-height: 16px;
  }

  &__control {
    border: none;
  }
}

</style>
