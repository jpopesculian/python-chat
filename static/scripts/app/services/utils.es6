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

export function isEmpty(obj) {
  if (obj === null) {
    return true
  }
  if (obj.length > 0) {
    return false
  }
  if (obj.length === 0) {
    return true
  }
  if (Object.getOwnPropertyNames(obj).length > 0) {
    return false
  }
  return true
}

export function isNull(obj) {
  return obj === null
}

export function isDefined(x) {
  return (x || (x !== undefined && !isNull(x)))
}

export function isObj(obj) {
  return !isNull(obj) && typeof obj === 'object'
}

export function isArr(arr) {
  return Array.isArray(arr)
}

export function isDict(dict) {
  return isObj(dict) && !isArr(dict)
}

export function isStr(str) {
  return typeof str === 'string'
}

export function isFunc(fn) {
  return typeof fn === 'function'
}

export function isNum(n) {
  return Number(n) === n
}

export function isInt(n) {
  return this.isNum(n) && n % 1 === 0
}

export function isFloat(n) {
  return this.isNum(n) && n % 1 !== 0
}

export function isEmail(email) {
  if (!this.isStr(email)) {
    return false
  }
  let emailRe = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return emailRe.test(email)
}

export function pop(obj, key) {
  let value = obj[key]
  delete obj[key]
  return value
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
