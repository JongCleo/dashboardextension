let mongoose = require('mongoose')

let SleepSchema = new mongoose.Schema({
  date: Date,
  steps: Number,//minutes
  spend: Number
})

module.exports = mongoose.model('Sleep', SleepSchema)
