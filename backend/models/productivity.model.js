let mongoose = require('mongoose')

let ProductivitySchema = new mongoose.Schema({
  date: Date,
  productive_time: Number,//minutes
  neutral_time: Number,//minutes
  distracted_time: Number,//minutes
})

module.exports = mongoose.model('Productivity', ProductivitySchema)
