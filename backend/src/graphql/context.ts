import type { DirigeraClient, Home } from 'dirigera'
import type { Request } from 'express'
import { verify } from '../jwt.ts'

export type Context = {
  dirigeraClient: DirigeraClient
  homeState: Home | null
  isLoggedIn: Boolean
}

export const getContextFunction =
  (dirigeraClient: DirigeraClient) =>
  async ({ req }: { req: Request }): Promise<Context> => {
    const token = req.headers['x-token']
    const isLoggedIn = Boolean(token && verify(token.toString()))
    const homeState = isLoggedIn ? await dirigeraClient.home() : null
    return {
      dirigeraClient,
      homeState,
      isLoggedIn,
    }
  }
