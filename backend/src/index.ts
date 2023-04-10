import express from 'express'
import path from 'path'
import http from 'http'
import tsEnv from '@lpgera/ts-env'
import { Server } from 'ws'
import { json } from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'
import { getClient } from './dirigera'
import { apolloServer } from './graphql/server'
import { getContextFunction } from './graphql/context'

const app = express()
app.use(
  express.static(path.join(__dirname, '..', 'frontend'), {
    maxAge: '30 days',
  })
)
app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'))
})

const httpServer = http.createServer(app)
const wss = new Server({ server: httpServer })
const port = tsEnv.number('PORT') ?? 4000

async function start() {
  const client = await getClient()
  client.startListeningForUpdates((updateEvent) => {
    if (updateEvent.type !== 'pong') {
      wss.clients.forEach((client) => client.send('update'))
    }
  })

  const graphqlServer = apolloServer(httpServer)
  await graphqlServer.start()

  app.use(
    '/graphql',
    json(),
    expressMiddleware(graphqlServer, {
      context: getContextFunction(client),
    })
  )

  httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })

  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down server...')
    client.stopListeningForUpdates()
    wss.clients.forEach((ws) => ws.terminate())
    httpServer.close()
  })
}

start().catch(console.error)
