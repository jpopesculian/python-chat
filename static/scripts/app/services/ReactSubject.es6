import Rx from 'rx'
import { forEach } from './Utils'
import Immutable from 'immutable'

class ReactSubject {

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

export default ReactSubject
