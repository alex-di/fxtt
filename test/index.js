const assert = require('assert')
,     API = require('../')

describe('Payment API SDK', () => {
  it('Invalid configuration should throw error', () => {
    // assert.throws(() => {
    //   new API()
    // }, Error, 'No config provided')
    assert.throws(() => {
      new API()
    }, Error)
  })
})
