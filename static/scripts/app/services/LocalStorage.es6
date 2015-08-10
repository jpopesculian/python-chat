class LocalStorage {
  static get(key) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value);
    } catch (e) {}
    return value
  }

  static set(key, value) {
    try {
      value = JSON.stringify(value);
    } catch (e) {}
    window.localStorage.setItem(key, value)
  }
}

export default LocalStorage
