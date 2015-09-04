import Rx from 'rx'
import Utils from './Utils'
import LocalStorage from './LocalStorage'

class Store {

  constructor(config, namespace) {
    this.namespace = namespace
    this.config = config
    this._store = {}
    this._subjects = {}

    for (let key in this.config) {
      let config = this.config[key]
      let value = undefined
      let subject = new Rx.Subject()
      if (Utils.isDefined(config.startWith)) {
        value = config.startWith
      }
      if (config.persist && !Utils.isNull()) {
        let locallyStored = LocalStorage.get(this._storageKey(key))
        value = !Utils.isNull(locallyStored) ? locallyStored : value
      }
      if (Utils.isDefined(value)) {
        subject.startWith(value)
      }
      this._subjects[key] = subject
      this._store[key] = value
      let update = this._update.bind(this, key)
      let stream = subject.subscribe(update)
    }
  }

  get(key) {
    return this._store[key]
  }

  set(key, value) {
    let config = this.config[key]
    if (!config || (Utils.isFunc(config.type) && !config.type(value))) {
      return false
    }
    this._subjects[key].onNext(value)
    return true
  }

  stream(key) {
    return this._subjects[key]
  }

  _update(key, value) {
    this._store[key] = value
    if (this.config[key].persist) {
      LocalStorage.set(this._storageKey(key), value)
    }
    return true
  }

  _storageKey(key) {
    return `${this.namespace}:${key}`
  }

}

export const types = {
  STR: Utils.isStr,
  INT: Utils.isInt,
  FLOAT: Utils.isFloat,
  NUM: Utils.isNUm,
  ARR: Utils.isArr,
  OBJ: Utils.isObj,
  DICT: Utils.isDict
}

export default Store
