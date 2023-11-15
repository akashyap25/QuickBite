import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white p-8'>
      <div className='container mx-auto'>
        <div className='flex flex-wrap justify-between'>
          <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6'>
            <h2 className='text-2xl font-bold mb-4'>Company</h2>
            <ul>
              <li className='mb-2'>About Us</li>
              <li className='mb-2'>Careers</li>
              <li className='mb-2'>Press</li>
              <li className='mb-2'>Blog</li>
            </ul>
          </div>

          <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6'>
            <h2 className='text-2xl font-bold mb-4'>Contact</h2>
            <ul>
              <li className='mb-2'>Support</li>
              <li className='mb-2'>Sales</li>
              <li className='mb-2'>Report an issue</li>
            </ul>
          </div>

          <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6'>
            <h2 className='text-2xl font-bold mb-4'>Legal</h2>
            <ul>
              <li className='mb-2'>Terms of Service</li>
              <li className='mb-2'>Privacy Policy</li>
            </ul>
          </div>

          <div className='w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-6'>
            <h2 className='text-2xl font-bold mb-4'>Follow Us</h2>
            <div className='flex space-x-4'>
              <a href='#' className='text-2xl'>
                <i className='fab fa-facebook'></i>
              </a>
              <a href='#' className='text-2xl'>
                <i className='fab fa-twitter'></i>
              </a>
              <a href='#' className='text-2xl'>
                <i className='fab fa-instagram'></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-8 border-t border-gray-700 pt-6 text-center'>
        <p>&copy; 2023 Your Food Delivery App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
