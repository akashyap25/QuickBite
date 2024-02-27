import React from 'react';
import { FcRating } from 'react-icons/fc';
import { img_url } from '../config';

const RestaurantCard = (restaurant,id) => {
  let cuisines = restaurant.cuisines;
  const size = cuisines.length;
   cuisines = cuisines.slice(0, 3).join(',')+ (size > 3 ? ',...' : '');


  return (
    <div className='flex flex-wrap justify-center items-center gap-4'>
      <div
        key={id}
        className='w-80 p-4 transform hover:scale-95 origin-center transition-all duration-100 ease-in cursor-pointer shadow-lg shadow-slate-300 rounded-2xl'
      >
        <img
          src={img_url + restaurant.cloudinaryImageId}
          className='h-60 w-80 rounded-2xl shadow-xl shadow-slate-600'
          alt=''
        />
        <h2 className='text-xl font-bold mt-4'>{restaurant.name}</h2>
        <div className='flex items-center mt-1'>
          <h2 className='text-sm font-bold'>{restaurant.avgRating}</h2>
          <FcRating className='ml-1' />
          <h2 className='text-sm font-bold'>, {restaurant.sla.slaString}</h2>
        </div>
        <h3 className='text-md mt-1 overflow-hidden'>{cuisines}</h3>
        <h3 className='text-md'>{restaurant.areaName}</h3>
      </div>
    </div>
  );
};

export default RestaurantCard;
