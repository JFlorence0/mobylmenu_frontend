import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import your screen components
import Home from './screens/userScreens/Home';
import RestaurantHome from './screens/restaurantScreens/RestaurantHome';

const Navigation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business-home" element={<RestaurantHome />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
