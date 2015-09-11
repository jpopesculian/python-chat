import io from 'socket.io-client'
import JWT from './jwt'
import {parse} from './utils'
import Rx from 'rx'
import Immutable from 'immutable'
import { HOST } from 'app/config/general'
import { AUTH_HEADER_NAME } from 'app/config/auth'

class Socket {

  constructor(namespace = '') {
    this.url = namespace ? `${HOST}/${namespace}` : HOST
    this.io = io(this.url)
  }

  of(namespace) {
    return new Socket(namespace)
  }

  emit(event = 'message', data = null, status = 200, headers = {}) {
    let authorization = JWT.key
    if (authorization) {
      headers[AUTH_HEADER_NAME] = authorization
    }
    let message = Immutable.Map({data, status, headers})
    this.io.emit(event, message)
  }

  on(event = 'message') {
    let observe = (observer) => {
      this.io.on(event, (data) => {
        let res = parse(data)
        let authorization = res.headers[AUTH_HEADER_NAME]
        if (authorization) {
          JWT.key = authorization
        }
        observer.onNext(res)
      })
    }
    return Rx.Observable.create(observe)
  }

}

export default new Socket()
