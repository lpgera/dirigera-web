import { before, describe, it } from 'node:test'
import assert from 'node:assert'
import type { GraphQLError } from 'graphql'

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

    it('should throw a 401 error if password is incorrect', async () => {
      await assert.rejects(
        async () =>
          await auth.resolvers.Mutation?.login?.(
            {},
            { password: 'invalid' },
            // @ts-ignore
            { isLoggedIn: false, dirigeraClient: null },
            null
          ),
        (error: GraphQLError) => {
          assert.strictEqual(error.extensions.code, 'UNAUTHENTICATED')
          assert.deepStrictEqual(error.extensions.http, { status: 401 })
          return true
        }
      )
    })
  })
})
