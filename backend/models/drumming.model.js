let mongoose = require('mongoose')

let DrummingSchema = new mongoose.Schema({
  date: Date,
  value: Number
})

module.exports = mongoose.model('Drumming', DrummingSchema)
