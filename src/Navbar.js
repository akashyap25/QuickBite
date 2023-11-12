import React from 'react';
import logo from './assets/logo.png';

const Navbar = () => {
  return (
    <div className='p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <img src={logo} alt='Logo' className='h-28 rounded-full' />

        <ul className='flex gap-8 space-x-4 text-lg font-semibold'>
          <li>
            <a href='#' className='text-slate-800 hover:text-orange-500 transition duration-300'>
              Home
            </a>
          </li>
          <li>
            <a href='#' className='text-slate-800 hover:text-orange-500 transition duration-300'>
              About
            </a>
          </li>
          <li>
            <a href='#' className='text-slate-800 hover:text-orange-500 transition duration-300'>
              Contact
            </a>
          </li>

          <li>
            <a href='#' className='text-slate-800 hover:text-orange-500 transition duration-300'>
              Cart
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
