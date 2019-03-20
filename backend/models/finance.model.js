let mongoose = require('mongoose')

let FinanceDaySchema = new mongoose.Schema({
  date: Date,
  category: Number,//minutes
  spend: Number,//minutes
})

module.exports = mongoose.model('FinanceDay', FinanceDaySchema)
