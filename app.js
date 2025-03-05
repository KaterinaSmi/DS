const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const projectRouter = require('./controllers/projects')

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
// LATER app.use(express.static('dist'))


//controllers
app.use('/api/projects', projectRouter)

//middleware

module.exports = app