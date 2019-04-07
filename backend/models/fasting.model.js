let mongoose = require('mongoose')

let FastingSchema = new mongoose.Schema({
  date: Date,
  value: Number
})

module.exports = mongoose.model('Fasting', FastingSchema)
