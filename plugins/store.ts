import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'

export default function ({ store }: { store: Store<any> }) {
  initialiseStores(store)
}
