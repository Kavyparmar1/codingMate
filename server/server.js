require('dotenv').config()
const app = require('./src/app')
const connectDb = require('./src/config/db')
const initSocketServer = require('./src/socket/socket.server')
const httpServer = require('http').createServer(app)
connectDb() 
initSocketServer(httpServer)

httpServer.listen(3000,()=>{
    console.log("port is running...");
    
})