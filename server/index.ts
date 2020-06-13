import dotenv from 'dotenv'
import server from './graphql/server'
import tsEnv from '@lpgera/ts-env'
import * as tradfriClient from './tradfri-client'

dotenv.config()

async function start() {
  const client = await tradfriClient.connect()
  const { url } = await server(client).listen({
    port: tsEnv.numberOrThrow('REACT_APP_SERVER_PORT'),
  })
  console.log(`Server is listening on ${url}`)
}

start().catch(console.error)
