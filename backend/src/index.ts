import express from 'express'
import path from 'path'
import http from 'http'
import tsEnv from '@lpgera/ts-env'
import { WebSocketServer } from 'ws'
import bodyParser from 'body-parser'
import compression from 'compression'
import type { Socket } from 'net'
import { expressMiddleware } from '@as-integrations/express5'
import { getClient } from './dirigera.ts'
import { apolloServer } from './graphql/server.ts'
import { getContextFunction } from './graphql/context.ts'
import { verify } from './jwt.ts'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(compression())
app.use(
  express.static(path.join(__dirname, '../..', 'frontend', 'build'), {
    maxAge: '30 days',
  })
)
app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '../..', 'frontend', 'build', 'index.html'))
})

const httpServer = http.createServer(app)
const wss = new WebSocketServer({ noServer: true })

httpServer.on(
  'upgrade',
  (request: http.IncomingMessage, socket: Socket, head: Buffer) => {
    const url = new URL(request.url ?? '', `http://${request.headers.host}`)

    if (!verify(url.searchParams.get('token') ?? '')) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
      socket.destroy()
      return
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request)
    })
  }
)

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
    bodyParser.json(),
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
