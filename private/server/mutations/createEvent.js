const { GraphQLNonNull } = require('graphql')
const EventType = require('../types/event')
const EventInputType = require('../types/input/event')
const socket = require('../socket')
const { EVENT_CREATED } = require('../../shared/types-constants')

module.exports = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },
  resolve: (root, args, context) =>
    new Promise((resolve, reject) => {
      const { data } = args
      const { DB: { Event } } = context

      const newEvent = new Event(data)
      newEvent
        .save()
        .then(eventCreated => {
          socket.publish(EVENT_CREATED, { eventCreated })
          resolve(eventCreated)
        })
        .catch(err => reject(err))
    })
}
