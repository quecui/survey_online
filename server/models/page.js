const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const pageSchema = new Schema({
  data: { type: String, require: true }
})

module.exports = mongoose.model('Page', pageSchema, 'page')
