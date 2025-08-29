import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import todo from '../pages/todo'
import Pomodoro from '../pages/Pomodoro'
import Dailygoal from '../pages/Dailygoal'

const Mainroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/todo' element={<todo/>} />
            <Route path='/pomodoro' element={<Pomodoro/>} />
            <Route path='/goals' element={<Dailygoal/>} />
            
        </Routes>
    </div>
  )
}

export default Mainroutes