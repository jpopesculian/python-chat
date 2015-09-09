import EventQueue from './EventQueue'
import {forEach} from './Utils'

class LazyLoader {

  constructor(pathBase) {
    this.pathBase = pathBase
    this.queue = new EventQueue()
    this.hold = true
  }

  component(path) {
    path = this._updatePath(path)
    this._importLater(path)
    return (cb) => {
      this._import(path)
        .then((component) => {
          cb(null, component.default)
        })
    }
  }

  components(paths) {
    forEach(paths, (name, path) => {
      paths[name] = this._updatePath(path)
      this._importLater(path)
    })
    let modules = []
    let moduleNames = []
    forEach(paths, (name, path) => {
      modules.push(path)
      moduleNames.push(name)
    })
    return (cb) => {
      this._multiImport(modules)
        .then((components) => {
          let result = {}
          for (let i = 0; i < components.length; i++) {
            result[moduleNames[i]] = components[i].default
          }
          console.log(result)
        })
    }
  }

  _multiImport(modules) {
    return Promise.all(modules.map((m) => this._import(m)))
  }

  _import(path) {
    return System.import.call(System, path)
  }

  _importLater(path) {
    if (this.hold) {
      return this.queue.add(this._import.bind(this, path))
    }
    return this._import(path)
  }

  _importAll() {
    this.hold = false
    this.queue.execute(this)
  }

  _updatePath(path) {
    if (path.startsWith('/') || path.startsWith('.')) {
      return path
    }
    return this.pathBase + path
  }
}

export default LazyLoader
