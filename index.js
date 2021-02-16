const express = require('express')
const app = express()
const mongoose = require('mongoose')
const http = require('http')

const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const path = require('path')
const User = require('./model/User')

dotenv.config()

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 100000
}))

app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 100000
}))

app.use(bodyParser.raw({
  limit: '50mb',
  inflate: true,
  parameterLimit: 10000
}))



mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
mongoose.connection.once('open', () => console.log('connected to db'))
  .on('error', error => { console.log('your erro', error) })

app.use(cors())



// lina t3ayet les route mete3k win dossier route
const authRoute = require('./routes/auth')

// lin tasna3 les route mte3ek  
app.use('/api/user', authRoute)

// hedha listen port ta node js  3000   "npm start" 

const server = app.listen(3000, () => console.log('server Up and running'))


