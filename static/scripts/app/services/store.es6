import Rx from 'rx'
import {isDefined, isNull, isFunc, isStr, isInt, isFloat, isNum} from './validators'
import LocalStorage from './local-storage'
import Immutable from 'immutable'

class Store {

  constructor(configObj, namespace) {
    this.namespace = namespace ? namespace : 'root'
    this._config = Immutable.fromJS(configObj)
    this._store = {}
    this._actionStreams = Immutable.Map()
    this._valueStreams = Immutable.Map()
    this._updateStreams = Immutable.Map()
    this._storers = Immutable.Map()

    this._config.map((config, key) => {
      // get initial value
      let value
      if (isDefined(config.get('startWith'))) {
        value = config.get('startWith')
      }
      if (config.get('persist')) {
        let locallyStored = LocalStorage.get(this._storageKey(key))
        locallyStored = this._deserialize(key, locallyStored)
        value = !isNull(locallyStored) ? locallyStored : value
      }
      this._store[key] = value

      // initialize streams
      let valueStream = new Rx.Subject()
      let actionStream = new Rx.Subject()

      let transform = isFunc(config.get('transform')) ?
        config.get('transform') : (op, old, update) => update
      let updateStream = actionStream.withLatestFrom(valueStream, (action, oldValue) => {
        let newValue = transform(action.op, oldValue, action.value)
        valueStream.onNext(newValue)
        return {value: newValue, action: action}
      })

      updateStream.subscribe()
      actionStream.subscribe()
      valueStream.subscribe()

      valueStream.onNext(value)

      this._valueStreams = this._valueStreams.set(key, valueStream)
      this._actionStreams = this._actionStreams.set(key, actionStream)
      this._updateStreams = this._updateStreams.set(key, updateStream)

      // update storage on next
      let storeValue = this._storeValue.bind(this, key)
      let storer = valueStream.subscribe(storeValue)
      this._storers = this._storers.set(key, storer)

    })
  }

  get(key) {
    return this._store[key]
  }

  set(key, value) {
    this.update('set', key, value)
  }

  update(op, key, value) {
    this._actionStreams.get(key).onNext({op, value})
  }

  values(key) {
    return this._valueStreams.get(key).map((x)=>x)
  }

  updates(key) {
    return this._updateStreams.get(key).map((x)=>x)
  }

  actions(key) {
    return this._actionStreams.get(key).map((x)=>x)
  }

  _storeValue(key, value) {
    let config = this._config.get(key)
    this._store[key] = value
    if (config.get('persist')) {
      value = this._serialize(key, value)
      LocalStorage.set(this._storageKey(key), value)
    }
    return true
  }

  _storageKey(key) {
    return `${this.namespace}:${key}`
  }

  _isValid(key, value) {
    let config = this._config.get(key)
    if (!config) {
      return false
    }
    let type = config.get('type')
    if (type && isFunc(type.validator) && !type.validator(value)) {
      return false
    }
    return true
  }

  _serialize(key, value) {
    let config = this._config.get(key)
    let type = config.get('type')
    if (type && isFunc(type.serialize)) {
      return type.serialize(value)
    }
    return value
  }

  _deserialize(key, value) {
    let config = this._config.get(key)
    let type = config.get('type')
    if (type && isFunc(type.deserialize)) {
      return type.deserialize(value)
    }
    return value
  }

}

export const types = {
  STR: {
    validator: isStr
  },
  INT: {
    validator: isInt
  },
  FLOAT: {
    validator: isFloat
  },
  NUM: {
    validator: isNum
  },
  LIST: {
    validator: Immutable.List.isList,
    serialize: (x) => x.toArray(),
    deserialize: (x) => Immutable.List(x)
  },
  MAP: {
    validator: Immutable.Map.isMap,
    serialize: (x) => x.toObject(),
    deserialize: (x) => Immutable.Map(x)
  }
}

export default Store
