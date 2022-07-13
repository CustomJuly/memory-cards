<template>
  <div class="deck">
    <TopBar>
      <template #left>
        <span
          v-if="selectionMode"
          class="truncate cursor-pointer"
          @click="switchSelectionAll"
        >
          {{ allSelected ? $t('Deselect all') : $t('Select all') }}
        </span>
      </template>
      {{ deck.name }}
      <template #right>
        <span
          v-if="selectionMode"
          class="cursor-pointer"
          @click="selectionMode = false; $emit('click')"
        >
          {{ $t('done') }}
        </span>
        <div v-else class="relative">
          <Icon
            pointer
            size="20"
            name="function-line"
            @click="showDeckActionsMenu = true"
          />
        </div>
      </template>
    </TopBar>

    <Transition name="fade">
      <FloatingMenu
        v-if="showDeckActionsMenu"
        :lines="actions"
        class="deck__floating-menu"
        @select="$event.handler()"
        @close="showDeckActionsMenu = false"
      />
    </Transition>

      <RenameDeckModal
        v-if="showRenameModal"
        :current-name="deck.name"
        @done="rename"
        @close="showRenameModal = false"
      />

    <ConfirmationModal
      v-if="showDeleteDeckConfirmationModal"
      :text="$tc('Are you sure you want to delete these decks?')"
      @close="showDeleteDeckConfirmationModal = false"
      @accepted="removeThisDeck"
    />

    <div class="deck__list">
      <ListItem
        v-for="card in deck.cards"
        :key="card.id"
        :value="hasSelected(card)"
        :editing="selectionMode"
        @input="switchSelection(card)"
        @click="navigateToCard(card)"
      >
        <div class="w-full flex gap-8">
          <p class="flex-1 truncate">
            {{ card.definition }}
          </p>
          <p class="flex-1 truncate">
            {{ card.explanation }}
          </p>
        </div>
      </ListItem>
    </div>

    <EditCardsBar
      v-if="selectionMode"
      class="deck__edit-cards-bar"
      @move-to="openMoveToModal"
      @delete="onDeleteClicked"
    />

    <ConfirmationModal
      v-if="showDeleteSelectedCardsConfirmationModal"
      :text="$tc('Are you sure you want to delete these cards?', selectedCards.length)"
      @close="showDeleteSelectedCardsConfirmationModal = false"
      @accepted="removeSelected"
    />

    <CardsToMoveToModal
      v-if="showMoveToModal"
      :count="selectedCards.length"
      :active-deck="deck"
      @close="showMoveToModal = false"
      @confirm="moveToSelected"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {IMenuLine} from '~/types/floating-menu'
import {ICard, IDeck} from '~/types/deck'
import {BUS_EVENTS} from "~/utils/bus"
import { appStore } from '~/utils/store-accessor'

export default Vue.extend({
  name: 'DeckPage',
  data() {
    return {
      showDeckActionsMenu: false,
      showMoveToModal: false,
      showRenameModal: false,
      showDeleteDeckConfirmationModal: false,
      showDeleteSelectedCardsConfirmationModal: false,
      selectedCards: [] as ICard[],
      selectionMode: false,
      actions: [
        {
          id: 'add',
          icon: 'add-line',
          label: this.$t('Add new cards'),
          handler: () => {
            this.$router.push({
              // @ts-ignore
              path: this.localePath(`/decks/${this.deck.id}/cards`),
              query: {
                scroll_to: 'new'
              }
            })
          }
        },
        {
          id: 'select',
          icon: 'checkbox-circle-line',
          label: this.$t('Select cards'),
          handler: () => {
            // @ts-ignore
            this.selectionMode = true
          }
        },
        {
          id: 'rename',
          icon: 'pencil-line',
          label: this.$t('Rename deck'),
          handler: () => {
            // @ts-ignore
            this.showRenameModal = true
          }
        },
        {
          id: 'remove',
          icon: 'delete-bin-line',
          label: this.$t('Remove deck'),
          handler: () => {
            // @ts-ignore
            this.showDeleteDeckConfirmationModal = true
          }
        }
      ] as IMenuLine[]
    }
  },
  computed: {
    deck(): IDeck {
      return appStore.getDeck(this.$route.params.id) as IDeck
    },
    allSelected(): boolean {
      return this.selectedCards.length === this.deck.cards.length
    }
  },
  methods: {
    rename(newName: string) {
      appStore.renameDeck({
        deckId: this.deck.id,
        newName
      })
    },
    hasSelected(card: ICard) {
      return !!this.selectedCards.find(item => card.id === item.id)
    },
    switchSelection(card: ICard) {
      const foundIndex = this.selectedCards.findIndex(item => card.id === item.id)
      // -1 – не нашли
      // 0..и больше – найденный индекс
      if (foundIndex === -1) {
        this.selectedCards.push(card)
      } else {
        this.selectedCards.splice(foundIndex, 1)
      }
    },
    switchSelectionAll() {
      if (this.allSelected) {
        this.selectedCards = []
      } else {
        this.selectedCards = this.deck.cards.slice()
      }
    },
    openMoveToModal() {
      if (this.selectedCards.length === 0) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('Choose the cards to move'),
          type: 'warning'
        })
        return
      }
      if (appStore.decks.length === 1) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('There are no decks to move cards to'),
          type: 'warning'
        })
        return
      }
      this.showMoveToModal = true
    },
    moveToSelected(to: IDeck) {
      appStore.moveCardsTo({
        from: this.deck,
        to,
        cards: this.selectedCards
      })
      this.selectedCards = []
      this.selectionMode = false
      this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
        description: this.$t('Cards have been moved'),
        type: 'success'
      })
    },
    onDeleteClicked() {
      if (this.selectedCards.length === 0) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('Choose the cards to delete'),
          type: 'warning'
        })
        return
      }
      this.showDeleteSelectedCardsConfirmationModal = true
    },
    removeSelected() {
      this.selectedCards.forEach(card => appStore.removeCard({
        deck: this.deck,
        card
      }))
      this.selectionMode = false
      this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
        description: this.$t('Cards have been removed'),
        type: 'success'
      })
    },
    navigateToCard(card: ICard) {
      this.$router.push({
        path: this.localePath(`/decks/${this.deck.id}/cards`),
        query: {
          scroll_to: card.id
        }
      })
    },
    removeThisDeck() {
      appStore.removeDeck(this.deck)
      this.$router.back()
      this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
        description: this.$t('The deck has been deleted'),
        type: 'success'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/mixins';

.deck {
  @include col-layout;
  position: relative;

  &__floating-menu {
    position: absolute;
    top: 50px;
    right: 10px;
  }

  &__edit {
    font-size: 16px;
    line-height: 20px;
    user-select: none;
  }

  &__edit-toggle {
    cursor: pointer;
  }

  &__title {
    white-space: nowrap;
    text-align: center;
  }

  &__icon-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__edit,
  &__title,
  &__icon-container {
    flex: 1;
  }

  &__edit-cards-bar {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  &__list {
    overflow-y: auto;
    padding-bottom: 12px;
  }
}
</style>
