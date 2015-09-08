class Utils {

  constructor() {
    this.uuid = 0
  }

  newUuid() {
    let uuid = this.uuid
    this.uuid += 1
    return uuid
  }

  isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0)  return true;
    if (Object.getOwnPropertyNames(obj).length > 0) return false;
    return true;
  }

  isNull(obj) {
    return obj === null
  }

  isDefined(x) {
    return (x || (x !== undefined && !isNull(x)))
  }

  isObj(obj) {
    return !isNull(obj) && typeof obj === 'object'
  }

  isDict(dict) {
    return this.isObj(dict) && !this.isArr(dict)
  }

  isArr(arr) {
    return Array.isArray(arr)
  }

  isStr(str) {
    return typeof str === 'string'
  }

  isFunc(fn) {
    return typeof fn === 'function'
  }

  isNum(n) {
    return Number(n) === n
  }

  isInt(n) {
    return this.isNum(n) && n % 1 === 0;
  }

  isFloat(n) {
      return this.isNum(n) && n % 1 !== 0;
  }

  isEmail(email) {
    if (!this.isStr(email)) return false
    let email_re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return email_re.test(email)
  }

  pop(obj, key) {
    let value = obj[key]
    delete obj[key]
    return value
  }

  extractTargetValue(event) {
    return event.target.value
  }

  AND(x, y) {
    return (x & y) == 1
  }

  OR(x, y) {
    return (x | y) == 1
  }
}

export default new Utils()
