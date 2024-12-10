import React, { useContext } from 'react';
import Footer from '../../components/Footer';
import '../../styles/restaurantStyles/DashboardStyles.css';
import { AuthContext } from '../../contexts/AuthContext'; // Assuming AuthContext provides user and dark_mode data

const Dashboard = () => {
  const { user, darkMode } = useContext(AuthContext); // Replace with actual context or props for user and dark mode

  const venues = false; // Replace with dynamic data
  const venuePhoto = false; // Replace with dynamic data
  const menuItemsAdded = false; // Replace with dynamic data
  const subscribed = false; // Replace with dynamic data

  return (
    <div className="main-container">
      <div className="main-sub-container">
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
              <div className="info-header2">
                <span className="subscribed-text">@{user?.username?.toLowerCase()}</span>
                <br />
                <span>MM Member since:</span>
                <span className="subscribed-text"> {user?.dateJoined}</span>
              </div>
              <div className="info-header3">
                <a id="display-invite-button" className="action-button" href="#">
                  <img
                    className="action-plus"
                    src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/plus-fill.png"
                    alt="Invite"
                  />
                  <span className="action-text">Invite a Team Member</span>
                </a>
              </div>
            </div>

            <div className="next-action-container">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                {!venues && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <a className="next-item" href="/add-venue">
                        Add A Venue
                      </a>
                    </div>
                  </>
                )}
                {!venuePhoto && venues && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <a className="next-item" href="/update-venue-photos">
                        Add Venue Photos
                      </a>
                    </div>
                  </>
                )}
                {!menuItemsAdded && venues && venuePhoto && (
                  <>
                    <span className="next-header">What's Next?</span>
                    <div className="next-item-container">
                      <span className="pulsating-circle"></span>
                      <a className="next-item" href="/edit-menu">
                        Add menu items to your main menu
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="options">
            <div id="hover-container">
              <a className="pair" id="blue" href="/edit-menu">
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
              </a>
            </div>
            <a className="pair" id="venues-link" href="/venue-locations">
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
            </a>
            <div
              id=""
              className="hover-container-subscriptions"
              style={{ pointerEvents: 'none', opacity: 0.5, filter: 'grayscale(100%)' }}
            >
              <a className="pair" id="launch-link-home" href="/network-hub">
                <img
                  className="image"
                  id="network-icon-home"
                  src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/atom.png"
                  alt="Pegasus"
                />
                <span>Pegasus</span>
              </a>
            </div>

            <div
              id="hover-container"
              className="hover-container-subscriptions"
              style={{ pointerEvents: 'none', opacity: 0.5, filter: 'grayscale(100%)' }}
            >
              <a className="pair" id="settings-link-home">
                <img
                  className="image"
                  id="settings-icon-home"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/subscription-icon.png"
                  alt="Subscriptions"
                />
                <span>Subscriptions</span>
              </a>
              {subscribed ? (
                <div className="menu-options">
                  <ul id="subscription-list">
                    <li>
                      <a id="modify-subscription" href="/modify-subscription">
                        Manage Subscription
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="menu-options">
                  <ul id="subscription-list">
                    <li>
                      <a id="modify-subscription" href="/subscribe">
                        Subscribe
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <a className="pair" id="settings-link-home" href="/user-settings">
              <img
                className="image"
                id="settings-icon-home"
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/settings-black.png"
                alt="Settings"
              />
              <span>Settings</span>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;