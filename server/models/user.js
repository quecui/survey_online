const mongoose = require('mongoose')
const { hash, compare } = require('bcrypt')

mongoose.Promise = global.Promise
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: { type: String, unique: true, require: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  surveys: [{ type: Schema.Types.ObjectId, ref: 'Survey'}]
})

module.exports = mongoose.model('User', userSchema, 'user')
