import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import user_logo from '../assets/user.png';

const Navbar = () => {
  const cartItems = useSelector(store => store.cart.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); 
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies([]);
  
  useEffect(() => {
    const token = cookies.jwt;
    if (token) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [cookies.jwt]);
  
  const logOut = () => {
    removeCookie('jwt');
    setIsUserLoggedIn(false);
    navigate('/login');
  };

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      logOut();
    } else {
      navigate('/login');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='p-4 lg:ml-28 lg:mr-28'>
      <div className='container mx-auto flex flex-col lg:flex-row lg:justify-between items-center'>
        <div className='flex items-center justify-between w-full lg:w-auto'>
          <Link to='/'>
            <img src={logo} alt='Logo' className='h-28 rounded-full' />
          </Link>
          <button
            className='block lg:hidden text-xl text-slate-800 focus:outline-none'
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <svg
                className='w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6 18L18 6M6 6l12 12'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            ) : (
              <svg
                className='w-6 h-6'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4 6H20M4 12H20M4 18H20'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
        </div>
        <ul
          className={`flex flex-col lg:flex-row gap-8 space-x-4 text-lg text-center font-semibold lg:space-x-0 ${
            isMenuOpen
              ? 'lg:mt-4 lg:bg-gray-100 lg:p-4 lg:rounded-lg'
              : 'hidden'
          } lg:flex`}
        >
          <li>
            <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/contact'>
              Contact
            </Link>
          </li>
          <li>
            <Link className='text-slate-800 hover:text-orange-500 transition duration-300' to='/cart'>
              Cart-{cartItems?.length ?? 0} items
            </Link>
          </li>
          {isUserLoggedIn ? (
            <li className='relative'>
              <img
                src={user_logo}
                alt='User Logo'
                className='h-10 w-10 cursor-pointer'
                onClick={toggleMenu}
              />
              {isMenuOpen && (
                <ul className='absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1'>
                  <li className='px-4 py-2'>
                    {userData && (
                      <div>
                        <p>{userData.username}</p>
                      </div>
                    )}
                  </li>
                  <li className='px-4 py-2'>
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <button
                className='bg-orange-500 hover:bg-orange-700 hover:text-white text-slate-800 ml-20 py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300'
                onClick={handleButtonClick}
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
