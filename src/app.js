const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

const zoomRoutes = require('./routes/zoom')
app.use('/zoom', zoomRoutes)

module.exports = app
