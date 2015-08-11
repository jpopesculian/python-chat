import io from 'socket.io-client'
import Utils from './Utils'

class Socket {

  BASE_URL = 'http://localhost:5000'

  constructor() {
    this.url = this.BASE_URL
    this.io = io(this.url)
    this.io.on('ping event', function(data) {
      console.log(data)
    })
    this.io.emit('some event', {data: 'whatup?'})
  }


}

export default new Socket()
