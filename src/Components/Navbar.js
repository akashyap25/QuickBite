import React from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {


  return (
    <div className='p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <img src={logo} alt='Logo' className='h-28 rounded-full' />

        <ul className='flex gap-8 space-x-4 text-lg font-semibold'>
      
          <li>
            <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/'>Home</Link>
          </li>
          <li>
          <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/about'>About</Link>
          </li>
          <li>
          <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/contact'>Contact</Link>
          </li>

          <li>
          <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/cart'>Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
