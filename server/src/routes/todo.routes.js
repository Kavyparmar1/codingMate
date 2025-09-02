const express = require('express')
const routes = express.Router()
const todoController = require('../controller/todo.controller')
const protectRoutes = require('../middleware/protectroutes')

routes.post('/create', protectRoutes ,todoController.createTodo)
routes.get('/read', protectRoutes ,todoController.readTodo)
routes.patch('/update/:id', protectRoutes ,todoController.updateTodo)
routes.delete('/delete/:id', protectRoutes ,todoController.deleteTodo)

module.exports = routes