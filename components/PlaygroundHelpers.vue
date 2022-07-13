<template>
  <div class="helpers">
    <div
      class="helpers__helper helpers__helper--top"
      :class="{ 'helpers__helper--bright': interactingCardTranslationY < -15 }"
    />
    <SVGThumb
      class="helpers__icon helpers__icon--top"
      :class="{ 'helpers__icon--bright': interactingCardTranslationY < -15 }"
    />
    <SVGBrain
      class="helpers__icon helpers__icon--bottom"
      :divided="interactingCardTranslationY > 15"
      :class="{ 'helpers__icon--bright': interactingCardTranslationY > 15 }"
    />
    <div
      class="helpers__helper helpers__helper--bottom"
      :class="{ 'helpers__helper--bright': interactingCardTranslationY > 15 }"
    />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "PlaygroundHelpers",
  props: {
    interactingCardTranslationY: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.helpers {
  &__helper {
    width: 320px;
    height: 320px;
    position: absolute;
    pointer-events: none;
    transition: opacity 200ms linear;
    z-index: 3;
    opacity: 0.4;
    left: calc(50% - 160px);

    &--top {
      top: -160px;
      background: radial-gradient(closest-side, #00ff0066 0%, #00ff0000 100%) no-repeat center center;
      background-size: 320px;
    }

    &--bottom {
      bottom: -160px;
      background: radial-gradient(closest-side, #2e78ff66 0%, #2e78ff00 100%) no-repeat center center;
      background-size: 320px;
    }

    &--bright {
      opacity: 1;
    }
  }

  &__icon {
    position: absolute;
    z-index: 1;
    opacity: 0.4;
    transition: transform 250ms cubic-bezier(0.74, -0.52, 0.25, 1.98), opacity 200ms linear;

    &--top {
      transform: translateY(-10px);
    }

    &--bright {
      opacity: 1;
    }

    &--top.helpers__icon--bright {
      transform: translateY(0);
    }
  }
}
</style>
