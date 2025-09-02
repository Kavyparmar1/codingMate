import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero2 = () => {
   const navHandler =  useNavigate()
  
  return (
    <div  className='h-screen w-70 flex flex-col gap-20 p-20 items-center justify-start fixed bg-green-300 z-50' >
        <span onClick={ ()=>{navHandler('/todo')}} className='cursor-pointer text-center bg-pink-300 p-2 rounded-xl w-40 '>TODO-LIST</span>
        <span  onClick={ ()=>{navHandler('/pomodoro')}} className='text-center bg-pink-300 p-2 rounded-xl w-40 '>POMODORO TIMER</span>
        <span   onClick={ ()=>{navHandler('/dailygoals')}} className='text-center bg-pink-300 p-2 rounded-xl w-40 '>DAILY GOALS</span>
        <span  onClick={ ()=>{navHandler('/quotes')}} className='text-center bg-pink-300 p-2 rounded-xl w-60 '>MOTIVATIONAL QUOTES</span>
        <span  onClick={ ()=>{navHandler('/comingsoon')}} className='text-center bg-pink-300 p-2 rounded-xl w-40 '>Coming soon...</span>

    </div>
  )
}

export default Hero2