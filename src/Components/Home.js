import React, { useEffect, useState } from 'react';
import RestaurantCard from '../Utils/RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import { filterData } from '../Utils/Helper';
import { useOnline } from '../Utils/useOnline';
import offline_img from "../assets/offline.png";

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const swiggy_api_URL =
  "https://corsproxy.org/?" +
  encodeURIComponent(
    "https://www.swiggy.com/dapi/restaurants/list/v5?"
  );

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          getRestaurants(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.error('Error getting current location:', error);
          // Handle error, maybe show a default location
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle case where geolocation is not supported
    }
  }, []);

  async function getRestaurants(lat, lng) {
    try {
      // const data = await fetch(`${swiggy_api_URL+ `lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`}`);
      const data = await fetch(`${swiggy_api_URL+ `lat=28.753593&lng=77.4916239&page_type=DESKTOP_WEB_LISTING`}`);
      const json = await data.json();
      console.log(json);

      const list = json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants;
      console.log(list);
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

  const isOnline = useOnline();

  if (!isOnline) {
    return (
      <>
      <div className='m-20'>
        <h1 className='text-xl font-bold flex justify-center '>
          🔴 Offline, please check your internet connection!
        </h1>
        <img
          className='w-80 h-80 object-cover rounded-full shadow-md mx-auto'
          src={offline_img}
          alt='Error'
        />
        </div>
      </>
    );
  }
  
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
        ) : filteredRestaurants?.length === 0 ? (
          <h1 className='text-2xl font-bold text-center'>No Restaurants Found</h1>
        ) : (
          filteredRestaurants?.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
              <RestaurantCard {...restaurant.info} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
