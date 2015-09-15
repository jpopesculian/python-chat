import Store, {types} from 'app/services/store'
import socket from 'app/services/socket'
import Immutable from 'immutable'

let roomStore = {
  list: {
    persist: true,
    startWith: Immutable.List(),
    type: types.LIST,
    transform: (op, old, update) => {
      switch (op) {
      case 'add':
        return old.push(update)
      default:
        return update
      }
    }
  }
}

export default new Store(roomStore, 'room')
