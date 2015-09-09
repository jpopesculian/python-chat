import {uuidGenerator} from './Utils'

class EventQueue {

  constructor() {
    this.queue = {}
  }

  add(fn) {
    let uuid = uuidGenerator.next()
    this.queue[uuid] = fn
    return uuid
  }

  remove(uuid) {
    let fn = null
    if (this.has(uuid)) {
      fn = this.queue[uuid]
    }
    delete this.queue[uuid]
    return fn
  }

  has(uuid) {
    return (uuid in this.queue)
  }

  execute(context) {
    context = context || this
    let args = Array.from(arguments)
    if (args.length > 1) {
      args.shift()
    }
    Utils.forEachAsync(this.queue)
      .subscribe((entry) => {
        let fn = entry.value
        fn.apply(context, args)
      })
  }

}

export default EventQueue
