let express = require('express');
let app = express();
//var router = require('./routes/routes.js');
let path = require('path');
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
require('dotenv').config()
const server = process.env.DB_SERVER
const database = process.env.DB_DB
const user = process.env.DB_USER
const password = process.env.DB_PASS

//connect to DB
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })

app.use(bodyParser.json())

app.set()


//logger
app.use((req, res, next) => {
  console.log(`${new.Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})

//absorb routes
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
