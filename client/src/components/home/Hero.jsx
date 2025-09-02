import React from 'react'
import Hero2 from './Hero2'

const Hero = () => {
  return (
   <>
    <div className='h-screen w-full flex items-center justify-end p-10 fixed'>
      <div className='absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h1 className='text-center text-4xl font-thin'>
          Boost your productivity with AI🚀
        </h1>
        <br />
        <br />
        <div className='flex items-center justify-center gap-4'>
          <span className='text-2xl font-thin bg-black text-pink-300 px-4 py-2 rounded-xl'>
            AI code reviewer
          </span>
          <span className='text-2xl font-thin bg-pink-300 text-black px-4 py-2 rounded-xl'>
            AI productivity mentor
          </span>
        </div>
      </div>

      <img
        alt="pic"
        src="https://images.ctfassets.net/lzny33ho1g45/3vuLgqcfPig6ArPqs0sVpv/bec8356e301a2a81de9dabe0beb4877f/image13.png"
        className='w-80 h-72 border -rotate-12 border-black rounded-xl object-cover'
      />
    </div>
    <Hero2 />
   </>
  )
}

export default Hero
  