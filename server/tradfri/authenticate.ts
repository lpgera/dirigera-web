import { getClient } from './client'

async function authenticate() {
  const client = await getClient()
  const securityCode = process.argv[2]
  if (!securityCode) {
    throw new Error('Please provide the security code as an argument.')
  }
  const { identity, psk } = await client.authenticate(securityCode)
  console.log('Authentication successful:', { identity, psk })
  client.destroy()
}

authenticate().catch(console.error)
