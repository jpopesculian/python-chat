class _UuidGenerator {
  constructor() {
    this.uuid = 0
  }
  next() {
    let uuid = this.uuid
    this.uuid += 1
    return uuid
  }
}
export var uuidGenerator = new _UuidGenerator()

export function pop(obj, key) {
  let value = obj[key]
  delete obj[key]
  return value
}

export function preventDefault(event) {
  event.preventDefault()
  return false
}

export function extractTargetValue(event) {
  return event.target.value
}

export function* forEach(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let value = obj[key]
      yield {key, value}
    }
  }
}

export function arrHas(arr, item) {
  return arr.indexOf(item) > -1
}

export function arrHasOneOf(arr, items) {
  for (let item of items) {
    if (arrHas(arr, item)) {
      return true
    }
  }
  return false
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toCamelCase(string) {
  let pieces = string.split(/(-|_)/)
  if (pieces.length > 1) {
    for (let i = 1; i < pieces.length; i++) {
      pieces[i] = capitalizeFirstLetter(pieces[i])
    }
    return pieces.join()
  }
  return string
}

export function parse(json) {
  try {
    return JSON.parse(json)
  } catch (e) {
    return json
  }
  return json
}

export function stringify(obj) {
  try {
    return JSON.stringify(obj)
  } catch (e) {
    return obj
  }
  return obj
}
