import express from 'express'
import path from 'path'
import http from 'http'
import tsEnv from '@lpgera/ts-env'
import { Server } from 'ws'
import graphqlServer from './graphql/server'
import * as tradfriClient from './tradfri/client'

const app = express()
app.use(
  express.static(path.join(__dirname, '..', 'build'), {
    maxAge: '30 days',
  })
)
app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

const server = http.createServer(app)
const wss = new Server({ server })
const port =
  tsEnv.number('REACT_APP_SERVER_PORT') ?? tsEnv.numberOrThrow('PORT')

async function start() {
  const client = await tradfriClient.connect()
  client.on('device updated', () => {
    wss.clients.forEach((client) => client.send('update'))
  })

  const apolloServer = graphqlServer(client)
  await apolloServer.start()
  apolloServer.applyMiddleware({ app })

  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
    if (process.send) {
      process.send('ready')
    }
  })

  process.on('SIGINT', () => {
    console.log('Received SIGINT, exiting...')
    client.destroy()
    wss.clients.forEach((ws) => ws.terminate())
    server.close()
  })
}

start().catch(console.error)
