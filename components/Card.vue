<template>
  <Transition appear name="shrink">
    <section
      ref="card"
      class="card"
      :style="`transform: translateY(${translationY}px)`"
    >
      <div
        class="card__content"
        :style="`transform: rotateX(${rotationAngle}deg);`"
      >
        <AppTextarea
          :value="card.definition"
          :disabled="!editable"
          :placeholder="$t('Enter your phrase')"
          @input="$emit('input:definition', $event)"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          @enter="nextStep('definition')"
          @mounted="definitionInputElement = $event"
        />
        <!--      if (showCloseButton) { рендерим } else { не рендерим }-->
        <!--      if (showCloseButton) { показываем } else { не показываем }-->
        <svg-icon
          v-if="editable && showDeleteButton"
          name="cross"
          class="card__icon"
          @click="$emit('delete')"
        />
      </div>
      <div
        class="card__content"
        :style="`transform: rotateX(${rotationAngle + 180}deg);`"
      >
        <AppTextarea
          :value="card.explanation"
          :disabled="!editable"
          :placeholder="$t('Enter your explanation')"
          @input="$emit('input:explanation', $event)"
          @focus="$emit('focus')"
          @blur="$emit('blur')"
          @enter="nextStep('explanation')"
          @mounted="explanationInputElement = $event"
        />
        <svg-icon
          v-if="editable && showDeleteButton"
          name="cross"
          class="card__icon"
          @click="$emit('delete')"
        />
      </div>
    </section>
  </Transition>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ICard } from '~/types/deck'
import { BUS_EVENTS } from '~/utils/bus'
import { Prop } from 'vue/types/options'
import { Coords } from '~/components/Playground.vue'

export interface ICardRefs {
  definitionInputElement: HTMLTextAreaElement
  explanationInputElement: HTMLTextAreaElement
}

export type TextareaEventSource = 'definition' | 'explanation'

export default Vue.extend({
  name: 'Card',
  props: {
    card: {
      type: Object as PropType<ICard>,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    },
    rotationAngle: {
      type: Number,
      required: false,
      default: 0
    },
    translationY: {
      type: Number,
      required: false,
      default: 0
    },
    showDeleteButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      observer: null as IntersectionObserver | null,
      definitionInputElement: null as HTMLTextAreaElement | null,
      explanationInputElement: null as HTMLTextAreaElement | null
    }
  },
  computed: {
    refs(): ICardRefs {
      return {
        definitionInputElement: this.definitionInputElement as HTMLTextAreaElement,
        explanationInputElement: this.explanationInputElement as HTMLTextAreaElement
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.onObserved, {
      root: null, // viewport
      threshold: 1
    })
    this.observer.observe(this.$el)
  },
  beforeDestroy() {
    this.observer?.disconnect()
  },
  methods: {
    onObserved(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        this.$emit('appeared', this.refs)
      } else {
        this.$emit('hidden')
      }
    },
    nextStep(source: TextareaEventSource) {
      this.$nuxt.$emit(BUS_EVENTS.TEXTAREA_ENTER_PRESSED, this.refs, source)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.card {
  flex: none;
  position: relative;
  width: 100%;
  padding-bottom: 100%; // 100% of parent's width
  perspective: 500px;
  z-index: 1;

  &.shrink-leave-active {
    overflow: hidden;
    transition: width 200ms linear;
  }

  &.shrink-leave-to {
    width: 0;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 20px;
    box-shadow: 0 0 36px rgba(black, 0.12);
    padding: 20px;
    backface-visibility: hidden;
    will-change: transform;
  }

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    margin: 5px;
    color: $color-gray-light;
    cursor: pointer;

    &:hover {
      color: $color-gray;
    }
  }
}
</style>
