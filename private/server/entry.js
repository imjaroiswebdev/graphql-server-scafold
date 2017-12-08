const { createServer } = require('http')
const express = require('express')
const {
  graphqlExpress,
  graphiqlExpress
} = require('graphql-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const {
  subscribe,
  execute
} = require('graphql')
const bodyParser = require('body-parser')
const schema = require('./schema')

const app = express()

const __DEV__ = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 8888
const HOST = process.env.HOST || 'localhost'

app.use(bodyParser.json())
app.use('/api', graphqlExpress({ schema }))

if (__DEV__) {
  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/api',
    subscriptionsEndpoint: `ws://${HOST}:${PORT}/subscriptions`
  }))
}

const server = createServer(app)

server.listen(PORT, async (err) => {
  if (err) {
    throw err
  }

  await new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: () => console.log('Client connected for listening subscriptions')
    },
    {
      server,
      path: '/subscriptions'
    }
  )

  console.log(`GraphQL server running on port ${PORT}`)
  if (__DEV__) console.log('\n Graphiql IDE accesible from /graphiql...')
})
