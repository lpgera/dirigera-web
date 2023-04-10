import express from 'express'
import path from 'path'
import http from 'http'
import tsEnv from '@lpgera/ts-env'
import { Server } from 'ws'
import graphqlServer from './graphql/server'
import { getClient } from './dirigera'

const app = express()
app.use(
  express.static(path.join(__dirname, '..', 'frontend'), {
    maxAge: '30 days',
  })
)
app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

const server = http.createServer(app)
const wss = new Server({ server })
const port = tsEnv.number('PORT') ?? 4000

async function start() {
  const client = await getClient()
  client.startListeningForUpdates((updateEvent) => {
    if (updateEvent.type !== 'pong') {
      wss.clients.forEach((client) => client.send('update'))
    }
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
    client.stopListeningForUpdates()
    wss.clients.forEach((ws) => ws.terminate())
    server.close()
  })
}

start().catch(console.error)
