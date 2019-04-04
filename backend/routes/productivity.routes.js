let UserModel = require('../models/user.model')
let ProductivityModel = require('../models/productivity.model')
let express = require('express')
let router = express.Router()
let request = require('request')
let moment = require('moment')


router.get('/productivity', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send("Missing URL param: email")
  }
  console.log(req.query.date)
  UserModel.findOne({
    email: req.query.email
  })
  .populate({
    path: 'productivity.data',
    match : { date: req.query.date }
  })
  .exec(function(error, document) {
    res.json(document)
  })
})

// first time connect Rescue Time
router.post('/productivity', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  // reformat Rescutetime data
  request('https://www.rescuetime.com/anapi/daily_summary_feed?key=' + req.body.api_key,
  function (error, response, body) {
    var corrected_data = [];

    JSON.parse(body).forEach(function(item) {
      corrected_data.push({
        date: item.date,
        snapshot: [{
          label: "productive_time",
          value: (item.productive_hours + item.very_productive_hours).toFixed(2)
        },
        {
          label: "neutral_time",
          value: (item.neutral_hours).toFixed(2),
        },
        {
          label: "distracted_time",
          value: (item.very_distracting_hours + item.distracting_hours).toFixed(2)
        }]
      })
    })

    ProductivityModel.create(corrected_data, function(err, productivities){
      var just_object_ids = []
      productivities.forEach(function(item){
        just_object_ids.push(item['_id'])
      })

      UserModel.findOneAndUpdate(
        {email: req.body.email},
        {
          "$set": {
            "productivity.api_key": req.body.api_key
          },
          "$push": {
            "graph_order": {
              "graph_name":"productivity"
            },
            "productivity.data": {
              "$each" : just_object_ids
            }
          }
        })
        .then (doc => {
          res.json(doc)
        })
        .catch (err=> {
          res.stats(500).json(err)
        })
      })
    })//end request
  })

module.exports = router
