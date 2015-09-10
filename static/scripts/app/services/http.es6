import xhr from 'xhr'
import JWT from './jwt'
import Rx from 'rx'
import {forEach} from './utils'
import { HOST } from 'app/config/general'
import { AUTH_HEADER_NAME } from 'app/config/auth'

class Http {

  static get(url, params, args) {
    url = this.addGetParamsUrl(url, params)
    return this.request('GET', url, {}, args)
  }

  static post(url, data, args) {
    return this.request('POST', url, data, args)
  }

  static put(url, data, args) {
    return this.request('PUT', url, data, args)
  }

  static del(url, data, args) {
    return this.request('DELETE', url, data, args)
  }

  static request(method, url, data = {}, args = {}) {
    url = this.addBaseUrl(url)
    let observable = Rx.Observable.create(function(observer) {
      let headers = {}
      let authorization = JWT.key
      if (authorization) {
        headers = { authorization }
      }
      let options = {
        method: method,
        url: url,
        json: data,
        responseType: 'json',
        headers: headers
      }
      options = Object.assign(options, args)
      xhr(options, (err, res, body) => {
        let response = {err, res, body}
        if (res.statusCode === 200) {
          JWT.key = res.headers[AUTH_HEADER_NAME]
          observer.onNext(response)
        } else {
          observer.onError(response)
        }
        observer.onCompleted(response)
      })
    })
    return observable
  }

  static addBaseUrl(url) {
    let baseUrl = url.charAt(0) === '/' ? HOST : ''
    return baseUrl + url
  }

  static addGetParamsUrl(url, params) {
    if (!params) {
      return url
    }
    for (let {key, value} of forEach(params)) {
      let uriValue = encodeURIComponent(JSON.stringify(value))
      let seperator = url.split('?').length > 1 ? '&' : '?'
      url += seperator + key + '=' + uriValue
    }
    return url
  }
}

export default Http
