<template>
  <div class="decks">
    <TopBar>
      <template #left>
        <span class="cursor-pointer" @click="editMode = !editMode">
          {{ editMode ? $t('done') : $t('edit') }}
        </span>
      </template>
      {{ $t('decks') }}
      <template #right>
        <Icon
          :name="editMode ? 'delete-bin-line' : 'add-line'"
          size="24"
          pointer
          @click="editMode ? requestToDelete() : (showNewModal = true)"
        />
      </template>
    </TopBar>
    <ListItem
      v-for="(deck, index) in decks"
      :key="index"
      :value="hasSelected(deck)"
      :badge="$tc('cards', deck.cards.length)"
      :editing="editMode"
      @input="switchDeckSelection(deck)"
      @click="onDeckClick(deck)"
    >
      {{ deck.name }}
    </ListItem>

    <!--    <pre>-->
    <!--      {{ selectedDecks }}-->
    <!--    </pre>-->

    <NewDeckModal
      v-if="showNewModal"
      @close="closeModal"
      @done="createNewDeck"
    />
    <ConfirmationModal
      v-if="showDeleteConfirmationModal"
      :text="$tc('Are you sure you want to delete these decks?', 2)"
      @close="closeModal"
      @accepted="removeSelected"
    />
  </div>
</template>

<script>
import {appStore} from '@/utils/store-accessor.ts'
import {BUS_EVENTS} from "@/utils/bus";

export default {
  name: 'IndexPage',
  data() {
    return {
      showNewModal: false,
      showDeleteConfirmationModal: false,
      editMode: false,
      selectedDecks: []
    }
  },
  computed: {
    decks() {
      return appStore.decks
    }
  },
  mounted() {
    if (this.$route.query.action === 'new') {
      this.showNewModal = true
    }
  },
  methods: {
    createNewDeck(name) {
      appStore.addDeck(name)
      this.closeModal()
    },
    closeModal() {
      this.showNewModal = false
      this.showDeleteConfirmationModal = false
    },
    hasSelected(deck) {
      return !!this.selectedDecks.find(item => deck.id === item.id)
    },
    switchDeckSelection(deck) {
      const foundIndex = this.selectedDecks.findIndex(item => deck.id === item.id)
      // -1 – не нашли
      // 0..и больше – найденный индекс
      if (foundIndex === -1) {
        this.selectedDecks.push(deck)
      } else {
        this.selectedDecks.splice(foundIndex, 1)
      }
    },
    removeSelected() {
      this.selectedDecks.forEach(deck => appStore.removeDeck(deck))
      this.editMode = false
    },
    onDeckClick(deck) {
      this.$router.push(this.localePath(`/decks/${deck.id}`))
    },
    requestToDelete() {
      if (this.selectedDecks.length === 0) {
        this.$nuxt.$emit(BUS_EVENTS.NOTIFY, {
          description: this.$t('Choose decks to delete'),
          type: 'warning'
        })
        return
      }
      this.showDeleteConfirmationModal = true
    }
  }
}
</script>

<style lang="scss" scoped>
.decks {
  padding-bottom: 12px;

  &__edit {
    font-size: 16px;
    line-height: 20px;
    user-select: none;
  }

  &__edit-toggle {
    cursor: pointer;
  }

  &__edit,
  &__title,
  &__icon-container {
    flex: 1;
  }
}
</style>
