import type { DirigeraClient } from 'dirigera'

export type Context = {
  dirigeraClient: DirigeraClient
  isLoggedIn: Boolean
}
