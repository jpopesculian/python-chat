import io from 'socket.io-client'
import JWT from './JWT'
import Utils from './Utils'

class Socket {

  BASE_URL = 'http://localhost:5000'

  constructor(namespace='') {
    this.url = this.BASE_URL
    if (namespace) {
      this.url += '/' + namespace
    }
    this.io = io(this.url)
    this.io.on('authorized', (data, status, headers) => {
      JWT.key = headers['Authorization']
    })
  }

  of(namespace) {
    return new Socket(namespace)
  }

  emit(event, data=null, status=200, headers={}) {
    headers['Authorization'] = JWT.key
    message = {data, status, headers}
    this.io.emit(event, message)
  }

  on(event, callback) {
    this.io.on(event, function(res) {
      let {data, status, headers} = res
      callback(data, status, headers)
    })
  }

}

export default new Socket()
