import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import '../../styles/restaurantStyles/DashboardStyles.css';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import HeaderSpacer from '../../components/HeaderSpacer';

const Dashboard = () => {
  const { userData, darkMode } = useContext(AuthContext);

  const venues = false; // Replace with dynamic data
  const venuePhoto = false; // Replace with dynamic data
  const menuItemsAdded = false; // Replace with dynamic data
  const subscribed = false; // Replace with dynamic data

  return (
    <div className="main-container">
      <div className="main-sub-container">
        <Header currentScreen={"Dashboard"}/>
        <HeaderSpacer />
        <div className="company-info">
          <div className="info-container">
            <div className="welcome-info-container">
              <div className="info-header">
                <img
                  className="console"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/laptop-ipad.png"
                  alt="Welcome"
                />
                <span className="welcome">Welcome</span>
              </div>
              <div className="user-info-container">
                <span className="subscribed-text">@{userData?.user?.username?.toLowerCase()}</span>
                <div>
                  <span>MM Member since: </span>
                  <span className="subscribed-text">
                    {userData?.user?.date_joined &&
                      new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(new Date(userData.user.date_joined))}
                  </span>
                </div>

              </div>
              <div className="info-header3">
                <Link id="display-invite-button" className="action-button" to="#">
                  <img
                    className="action-plus"
                    src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/plus-fill.png"
                    alt="Invite"
                  />
                  <span className="action-text">Invite a Team Member</span>
                </Link>
              </div>
            </div>

            <div className="next-action-container">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {!venues && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <Link className="next-item" to="/add-venue">
                        Add A Venue
                      </Link>
                    </div>
                  </>
                )}
                {!venuePhoto && venues && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <Link className="next-item" to="/update-venue-photos">
                        Add Venue Photos
                      </Link>
                    </div>
                  </>
                )}
                {!menuItemsAdded && venues && venuePhoto && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <Link className="next-item" to="/edit-menu">
                        Add menu items to your main menu
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="options">
            <div id="hover-container">
              <Link className="pair" id="blue" to="/manage-menu">
                <img
                  className="chevron-up"
                  id="manage-icon"
                  src={
                    darkMode
                      ? 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/down-white.png'
                      : 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/new-m-black.png'
                  }
                  alt="Manage Menus"
                />
                <p>Manage Menus</p>
              </Link>
            </div>
            <Link className="pair" id="venues-link" to="/venue-locations">
              <img
                id="venue-image"
                className="chevron-right"
                src={
                  darkMode
                    ? 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-white.png'
                    : 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/venue-black.png'
                }
                alt="My Venues"
              />
              <span>My Venues</span>
            </Link>
            <div
              id=""
              className="hover-container-subscriptions"
              style={{ pointerEvents: 'none', opacity: 0.5, filter: 'grayscale(100%)' }}
            >
              <Link className="pair" id="launch-link-home" to="/network-hub">
                <img
                  className="image"
                  id="network-icon-home"
                  src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/atom.png"
                  alt="Pegasus"
                />
                <span>Pegasus</span>
              </Link>
            </div>

            <div
              id="hover-container"
              className="hover-container-subscriptions"
              style={{ pointerEvents: 'none', opacity: 0.5, filter: 'grayscale(100%)' }}
            >
              <Link className="pair" id="settings-link-home" to="#">
                <img
                  className="image"
                  id="settings-icon-home"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/subscription-icon.png"
                  alt="Subscriptions"
                />
                <span>Subscriptions</span>
              </Link>
              {subscribed ? (
                <div className="menu-options">
                  <ul id="subscription-list">
                    <li>
                      <Link id="modify-subscription" to="/modify-subscription">
                        Manage Subscription
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="menu-options">
                  <ul id="subscription-list">
                    <li>
                      <Link id="modify-subscription" to="/subscribe">
                        Subscribe
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Link className="pair" id="settings-link-home" to="/settings">
              <img
                className="image"
                id="settings-icon-home"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/settings-black.png"
                alt="Settings"
              />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;