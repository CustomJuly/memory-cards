<template>
  <Modal @closed="$emit('close')">
    <template #default="{ close }">
      <p class="cm__title">
        {{ text }}
      </p>
      <div class="flex">
        <AppButton
            type="secondary"
            wide
            class="mr-8"
            @click="$emit('declined') && close()"
        >
          {{ cancelText }}
        </AppButton>
        <AppButton
            wide
            @click="$emit('accepted') && close()"
        >
          {{ okText }}
        </AppButton>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ConfirmationModal',
  props: {
    text: {
      type: String,
      required: true
    },
    cancelText: {
      type: String,
      required: false,
      default() {
        return this.$t('cancel')
      }
    },
    okText: {
      type: String,
      required: false,
      default() {
        return this.$t('Yes')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.cm {
  &__title {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    color: $color-black;
    margin-bottom: 16px;
  }
}
</style>
