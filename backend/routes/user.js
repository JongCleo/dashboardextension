let UserModel = require('../models/user.model')
let express = require('express')
let router = express.Router()

// Create User
router.post('/user', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body is missing')
  }

  let model = new UserModel(req.body)
  model.save
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

// Get User
router.get('/user', (req, res) => {
  if(!req.query.email) {
    return res.status(400).send("Missing URL param: email")
  }

  CustomerModel.findOne({
    email: req.query.email
  })
  .then (doc => {
    res.json(doc)
  })
  .catch (err=> {
    res.stats(500).json(err)
  })
})

module.exports = router
