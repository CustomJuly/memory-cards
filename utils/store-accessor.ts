import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AppStore from '~/store/appstore'
import GameStore from '~/store/game'

let appStore: AppStore
let gameStore: GameStore

function initialiseStores(store: Store<any>): void {
  appStore = getModule(AppStore, store)
  gameStore = getModule(GameStore, store)
}

export { initialiseStores, appStore, gameStore }
