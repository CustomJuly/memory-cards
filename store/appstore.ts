import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { ICard, IDeck } from '~/types/deck'
import {IProfile} from "~/types/profile";

export interface IRemoveCardPayload {
  deck: IDeck
  card: ICard
}

export interface IRenameDeckPayload {
  deckId: string
  newName: string
}

export interface ISetCardsPayload {
  deck: IDeck
  cards: ICard[]
}

export interface IMoveCardsPayload {
  from: IDeck
  to: IDeck
  cards: ICard[]
}

@Module({
  name: 'appstore',
  stateFactory: true,
  namespaced: true
})
export default class AppStore extends VuexModule {
  private _decks: IDeck[] = []
  private _profile: IProfile = {
    name: ''
  }

  get decks() {
    return this._decks
  }

  get getDeck() {
    return (deckId: string) => {
      return this._decks.find(deck => deck.id === deckId)
    }
  }

  get profile() {
    return this._profile
  }

  @Mutation
  addDeck(deckName: string) {
    this._decks.push({
      id: `id-${Math.round(Math.random() * 1e5)}`,
      name: deckName,
      cards: []
    })
  }

  @Mutation
  removeDeck(deck: IDeck) {
    const foundIndex = this._decks.findIndex(item => deck.id === item.id)
    if (foundIndex >= 0) {
      this._decks.splice(foundIndex, 1)
    }
  }

  @Mutation
  removeCard(payload: IRemoveCardPayload) {
    const deckIndex = this._decks.findIndex(deck => deck.id === payload.deck.id)
    if (deckIndex === -1) {
      return
    }
    const cardIndex = this._decks[deckIndex].cards.findIndex(card => card.id === payload.card.id)
    if (cardIndex > -1) {
      this._decks[deckIndex].cards.splice(cardIndex, 1)
    }
  }

  @Mutation
  moveCardsTo(payload: IMoveCardsPayload) {
    const fromDeckIndex = this._decks.findIndex(deck => deck.id === payload.from.id)
    const toDeckIndex = this._decks.findIndex(deck => deck.id === payload.to.id)

    payload.cards.forEach(cardToRemove => {
      const cardIndex = this._decks[fromDeckIndex].cards.findIndex(cardInStore => cardInStore.id === cardToRemove.id)
      this._decks[fromDeckIndex].cards.splice(cardIndex, 1)
    })

    this._decks[toDeckIndex].cards.push(...payload.cards)
  }

  @Mutation
  setDecks(decks: IDeck[]) {
    this._decks = decks
  }

  @Mutation
  renameDeck(payload: IRenameDeckPayload) {
    const foundIndex = this._decks.findIndex(deck => deck.id === payload.deckId)
    if (foundIndex >= 0) {
      this._decks[foundIndex].name = payload.newName
    }
  }

  @Mutation
  setCards(payload: ISetCardsPayload) { // payload = { cards, deck }
    const foundIndex = this._decks.findIndex(deck => deck.id === payload.deck.id)
    this._decks[foundIndex].cards = payload.cards
  }

  @Mutation
  setName(name: string) {
    this._profile.name = name
  }
}
