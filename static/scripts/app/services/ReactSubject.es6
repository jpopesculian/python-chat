import Rx from 'rx'
import {forEach} from './Utils'

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


export default ReactSubject
