<template>
  <main
    :class="[
      'playground',
      `playground--mode-${mode}`,
      { 'cursor-grabbing': touchStartPosition },
      { 'cursor-grab': !touchStartPosition }
    ]"
  >
    <PlaygroundHelpers
        v-if="mode === 'game'"
        :interacting-card-translation-y="playingCards[touchStartCardIndex] ? playingCards[touchStartCardIndex].translationY : 0"
    />
    <div
      ref="playground"
      class="playground__field"
      @touchstart="onEventStart"
      @mousedown="onEventStart"
      @touchmove="onEventMove"
      @mousemove="onEventMove"
      @touchend="onEventEnd"
      @mouseup="onEventEnd"
    >
      <slot />
    </div>
  </main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ICard } from '~/types/deck'
import { BUS_EVENTS } from '~/utils/bus'
import { ICardRefs, TextareaEventSource } from '~/components/Card.vue'
import { IPlayingCard } from '~/pages/decks/_id/cards.vue'

export interface Coords {
  x: number
  y: number
}

type TouchPosition = Coords & {
  touchId?: number
}

export default Vue.extend({
  name: 'Playground',
  props: {
    mode: {
      type: String as PropType<'edit' | 'game'>,
      required: true,
      validator(mode: string) {
        return ['edit', 'game'].includes(mode)
      }
    },
    activeCard: {
      type: Object as PropType<IPlayingCard>,
      required: true
    },
    activeCardIndex: {
      type: Number,
      required: true
    },
    playingCards: {
      type: Array as PropType<IPlayingCard[]>,
      required: true
    },
    disableFlips: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      touchStartTimeStamp: new Date(),
      touchStartCardIndex: 0,
      touchStartPosition: null as (TouchPosition | null),
      touchStartCardAngle: 0,
      lastWheelDelta: 0,
      canFlip: true
    }
  },
  computed: {
    playground() {
      return this.$refs.playground as HTMLDivElement
    }
  },
  mounted() {
    // this.playground.addEventListener('scroll', (event) => event.preventDefault(), { passive: false })
    this.$nuxt.$on(BUS_EVENTS.TEXTAREA_ENTER_PRESSED, this.onEnterPressed)

    document.addEventListener('keydown', this.onKeydown)

    document.addEventListener('wheel', this.onWheel)

    if (this.mode === 'game') {
      this.playground.addEventListener('scroll', this.preventPlaygroundScroll)
    }

    this.autoscroll()
  },
  beforeDestroy() {
    this.$nuxt.$off(BUS_EVENTS.TEXTAREA_ENTER_PRESSED, this.flipCard)

    document.removeEventListener('keydown', this.onKeydown)
    document.removeEventListener('wheel', this.onWheel)
    this.playground.removeEventListener('scroll', this.preventPlaygroundScroll)
  },
  methods: {
    onEnterPressed(refs: ICardRefs, source: TextareaEventSource) {
      if (source === 'definition' && this.playingCards[this.activeCardIndex].card.definition) {
        this.flipCard(this.activeCardIndex)
        refs.explanationInputElement.focus({ preventScroll: true })
      } else if (source === 'explanation') {
        refs.explanationInputElement.blur()
        this.scrollToNextCard()
      }
    },
    flipCard(animationCardIndex: number, direction: 'forward' | 'backward' = 'forward') {
      this.rotateCard(animationCardIndex, direction === 'forward' ? 1 : -1)
    },
    scrollToNextCard() {
      if (this.activeCardIndex === this.playingCards.length - 1) {
        return
      }
      this.scrollTo(this.activeCardIndex + 1)
    },
    rotateCard(animationCardIndex: number, deltaAngle: number = 0) {
      // const ANIMATION_TIME_MS = 350
      const FREQUENCY = 10
      // const cycles = ANIMATION_TIME_MS / FREQUENCY
      // const step = deltaAngle > 0 ? 5 : -5

      const animationCard = this.playingCards[animationCardIndex]
      // const animationCardIndex = this.touchStartCardIndex

      clearInterval(animationCard.interval)
      const beforeRounding = (animationCard.rotationAngle + deltaAngle) / 180
      let targetAngle = 0
      if (deltaAngle > 0) {
        targetAngle = Math.ceil(beforeRounding) * 180
      } else if (deltaAngle < 0) {
        targetAngle = Math.floor(beforeRounding) * 180
      } else {
        targetAngle = Math.round(beforeRounding) * 180
      }
      const step = targetAngle > animationCard.rotationAngle ? 5 : -5

      // console.log('this.activeCard.rotationAngle', this.activeCard.rotationAngle)
      // console.log('deltaAngle', deltaAngle)
      // console.log('starting animation, target = ', targetAngle)
      // console.log('starting animation, step = ', step)

      animationCard.interval = setInterval(() => {
        const nextRotationAngle = animationCard.rotationAngle + step
        if (Math.abs(targetAngle - nextRotationAngle) <= Math.abs(step)) {
          this.$emit('rotate', animationCardIndex, targetAngle)
          // console.log('finish block', targetAngle)
          clearInterval(animationCard.interval)
        } else {
          // console.log('else block', this.activeCard.rotationAngle + step)
          this.$emit('rotate', animationCardIndex, animationCard.rotationAngle + step)
        }

      }, FREQUENCY)
    },
    async pushCard(direction: 'top' | 'bottom') {
      if (this.playingCards.length === 0) {
        return
      }

      const playground = this.$refs.playground as HTMLDivElement
      const children = playground.children
      const targetCardElement = children[this.touchStartCardIndex] as HTMLDivElement
      const directionMultiplier = direction === 'top' ? -1 : 1
      const targetY = (targetCardElement.offsetTop + targetCardElement.offsetHeight) * directionMultiplier
      await this.translateCard(targetY)
      const activeCard = this.playingCards[this.activeCardIndex]
      this.$emit(direction === 'bottom' ? 'pushed-bottom' : 'pushed-top', activeCard)
    },
    translateCard(targetY: number = 0) {
      return new Promise((resolve) => {
        const FREQUENCY = 5

        const animationCard = this.playingCards[this.touchStartCardIndex]
        const animationCardIndex = this.touchStartCardIndex
        const step = animationCard.translationY < targetY ? 10 : -10

        clearInterval(animationCard.interval)

        animationCard.interval = setInterval(() => {
          const nextTranslationY = animationCard.translationY + step
          if (Math.abs(targetY - nextTranslationY) <= Math.abs(step)) {
            this.$emit('translate', animationCardIndex, targetY)
            // console.log('finish block', targetAngle)
            clearInterval(animationCard.interval)
            resolve(true)
          } else {
            // console.log('else block', this.activeCard.rotationAngle + step)
            this.$emit('translate', animationCardIndex, animationCard.translationY + step)
          }

        }, FREQUENCY)
      })
    },
    autoscroll() {
      const cardId = this.$route.query.scroll_to as string | undefined
      if (!cardId || !this.$refs.playground) {
        return
      }

      const cardsComponents = this.$children as Array<Vue & { card: ICard }>

      if (cardId === 'new') {
        this.scrollTo(cardsComponents.length - 1)
      } else {
        const targetComponentIndex = cardsComponents.findIndex(component => component.card.id === cardId)
        if (targetComponentIndex > -1) {
          this.scrollTo(targetComponentIndex)
        }
      }
    },
    scrollTo(cardIndex: number) {
      const cardsComponents = this.$children as Vue[]
      const targetCardComponent: Vue = cardsComponents[cardIndex]
      const targetCardElement = targetCardComponent.$el as HTMLDivElement
      const playgroundElement = this.$refs.playground as HTMLDivElement
      playgroundElement.scrollTo({ left: targetCardElement.offsetLeft, behavior: 'smooth' })
    },
    goToPreviousCard() {
      const isPreviousAvailable = this.activeCardIndex > 0
      if (!isPreviousAvailable) {
        return
      }
      this.scrollTo(this.activeCardIndex - 1)
    },
    goToNextCard() {
      const isNextCardAvailable = this.activeCardIndex < this.playingCards.length - 1
      if (!isNextCardAvailable) {
        return
      }
      this.scrollTo(this.activeCardIndex + 1)
    },
    onWheel(event: WheelEvent) {
      // TODO: should be enabled in "Learning" game mode
      if (this.mode === 'game') {
        return
      }

      const delta = event.deltaY

      if (Math.abs(delta) > this.lastWheelDelta && this.canFlip) {
        this.flipCard(this.activeCardIndex, delta > 0 ? 'forward' : 'backward')
        this.canFlip = false
      }

      if (Math.abs(delta) < this.lastWheelDelta) {
        this.canFlip = true
      }

      this.lastWheelDelta = Math.abs(delta)
    },
    preventPlaygroundScroll() {
      this.playground.scrollTo(0, 0)
    },
    onKeydown(event: KeyboardEvent) {
      if (this.disableFlips) {
        return
      }
      event.preventDefault()

      if (event.key === 'ArrowUp') {
        this.mode === 'edit' ? this.flipCard(this.activeCardIndex,'forward') : this.pushCard('top')
      } else if (event.key === 'ArrowDown') {
        this.mode === 'edit' ? this.flipCard(this.activeCardIndex, 'backward') : this.pushCard('bottom')
      } else if (event.key === 'ArrowLeft') {
        this.mode === 'edit' && this.goToPreviousCard()
      } else if (event.key === 'ArrowRight') {
        this.mode === 'edit' && this.goToNextCard()
      }
    },
    computeAngle(startY: number, endY: number): number {
      const yDiff = startY - endY
      const FULL_FLIP_THRESHOLD = 100
      return (yDiff * 180) / FULL_FLIP_THRESHOLD + this.touchStartCardAngle
    },
    onEventStart(event: MouseEvent | TouchEvent) {
      if (this.playingCards.length === 0) {
        return
      }

      this.touchStartTimeStamp = new Date()
      this.touchStartCardIndex = this.activeCardIndex
      this.touchStartCardAngle = this.activeCard.rotationAngle
      clearInterval(this.playingCards[this.touchStartCardIndex].interval)

      if ('touches' in event) {
        this.touchStartPosition = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
          touchId: event.touches[0].identifier
        }
      } else {
        this.touchStartPosition = {
          x: event.clientX,
          y: event.clientY
        }
      }
    },
    onEventMove(event: MouseEvent | TouchEvent) {
      if (!this.touchStartPosition || this.playingCards.length === 0) {
        return
      }

      let clientY: number

      if ('changedTouches' in event) {
        // logic for touch event
        const foundTouch = Array
          .from(event.changedTouches)
          .find(touch => touch.identifier === this.touchStartPosition?.touchId)

        if (!foundTouch) {
          return
        }
        clientY = foundTouch.clientY
      } else {
        // logic for mouse event
        clientY = event.clientY
      }

      if (this.mode === 'edit') {
        const currentAngle = this.computeAngle(this.touchStartPosition.y, clientY)
        this.$emit('rotate', this.touchStartCardIndex, currentAngle)
      } else {
        const translationY = clientY - this.touchStartPosition.y
        this.$emit('translate', this.touchStartCardIndex, translationY)
      }
    },
    async onEventEnd(event: MouseEvent | TouchEvent) {
      // если мы не запомнили стартовую позицию
      if (!this.touchStartPosition || this.playingCards.length === 0) {
        return
      }

      let endPosition: TouchPosition

      if ('changedTouches' in event) {
        // logic for touch event
        const foundTouch = Array
          .from(event.changedTouches)
          .find(touch => touch.identifier === this.touchStartPosition?.touchId)

        // отпущенный палец – это не тот, который коснулся первым
        if (!foundTouch) {
          return
        }

        endPosition = {
          x: foundTouch.clientX,
          y: foundTouch.clientY,
          touchId: foundTouch.identifier
        }
      } else {
        // logic for mouse event
        endPosition = {
          x: event.clientX,
          y: event.clientY
        }
      }


      const timeForSwipe = (new Date()).getTime() - this.touchStartTimeStamp.getTime()
      const fingerSpeed = (endPosition.y - this.touchStartPosition.y) / timeForSwipe

      // ⚠️ important – should be before animation
      this.touchStartPosition = null

      if (this.mode === 'edit') {
        if (Math.abs(fingerSpeed) > 0.07) {
          this.flipCard(this.touchStartCardIndex, fingerSpeed > 0 ? 'backward' : 'forward')
        } else {
          this.rotateCard(this.touchStartCardIndex)
        }
      } else {
        const activeCard = this.playingCards[this.touchStartCardIndex]
        if (Math.abs(fingerSpeed) > 0.3) {
          // fast movement → pushing
          this.pushCard(fingerSpeed > 0 ? 'bottom' : 'top')
        } else {
          // slow movement → go to initial point (we're near the center of playground)
          // slow movement → go to initial point (we're close to the top/bottom of playground)
          const thresholdTop = -this.playground.offsetHeight / 4
          const thresholdBottom = this.playground.offsetHeight / 4
          if (this.playingCards[this.touchStartCardIndex].translationY < thresholdTop) {
            this.pushCard('top')
          } else if (this.playingCards[this.touchStartCardIndex].translationY > thresholdBottom) {
            this.pushCard('bottom')
          } else {
            this.translateCard()
          }
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.playground {
  flex: 1;
  position: relative;
  overflow: hidden;

  &__field {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 40px;
    background-image: linear-gradient(to right, rgba(white, 0.95), rgba(white, 0.95)), url('/pattern.jpeg');
    background-size: 400px;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    position: relative;
  }

  &--mode-game &__field {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .card {
    margin-right: 20px;
    scroll-snap-align: center;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
