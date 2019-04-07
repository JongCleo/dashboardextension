let mongoose = require('mongoose')

let SleepSchema = new mongoose.Schema({
  date: Date,
  snapshot:[
    {
      label: String,
      value: Number
    }
  ]
})

module.exports = mongoose.model('Sleep', SleepSchema)
