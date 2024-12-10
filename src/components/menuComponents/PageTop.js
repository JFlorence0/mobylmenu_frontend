import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import '../../styles/menuStyles/Menu.css';

const PageTop = ({ venue, categories, selectedMenu, setSelectedMenu }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  console.log('Selected Menu', selectedMenu)
  console.log(venue?.other_menus)
  const isMobile = useMediaQuery({ maxWidth: 768 });
  if (!venue) return null; // Handle cases where venue is not available

  return (
    <div className="menu-header-container" style={{ marginTop: isMobile ? (bannerVisible ? '120px' : '60px' ): '0px' }}>
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
      <div className="category-select-container mobile-only" style={{ top: bannerVisible && isMobile ? '60px' : '0px' }}>
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
          src={venue.picture_compressed || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'}
          alt={`Cover photo for ${venue.venue_name}`}
        />
        <img
          className="menu-logo"
          src={venue.logo_compressed || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'}
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
          <span className="venue-header-information">{venue.address}</span>
          <span className="venue-header-information">{venue.city}, {venue.country === 'United States' ? venue.state : venue.country} {venue.zipcode}</span>
          <span className="venue-header-information">{venue.phone_number}</span>
        </div>
      </div>
    
    <div className="menu-option-container">
      {/* Main Menu */}
      <Link to={`/menu/${venue.id}`}>
      <div 
        className={venue.menu.id === selectedMenu?.id ? 'selected-menu' : 'other-menus'}
        style={{ marginRight: (venue.other_menus && venue.other_menus?.length > 0) ? '20px' : '0px'  }}
      >
          {venue.menu?.name || 'Main Menu'}
      </div>
      </Link>

      {/* Other Menus */}
      {venue.other_menus?.map((menu, index) => {
        // Avoid rendering the main menu again if it's included in other_menus
        if (menu.id === selectedMenu?.id) {
            return null;
        }

        const isLastItem = index === venue.other_menus.length - 1;

        return (
            <Link key={menu.id} to={`/menu/${venue.id}/${menu.id}`}>
                <div 
                    className="other-menus" 
                    style={isLastItem ? { margin: '0' } : {}}
                >
                    {menu.name}
                </div>
            </Link>
        );
        })}


    </div>
    </div>
  );
};

export default PageTop;
