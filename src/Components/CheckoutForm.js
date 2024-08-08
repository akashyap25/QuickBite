import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'; 
import {backend_url} from '../config';

const CheckoutForm = () => {
  const handleToken = async (totalAmount, token) => {
    try {
      // Make HTTP request to your backend server to process payment
      await axios.post(`${backend_url}/api/stripe/pay`, {
        token: token.id,
        amount: totalAmount
      });
    } catch (error) {
      console.log(error);
    }
  };

  const tokenHandler = (token) => {
    handleToken(100, token); // Assuming the total amount is hardcoded to 100, adjust as necessary
  };

  return (
    <div className="flex justify-center items-center h-full p-24">
      <StripeCheckout
        stripeKey='pk_test_51OtkUuSETNjFDxEePZVQJWorpLeRpus9qPt5A0CBC9alqlQYtEBh4sKOMlyNFaoiLhUCUGvo4yVGoANljPCv0fGu00QpCN4Isl'
        token={tokenHandler}
        amount={10000} // Amount in cents, here 10000 represents 100 USD
        currency="inr"
        className="rounded-md shadow-md px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition duration-300 ease-in-out cursor-pointer"
      >
        <button className="rounded-md shadow-md px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 transition duration-300 ease-in-out cursor-pointer">
              Proceed to Checkout
        </button>
      </StripeCheckout>
    </div>
  );
};

export default CheckoutForm;
