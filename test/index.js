const assert = require('assert')
,     API = require('../')
,     validCreds = require('./creds')
,     paymentPayload = require('./payload')
,     errors = require('../errors')

describe('Payment API SDK', () => {
  let client
  before(() => {
    client = new API({
      ...validCreds
    })
  })

  it('Invalid configuration should throw error', () => {
    assert.throws(() => new API(), Error)
    assert.throws(() => new API({}), Error)
  })

  it('Should return the list of payments', async () => {
    let payments = await client.getPayments()
    assert.ok(Array.isArray(payments))
  })

  it('Approved payment cant be cancelled', async () => {
    let { id } = await client.createPayment(paymentPayload)
    assert.ok(id)
    await client.approvePayment(id)
    let payment = await client.getPayment(id)
    assert.equal(payment.status, 'approved')
    assert.throws(() => client.cancelPayment(id), errors.CannotCancel)
  })

  it('Cancelled payment cant be approved', async () => {
    let data = await client.createPayment(paymentPayload)
    assert.ok(id)
    await client.cancelPayment(id)
    let payment = await client.getPayment(id)
    assert.equal(payment.status, 'cancelled')
    assert.throws(() => client.approvePayment(id), errors.CannotApprove)
  })
})
