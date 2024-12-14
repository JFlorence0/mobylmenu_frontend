import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/Footer';
import '../../styles/restaurantStyles/DashboardStyles.css';
import { AuthContext } from '../../contexts/AuthContext';
import { BusinessContext } from '../../contexts/BusinessContext';
import NavigationSidebar from '../../components/NavigationSidebar';

const Dashboard = () => {
  const { userData, darkMode } = useContext(AuthContext);
  const { isCollapsed } = useContext(BusinessContext);

  return (
    <div className="dashboard-main-container">
      <Helmet>
        <title>{`Dashboard | MobylMenu`}</title>
      </Helmet>
      <div className="dashboard-container">
        <NavigationSidebar currentScreen={"Dashboard"}/>
        <div className={isCollapsed ? "collapsed-dashboard-container" : "expanded-dashboard-container"}>
          <div className="dashboard-header-container">
            <h2 className="dashboard-welcome-title">Welcome back, @{userData?.user?.username?.toLowerCase()}</h2>
          </div>

          <div className="getting-started-container">
            <h3 className="getting-started-title">Getting Started</h3>
            <div className="getting-started-horizontal-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;