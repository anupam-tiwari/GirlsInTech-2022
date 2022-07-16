import React from 'react'
import Navbar from '../components/Navbar'
import landing from '../assets/landing.jpeg'

const Home = () => {
  return (
    <div>
        <Navbar></Navbar>
        <div className='flex justify-center'>
          <img src={landing}></img>
        </div>
    </div>
  )
}

export default Home