let UserModel = require('../models/user.model')
let DrummingModel = require('../models/drumming.model')
let ExerciseModel = require('../models/exercise.model')
let FastingModel = require('../models/fasting.model')
let KoreanModel = require('../models/korean.model')
let MeditateModel = require('../models/meditate.model')
let request = require('request')
let async = require('async')
config = require('../config.json');

// CREATE productivity dash data
exports.habits_create = function(req, res) {

  // Pull initial batch RT data and properly format
  request('https://api.sheety.co/7c77b402-61f7-49ff-9385-c64e93aca74a',
  function (error, response, body) {
    var habitdata = {
      korean: [],
      exercise: [],
      meditate: [],
      fasting: [],
      drumming: []
    };

    // Make Sheety --> Mongoose Friendly
    JSON.parse(body).forEach(function(item) {
      habitdata.korean.push({
        date: item.week,
        value: item.korean
      })
      habitdata.exercise.push({
        date: item.week,
        value: item.workout
      })
      habitdata.meditate.push({
        date: item.week,
        value: item.meditate
      })
      habitdata.fasting.push({
        date: item.week,
        value: item.timeRestrictedEating
      })
      habitdata.drumming.push({
        date: item.week,
        value: item.drumming
      })
    })

    async.parallel({
      drumming: function(callback){
        DrummingModel.create(habitdata.drumming, function(err, items){
          var just_object_ids = []
          items.forEach(function(item){
            just_object_ids.push(item['_id'])
          })

          UserModel.findOneAndUpdate(
            {email: req.session.email},
            {
              "$push": {
                "graph_order": {
                  "graph_name":"drumming"
                },
                "drumming.data": {
                  "$each" : just_object_ids
                }
              }
            }).then (doc => {callback(null, '')})
        })
      },
      fasting: function(callback){
        FastingModel.create(habitdata.fasting, function(err, items){
          var just_object_ids = []
          items.forEach(function(item){
            just_object_ids.push(item['_id'])
          })

          UserModel.findOneAndUpdate(
            {email: req.session.email},
            {
              "$push": {
                "graph_order": {
                  "graph_name":"fasting"
                },
                "fasting.data": {
                  "$each" : just_object_ids
                }
              }
            }).then (doc => {callback(null, '')})
        })
      },
      exercise: function(callback){
        ExerciseModel.create(habitdata.exercise, function(err, items){
          var just_object_ids = []
          items.forEach(function(item){
            just_object_ids.push(item['_id'])
          })

          UserModel.findOneAndUpdate(
            {email: req.session.email},
            {
              "$push": {
                "graph_order": {
                  "graph_name":"exercise"
                },
                "exercise.data": {
                  "$each" : just_object_ids
                }
              }
            }).then (doc => {callback(null, '')})
        })
      },
      korean: function(callback){
        KoreanModel.create(habitdata.korean, function(err, items){
          var just_object_ids = []
          items.forEach(function(item){
            just_object_ids.push(item['_id'])
          })

          UserModel.findOneAndUpdate(
            {email: req.session.email},
            {
              "$push": {
                "graph_order": {
                  "graph_name":"korean"
                },
                "korean.data": {
                  "$each" : just_object_ids
                }
              }
            }).then (doc => {callback(null, '')})
        })
      },
      meditate: function(callback){
        MeditateModel.create(habitdata.meditate, function(err, items){
          var just_object_ids = []
          items.forEach(function(item){
            just_object_ids.push(item['_id'])
          })

          UserModel.findOneAndUpdate(
            {email: req.session.email},
            {
              "$push": {
                "graph_order": {
                  "graph_name":"meditate"
                },
                "meditate.data": {
                  "$each" : just_object_ids
                }
              }
            }).then (doc => {callback(null, '')})
        })
      }
    }, function(err, results){
      res.redirect('/settings')
    })
  })// end sheety request
}

// DELETE productivity dash data
exports.habits_delete = function(req, res) {
  UserModel.findOneAndUpdate(
    {email: req.session.email},
    {
      "$pull": {
        "graph_order": {
          "graph_name":{
            "$in":["drumming","exercise","fasting","korean","meditate"]
          }
        }
      },
      "$set": {
        "drumming.data": [],
        "exercise.data": [],
        "fasting.data": [],
        "korean.data": [],
        "meditate.data": []
      }
    })
    .then (doc => {
      //return to a page
      res.redirect('/settings')
    })
    .catch (err=> {res.stats(500).json(err)})
}
