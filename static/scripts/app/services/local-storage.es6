import {parse, stringify} from './utils'

class LocalStorage {
  static get(key) {
    let value = window.localStorage.getItem(key)
    return parse(value)
  }

  static set(key, value) {
    value = stringify(value)
    window.localStorage.setItem(key, value)
  }
}

export default LocalStorage
