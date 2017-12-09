const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} = require('graphql')
const EventType = require('../types/event')
const getProjections = require('../utils/projection')

module.exports = {
  type: new GraphQLList(EventType),
  description: `Lists the available elements of the ${
    EventType.name
  } collection.
  
  Args available for pagination options:

  first and skip (__self descriptive__), reverse (__accepts asc or desc__) and cursor (__accepts full date in GMTString format__).`,
  args: {
    first: {
      name: 'first',
      type: GraphQLInt
    },
    skip: {
      name: 'skip',
      type: GraphQLInt
    },
    reverse: {
      name: 'reverse',
      type: GraphQLBoolean
    },
    cursor: {
      name: 'cursor',
      type: GraphQLString
    }
  },
  resolve: (root, args, context, fieldASTs) =>
    new Promise((resolve, reject) => {
      const { first = null, skip = null, reverse = false, cursor = null } = args
      const { DB: { Event } } = context
      const projection = getProjections(fieldASTs)

      Event.find(cursor ? { date: { $gt: cursor } } : {})
        .select(projection)
        .skip(skip)
        .limit(first)
        .sort({ date: reverse ? 'desc' : 'asc' })
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
