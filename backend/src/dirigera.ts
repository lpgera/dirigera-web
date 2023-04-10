import { createDirigeraClient } from 'dirigera'
import tsEnv from '@lpgera/ts-env'

export async function getClient() {
  return createDirigeraClient({
    gatewayIP: tsEnv.string('GATEWAY_IP'),
    accessToken: tsEnv.stringOrThrow('ACCESS_TOKEN'),
  })
}
