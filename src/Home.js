import React from 'react'
import RestaurantCard from './RestaurantCard'

const Home = () => {
  return (
    <>
    <div>
      <h1 className='text-2xl font-bold text-center'>Top Restaurants</h1>
    </div>
    <div className='flex flex-wrap p-4 justify-center gap-2'>
      <RestaurantCard/>

    </div>
    </>
  )
}

export default Home