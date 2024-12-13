import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer';
import '../../styles/restaurantStyles/DashboardStyles.css';
import { AuthContext } from '../../contexts/AuthContext';
import NavigationSidebar from '../../components/NavigationSidebar';

const Dashboard = () => {
  const { userData, darkMode } = useContext(AuthContext);

  const venues = false; // Replace with dynamic data
  const venuePhoto = false; // Replace with dynamic data
  const menuItemsAdded = false; // Replace with dynamic data
  const subscribed = false; // Replace with dynamic data

  return (
    <div className="dashboard-main-container">
      <Helmet>
        <title>{`Dashboard | MobylMenu`}</title>
      </Helmet>
      <div className="dashboard-container">
        <NavigationSidebar currentScreen={"Dashboard"}/>
      </div>
    </div>
  );
};

export default Dashboard;