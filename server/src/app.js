const express = require('express')
const app = express()
const authRoutes = require('./routes/auth.route')
const cookie = require('cookie-parser')


app.use(express.json())
app.use(cookie())
app.use('/api/auth',authRoutes)
module.exports = app