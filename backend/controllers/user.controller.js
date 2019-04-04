let UserModel = require('../models/user.model')

////////////////////////////////////////////////// CREATE user on new app signup
exports.user_create = function(req, res) {
  console.log('ohyeah')
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  // does mongo check for dupes?
  let model = new UserModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}


//////////////////////////////////////////////// GET user Settings
exports.user_settings_get = function(req, res) {
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
}


//////////////////////////////////////////////// GET all dashboard data
exports.dashboard_data_get = function(req, res) {
  /*
  {
    graphs : [
    {
      graph_type: "productivity".
      data: [
      {
        label: "productive_time":
        value: "10"
      },
      {
        label: "neutral_time",
        value: "5"
      }
      ]
    },
    {
      graph_type: "fitness".
      data: [
      {
        label: "productive_time":
        value: "10"
      },
      {
        label: "neutral_time",
        value: "5"
      }
      ]
    }

  ]

  }
  */
  UserModel.findOne({
    email: req.query.email
  })
  .populate({
    path: 'productivity.data',
    match : { date: req.query.date }
  })
  .select("graph_order productivity.data")
  .exec(function(error, document) {

    var n = document.graph_order.length;
    var response = [];
    for (var i = 0; i < n; i++) {
        response.push({
          graph_type: document.graph_order[i].graph_name,
          data: document[document.graph_order[i].graph_name].data
        })
    }

    res.send(response)
  })
}
