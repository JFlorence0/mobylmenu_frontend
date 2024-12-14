import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/restaurantStyles/manageMenuStyles/ManageMenuItemsSectionHeader.css';

const MenuItemsSectionHeader = ({
  menuItems,
  maxItems = 50,
  isDeleteAllowed,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [menuNote, setMenuNote] = useState('');
  const [isMainMenu, setIsMainMenu] = useState(false);
  const onEditMenu = () => {
    console.log('EDIT MENU')
  }
  const onDeleteMenu = () => {

  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openEditPopup = () => setIsEditPopupOpen(true);
  const closeEditPopup = () => setIsEditPopupOpen(false);
  const openDeletePopup = () => setIsDeletePopupOpen(true);
  const closeDeletePopup = () => setIsDeletePopupOpen(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEditMenu({ name: menuName, note: menuNote, mainMenu: isMainMenu });
    closeEditPopup();
  };

  return (
    <div className="manage-menu-item-section-header-container">
        <div>
          <h2>
            <span className="menu-item-header">Menu Items</span>&nbsp;
            <span className="manage-menu-item-section-header-count">({menuItems?.length})</span>
          </h2>
        </div>
        <div className="manage-menu-item-section-header-pair">
          {menuItems?.length >= maxItems ? (
            <a
              href="#"
              style={{ cursor: 'not-allowed', color: 'grey' }}
              title="The limit is 50 items. Upgrade your account to add more than 50 menu items, or create a separate menu."
              onClick={(e) => e.preventDefault()}
            >
              Add Menu Item
            </a>
          ) : (
            <Link to="/manage-menu-item" className="add-menu-item-button">
                Add Menu Item
            </Link>
          )}
        </div>

      {/* Dropdown Menu */}
      <div className="manage-menu-item-section-header-dropdown">
        <div className="select-btn" onClick={toggleDropdown}>
          <span className="sBtn-text" style={{ fontSize: '14px' }}>
            Menu Actions
          </span>
          <i className={`bx bx-chevron-down chevron-icon ${isDropdownOpen ? 'open' : ''}`}></i>
        </div>
        {isDropdownOpen && (
          <div className="manage-menu-item-section-header-options">
            <p className="manage-menu-item-section-header-option" onClick={openEditPopup}>
              <img
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/edit-black.png"
                id="edit-icon-new"
                alt="Edit"
              />
              <span style={{ color: 'black', fontSize: '14px' }}>Edit Menu Name</span>
            </p>
            <p className="manage-menu-item-section-header-option" onClick={openDeletePopup}>
              <img
                src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/trash-can.png"
                id="trashcan"
                alt="Delete"
              />
              <span style={{ color: 'black', fontSize: '14px' }}>Delete Menu</span>
            </p>
          </div>
        )}
      </div>

      {/* Edit Menu Popup */}
      {isEditPopupOpen && (
        <div className="editPopup edit-menu-popup">
          <form className="form" onSubmit={handleEditSubmit}>
            <label htmlFor="menuName">Menu Name</label>
            <input
              type="text"
              id="menuName"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              required
            />
            <br />
            <span className="main-menu-field">
              <label htmlFor="isMainMenu">Main Menu</label>
              <input
                type="checkbox"
                id="isMainMenu"
                checked={isMainMenu}
                onChange={(e) => setIsMainMenu(e.target.checked)}
              />
            </span>
            <br />
            <label htmlFor="menuNote">Menu Note</label>
            <textarea
              id="menuNote"
              value={menuNote}
              onChange={(e) => setMenuNote(e.target.value)}
            />
            <div className="button-container">
              <button id="save-changes" className="edit" type="submit">
                Save Changes
              </button>
              <button className="cancel" type="button" onClick={closeEditPopup}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="popup" id="delete-popup">
          {isDeleteAllowed ? (
            <>
              <h2 className="popup-header">Delete Confirmation</h2>
              <p>
                Are you sure you want to delete this menu? <br />
                <br />
                <span style={{ color: '#e30303' }}>This cannot be undone</span>
              </p>
              <form onSubmit={onDeleteMenu}>
                <button
                  className="delete-popup-button"
                  id="delete-menu-button"
                  type="submit"
                  onClick={closeDeletePopup}
                >
                  Remove Menu
                </button>
                <button
                  className="delete-popup-button cancel-button"
                  type="button"
                  onClick={closeDeletePopup}
                >
                  Cancel
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="popup-header">Action Not Allowed</h2>
              <p>
                You cannot delete your only menu or a menu designated as your main menu.
                <br />
                <br />
                Please add another menu or designate a different menu as your main menu before
                attempting to delete this one.
              </p>
              <button
                className="delete-popup-button cancel-button"
                type="button"
                onClick={closeDeletePopup}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItemsSectionHeader;

