import { discoverGateway, TradfriClient } from 'node-tradfri-client'
import tsEnv from '@lpgera/ts-env'

async function getGatewayAddress() {
  const gatewayAddress = tsEnv.string('GATEWAY_ADDRESS')

  if (gatewayAddress) {
    return gatewayAddress
  }

  const gateway = await discoverGateway()

  if (!gateway) {
    throw new Error(`Couldn't find Tradfri gateway`)
  }

  return gateway.addresses[0]
}

export async function getClient() {
  const gatewayAddress = await getGatewayAddress()

  return new TradfriClient(gatewayAddress, {
    watchConnection: true,
  })
}

export async function connect() {
  const client = await getClient()

  await client.connect(
    tsEnv.stringOrThrow('IDENTITY'),
    tsEnv.stringOrThrow('PSK')
  )

  await client.observeDevices()
  await client.observeGroupsAndScenes()

  return client
}
