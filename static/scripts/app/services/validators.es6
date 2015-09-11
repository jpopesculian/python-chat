
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
  return isNum(n) && n % 1 === 0
}

export function isFloat(n) {
  return isNum(n) && n % 1 !== 0
}

export function isEmail(email) {
  const RE = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  return RE.test(email)
}

export function isUrl(url) {
  const RE = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/
  return RE.test(url)
}

export function isSlug(slug) {
  const RE = /^[a-zA-Z0-9][a-zA-Z0-9_\-+\.]*[a-zA-Z0-9]$/
  return RE.test(slug)
}
