const { complectEMail } = require("../middleware/sendemail")
const todoModel = require("../model/todo.model")
const userModel = require("../model/user.model")

async function createTodo(req,res) {
 const {title,description,completed,imp} = req.body
  const user = req.user

 try {
    const todo = await todoModel.create({
       user:user._id,
        title,
        description,
        completed,
        imp
    })
    res.status(201).json({message:'Todo created successfully',todo})
 } catch (error) {
    res.status(500).json({message:'Internal server error',error:error.message})
 }

}

async function readTodo(req,res) {
    const user = req.user
    try {
       const todo = await todoModel.find({ user: user._id })

       console.log(todo);
       
         res.status(200).json({message:'Todo fetched successfully',todo})
    } catch (error) {
        res.status(500).json({message:'Internal server error',error:error.message})
    }
}

async function updateTodo(req,res) {
    const { title , description } = req.body
    const {id} = req.params
    try {
        const todo = await todoModel.findByIdAndUpdate(id,{ title , description },{ new: true })
        if (!todo) {
            return res.status(404).json({message:'Todo not found'})
        }
        res.status(200).json({message:'Todo updated successfully',todo})
    } catch (error) {
        res.status(500).json({message:'Internal server error',error:error.message})
    }
}

async function deleteTodo(req,res) {
     const user = req.user
    const {id} = req.params
  const users = await userModel.findOne(user)
  
  
    try {
        const todo = await todoModel.findById(id)
        
        
         if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }   

      todo.completed=true
        if (!todo.completed) {
      return res
        .status(400)
        .json({ message: "Todo is not completed, cannot delete" });
    }

    await todoModel.findByIdAndDelete(id) 
     res.json({ message: "Todo deleted successfully" }); 
    await complectEMail(user.email,user.username,todo.title)
    } catch (error) {
        return res.status(500).json({message:'Internal server error',error:error.message})
    }
}
module.exports = {createTodo,readTodo,updateTodo,deleteTodo}