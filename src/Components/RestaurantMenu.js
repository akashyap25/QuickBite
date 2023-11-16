import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FcRating } from 'react-icons/fc';
import { img_url } from '../config';
import MenuShimmer from '../Utils/MenuShimmer';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    try {
      const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=29.0265736&lng=77.6886853&restaurantId=${resId}`);
      const json = await data.json();

      const resInfo = json.data.cards[0]?.card?.card?.info || {};
      const menuItems = json.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || [];

      setRestaurant(resInfo);
      setMenuItems(menuItems);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant information:', error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    // Render shimmer effect while loading
    return (
      <div className='container mx-auto mt-10'>
        <h1 className='text-3xl font-bold mb-4'>Restaurant Menu</h1>
        <MenuShimmer />
      </div>
    );
  }

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-3xl font-bold mb-4'>Restaurant Menu</h1>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold mb-2'>{restaurant.name}</h2>
        <div className='flex mb-4'>
          <div className='w-full lg:w-2/3 pr-4'>
            <h3 className='text-md mt-1 overflow-hidden'>{restaurant.cuisines?.join(',')}</h3>
            <h3 className='text-md'>{restaurant.city}</h3>
          </div>
          <div className=' w-20 h-16 flex flex-col mx-auto items-center border border-slate-400 shadow-lg'>
            <div className='m-1 flex'>
              <h2 className='text-sm font-bold'>{restaurant.avgRating}</h2>
              <FcRating className='inline-block ml-1' />
            </div>
            <div className='whitespace-nowrap'>
              <h2 className=' text-xs font-extralight w-full'>{restaurant.totalRatings}+ Ratings</h2>
            </div>
          </div>
        </div>

        {menuItems.map((menu) => (
          <div key={menu.card.info.id} className='mb-8 p-4 rounded-lg shadow-lg w-full lg:w-1/2'>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-2/3 pr-4'>
                <h2 className='text-2xl font-semibold'>{menu.card.info.name}</h2>
                <p className='text-sm text-gray-600 mb-4'>{menu.card.info.description}</p>
                <p className='text-xl font-semibold'>₹{menu.card.info.defaultPrice / 100}.00</p>
              </div>
              <div className='w-full lg:w-1/3'>
                <img
                  src={img_url + menu.card.info.imageId}
                  alt={menu.card.info.name}
                  className='mt-4 rounded-lg shadow-md'
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
