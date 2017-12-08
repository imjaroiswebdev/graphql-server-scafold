const socket = require('../socket')
const EventType = require('../types/event')
const { EVENT_CREATED } = require('../../shared/types-constants')

module.exports = {
  type: EventType,
  // Push to all subscribers on EVENT_CREATED
  subscribe: () => socket.asyncIterator(EVENT_CREATED)
}
