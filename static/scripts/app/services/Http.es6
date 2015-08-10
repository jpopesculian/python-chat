import xhr from 'xhr'
import JWT from './JWT'

class Http {
  constructor() {
    this.baseUrl = '';
  }

  get(url, params, args) {
    url = this.addGetParamsUrl(url, params)
    return this.request('GET', url, {}, args)
  }

  post(url, data, args) {
    return this.request('POST', url, data, args)
  }

  put(url, data, args) {
    return this.request('PUT', url, data, args)
  }

  del(url, data, args) {
    return this.request('DELETE', url, data, args)
  }

  request(method, url, data={}, args={}) {
    url = this.addBaseUrl(url);
    let headers = {}
    let authorization = JWT.key
    if (authorization) headers = {authorization}
    let options = {
      method: method,
      url: url,
      json: data,
      responseType: 'json',
      headers: headers
    }
    options = Object.assign(options, args)
    return new Promise((resolve, reject) => {
      xhr(options, (err, res, body) => {
        if (res.statusCode == 200) {
          JWT.key = res.headers.authorization
          return resolve({err, res, body})
        }
        return reject({err, res, body})
      })
    })
  }

  addBaseUrl(url) {
    let baseUrl = url.charAt(0) == '/' ? this.baseUrl : '';
    return this.baseUrl + url;
  }

  addGetParamsUrl(url, params) {
    if (!params) return url
    for (param in params) {
      let value = encodeURIComponent(JSON.stringify(params[param]))
      let seperator = url.split('?').length > 1 ? '&' : '?'
      url += seperator + param + '=' + value
    }
    return url
  }
}

export default new Http();
