let express = require('express')
let app = express()
let path = require('path')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')

let userRoute = require('./routes/user.routes')
let authRoute = require('./routes/auth.routes')

require('dotenv').config()

//////////////////////////////connect to DB
const server = process.env.DB_SERVER
const database = process.env.DB_DB
const user = process.env.DB_USER
const password = process.env.DB_PASS
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })

////////////////////////////// Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(express.static('public'))

////////////////////////////// Routes
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
});

app.use(userRoute)
app.use(authRoute)

app.use((req, res, next) => {
  res.status(404).send('404, We think you are lost')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
