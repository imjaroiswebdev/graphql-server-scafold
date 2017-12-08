const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')
const EventType = require('../types/event')

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args) => new Promise((resolve, reject) => {
    resolve({
      id: '4l5k6j-l34k5j7h734j-34k5hj',
      name: 'My own GraphQL Server Scafold launch',
      date: Date.now().toString()
    })
  })
}
