import React from 'react';
import { Link } from 'react-router-dom';

const DesktopPageTop = ({ venue, fromSearch }) => {
  if (!venue) return null; // Handle cases where venue is not available

  return (
    <div className="desktop-page-top">
      {/* Back Button */}
      {!venue.isVenue && (
        <Link className="back" to={fromSearch ? '/search-results' : '/'}>
          Back
        </Link>
      )}

      {/* Menu Logo and Venue Title */}
      <div className="menu-logo-container">
        <img
          className="menu-logo"
          src={venue.menu_logo || 'https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/logo-new.jpeg'}
          alt={`Menu logo for ${venue.venue_name || 'MobylMenu'}`}
        />
        <h1 className="venue-title">{venue.venue_name}</h1>

        {/* Order Link */}
        {venue.order_link && (
          <a href={venue.order_link}>
            <div className="other-menus">Order</div>
          </a>
        )}

        {/* Main Menu */}
        {venue.other_menus?.length > 0 && (
          <>
            {venue.main_menu_selected ? (
              <Link to={`/menu/${venue.id}`}>
                <div className="selected-menu">{venue.main_menu_selected.name}</div>
              </Link>
            ) : (
              <Link to={`/menu/${venue.id}`}>
                <div className="other-menus">Main Menu</div>
              </Link>
            )}

            {/* Other Menus */}
            {venue.other_menus.map((menu) => {
              const isSelected = menu.id === venue.main_menu_selected?.id;

              const menuLink = venue.table_id
                ? `/menu/${venue.id}?menu_id=${menu.id}&table_id=${venue.table_id}`
                : `/menu/${venue.id}/${menu.id}`;

              return (
                <Link key={menu.id} to={menuLink}>
                  <div className={isSelected ? 'selected-menu' : 'other-menus'}>
                    {menu.name}
                  </div>
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopPageTop;