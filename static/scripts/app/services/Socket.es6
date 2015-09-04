import io from 'socket.io-client'
import JWT from './JWT'
import Rx from 'rx'
import { HOST } from 'app/config/general'

class Socket {

  constructor(namespace='') {
    this.url = namespace ? `${HOST}/${namespace}` : HOST
    this.io = io(this.url)
  }

  of(namespace) {
    return new Socket(namespace)
  }

  emit(event='message', data=null, status=200, headers={}) {
    let authorization = JWT.key
    if (authorization) {
      headers['Authorization'] = authorization
    }
    let message = {data, status, headers}
    this.io.emit(event, message)
  }

  on(event='message') {
    let observable = Rx.Observable.create(function (observer) {
      this.io.on(event, (res) => {
        let authorization = res.headers['Authorization']
        if (authorization) JWT.key = authorization
        observer.onNext(res)
      })
    })
    return observable
  }

}

export default new Socket()
