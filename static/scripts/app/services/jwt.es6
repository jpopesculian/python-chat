import LocalStorage from './LocalStorage'
import { AUTH_STORAGE_NAME } from 'app/config/auth'

class JWT {

  constructor() {
    this.current = LocalStorage.get(AUTH_STORAGE_NAME)
  }

  set key(authorization) {
    if (authorization) {
      this.current = authorization
      LocalStorage.set(AUTH_STORAGE_NAME, authorization)
    }
  }

  get key() {
    return this.current || LocalStorage.get(AUTH_STORAGE_NAME)
  }
}

export default new JWT()
