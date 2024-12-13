import React, { useState } from 'react';
import Header from '../../components/NavigationSidebar';
import HeaderSpacer from '../../components/HeaderSpacer';
import Image from '../../components/Image';

import '../../styles/restaurantStyles/SettingsStyles.css';
import NavigationSidebar from '../../components/NavigationSidebar';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false); // Example for handling dark mode
  const [overlayVisible, setOverlayVisible] = useState(false);

  const showEditPopup = () => setOverlayVisible(true);
  const closeEditPopup = () => setOverlayVisible(false);

  return (
    <div>
      <NavigationSidebar path={[{ label: 'Settings', link: '/settings' }]} />

      <div className="main-container">
        <div className="wrapper" id="wrapper">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        <div
          id="overlay"
          className={`overlay ${overlayVisible ? 'visible' : 'hidden'}`}
        >
          <div className="settings-popup" id="popup">
            <h2>Edit</h2>
            <form className="form" id="form" method="post" action="">
              {/* Example form, replace with actual controlled form */}
              <label htmlFor="id_email">Email:</label>
              <input type="email" id="id_email" name="email" /><br />
              <label htmlFor="id_name">Username:</label>
              <input type="text" id="id_name" name="username" /><br />
              <div className="button-container">
                <button
                  className="cancel"
                  type="button"
                  onClick={closeEditPopup}
                >
                  Cancel
                </button>
                <button
                  id="form-button"
                  className="edit"
                  type="submit"
                  onClick={closeEditPopup}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="main-sub-container">
          <div className="company-info">
            <div className="info-container-settings">
              <div className="info-header">
                <img
                  className="settings-wheel"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/settings-blue.png"
                  alt="Settings Icon"
                />
                <span className="welcome">Settings</span>
              </div>
              <div className="info-header2">
                <span className="subscribed-text">
                  @user.username {/* Replace with dynamic username */}
                </span>
                <br />
              </div>
            </div>

            <div className="options">
              <a className="pair" onClick={showEditPopup}>
                <Image
                  className="chevron-up"
                  src={
                    darkMode
                      ? 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/up-white.png'
                      : 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/up-black.png'
                  }
                  alt="Edit Username"
                />
                <span>Change Username</span>
              </a>

              <a className="pair" href="/password-reset">
                <Image
                  id="chevron-right"
                  className="chevron-right"
                  src={
                    darkMode
                      ? 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-white.png'
                      : 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-black.png'
                  }
                  alt="Reset Password"
                />
                <span>Reset Password</span>
              </a>

              <a className="pair" href="/submit-feedback">
                <Image
                  id="venue-image"
                  className="chevron-right"
                  src={
                    darkMode
                      ? 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/tray-arrow-white.png'
                      : 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/tray-arrow.png'
                  }
                  alt="Suggestions"
                />
                <span>Suggestions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;