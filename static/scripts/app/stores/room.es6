import Store, {types} from 'app/services/store'
import Immutable from 'immutable'

let roomStore = {
  list: {
    persist: true,
    startWith: Immutable.List(),
    type: types.LIST
  }
}

export default new Store(roomStore, 'room')
