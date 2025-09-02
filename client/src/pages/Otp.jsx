import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Otp = () => {
  const [data, setdata] = useState(null)
const navigate = useNavigate()
  
   
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()
    const formHandler = async (data) => {
       
      const user = {
        code:data.otp
      }
      console.log(user);
      
    try {
      const response = await axios.post("http://localhost:3000/api/auth/verifyemail",
     user ,
      {withCredentials:true})

      if(response.status===201 || response.status===200){
        navigate('/login')
        alert(response.data.message);
        
      }
    } catch (error) {
      alert(error.response.data.message);
      
    }
      
        reset()
        
         }
  return (
     <div className='flex items-center justify-center h-screen bg-amber-50'>
          <div className='h-[60vh] justify-center  rounded-xl outline-white w-[60vw] flex  bg-pink-300'>
         <form onSubmit={handleSubmit(formHandler)} className='w-[40%] flex flex-col items-center justify-center'>
            <input type="text" {...register("otp")} required placeholder='Enter OTP' className='border-2 text-[#8E414F] h-10 m-5 outline-white border-[#8E414F] w-full p-2 rounded-md' />
            <button className='otp bg-[#8E414F] text-white h-10  w-[30%] rounded-md '  >submit</button>
         </form>
          </div>
         
         
     </div>
  )
}

export default Otp