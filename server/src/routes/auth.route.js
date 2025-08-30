const express = require('express')
const routes = express.Router()
const authController = require('../controller/auth.controller')

routes.post('/register',authController.registerController)
routes.post('/login',authController.loginController)
routes.post('/verifyemail',authController.verifyEmailController)

module.exports = routes