import React from 'react';
import '../../../styles/restaurantStyles/manageMenuStyles/ManageMenuMCompleteness.css'

const MenuCompletenessComponent = ({ menuItems, menuCompleteness, menuNotCompleteText }) => {
  return (
    <div className="menu-completeness-container">
      {menuItems && menuItems.length > 0 ? (
        <>
          <div className="menu-complete-percentage-container">
            <span className="menu-completeness-text">Menu Completeness:</span>
            <span className="menu-completeness-text">{menuCompleteness}</span>
            <span className="menu-completeness-text-reg" style={{ marginLeft: '60px' }}>
              {menuNotCompleteText}
            </span>
          </div>
          <div className="menu-completeness-note">
            <span className="menu-completeness-text">
              <span style={{ color: '#FF3B30' }}>*</span> indicates a picture is missing from the
              item
            </span>
          </div>
        </>
      ) : (
        <div className="menu-completeness-note">
          <span className="menu-completeness-text">No menu items available</span>
        </div>
      )}
    </div>
  );
};

export default MenuCompletenessComponent;
