let mongoose = require('mongoose')

let MeditationDaySchema = new mongoose.Schema({

  date: Date,
  meditation_time: Number//minutes
})

module.exports = mongoose.model('MeditationDay', MeditationDaySchema)
