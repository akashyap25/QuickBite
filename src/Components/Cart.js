import React from 'react';
import { img_url } from '../config';
import { useSelector, useDispatch } from 'react-redux'; 
import { clearCart, removeFromCart } from '../Utils/cartSlice';

const Cart = () => {
  const cartItems = useSelector(store => store.cart.products);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <>
      <h1 className='font-bold text-3xl text-center'>Cart-Items</h1>
      <h2 className='font-semibold text-xl text-center'>Total Items: {cartItems.length}</h2>
      <h2 className='font-semibold text-xl text-center'>Total Price: ₹{cartItems.reduce((acc, item) => acc + item.price, 0) / 100}.00</h2>
      <div className='flex justify-end mb-4 mr-28'>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleClearCart}>Clear Cart</button>
      </div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {cartItems.map((item) => (
            <div key={item.id} className='w-full lg:w-1/3 p-4 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-semibold'>{item.name}</h2>
              <img
                src={img_url + item.imageId}
                alt={item.name}
                className='mt-1 rounded-lg shadow-md h-1/2 w-1/2 object-cover'
              />
              <p className='text-sm text-gray-600 mb-4'>{item.description}</p>
              <p className='text-xl font-semibold'>₹{Math.round(item.price / 100)}.00</p>
              <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-4' onClick={() => handleRemoveItem(item)}>Remove-Item</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
