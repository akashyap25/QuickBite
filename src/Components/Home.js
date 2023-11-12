import React, { useState } from 'react';
import { FcSearch } from 'react-icons/fc';
import { restaurantList } from '../config';
import RestaurantCard from '../Utils/RestaurantCard';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [restaurants, setRestaurants] = useState(restaurantList);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const filterData = (searchText, restaurants) => {
    return restaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleSearch = () => {
    const data = filterData(searchText, restaurants);
    setRestaurants(data);
  };

  return (
    <>
      <div className='flex items-center justify-left ml-20 space-x-4 p-4'>
        <input
          type='text'
          className='w-32 outline-none border border-red-700 p-2 rounded-lg text-slate-800 focus:border-orange-500 transition duration-300'
          placeholder='Search...'
          value={searchText}
          onChange={handleChange}
        />
        <button
          className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300'
          onClick={handleSearch}
        >
          <FcSearch />
        </button>
      </div>
      <div>
        <h1 className='text-2xl font-bold text-center'>Top Restaurants</h1>
      </div>
      <div className='flex flex-wrap p-4 justify-center gap-2'>
        <RestaurantCard restaurants={restaurants} />
      </div>
    </>
  );
};

export default Home;
