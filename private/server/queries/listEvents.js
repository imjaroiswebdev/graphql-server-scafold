const {
  GraphQLList
} = require('graphql')
const EventType = require('../types/event')
const Event = require('../DB/event')
const getProjections = require('../utils/projection')

module.exports = {
  type: new GraphQLList(EventType),
  args: {},
  resolve: (root, args, _, fieldASTs) => new Promise((resolve, reject) => {
    const projection = getProjections(fieldASTs)

    Event.find(args)
      .select(projection)
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
