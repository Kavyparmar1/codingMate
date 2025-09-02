import React, { useState } from 'react'
import { set, useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signup = () => {

const navigate = useNavigate()
  
   
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()
    const formHandler = async (data) => {
       
      const user = {
        username:data.username,
        email:data.email,
        role:data.role,
        password:data.password
      }
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register",
      {username:user.username,
      email:user.email,
      role:user.role,
      password:user.password},
      {withCredentials:true})

      if(response.status===201 || response.status===200){
        navigate('/verify')
        alert(response.data.message);
        
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
      
        reset()
        
         }
         
  return (
    <div className='flex items-center justify-center h-screen bg-amber-50'>
          <div className='h-[60vh] rounded-2xl rounded-tr-none  rounded-r-none outline-white w-[30vw] flex  bg-pink-300'>
            <img className='rounded-2xl rounded-tr-none  rounded-r-none object-cover w-full object-center ' src="https://plus.unsplash.com/premium_photo-1671221672998-bab0510cfa57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGluayUyMGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D" alt="" />
          </div>
          <div className='h-[60vh] rounded-2xl flex justify-center items-center rounded-tl-none rounded-bl-none w-[30vw]  bg-[#D1A6B0]'>
            <form onSubmit={handleSubmit(formHandler)} className='flex flex-col w-[80%] items-center justify-center' >
                 <input type="text" {...register("username")} required placeholder='username'   className='border-2 text-[#8E414F] h-10 m-5 outline-white border-[#8E414F] w-full p-2 rounded-md' />
             <input type="email" {...register("email")} required placeholder='email' className='border-2 text-[#8E414F] h-10 m-5 outline-white border-[#8E414F] w-full p-2 rounded-md' />
               
               <select {...register("role")} required className='border-2 text-[#8E414F] h-10 m-5 outline-white border-[#8E414F] w-full p-2 rounded-md'>
                   <option value="">Select Role</option>
                   <option  value="student">student</option>
                   <option value="developer">developer</option>
               </select>
               <input type="password" required {...register("password")} placeholder='password' className='border-2 text-[#8E414F] h-10 m-5 outline-white border-[#8E414F] w-full p-2 rounded-md' />
             <button className='bg-[#8E414F] text-white h-10 m-5 w-full rounded-md'>submit</button>  
          </form>
           </div>
         
     </div>
  )
}

export default Signup