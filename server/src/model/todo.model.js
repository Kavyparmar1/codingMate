const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
        
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false 
    },
    imp:{
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model('Todo', todoSchema)

module.exports = todoModel
