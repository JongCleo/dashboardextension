let mongoose = require('mongoose')

let ExerciseSchema = new mongoose.Schema({
  date: Date,
  value: Number
})

module.exports = mongoose.model('Exercise', ExerciseSchema)
