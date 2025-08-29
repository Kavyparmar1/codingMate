import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LoadText from '../components/loading/LoadText';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
const Home = () => {
  const loading = useRef(null)

  useGSAP(()=>{
    gsap.to(loading.current,{
      opacity:0,
      delay:2,
      duration:4,
      y:-1000,
      ease:"power2.inOut"
    })
  })
  return (
     
    

  <>
    <div ref={loading} className='h-screen w-full bg-black '>
      <LoadText />
    </div>
    <div className='h-screen w-full bg-white z-[-9] absolute top-0'>
         <Navbar />
          <Hero />
          
    </div>
  </>
  )
}

export default Home