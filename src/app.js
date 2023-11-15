import React from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Footer from './Components/Footer';
import About from './Components/About';
import Contact from './Components/Contact';
import Error from './Utils/Error';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';


const AppLayout = () => {
  return (
    <React.StrictMode>
      <Navbar  />
      <Outlet />
      <Footer/>
    </React.StrictMode>
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
    ]
  },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);
