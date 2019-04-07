let mongoose = require('mongoose')

let KoreanSchema = new mongoose.Schema({
  date: Date,
  value: Number
})

module.exports = mongoose.model('Korean', KoreanSchema)
