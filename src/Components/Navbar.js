import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import logo from '../assets/logo.png';
import user_logo from '../assets/user.png';
import {backend_url} from '../config';

const Navbar = () => {
  const cartItems = useSelector((store) => store.cart.products);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/users/auth_user`, { withCredentials: true });
        if (response.data.authUser) {
          setIsUserLoggedIn(true);
          setUserData(response.data.user_id);
        }
      } catch (err) {
        console.error(err);
        setIsUserLoggedIn(false);
      }
    };

    checkUserAuth();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const logOut = () => {
    axios.get(`${backend_url}/api/users/logout`, { withCredentials: true }).then(() => {
      setIsUserLoggedIn(false);
      setUserData(null);
      navigate('/');
    }).catch((err) => console.error(err));
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

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-24 rounded-full" alt="Logo" />
        </Link>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-dropdown"
          aria-expanded={isMenuOpen ? "true" : "false"}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`w-full md:block md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-dropdown" ref={menuRef}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link to="/" className="block py-2 px-3 text-slate-500 hover:text-orange-500  rounded " aria-current="page">Home</Link>
            </li>
            {/* <li className="relative">
              <button id="dropdownNavbarLink" className="flex items-center justify-between w-full py-2 px-3 rounded text-slate-500 hover:text-orange-500" onClick={toggleUserMenu}>
                Profile <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              {isUserMenuOpen && (
                <div className="absolute w-28 right-0 mt-2 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg py-2 z-10">
                  <ul className="py-2 text-sm  text-gray-500 " aria-labelledby="dropdownLargeButton">
                    <li>
                      <Link to="/dashboard" className="block px-4 py-2 hover:text-orange-500">My-Profile</Link>
                    </li>
                    <li>
                      <Link to="/my-orders" className="block px-4 py-2 hover:text-orange-500">My-Order</Link>
                    </li>
                  </ul>
                  <div className="py-1">
                    <button onClick={logOut} className="block px-4 py-2 text-sm text-slate-500 hover:text-orange-500">Sign out</button>
                  </div>
                </div>
              )}
            </li> */}
            <li>
              <Link to="/contact" className="block py-2 px-3 rounded text-slate-500 hover:text-orange-500">Contact</Link>
            </li>
            <li>
              <Link to="/cart" className="block py-2 px-3 rounded text-slate-500 hover:text-orange-500">
                Cart-{cartItems?.length ?? 0} items
              </Link>
            </li>
            {isUserLoggedIn ? (
              <li className="relative">
                <img src={user_logo} alt="User Logo" className="h-10 w-10 cursor-pointer ml-3 mt-1 md:ml-0 md:mt-0" onClick={toggleUserMenu} />
                {isUserMenuOpen && (
                  <div className="absolute  mt-2 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg py-2 z-10">
                    <ul className="py-2 w-24 text-sm text-slate-500 " aria-labelledby="dropdownLargeButton">
                      <li>
                        <Link to="/profile" className="block px-4 py-2 hover:text-orange-500">Profile</Link>
                      </li>
                      <li>
                        <button onClick={logOut} className="block px-4 py-2 text-sm text-slate-500 hover:bg-orange-500">Sign out</button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <button onClick={handleButtonClick} className="block py-2 px-3 mt-2 md:mt-0 bg-orange-600 hover:bg-orange-500 text-white rounded-full">
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
