let UserModel = require('../models/user.model')

////////////////////////////////////////////////// CREATE user on new app signup
exports.user_create = function(req, res) {

  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + (d.getDate()-1),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  req.session.email = req.body.email
  req.session.name = req.body.name

  let model = new UserModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.redirect("/api/user/alldata"+"?date="+[year, month, day].join('-'))
    })
    .catch(err => {

      res.redirect("/api/user/alldata"+"?date="+[year, month, day].join('-'))
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
  UserModel.findOne({
    email: req.session.email
  })
  .populate({
    path: 'productivity.data',
    match : { date: req.query.date}
  })
  .select("graph_order productivity.data sleep.data")
  .exec(function(error, document) {
    if (document != null){
      var n = document.graph_order.length;
      var response = [];
      for (var i = 0; i < n; i++) {
          response.push({
            graph_type: document.graph_order[i].graph_name,
            data: document[document.graph_order[i].graph_name].data
          })
      }
      res.send(response)
    }
    else {
      res.send("nothing!")
    }
  })
}

//////////////////////////////////////////////// DELETE a dashboard
exports.dashboard_delete = function(req, res) {
  res.send("NOT yet implemented");
}
