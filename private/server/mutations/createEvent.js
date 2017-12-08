const { GraphQLNonNull } = require('graphql')
const EventType = require('../types/event')
const EventInputType = require('../types/input/event')
const Event = require('../DB/event')
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
  resolve: (root, args) => new Promise((resolve, reject) => {
    const {
      data
    } = args

    const newEvent = new Event(data)
    newEvent
      .save()
      .then(data => {
        socket.publish(EVENT_CREATED, {
          eventCreated: data
        })
        resolve(data)
      })
      .catch(err => reject(err))
  })
}
