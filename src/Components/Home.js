import React, { useEffect, useState } from 'react';
import RestaurantCard from '../Utils/RestaurantCard';
import Shimmer from './Shimmer';
import { Link, useNavigate } from 'react-router-dom';
import { filterData } from '../Utils/Helper';
import { useOnline } from '../Utils/useOnline';
import offline_img from "../assets/offline.png";
import { restaurantList } from '../config';
import axios from 'axios';
import heroImg from '../assets/hero.png';
import {backend_url} from '../config';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [allrestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState();

  axios.defaults.withCredentials = true;
  let firstRender = true;

  const authUser = async () => {
    await axios
      .get(`${backend_url}/api/users/auth_user`)
      .then((response) => {
        if (response.data.authUser) {
          setUser(response.data.user_id);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };

  const refresh = async () => {
    await axios
      .get(`${backend_url}/api/users/refresh`)
      .then((response) => {
        if (response.data.refresh) {
          setUser(response.data.user_id);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      authUser();
    }
    let interval = setInterval(() => {
      refresh();
    }, 1000 * 60 * 60 * 24 * 7);

    return () => clearInterval(interval);
  }, []);

  async function getRestaurants() {
    try {
      setAllRestaurants(restaurantList);
      setFilteredRestaurants(restaurantList);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRestaurants();
  }, []);

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
      <div className='m-20'>
        <h1 className='text-xl font-bold flex justify-center'>
          🔴 Offline, please check your internet connection!
        </h1>
        <img
          className='w-80 h-80 object-cover rounded-full shadow-md mx-auto'
          src={offline_img}
          alt='Error'
        />
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">Discover & Enjoy: Your Favorite Restaurants!</h1>
            <p className="p-regular-20 md:p-regular-24">
              Explore a variety of cuisines and dining experiences with our extensive list of restaurants.
            </p>
            <a href='#restaurants'>
              <button className="bg-orange-600 hover:bg-orange-500 text-white rounded-full px-4 py-2 w-full sm:w-auto text-sm sm:text-base">
                Explore Now
              </button>
            </a>
          </div>
          <img
            src={heroImg}
            alt="hero"
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] lg:ml-40"
          />
        </div>
      </section>

      <section id="restaurants" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Discover Top Restaurants</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <input
            type='text'
            className='w-full md:w-80 outline-none border border-red-700 caret-orange-500 p-2 rounded-lg text-slate-800 focus:border-orange-500 transition duration-300 mb-4 md:mb-0'
            placeholder='Search...'
            value={searchText}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-row flex-wrap  justify-center items-center'>
          {isLoading ? (
            <Shimmer />
          ) : filteredRestaurants.length === 0 ? (
            <h3 className="h3-bold p-72">No restaurants found</h3>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id}>
                <RestaurantCard {...restaurant.info} />
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
