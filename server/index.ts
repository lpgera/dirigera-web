import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import tsEnv from '@lpgera/ts-env'
import server from './graphql/server'
import * as tradfriClient from './tradfri/client'

dotenv.config()

const app = express()
app.use(express.static(path.join(__dirname, '..', 'build')))
app.get('/', function (_, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

const port = tsEnv.numberOrThrow('REACT_APP_SERVER_PORT')

async function start() {
  const client = await tradfriClient.connect()
  const apolloServer = server(client)

  apolloServer.applyMiddleware({ app })
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}

start().catch(console.error)
