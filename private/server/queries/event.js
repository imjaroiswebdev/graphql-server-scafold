const {
  GraphQLID,
  GraphQLNonNull
} = require('graphql')
const EventType = require('../types/event')
const Event = require('../DB/event')
const getProjections = require('../utils/projection')

module.exports = {
  type: EventType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, args, _, fieldASTs) => new Promise((resolve, reject) => {
    const {
      id
    } = args
    const projection = getProjections(fieldASTs)

    Event.findById(id)
      .select(projection)
      .exec()
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}
