import Store, {types} from 'app/services/Store'

let userStore = {
  test: {
    persist: true,
    startWith: 'hello',
    type: types.STR
  }
}

export default new Store(userStore, 'user')
