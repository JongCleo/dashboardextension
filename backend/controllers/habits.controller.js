let UserModel = require('../models/user.model')
let HabitsModel = require('../models/habits.model')
let request = require('request')
config = require('../config.json');

// CREATE productivity dash data
exports.habits_create = function(req, res) {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  // Pull initial batch RT data and properly format
  request('https://www.rescuetime.com/anapi/daily_summary_feed?key=' + config.RT_API,
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

    // Create productivity data then store refs in user obj
    ProductivityModel.create(corrected_data, function(err, productivities){
      var just_object_ids = []
      productivities.forEach(function(item){
        just_object_ids.push(item['_id'])
      })

      UserModel.findOneAndUpdate(
        {email: req.session.email},
        {
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
          //return to a page
          res.redirect('/settings')
        })
        .catch (err=> {res.stats(500).json(err)})
    })
  })
}

// DELETE productivity dash data
exports.habits_delete = function(req, res) {
  // UserModel.findOneAndUpdate(
  //   {email: req.session.email},
  //   {
  //     "$pull": {
  //       "graph_order": {
  //         "graph_name":"productivity"
  //       }
  //     },
  //     "$set": {
  //       "productivity.data": []
  //     }
  //   })
  //   .then (doc => {
  //     //return to a page
  //     res.redirect('/settings')
  //   })
  //   .catch (err=> {res.stats(500).json(err)})
}
