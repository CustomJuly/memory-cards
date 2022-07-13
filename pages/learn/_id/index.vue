<template>
  <div class="game">
    <TopBar>
      <template #left>
        <div class="game__back" @click="showStopGameModal = true">
          <svg-icon
            name="arrow-down-s-line"
            class="game__back-icon rotate-90"
          />
          <span>
            {{ $t('back') }}
          </span>
        </div>
      </template>
      {{ deck.name }}
    </TopBar>

    <Playground
      ref="playground"
      :mode="mode"
      :active-card="activeCard"
      :active-card-index="activeCardIndex"
      :playing-cards="playingCards"
      @rotate="rotateCard"
      @translate="translateCard"
      @pushed-top="onPushedTop"
      @pushed-bottom="onPushedBottom"
    >
      <Card
        v-for="(changeableCard, index) in playingCards"
        :key="changeableCard.card.id"
        :card="changeableCard.card"
        :rotation-angle="changeableCard.rotationAngle"
        :translation-y="changeableCard.translationY"
        @appeared="onAppeared(changeableCard, $event, index)"
      />
    </Playground>

    <ConfirmationModal
      v-if="showStopGameModal"
      :text="$t('stopAndExitConfirmation')"
      :cancel-text="$t('play')"
      :ok-text="$t('stopAndExit')"
      @close="showStopGameModal = false"
      @accepted="$router.back()"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ICard, IDeck } from '~/types/deck'
import {appStore, gameStore} from '~/store'
import { IPlayingCard } from '~/pages/decks/_id/cards.vue'
import { ICardRefs } from '~/components/Card.vue'
import { shuffle } from '~/utils/shuffle'

export default Vue.extend({
  name: 'LearnDeck',
  data() {
    return {
      mode: 'game',
      showStopGameModal: false,
      activeCard: null as IPlayingCard | null,
      activeCardIndex: 0,
      playingCards: [] as IPlayingCard[],
      stockCards: [] as ICard[]
    }
  },
  computed: {
    deck(): IDeck {
      return appStore.getDeck(this.$route.params.id) as IDeck
    }
  },
  created() {
    gameStore.reset()
    gameStore.setDeckId(this.deck.id)
    this.playingCards = this.deck.cards.map(item => {
      return {
        rotationAngle: 0,
        translationY: 0,
        card: Object.assign({}, item)
      }
    })
    this.activeCard = this.playingCards[0]
  },
  methods: {
    rotateCard(cardIndex: number, angle: number) {
      this.playingCards[cardIndex].rotationAngle = angle
    },
    translateCard(cardIndex: number, translationY: number) {
      this.playingCards[cardIndex].translationY = translationY
    },
    onAppeared(changeableCard: IPlayingCard, refs: ICardRefs, cardIndex: number) {
      this.activeCard = changeableCard
      this.activeCardIndex = cardIndex
      if (cardIndex === this.playingCards.length - 1) {
        refs.definitionInputElement.focus({ preventScroll: true })
      }
    },
    deleteCard(changeableCard: IPlayingCard) {
      let index = this.playingCards.indexOf(changeableCard)
      this.playingCards.splice(index, 1)
    },
    checkFinish() {
      if (this.playingCards.length === 1 && this.stockCards.length > 0) {
        shuffle(this.stockCards).forEach(card => this.playingCards.push({
          rotationAngle: 0,
          translationY: 0,
          card: Object.assign({}, card)
        }))
        this.stockCards.splice(0, this.stockCards.length)
        setTimeout(() => {
          // @ts-ignore
          this.$refs.playground.$el.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        }, 0)
      }

      if (this.playingCards.length === 0) {
        this.$router.push(this.localePath(`/learn/${this.deck.id}/results`))
      }
    },
    onPushedTop(playingCard: IPlayingCard) {
      this.deleteCard(playingCard)
      this.checkFinish()
    },
    onPushedBottom(playingCard: IPlayingCard) {
      gameStore.addCardToLearn(playingCard.card)
      // show translation
      this.stockCards.push(playingCard.card)
      this.deleteCard(playingCard)
      this.checkFinish()
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.game {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__back {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    color: $color-primary;

    &:hover {
      color: $color-primary-darker;
    }
  }

  &__back-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
