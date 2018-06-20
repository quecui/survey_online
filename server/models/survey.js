const mongoose = require('mongoose')

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const surveySchema = new Schema({
	name: { type: String, require: true },
  time: { type: Date, require: true },
  target: { type: Number, require: true },
  star: { type: Number, require: true },
  active: { type: Boolean, require: true , default: false},
  complete: { type: Number, require: true , default: 0},
  checkHaftTime: { type: Number, require: true , default: 0},
  checkHaftTarget: { type: Number, require: true , default: 0},
  datePublish: { type: Date, require: false},
  pages: [{ type: Schema.Types.ObjectId, ref: 'Page'}]
})

module.exports = mongoose.model('Survey', surveySchema, 'survey')
