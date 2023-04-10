import type { DirigeraClient } from 'dirigera'
import type { Request } from 'express'
import { verify } from '../jwt'

export type Context = {
  dirigeraClient: DirigeraClient
  isLoggedIn: Boolean
}

export const getContextFunction =
  (dirigeraClient: DirigeraClient) =>
  async ({ req }: { req: Request }): Promise<Context> => {
    const token = req.headers['x-token']
    const isLoggedIn = Boolean(token && verify(token.toString()))
    return {
      dirigeraClient,
      isLoggedIn,
    }
  }
