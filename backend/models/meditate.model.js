let mongoose = require('mongoose')

let MeditateSchema = new mongoose.Schema({
  date: Date,
  value: Number
})

module.exports = mongoose.model('Meditate', MeditateSchema)
