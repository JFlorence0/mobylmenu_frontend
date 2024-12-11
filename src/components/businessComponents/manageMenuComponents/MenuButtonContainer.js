import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/restaurantStyles/manageMenuStyles/ManageMenuButtonContainer.css'

const MenuButtonContainer = ({ menus, currentMenuId, onCreateMenu }) => {
  return (
    <div className="menu-buttons-container">
      {/* Create New Menu Button */}
      <Link
        id="create-new-menu"
        to="/menu/create"
        className="manage-menu-action-button"
        onClick={onCreateMenu}
      >
        <img
          className="manage-menu-action-plus"
          src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/plus-fill.png"
          alt="Create New Menu"
        />
        <span className="manage-menu-action-text">Create New Menu</span>
      </Link>

      {/* Existing Menu Buttons */}
      {menus?.map((menu) => (
        <Link
          key={menu.id}
          className={`manage-menu-action-button ${
            menu.id === currentMenuId ? 'manage-menu-action-selected' : ''
          }`}
          to={`/menu/edit/${menu.id}`}
        >
          <span
            className={`manage-menu-action-text ${
              menu.id === currentMenuId ? 'manage-menu-action-text-selected' : ''
            }`}
          >
            {menu.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default MenuButtonContainer;