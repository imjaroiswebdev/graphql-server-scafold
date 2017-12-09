const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const queries = require('./queries')
const mutations = require('./mutations')
const subscriptions = require('./subscriptions')

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    description: 'Available querying methods for the API',
    fields: queries
  }),

  mutation: new GraphQLObjectType({
    name: 'rootMutation',
    description:
      'Available data creation, updating and patching methods for the API',
    fields: mutations
  }),

  subscription: new GraphQLObjectType({
    name: 'rootSubscription',
    description: 'Available real time event subcription channels for the API',
    fields: subscriptions
  })
})
