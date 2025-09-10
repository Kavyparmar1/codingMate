import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
const Pomodoro = () => {
  const [timer, setTimer] = useState(1500); // 25 min
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const navigate =  useNavigate()

  useEffect(() => {
    let interval;

    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timer === 0) {
      // ✅ Timer khatam hone pe session toggle
      if (isBreak) {
        // Break khatam → Work shuru
        setIsBreak(false);
        setTimer(1500); // 25 min
      } else {
        // Work khatam → Break shuru
        setIsBreak(true);
        setTimer(300); // 5 min
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timer, isBreak]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
   <>
   <span onClick={()=>navigate(-1)} className=" absolute top-4 right-5 bg-red-600 text-white rounded-xl text-2xl px-8 py-2 cursor-pointer ">Back</span>
    <div className="h-screen flex flex-col gap-5 items-center justify-center">
      <div className="h-[40vh] flex flex-col justify-center items-center p-10 w-[30vw] rounded-2xl bg-pink-300">
        <h2 className="text-2xl font-bold mb-4">
          {isBreak ? "Break Time ☕" : "Work Time 💻"}
        </h2>
        <h1 className="text-8xl">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>

      <div className="flex gap-5">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 px-5 py-2 rounded-xl text-white"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-yellow-500 px-5 py-2 rounded-xl text-white"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setIsBreak(false);
            setTimer(1500); // reset to work session
          }}
          className="bg-red-500 px-5 py-2 rounded-xl text-white"
        >
          Reset
        </button>
      </div>
    </div>
   </>
  );
};

export default Pomodoro;
