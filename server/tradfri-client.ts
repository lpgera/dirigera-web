import { discoverGateway, TradfriClient } from 'node-tradfri-client'
import tsEnv from '@lpgera/ts-env'

export async function connect() {
  const gateway = await discoverGateway()

  if (!gateway) {
    throw new Error(`Couldn't find Tradfri gateway`)
  }

  const client = new TradfriClient(gateway.addresses[0], {
    watchConnection: true,
  })

  await client.connect(
    tsEnv.stringOrThrow('IDENTITY'),
    tsEnv.stringOrThrow('PSK')
  )

  await client.observeDevices()
  await client.observeGroupsAndScenes()

  return client
}
