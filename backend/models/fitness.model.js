let mongoose = require('mongoose')

let FitnessSchema = new mongoose.Schema({
  date: Date,
  steps: Number,//minutes
  spend: Number
})

module.exports = mongoose.model('Fitness', FitnessSchema)
