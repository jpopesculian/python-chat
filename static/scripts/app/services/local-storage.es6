class LocalStorage {
  static get(key) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {
      // keep value
    }
    return value
  }

  static set(key, value) {
    try {
      value = JSON.stringify(value)
    } catch (e) {
      // keep value
    }
    window.localStorage.setItem(key, value)
  }
}

export default LocalStorage
