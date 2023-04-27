import { before, describe, it } from 'node:test'
import assert from 'node:assert'

let jwt: typeof import('./jwt')

describe('jwt', () => {
  before(async () => {
    process.env.JWT_SECRET = 'secret'
    jwt = await import('./jwt')
  })

  describe('sign', () => {
    it('should return a string', () => {
      const token = jwt.sign()
      assert.strictEqual(typeof token, 'string')
    })
  })

  describe('verify', () => {
    it('should return payload without an error for valid token', () => {
      const token = jwt.sign()
      const payload = jwt.verify(token)
      assert.strictEqual(typeof payload, 'object')
    })

    it('should return null for invalid token', () => {
      const payload = jwt.verify('invalid')
      assert.strictEqual(payload, null)
    })

    it('should return null for expired token', () => {
      process.env.JWT_EXPIRY = '-1s'
      const token = jwt.sign()
      const payload = jwt.verify(token)
      assert.strictEqual(payload, null)
    })
  })
})
