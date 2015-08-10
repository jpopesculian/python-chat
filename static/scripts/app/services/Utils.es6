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

  isDefined(x) {
    return (x || (x !== undefined && x !== null))
  }

  isObj(obj) {
    return obj !== null && typeof obj === 'object' && !this.isArr(obj)
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

}

export default new Utils()
