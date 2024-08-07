import React from 'react';
import { img_url } from '../config';
import { useSelector, useDispatch } from 'react-redux'; 
import { clearCart, removeFromCart, increaseItemCount, decreaseItemCount } from '../Utils/cartSlice';
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const cartItems = useSelector(store => store.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleIncreaseCount = (item) => {
    dispatch(increaseItemCount(item));
  };

  const handleDecreaseCount = (item) => {
    dispatch(decreaseItemCount(item));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <section className='wrapper my-8 flex flex-col '>
      <h1 className='font-bold text-3xl text-center'>Cart-Items</h1>
      <h2 className='font-semibold text-xl text-center'>Total Items: {cartItems.length}</h2>
      <h2 className='font-semibold text-xl text-center'>Total Price: ₹{cartItems.reduce((acc, item) => acc + item.price * item.count,0) / 100}</h2>
      <div className='flex justify-end mb-4 mx-auto md:mr-28'>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleClearCart}>Clear Cart</button>
      </div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {cartItems.map((item) => (
            <div key={item.id} className='group relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg'>
              <div className='flex items-center p-5'>
                <img
                  src={img_url + item.imageId}
                  alt={item.name}
                  className='mt-1 rounded-lg shadow-md h-32 w-32 object-cover'
                />
                <div className='ml-4 flex flex-col flex-grow'>
                  <h2 className='p-medium-20'>{item.name}</h2>
                  <p className='p-regular-16 text-gray-600'>{item.description}</p>
                  <p className='p-semibold-18'>₹{Math.round(item.price * item.count / 100)}.00</p>
                </div>
              </div>
              <div className='flex justify-between p-5'>
                <div className='flex items-center'>
                  <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleIncreaseCount(item)}>+</button>
                  <span className='p-semibold-20 mx-4'>{item.count}</span>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleDecreaseCount(item)}>-</button>
                </div>
                <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleRemoveItem(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleCheckout}>Checkout</button>
      </div>
    </section>
  );
};

export default Cart;
