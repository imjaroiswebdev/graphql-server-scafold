const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const options = {
  useMongoClient: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  options
)

const { connection } = mongoose

connection.on('close', () => {
  console.log('Connection with MongoDB closed')
  process.exit(0)
})

module.exports = mongoose
