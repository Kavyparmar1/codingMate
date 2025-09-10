const chatModel = require("../model/chat.model")
const userModel = require("../model/user.model")

async function chatController(req,res) {
   try {
    const {title} = req.body
   const user = req.user
  if(!title){
  return  res.status(400).json({
        message:"title is required for chat"
    })
  }
  const chat = await chatModel.create({
      chatId:user._id,
      title
  }) 
  res.status(201).json({
    message:"chat is ready",
    chat
  })
   } catch (error) {
        res.status(401).json({
            message:error.message
           
        })
   }
}  

module.exports = chatController