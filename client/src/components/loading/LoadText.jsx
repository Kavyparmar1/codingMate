
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, {  useRef, useState } from 'react'

const LoadText = () => {
  
   const loaderWhite = useRef(null)
   const loaderWhite1 = useRef(null)

    useGSAP(()=>{
        gsap.to(loaderWhite.current,{
            color:"black",
            duration:5,
            delay:1,
            ease:"power2.inOut",
            y:-1000
        })
    })
    useGSAP(()=>{
      gsap.to(loaderWhite1.current,{
          color:"black",
          duration:5,
          delay:1,
          ease:"power2.inOut",
          y:-1000
      })
  })
    let loader100 = document.querySelector('h4')
    let widthStyle = document.querySelector('.loadingdiv')
    const [loaderCount, setloaderCount] = useState(0)
      setTimeout(() => {
           loaderCount < 100 && setloaderCount(loaderCount + 1)
           widthStyle.style.width = `${loaderCount}%`
           loader100.innerText = `${loaderCount}%`
          
      }, 20)
  return (
    
    <>
    <div className='h-2 rounded-xl w-full bg-black fixed'>
        <div  className='loadingdiv h-full w-10 rounded-xl bg-white'></div>
    </div>
    <div className='flex items-center flex-col justify-center h-full bg-black text-white'>
         <h1 ref={loaderWhite} className='hero font-[hero] text-6xl'>Igniting Productivity Mode...</h1>
          <br />
          <h4 ref={loaderWhite1} className='text-2xl'>00%</h4>
    </div>
    </>
  )
}

export default LoadText