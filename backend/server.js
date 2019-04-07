let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let session = require("express-session")
let cors = require('cors')
let cookieParser = require('cookie-parser')
let routes = require('./routes/index.routes')


require('dotenv').config()

//////////////////////////////connect to DB
const server = process.env.DB_SERVER
const database = process.env.DB_DB
const user = process.env.DB_USER
const password = process.env.DB_PASS
mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`, { useNewUrlParser: true })

////////////////////////////// Middleware

app.set('view engine', 'ejs');
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({ secret:"birdseye", resave:false, saveUninitalized: true}))
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

////////////////////////////// Routes
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
});

app.use(routes)

app.use((req, res, next) => {
  res.status(404).send('404, We think you are lost')
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))
