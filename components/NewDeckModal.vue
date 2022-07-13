<template>
  <Modal @closed="$emit('close')">
    <template #default="{ close }">
      <p class="ndm__title">
        {{ $t('Create a new deck') }}
      </p>
      <AppInput
        v-model="name"
        autofocus
        :placeholder="$t('Deck name')"
        class="mb-16"
        @enter="done"
      />
      <div class="flex">
        <AppButton
          wide
          type="secondary"
          class="mr-8"
          @click="close"
        >
          {{ $t('cancel') }}
        </AppButton>
        <AppButton
          wide
          @click="done"
        >
          {{ $t('done') }}
        </AppButton>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { BUS_EVENTS } from '@/utils/bus'
import Vue from "vue";

export default Vue.extend({
  name: 'NewDeckModal',
  data () {
    return {
      name: '',
    }
  },
  methods: {
    done () {
      if (!this.name) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('Please fill the deck name'),
          type: 'warning'
        })
        return
      }
      this.$emit('done', this.name)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.ndm {
  &__title {
    font-size: 18px;
    line-height: 24px;
    font-weight: bold;
    color: $color-black;
    margin-bottom: 16px;
  }
}
</style>
