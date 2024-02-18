import React from 'react';
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


const AppLayout = () => {
  return (
    <Provider store={store}>
    
      <Navbar  />
      <Outlet />
      <Footer/>
    
    </Provider>
  );
};


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/contact',
        element: <Contact/>,
      },
      {
        path: '/about',
        element: <About/>,
      },
      {
        path: '/restaurant/:resId',
        element: <RestaurantMenu/>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      }
    ]
  },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
