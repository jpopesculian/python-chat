import Store, {types} from 'app/services/Store'
import Immutable from 'immutable'

let userStore = {
  current: {
    persist: true,
    startWith: Immutable.Map(),
    type: types.MAP
  }
}

export default new Store(userStore, 'user')
