import io from 'socket.io-client'
import JWT from './JWT'

class Socket {

  BASE_URL = 'http://localhost:5000'

  constructor(namespace='') {
    this.url = this.BASE_URL
    if (namespace) {
      this.url += '/' + namespace
    }
    this.io = io(this.url)
    this.on('authorized')
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

  on(event='message', callback=()=>{}) {
    this.io.on(event, function(res) {
      let {data, status, headers} = res
      let authorization = headers['Authorization']
      if (authorization) {
        JWT.key = authorization
      }
      callback(data, status, headers)
    })
  }

}

export default new Socket()
