let UserModel = require('../models/user.model')
let express = require('express')
let router = express.Router()

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

//update user options
router.get('/user', (req, res) => {
  
})


// create a service connection
// populate options with 3 months of histroy

// update a service connection

// delete a service connection

// get active services @ this date + the grid order


module.exports = router
