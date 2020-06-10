import dotenv from 'dotenv'
import * as tradfriClient from './tradfri-client'

dotenv.config()

tradfriClient
  .connect()
  .then(async (client) => {
    await client.observeDevices()
    console.log(client.devices)
    client.destroy()
  })
  .catch(console.error)
