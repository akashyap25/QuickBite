import React from 'react';
import { img_url } from '../config';
import { useSelector, useDispatch } from 'react-redux'; 
import { clearCart, removeFromCart, increaseItemCount, decreaseItemCount, addToCart } from '../Utils/cartSlice';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation

const Cart = () => {
  const cartItems = useSelector(store => store.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Get the history object for navigation

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

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleCheckout = () => {
    // Redirect to the checkout page when the checkout button is clicked
    navigate('/checkout');
  };

  return (
    <>
      <h1 className='font-bold text-3xl text-center'>Cart-Items</h1>
      <h2 className='font-semibold text-xl text-center'>Total Items: {cartItems.length}</h2>
      <h2 className='font-semibold text-xl text-center'>Total Price: ₹{cartItems.reduce((acc, item) => acc + item.price * item.count, 0) / 100}.00</h2>
      <div className='flex justify-end mb-4 mr-28'>
        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleClearCart}>Clear Cart</button>
      </div>
      <div className='container mx-auto mt-10'>
        <div className='flex flex-wrap gap-4 items-center justify-center'>
          {cartItems.map((item) => (
            <div key={item.id} className='w-full lg:w-1/3 p-4 rounded-lg shadow-lg'>
              <h2 className='text-2xl font-semibold'>{item.name}</h2>
              <div className="flex items-center">
                <img
                  src={img_url + item.imageId}
                  alt={item.name}
                  className='mt-1 rounded-lg shadow-md h-1/2 w-1/2 object-cover'
                />
                <p className='text-xl font-semibold ml-4'>{item.count}</p>
                <div className="ml-auto">
                  <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => handleIncreaseCount(item)}>+</button>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-2' onClick={() => handleDecreaseCount(item)}>-</button>
                </div>
              </div>
              <p className='text-sm text-gray-600 mb-4'>{item.description}</p>
              <p className='text-xl font-semibold'>₹{Math.round(item.price * item.count / 100)}.00</p>
              <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mt-4' onClick={() => handleRemoveItem(item)}>Remove-Item</button>
            </div>
          ))}
        </div>
      </div>
      {/* Add the checkout button */}
      {
        cartItems.length===0? (<h1 className='text-2xl font-bold text-center'>No Items in the Cart</h1>)
        : <div className="flex justify-center mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" 
        onClick={handleCheckout}>
          Checkout
          </button>
      </div>

      }
      
    </>
  );
};

export default Cart;
