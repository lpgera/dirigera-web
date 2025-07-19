import { before, describe, it } from 'node:test'
import assert from 'node:assert'

let auth: typeof import('./auth.ts')
let jwt: typeof import('../../jwt.ts')

describe('definitions/auth', () => {
  before(async () => {
    process.env.PASSWORD = 'password'
    process.env.JWT_SECRET = 'secret'
    auth = await import('./auth.ts')
    jwt = await import('../../jwt.ts')
  })

  describe('login', () => {
    it('should return a string if password is correct', async () => {
      const token = await auth.resolvers.Mutation?.login?.(
        {},
        { password: 'password' },
        // @ts-ignore
        { isLoggedIn: false, dirigeraClient: null },
        null
      )
      assert.strictEqual(typeof token, 'string')
    })

    it('should return a token which can be verified', async () => {
      const token = await auth.resolvers.Mutation?.login?.(
        {},
        { password: 'password' },
        // @ts-ignore
        { isLoggedIn: false, dirigeraClient: null },
        null
      )
      // @ts-ignore
      const payload = jwt.verify(token)
      assert.strictEqual(typeof payload, 'object')
    })

    it('should return null if password is incorrect', async () => {
      const token = await auth.resolvers.Mutation?.login?.(
        {},
        { password: 'invalid' },
        // @ts-ignore
        { isLoggedIn: false, dirigeraClient: null },
        null
      )
      assert.strictEqual(token, null)
    })
  })
})
