import Rx from 'rx'
import Immutable from 'immutable'

export class ReactSubject {

  static create(mapFunction) {
    function subject(value) {
      if (typeof mapFunction === 'function') {
        value = mapFunction(value)
      } else if (typeof mapFunction !== 'undefined') {
        value = mapFunction
      }
      subject.onNext(value)
    }

    for (let key in Rx.Subject.prototype) {
      subject[key] = Rx.Subject.prototype[key]
    }
    Rx.Subject.call(subject)

    return subject
  }

  static behavior(initialValue, mapFunction) {
    function subject(value) {
      if (typeof mapFunction === 'function') {
        value = mapFunction(value)
      } else if (typeof mapFunction !== 'undefined') {
        value = mapFunction
      }
      subject.onNext(value)
    }
    for (let key in Rx.BehaviorSubject.prototype) {
      subject[key] = Rx.Subject.prototype[key]
    }
    Rx.Subject.call(subject, initialValue)

    return subject
  }
}

export function initiateStreams(...streamNames) {
  let streams = Immutable.Map()
  for (let name of streamNames) {
    streams = streams.set(name, ReactSubject.create())
  }
  return streams
}

export function disposeStreams(streams) {
  streams.map((stream) => {
    stream.dispose()
  })
  return Immutable.Map()
}

export class StreamMap {
  constructor(...streams) {
    this.map = Immutable.Map()
    for (let stream of streams) {
      this.set(stream, ReactSubject.create())
    }
  }

  set(key, value) {
    this.map = this.map.set(key, value)
    return this
  }

  get(key) {
    return this.map.get(key)
  }

  dispose(key) {
    if (key) {
      let stream = this.get(key)
      this.set(key, stream.dispose())
    } else {
      this.map = this.map.map((stream) => stream.dispose())
    }
    return this
  }
}

export default StreamMap
