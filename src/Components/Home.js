import React, { useEffect, useState } from 'react';
import RestaurantCard from '../Utils/RestaurantCard';
import Shimmer from './Shimmer';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6691565&lng=77.45375779999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const json = await data.json();

      const list = json?.data?.cards[5]?.card.card.gridElements.infoWithStyle.restaurants;
      // console.log(list);
      setAllRestaurants(list);
      setFilteredRestaurants(list);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const searchTextValue = e.target.value;
    setSearchText(searchTextValue);
    const data = filterData(searchTextValue, allrestaurants);
    setFilteredRestaurants(data);
  
    if (searchTextValue.length === 0) {
      setFilteredRestaurants(allrestaurants);
    }
  };
  

  const filterData = (searchText, restaurants) => {
    return restaurants.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <>
      <div className='flex items-center justify-left ml-20 space-x-4 p-4'>
        <input
          type='text'
          className='w-80 outline-none border border-red-700 caret-orange-500 p-2 rounded-lg text-slate-800 focus:border-orange-500 transition duration-300'
          placeholder='Search...'
          value={searchText}
          onChange={handleChange}
        />
      </div>

      <div>
        <h1 className='text-2xl font-bold text-center'>Top Restaurants</h1>
      </div>
      <div className='flex flex-wrap p-4 justify-center gap-2'>
        {isLoading ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <h1 className='text-2xl font-bold text-center'>No Restaurants Found</h1>
        ) : (
          <RestaurantCard restaurants={filteredRestaurants} />
        )}
      </div>
    </>
  );
};

export default Home;
