let express = require('express')
let app = express()
let userRoute = require('./routes/user')
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
require('dotenv').config()

//connect to DB
const server = process.env.DB_SERVER
const database = process.env.DB_DB
const user = process.env.DB_USER
const password = process.env.DB_PASS
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })

//logger
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})

// Middleware
app.use(bodyParser.json())
app.use(userRoute)
app.use(express.static('public'))

// Handler for 404 resource not found
app.use((req, res, next) => {
  res.status(404).send('404, We think you are lost')
})

// Handler for 500 Internal server error
app.use((err, req, res, next) => {
  console.error(err.stack)
  // move up relative to index.html
  //res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
