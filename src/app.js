import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../index.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

const App = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleSearch = (filteredData) => {
    setFilteredRestaurants(filteredData);
  };

  return (
    <React.StrictMode>
      <Navbar onSearch={handleSearch} />
      <Home filteredRestaurants={filteredRestaurants} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
