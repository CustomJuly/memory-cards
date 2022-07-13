<template>
  <Transition
    appear
    name="fade"
  >
    <Overlay
      class="modal"
      @click="close"
      @hook:mounted="modalMounted = true"
    >
      <Transition
        name="scale"
        @after-leave="$emit('closed')"
      >
        <div
          v-if="modalMounted"
          :style="modalStyles"
          class="modal__content"
          :class="{ 'modal__content--w-paddings': !noPaddings }"
          @click.stop
        >
          <slot :close="close" />
        </div>
      </Transition>
    </Overlay>
  </Transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { toNumerableValue } from '~/utils/style'

export default Vue.extend({
  name: 'Modal',
  props: {
    width: {
      type: [String, Number] as PropType<string | number>,
      required: false
    },
    noPaddings: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    modalStyles(): string {
      const styles: string[] = []
      if (this.width) {
        styles.push(`width: ${toNumerableValue(this.width)}`)
      }
      return styles.join(';')
    }
  },
  data() {
    return {
      modalMounted: false
    }
  },
  methods: {
    close() {
      this.modalMounted = false
    }
  }
})
</script>

<style lang="scss" scoped>
.modal {
  &__content {
    width: 100%;
    max-width: calc(512px);
    background: white;
    border-radius: 12px;
    overflow: hidden;

    &--w-paddings {
      padding: 20px;
    }
  }
}
</style>
