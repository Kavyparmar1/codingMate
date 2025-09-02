  const userModel = require('../model/user.model');
  const bcrypt = require('bcrypt')
  const jwt  = require('jsonwebtoken');
  const { sendEmail, welcomeEmail } = require('../middleware/sendemail');



  async function registerController(req, res){
    const { username , email , role , password} = req.body;

  try {
        const existingUser = await userModel.findOne({
      email
    })
    if(existingUser){
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashPassword = await bcrypt.hash(password,10)

    const verficationToken= Math.floor(100000 + Math.random() * 900000).toString()
    const user = await userModel.create({
      username, 
      email,
      role,
      password:hashPassword,
      verficationToken,
      verficationTokenExpiresAt:Date.now() + 24 * 60 * 60 * 1000
    })
    
    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET)

    res.cookie("token",token)
  await sendEmail(user.email,verficationToken)
  
    res.status(201).json({ message: 'User registered successfully',user });
  } catch (error) {

      res.status(500).json({ message: 'Internal server error', error: error    });
  }


  }

  async function loginController(req, res){
    const { email , password} = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { 
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token);
        res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  async function verifyEmailController(req,res) {
    try {
      const {code}  = req.body
      const user = await userModel.findOne({
        verficationToken:code,
        verficationTokenExpiresAt:{$gt:Date.now()}
      })
      if (!user) {
              return res.status(400).json({success:false,message:"Inavlid or Expired Code"})
                  
              }
                user.isVerified=true;
      user.verficationToken=undefined;
      user.verficationTokenExpiresAt=undefined;
      
      await user.save()
      
      await welcomeEmail(user.email,user.username)
          return res.status(200).json({success:true,message:"Email Verifed Successfully"})
    } catch (error) {
        return res.status(400).json({success:false,message:"internal server error"})
    }
  }
  module.exports = {
      registerController,
      loginController,
      verifyEmailController
  }