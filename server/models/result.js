const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const resultSchema = new Schema({
  survey_id: { type: Schema.Types.ObjectId, require: true, ref: 'Survey'},
  data: { type: String, require: true }
})

module.exports = mongoose.model('Result', resultSchema, 'result')