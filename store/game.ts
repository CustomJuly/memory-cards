import {Module, Mutation, VuexModule} from 'vuex-module-decorators'
import {ICard} from "~/types/deck";

export interface ITrainingState {
  deckId: string
  cardsToLearn: ICard[]
}

const defaultState = (): ITrainingState => ({
  deckId: '',
  cardsToLearn: []
})

@Module({
  name: 'game',
  stateFactory: true,
  namespaced: true
})
export default class GameStore extends VuexModule {
  private training: ITrainingState = defaultState()

  get trainingState() {
    return this.training
  }

  @Mutation
  setDeckId(deckId: string) {
    this.training.deckId = deckId
  }

  @Mutation
  addCardToLearn(card: ICard) {
    this.training.cardsToLearn.push(card)
  }

  @Mutation
  reset() {
    this.training = defaultState()
  }
}
