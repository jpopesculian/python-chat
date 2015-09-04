import EventQueue from './EventQueue'

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
    for (let path in paths) {
      paths[path] = this._updatePath(paths[path])
      this._importLater(paths[path])
    }
    let modules = []
    let moduleNames = []
    for (let path in paths) {
      modules.push(paths[path])
      moduleNames.push(path)
    }
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
    if (this.hold) return this.queue.add(this._import.bind(this, path))
    return this._import(path)
  }

  _importAll() {
    this.hold = false
    this.queue.execute(this)
  }

  _updatePath(path) {
    if (path.startsWith('/') || path.startsWith('.')) return path
    return this.pathBase + path
  }
}

export default LazyLoader
