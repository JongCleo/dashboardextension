let UserModel = require('../models/user.model')
let ProductivityModel = require('../models/productivity.model')
let express = require('express')
let router = express.Router()
let request = require('request')
let moment = require('moment')
// New app sign up, create User

router.post('/user', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  // does mongo check for dupes?
  let model = new UserModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0){
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// options screen, Get User details
router.get('/user', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send("Missing URL param: email")
  }

  UserModel.findOne({
    email: req.query.email
  })
  .then (doc => {
    res.json(doc)
  })
  .catch (err=> {
    res.stats(500).json(err)
  })
})



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
        productive_time: (item.productive_hours + item.very_productive_hours).toFixed(2),
        neutral_time: (item.neutral_hours).toFixed(2),
        distracted_time: (item.very_distracting_hours + item.distracting_hours).toFixed(2)
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



  /*
  // parse JSON object,
  // find the appropriate user
  // add to the graph_order
  // for each entry in reverse order?, populate histry, let date be the unique key
  */


// delete a service connection

// get active services @ this date + the grid order


module.exports = router
