import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Utils/Error';
import RestaurantMenu from './Components/RestaurantMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import store from './Utils/store';
import { Provider } from 'react-redux';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import CheckoutForm from './Components/CheckoutForm';
import PrivateRoute from './Utils/PrivateRoute';
import UserVerify from './Components/UserVerify';

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Outlet />
      <Footer />
    </Provider>   
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/:id/verify/:token',
        element: <UserVerify />,
      },
      {
        path: '/',
        element: <Outlet />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/contact',
            element: <Contact />,
          },
          {
            path: '/about',
            element: <About />,
          },
          {
            path: '/restaurant/:resId',
            element: <RestaurantMenu />,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
          {
            path: '/checkout',
            element: <PrivateRoute><CheckoutForm /></PrivateRoute>,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
