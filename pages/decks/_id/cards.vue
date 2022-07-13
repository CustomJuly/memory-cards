<template>
  <div class="cards">
    <TopBar>
      <template #left>
        <div
          class="cards__back"
          @click="onBackClick"
        >
          <svg-icon
            name="arrow-down-s-line"
            class="cards__back-icon rotate-90"
          />
          <span>
            {{ $t('back') }}
          </span>
        </div>
      </template>
      {{ deck.name }}
      <template #right>
        <span
          class="cursor-pointer"
          @click="saveAndBack"
        >
          {{ $t('save') }}
        </span>
      </template>
    </TopBar>

    <!--          @up="cardsState[activeCard.id].rotationAngle += 180"
          @down="cardsState[activeCard.id].rotationAngle -= 180"
          -->
    <Playground
      :mode="mode"
      :active-card="activeCard"
      :active-card-index="activeCardIndex"
      :playing-cards="changeableCards"
      :disable-flips="someCardIsFocused"
      @rotate="rotateCard"
      @translate="translateCard"
      @pushed-top="deleteCard"
      @pushed-bottom="deleteCard"
    >
      <Card
        v-for="(changeableCard, index) in changeableCards"
        :key="changeableCard.card.id"
        :card="changeableCard.card"
        :rotation-angle="changeableCard.rotationAngle"
        :translation-y="changeableCard.translationY"
        :editable="mode === 'edit'"
        :show-delete-button="changeableCards.length - 1 !== index"
        @appeared="onAppeared(changeableCard, $event, index)"
        @input:definition="updateDefinition(changeableCard, $event)"
        @input:explanation="updateExplanation(changeableCard, $event)"
        @delete="deleteCard(changeableCard)"
        @focus="someCardIsFocused = true"
        @blur="someCardIsFocused = false"
      />
    </Playground>

    <ConfirmationModal
      v-if="showUnsavedChangesModal"
      :text="$t('You have unsaved changes. Do you want to save it?')"
      :cancel-text="$t('back')"
      :ok-text="$t('Save and Back')"
      @close="showUnsavedChangesModal = false"
      @declined="$router.back()"
      @accepted="saveAndBack"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {ICard, IDeck} from '~/types/deck'
import {generateRandomHash} from "~/utils/generators";
import { ICardRefs } from '~/components/Card.vue'
import { filterEmptyCards } from '~/utils/cards'
import { appStore } from '~/utils/store-accessor'

export interface IPlayingCard {
  rotationAngle: number
  translationY: number
  interval?: any
  card: ICard
}

export default Vue.extend({
  name: 'CardsPage',
  data() {
    return {
      mode: 'edit',
      someCardIsFocused: false,
      activeCard: null as IPlayingCard | null,
      activeCardIndex: 0,
      changeableCards: [] as IPlayingCard[],
      showUnsavedChangesModal: false
    }
  },
  computed: {
    deck(): IDeck {
      return appStore.getDeck(this.$route.params.id) as IDeck // TODO: delete assertion
    }
  },
  created() {
    this.changeableCards = this.deck.cards.map(item => {
      return {
        rotationAngle: 0,
        translationY: 0,
        card: Object.assign({}, item)
      }
    })
    this.addEmpty()
    this.activeCard = this.changeableCards[0]
  },
  methods: {
    rotateCard(cardIndex: number, angle: number) {
      this.changeableCards[cardIndex].rotationAngle = angle
    },
    translateCard(cardIndex: number, translationY: number) {
      this.changeableCards[cardIndex].translationY = translationY
    },
    addEmpty() {
      this.changeableCards.push({
        rotationAngle: 0,
        translationY: 0,
        card: {
          id: generateRandomHash(),
          definition: '',
          explanation: ''
        }
      })
    },
    cleanup() {
      if (this.changeableCards.length < 2) {
        return
      }
      const preLastIsEmpty: boolean = !this.changeableCards[this.changeableCards.length - 2].card.definition && !this.changeableCards[this.changeableCards.length - 2].card.explanation
      const lastIsEmpty: boolean = !this.changeableCards[this.changeableCards.length - 1].card.definition && !this.changeableCards[this.changeableCards.length - 1].card.explanation
      if (preLastIsEmpty && lastIsEmpty) {
        this.changeableCards.pop()
        this.cleanup()
      }
    },
    deleteCard(changeableCard: IPlayingCard) {
      // [ { key: value }, { key: value } ]
      let index = this.changeableCards.indexOf(changeableCard)
      this.changeableCards.splice(index, 1)
    },
    afterCardChanged() {
      if (
        this.changeableCards.length > 0 &&
        (this.changeableCards[this.changeableCards.length - 1].card.definition || this.changeableCards[this.changeableCards.length - 1].card.explanation)
      ) {
        this.addEmpty()
      }

      this.cleanup()
    },
    updateDefinition(changeableCard: IPlayingCard, definition: string) {
      changeableCard.card.definition = definition
      this.afterCardChanged()
    },
    updateExplanation(changeableCard: IPlayingCard, explanation: string) {
      changeableCard.card.explanation = explanation
      this.afterCardChanged()
    },
    setCards() {
      const payload = {
        cards: this.changeableCards
          .filter(item => item.card.definition || item.card.explanation)
          .map(item => item.card),
        deck: this.deck
      }
      appStore.setCards(payload)
    },
    onBackClick() {
      const filteredCards = filterEmptyCards(this.changeableCards)

      if (this.deck.cards.length !== filteredCards.length) {
        this.showUnsavedChangesModal = true
        return
      }

      const equals: boolean = this.deck.cards.every((card, i) => {
        return card.definition === filteredCards[i].card.definition && card.explanation === filteredCards[i].card.explanation
      })

      if (!equals) {
        this.showUnsavedChangesModal = true
        return
      }

      this.$router.back()
    },
    saveAndBack() {
      this.setCards()
      this.$router.back()
    },
    onAppeared(changeableCard: IPlayingCard, refs: ICardRefs, cardIndex: number) {
      this.activeCard = changeableCard
      this.activeCardIndex = cardIndex
      if (cardIndex === this.changeableCards.length - 1) {
        refs.definitionInputElement.focus({ preventScroll: true })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/vars';

.cards {
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
