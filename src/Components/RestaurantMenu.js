import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FcRating } from 'react-icons/fc';
import { img_url } from '../config';
import MenuShimmer from '../Utils/MenuShimmer';
import useRestaurant from '../Utils/useRestaurant';
import { addToCart } from '../Utils/cartSlice';
import { useDispatch } from 'react-redux';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const { restaurant, menuItems, isLoading } = useRestaurant(resId);

  const dispatch = useDispatch();

  const addFoodItem = (menu) => {
    dispatch(addToCart(menu.card.info));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">Restaurant Menu</h1>
        <MenuShimmer />
      </div>
    );
  }

  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h1 className="h2-bold ml-10">Restaurant Menu</h1>    
      <div className='border p-4  max-w-96'>
        <h2 className="h4-medium mb-2 text-center">{restaurant.name}</h2>
        <div className="flex flex-col lg:flex-row items-center mb-4">
          <div className="w-full lg:w-2/3 pr-4 mb-4 lg:mb-0">
            <h3 className="text-md mt-1 text-center lg:text-left overflow-hidden">{restaurant.cuisines?.join(', ')}</h3>
            <h3 className="text-md text-center lg:text-left">{restaurant.city}</h3>
          </div>
          <div className="w-full lg:w-1/3 flex-center lg:justify-end">
            <div className="w-20 h-16 flex flex-col mx-auto items-center border border-slate-400 shadow-lg">
              <div className="m-1 flex items-center">
                <h2 className="text-sm font-bold">{restaurant.avgRating}</h2>
                <FcRating className="inline-block ml-1" />
              </div>
              <div className="whitespace-nowrap">
                <h2 className="text-xs font-light w-full">{restaurant.totalRatings}+ Ratings</h2>
              </div>
            </div>
          </div>
          </div>
        </div>
      <div className="flex flex-col items-center justify-center">
        

        <div className='flex flex-row flex-wrap gap-8 justify-center items-center'>
        {menuItems.length === 0 ? (
          <div className="text-center text-xl font-bold text-gray-500 py-8">
            No items available at the moment.
          </div>
        ) : (
          menuItems.map((menu) => (
            <div key={menu.card.info.id} className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col  overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] mb-8">
              <Link 
                to="#"
                style={{ backgroundImage: `url(${img_url + menu.card.info.imageId})` }}
                className="flex-center flex-grow bg-gray-50 bg-contain bg-center text-grey-500 h-48"
              />
              <div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
                <div className="flex gap-2">
                  <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
                    ₹{Math.round(menu.card.info.price / 100)}.00
                  </span>
                  <p className="p-semibold-14  rounded-full bg-gray-200 px-4 py-1 text-grey-500 line-clamp-1">
                    {menu.card.info.category}
                  </p>
                </div>

                <p className="p-medium-16 p-medium-18 text-grey-500">
                  {menu.card.info.description}
                </p>

                <Link to="#">
                  <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">{menu.card.info.name}</p>
                </Link>

                <div className="w-full mt-4 flex justify-center">
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-400" onClick={() => addFoodItem(menu)}>  
                    Add Item
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;
