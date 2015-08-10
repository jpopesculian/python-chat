import LocalStorage from './LocalStorage'

class JWT {

  constructor() {
    this.current = LocalStorage.get('authorization')
  }

  set key(authorization) {
    if (authorization) {
      this.current = authorization
      LocalStorage.set('authorization', authorization)
    }
  }

  get key() {
    return this.current || LocalStorage.get('authorization')
  }
}

export default new JWT()
