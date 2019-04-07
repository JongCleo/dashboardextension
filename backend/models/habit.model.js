let mongoose = require('mongoose')

let HabitSchema = new mongoose.Schema({
  date: Date,
  snapshot: [
    {
      label: String,
      value: Number
    }
  ]
})

module.exports = mongoose.model('Habit', HabitSchema)
