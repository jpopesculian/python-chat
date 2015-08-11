import io from 'socket.io-client'
import Utils from './Utils'

class Socket {

  BASE_URL = 'http://localhost:5000'

  constructor() {
    this.url = this.BASE_URL
    this.io = io(this.url)
    this.io.on('connect', function(data) {
      console.log(data)
    })
    this.io.on('ping event', function(data) {
      console.log(data)
    })
    this.io.send('some event', function(data, other, cool) {
      console.log(data, other, cool)
    })
    this.io.on('some event', function(data) {
      console.log(data)
    })
  }


}

export default new Socket()
