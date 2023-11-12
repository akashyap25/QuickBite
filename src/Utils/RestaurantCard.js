import React from 'react';
import { FcRating } from 'react-icons/fc';
import { img_url } from '../config';

const RestaurantCard = ({ restaurants }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.info.id}
          className='w-80 p-4 transform hover:scale-95 origin-center transition-all duration-100 ease-in cursor-pointer shadow-lg shadow-slate-300 rounded-2xl'
        >
          <img
            src={img_url + restaurant.info.cloudinaryImageId}
            className=' h-60 w-80 rounded-2xl shadow-xl shadow-slate-600'
            alt=''
          />
          <h2 className='text-xl font-bold mt-4'>{restaurant.info.name}</h2>
          <div className='flex items-center mt-1'>
            <h2 className='text-sm font-bold'>{restaurant.info.avgRating}</h2>
            <FcRating className='ml-1' />
            <h2 className='text-sm font-bold'>, {restaurant.info.sla.slaString}</h2>
          </div>
          <h3 className='text-md mt-1 overflow-hidden'>{restaurant.info.cuisines.join(',')}</h3>
          <h3 className='text-md'>{restaurant.info.areaName}</h3>
        </div>
      ))}
    </div>
  );
};

export default RestaurantCard;
