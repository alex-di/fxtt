const fetch = require('node-fetch')
,     createError = require('http-errors')
,     path = require('path')
,     AUTH_PATH = 'authenticate'
class API {
  constructor(config) {
    if (!config)
      throw new Error('No config provided')

    let { endpoint, version = 'v1', username, password } = config
    if (!endpoint)
      throw new Error('No api endpoint provided')
    this.version = version
    this.endpoint = endpoint
    this.authPromise = this._makeRequest(AUTH_PATH, 'POST', {
      username, password
    })
    .then(({ authToken, expiresIn }) => {
      this.clientToken = authToken
    })
  }

  _makeRequest(pathName, method = 'GET', payload) {
    let isAuthRequest = pathName === AUTH_PATH
    if (!this.clientToken && !isAuthRequest)
      return this.authPromise.then(() => this._makeRequest(...arguments))

    let url = new URL(path.join(this.version, pathName), this.endpoint)
    return fetch(url.toString(), {
      method,
      headers: {
        'Authorization': isAuthRequest ? null : `Bearer ${this.clientToken}`,
        'Content-Type': 'application/json'
      },
      body: typeof payload === 'object' ? JSON.stringify(payload) : payload
    })
    .then(res => res.ok ? res.json() : Promise.reject(new createError(res.status)))
  }

  getPayments() {
    return this._makeRequest('payments')
  }
  getPayment(id) {
    return this._makeRequest(path.join('payment', id))
  }
  createPayment(data) {
    return this._makeRequest('payments', 'POST', data)
  }
  approvePayment(id) {
    return this._makeRequest(path.join('payments', id, 'approve'), 'PUT')
  }
  cancelPayment(id) {
    return this._makeRequest(path.join('payments', id, 'cancel'), 'PUT')
  }
}

module.exports = API
