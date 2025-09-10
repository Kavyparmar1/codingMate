const express = require('express')
const app = express()
const authRoutes = require('./routes/auth.route')
const todoRoutes = require('./routes/todo.routes')
const chatRoutes = require('./routes/chat.routes')
const cookie = require('cookie-parser')
const protectRoutes = require('./middleware/protectroutes')
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookie())
app.use('/api/auth',authRoutes)
app.use('/api/todo',todoRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/protect',protectRoutes)
module.exports = app