const { GraphQLNonNull, GraphQLString } = require('graphql')
const EventType = require('../types/event')
const EventInputType = require('../types/input/event')

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: (root, args, context) =>
    new Promise((resolve, reject) => {
      const { id, data } = args
      const { DB: { Event } } = context

      Event.findOneAndUpdate({ _id: id }, data, { new: true })
        .then(eventUpdated => resolve(eventUpdated))
        .catch(err => reject(err))
    })
}
