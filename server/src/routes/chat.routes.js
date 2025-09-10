const express = require('express')
const protectRoutes = require('../middleware/protectroutes')
const chatController = require('../controller/chat.controller')
const routes = express.Router()

routes.post('/',protectRoutes,chatController)
module.exports = routes