const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{ 
        type:String, 
        enum:['student','developer'],
        required:true
    },
    password:{
        type:String,
        required:true
    },
      isVerified:{
        type:Boolean,
        default:false
    },
      verficationToken:String,
    verficationTokenExpiresAt:Date,
},{timestamps:true})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel