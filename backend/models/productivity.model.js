let mongoose = require('mongoose')

let ProductivitySchema = new mongoose.Schema({
  date: Date,
  snapshot: [{
    label: String, //productive_time, neutral, distracted
    value: Number  //minutes
    }
  ]
})

module.exports = mongoose.model('Productivity', ProductivitySchema)
