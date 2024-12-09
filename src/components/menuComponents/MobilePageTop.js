import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/menuStyles/Menu.css';

const MobilePageTop = ({ venue, categories }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  if (!venue) return null; // Handle cases where venue is not available

  return (
    <div className="menu-logo-container-mobile" id="menu-logo-container-mobile">
      {bannerVisible && (
        <div className="mobile-banner" id="mobile-banner">
          <a
            id="dismiss"
            onClick={() => setBannerVisible(false)} // Dismiss the banner
            style={{ cursor: 'pointer' }}
          >
            <img
              className="x-close"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/white-x.png"
              alt="Close banner"
            />
          </a>
          <div className="banner-left">
            <img
              className="logo-image"
              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/icon.jpeg"
              alt="MobylMenu Logo"
            />
            <p>Try the MobylMenu App</p>
          </div>
          <div className="banner-right">
            <a
              href="https://apps.apple.com/gb/app/mobylmenu-find-food-near-me/id6445874189"
              className="pill-button"
              id="app-open-button"
            >
              Download
            </a>
          </div>
        </div>
      )}
      <div className="category-select-container mobile-only">
        <div className="scroll-left">
          <img
            id="scroll-left-img"
            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-blue-left.png"
            alt="Scroll Left"
          />
        </div>
        <ul id="category-nav">
          {categories?.map((category) => (
            <li key={category.name}>
              <a href={`#${category.id}`}>{category.name}</a>
            </li>
          ))}
          <div className="indicator"></div>
        </ul>
        <div className="scroll-right">
          <img
            id="scroll-right-img"
            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/chevron-blue.png"
            alt="Scroll Right"
          />
        </div>
      </div>

      {/* Venue Details */}
      <div className="company-detail-container">
        <img
          className="cover-photo"
          src={venue.menu_cover || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'}
          alt={`Cover photo for ${venue.venue_name}`}
        />
        <img
          className="menu-logo"
          src={venue.menu_logo || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'}
          alt={`Menu logo for ${venue.venue_name}`}
        />

        {/* Interaction Buttons */}
        <div className="interaction-button-container">
          {venue.order_link && (
            <div className="interaction-button">
              <a href={venue.order_link}>
                <img
                  src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/order-orange.png"
                  className="order-icon"
                  alt="Takeout Icon"
                />
              </a>
            </div>
          )}
          {venue.phone_number && (
            <div className="interaction-button">
              <a href={`tel:${venue.phone_number}`}>
                <img
                  src="https://mobyl-menu-bucket.s3.us-east-1.amazonaws.com/MM-Images/phone-pink.png"
                  className="order-icon"
                  alt="Phone Icon"
                />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Venue Information */}
      <div className="venue-information-container">
        <div className="venue-location-container">
          <span className="venue-header-title">{venue.venue_name}</span>
        </div>
      </div>

      {/* Main Menu */}
    <Link to={`/menu/${venue.id}`}>
    <div className={venue.main_menu_selected ? 'selected-menu' : 'other-menus'}>
        {venue.main_menu_selected?.name || 'Main Menu'}
    </div>
    </Link>

    {/* Other Menus */}
    {venue.other_menus?.map((menu) => {
    // Avoid rendering the main menu again if it's included in other_menus
    if (menu.id === venue.main_menu_selected?.id) {
        return null;
    }

    return (
        <Link key={menu.id} to={`/menu/${venue.id}/${menu.id}`}>
        <div className="other-menus">{menu.name}</div>
        </Link>
    );
    })}
    </div>
  );
};

export default MobilePageTop;
