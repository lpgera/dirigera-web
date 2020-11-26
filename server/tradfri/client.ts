import { discoverGateway, TradfriClient } from 'node-tradfri-client'
import tsEnv from '@lpgera/ts-env'

export async function getClient() {
  const gateway = await discoverGateway()

  if (!gateway) {
    throw new Error(`Couldn't find Tradfri gateway`)
  }

  return new TradfriClient(gateway.addresses[0], {
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

  // TODO workaround until this is resolved: https://github.com/AlCalzone/node-tradfri-client/issues/437
  client.observeGroupsAndScenes()

  return client
}
