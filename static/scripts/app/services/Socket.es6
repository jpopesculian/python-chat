import EventQueue from './EventQueue'
import JWT from './JWT'

class Socket {

  STATES = [
    'CONNECTING',
    'OPEN',
    'CLOSING',
    'CLOSED'
  ]
  CLOSE_CODES = {
    'NORMAL': 1000,
    'GOING_AWAY': 1001,
    'PROTOCOL_ERROR': 1002,
    'UNSUPPORTED': 1003,
    'NO_STATUS': 1005,
    'ABNORMAL': 1006,
    'TOO_LARGE': 1009,
  }

  constructor () {
    this.onMessageQueue = new EventQueue()
    this.onOpenQueue = new EventQueue()
    this.onCloseQueue = new EventQueue()
    this.onErrorQueue = new EventQueue()

    this._openEvent = {}
    this._closeEvent = {}
    this.onOpenQueue.add(this._onOpenCollect)
    this.onCloseQueue.add(this._onCloseCollect)

    this.baseUrl = "localhost:9000"
    this.socket = new WebSocket(`ws://${this.baseUrl}/connect`)

    this.socket.onmessage = this.onMessageQueue.execute.bind(this.onMessageQueue, this)
    this.socket.onopen = this.onOpenQueue.execute.bind(this.onOpenQueue, this)
    this.socket.onclose = this.onCloseQueue.execute.bind(this.onCloseQueue, this)
    this.socket.onerror = this.onErrorQueue.execute.bind(this.onErrorQueue,this)
  }

  send(data="", status=200, headers={}) {
    let defaultHeaders = {
      authorization: JWT.key
    }
    headers = Object.assign(defaultHeaders, headers)
    let message = JSON.stringify({data, status, headers})
    this.socket.send(data)
  }

  on(event, callback) {
    let fnTracker = -1
    switch (event) {
      case 'open':
        if (this.stateCode > 0) callback(this._openEvent)
        else fnTracker = this.onOpenQueue.add(callback)
        break
      case 'close':
        if (this.stateCode > 2) callback(this._closeEvent)
        else fnTracker = this.onCloseQueue.add(callback)
        break
      case 'error':
        fnTracker = this.onErrorQueue.add(callback)
        break
      default:
        let callback = this._wrapMessageCallback(event, callback)
        fnTracker = this.onMessageQueue.add(callback)
    }
    return fnTracker
  }

  off(uuid) {
    let queues = [
      this.onMessageQueue,
      this.onOpenQueue,
      this.onCloseQueue,
      this.onErrorQueue
    ]
    for (queue of queues) {
      if (queue.has(uuid)) {
        return queue.remove(uuid)
      }
    }
    return null
  }

  close(reason, status='NORMAL') {
    let code = this.CLOSE_CODES['ABNORMAL']
    if (Utils.isStr(status) && this.CLOSE_CODES[status]) {
      code = this.CLOSE_CODES[status]
    } else if (Utils.isInt(status) && status > 3999) {
      code = status
    }
    this.socket.close(code, reason)
  }

  _onOpenCollect(data) {
    this._openEvent = data
  }

  _onCloseCollect(data) {
    this._closeEvent = data
  }

  _wrapMessageCallback(event, callback) {
    return this._messageCallback.bind(this, event, callback)
  }

  _messageCallback(event, callback, data) {
    console.log(event, data)
    callback(data)
  }

  get state() {
    return this.STATES[this.state]
  }

  get stateCode() {
    return this.socket.readyState
  }

}

export default new Socket()
