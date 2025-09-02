import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  
  const navigate = useNavigate()
  const staggerNav = useRef(null)
  const staggerNav1 = useRef(null)
    useGSAP(()=>{
      gsap.to(staggerNav.current,{
       x:40,
       delay:2,
       duration:1
       
      })
        gsap.to(staggerNav1.current,{
       x:-40,
       delay:2,
       duration:1
       
      })
    })
  return (
    <div  className=' h-10 w-full flex items-center justify-between py-7  '>
          <div className='text-2xl font-[hero] ' ref={staggerNav}>codingMATE</div>
          <div ref={staggerNav1} className='flex items-center px-10 gap-10 mr-4'>
          <span onClick={()=>navigate('/signup')} className=' cursor-pointer  text-xl  border-black border-1 p-1 rounded-xl bg-pink-300  '>Signup</span>
          <span onClick={()=>navigate('/login')} className=' cursor-pointer text-xl border-black border-1 p-1 rounded-xl bg-pink-300 '>Login</span>
          </div>
    </div>
    
  )
}

export default Navbar