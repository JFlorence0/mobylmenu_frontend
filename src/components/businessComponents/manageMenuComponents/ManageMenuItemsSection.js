import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../styles/restaurantStyles/ManageMenuStyles.css';
import MenuItemsSectionHeader from './ManageMenuItemsSectionHeader';

const ManageMenuItemsSection = ({ categories, menuItems, onEdit, onDelete, onAdd }) => {
  return (
    <div>
      <MenuItemsSectionHeader menuItems={menuItems} isDeleteAllowed={false} />
    
    <div className="menu-item-list-container">
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <React.Fragment key={category.name}>
            <span className="category-title">{category.name}</span>
            {menuItems?.filter((item) => item.item_type === category.name).length > 0 ? (
              menuItems
                .filter((item) => item.item_type === category.name)
                .map((menuItem) => (
                  <div className="manage-menu-item-container" key={menuItem.id}>
                    <div className="edit-menu-item">
                      <div>
                        <span className="menu_item-name">
                          {menuItem.name}
                        </span>
                        {!menuItem.picture && (
                          <span style={{ color: '#FF3B30', fontSize: '1.5rem' }}>*</span>
                        )}
                        <br />
                        <small style={{ color: 'grey', fontSize: '0.8rem' }}>
                          {menuItem.price || 'NP'}
                        </small>
                        <br />
                      </div>
                      <div className="indicators">
                        {menuItem.vegan && (
                          <img
                            className="diet-icon"
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
                            alt="Vegan"
                          />
                        )}
                        {menuItem.vegetarian && (
                          <img
                            className="diet-icon"
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
                            alt="Vegetarian Icon"
                          />
                        )}
                        {menuItem.vegan_option && (
                          <>
                            <span style={{ color: 'green' }}>(</span>
                            <img
                              className="diet-icon"
                              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
                              alt="Vegan Option"
                            />
                            <span style={{ color: 'green' }}>)</span>
                          </>
                        )}
                        {menuItem.vegetarian_option && (
                          <>
                            <span style={{ color: 'green' }}>(</span>
                            <img
                              className="diet-icon"
                              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
                              alt="Vegetarian Option Icon"
                            />
                            <span style={{ color: 'green' }}>)</span>
                          </>
                        )}
                        {menuItem.gluten_free && (
                          <img
                            className="diet-icon"
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
                            alt="Gluten-free Icon"
                          />
                        )}
                        {menuItem.gluten_free_option && (
                          <>
                            <span style={{ color: 'orange', verticalAlign: 'middle' }}>
                              (
                            </span>
                            <img
                              className="diet-icon"
                              src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
                              alt="Gluten-free Option Icon"
                            />
                            <span style={{ color: 'orange' }}>)</span>
                          </>
                        )}
                        {menuItem.spicy && <span className="diet-icon">🌶️</span>}
                        {menuItem.contains_nuts && <span className="diet-icon">🥜</span>}
                        {menuItem.contains_alcohol && (
                          <img
                            className="diet-icon"
                            src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/martini6.png"
                            alt="Contains Alcohol Icon"
                          />
                        )}
                      </div>
                    </div>

                    <div className="action-container">
                      <Link
                        className="item-options"
                        to={`/menu/edit/${menuItem.id}`}
                      >
                        Edit Menu Item
                      </Link>
                      <Link
                        className="item-options"
                        to={`/menu/customize/${menuItem.id}`}
                      >
                        Customizable Options
                      </Link>
                      <a
                        href="#"
                        className="item-options item-delete"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            onDelete(menuItem); // Trigger delete action
                        }}
                        >
                        Delete Item
                      </a>

                    </div>
                  </div>
                ))
            ) : (
              <div className="empty-container">
                <span>No Items yet</span>
                <button onClick={() => onAdd(category)}>Add Items To Menu</button>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
        <div className="empty-container">
          <span>No Categories Yet</span>
        </div>
      )}
    </div>
    </div>
  );
};

export default ManageMenuItemsSection;
