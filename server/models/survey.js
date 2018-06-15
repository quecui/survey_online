const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const surveySchema = new Schema({
	name: { type: String, require: true, unique: true },
  time: { type: Date, require: true },
  target: { type: Number, require: true },
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page'}]
})

module.exports = mongoose.model('Survey', surveySchema, 'survey')
