import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User Screens
import Home from './screens/userScreens/Home';
import Menu from './screens/userScreens/Menu';

// Business Screens
import RestaurantHome from './screens/restaurantScreens/RestaurantHome';
import Dashboard from './screens/restaurantScreens/Dashboard';

// Context
import { AuthContext } from './contexts/AuthContext';

// Layout for Grouped User Screens
const UserLayout = () => (
  <div>
    {/* Shared Header or Navigation for User Screens */}
    <header>User Navigation</header>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="menu/:venue_id" element={<Menu />} />
    </Routes>
  </div>
);

// Layout for Grouped Business Screens
const BusinessLayout = () => (
  <div>
    {/* Shared Header or Navigation for Business Screens */}
    <header>Business Navigation</header>

    <Routes>
      <Route path="/" element={<RestaurantHome />} />
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  </div>
);

// Component to Restrict Access to Authenticated Business Users
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isVenue } = useContext(AuthContext);

  if (!isLoggedIn || !isVenue) {
    // Redirect to RestaurantHome if not authenticated or not a business user
    return <Navigate to="/business" />;
  }

  return children;
};

const Navigation = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu/:venue_id" element={<Menu />} />
        <Route path="/business" element={<RestaurantHome />} />

        {/* Business Screens */}
        <Route path="/business/*" element={<BusinessLayout />} />
      </Routes>
    </Router>
  );
};

export default Navigation;
