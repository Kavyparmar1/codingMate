import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Todo from '../pages/todo'
import Pomodoro from '../pages/Pomodoro'
import Dailygoal from '../pages/Dailygoal'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Quotes from '../pages/Quotes'
import Otp from '../pages/Otp'

const Mainroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/todo' element={<Todo />} />
            <Route path='/pomodoro' element={<Pomodoro/>} />
            <Route path='/goals' element={<Dailygoal/>} />
            <Route path='/quotes' element={<Quotes/>} />
            {/* <Route path='/comingsoon' element={<ComingSoon/>} /> */}
            {/* <Route path='*' element={<NotFound />} /> */}
            <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/verify' element={<Otp />} />
        </Routes>
    </div>
  )
}

export default Mainroutes