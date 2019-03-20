let mongoose = require('mongoose')

let MeditationSchema = new mongoose.Schema({
  date: Date,
  meditation_time: Number//minutes
})

module.exports = mongoose.model('Meditation', MeditationSchema)
