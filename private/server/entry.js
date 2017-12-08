const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema')

const server = express()

const __DEV__ = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 8888

server.use('/api', graphqlHTTP({
  schema,
  graphiql: __DEV__,
  pretty: __DEV__
}))

server.listen(PORT, err => {
  if (err) {
    throw err
  }

  console.log(`GraphQL server running on port ${PORT}`)
})
