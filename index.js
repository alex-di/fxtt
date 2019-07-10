const URL = require('url')

class API {
  constructor(config) {
    if (!config) {
      throw new Error('No config provided')
    }
    let { endpoint, version = 'v1', username, password } = config
    // if (!endpoint)
    //   throw new Error('No api endpoint provided')
    this.baseUrl = new URL(version, endpoint)
  }
}

module.exports = API
