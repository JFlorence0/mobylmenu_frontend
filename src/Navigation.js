import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Screens
import Home from './screens/userScreens/Home';
import Menu from './screens/userScreens/Menu';

import AuthenticationScreen from './screens/restaurantScreens/AuthenticationScreen';
import RestaurantLanding from './screens/restaurantScreens/RestaurantLanding';
import Dashboard from './screens/restaurantScreens/Dashboard';
import ManageMenuScreen from './screens/restaurantScreens/ManageMenuScreen';
import ManageMenuItemScreen from './screens/restaurantScreens/ManageMenuItemScreen';
import VenueLocationsScreen from './screens/restaurantScreens/VenueLocationsScreen';
import ManageVenueScreen from './screens/restaurantScreens/ManageVenueScreen';
import SettingsScreen from './screens/restaurantScreens/SettingsScreen';

// Context
import { AuthContext } from './contexts/AuthContext';

const Navigation = () => {
  const { isLoggedIn, isVenue } = useContext(AuthContext);

  useEffect(() => {
    
  }, [isLoggedIn, isVenue]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:venue_id" element={<Menu />} />
        <Route path="/business" element={<RestaurantLanding />} />
        <Route
          path="/auth"
          element={!isLoggedIn ? <AuthenticationScreen /> : <Navigate to={isVenue ? "/dashboard" : "/"} />}
        />

        {/* Protected Route for Venue Dashboard */}
        <Route
          path="/dashboard"
          element={isLoggedIn && isVenue ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/manage-menu"
          element={isLoggedIn && isVenue ? <ManageMenuScreen /> : <Navigate to="/auth" />}
        />
        <Route
          path="/manage-menu-item"
          element={isLoggedIn && isVenue ? <ManageMenuItemScreen /> : <Navigate to="/auth" />}
        />
        <Route
          path="/venue-locations"
          element={isLoggedIn && isVenue ? <VenueLocationsScreen /> : <Navigate to="/auth" />}
        />
        <Route
          path="/manage-venue"
          element={isLoggedIn && isVenue ? <ManageVenueScreen /> : <Navigate to="/auth" />}
        />
        <Route
          path="/settings"
          element={isLoggedIn && isVenue ? <SettingsScreen /> : <Navigate to="/auth" />}
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default Navigation;