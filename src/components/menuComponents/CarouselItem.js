import React from 'react';
import OrderInteractionContainer from './OrderInteractionContainer';

import '../../styles/menuStyles/MenuItemSection.css'

const CarouselItem = ({ menuItem, venue, orderingEnabled, tableId, addItemToOrder, addItemToOrderWithTableId }) => {
  return (
    <div className="carousel-item">
      <div className="item-container" data-category={menuItem.item_type}>
        {/* Header */}
        <div className="item-header">
          <div className="item-title">
            <h4 className="menu_item_title">{menuItem.name}</h4>
            <div className="price">
              {venue.country === 'Poland' ? `${menuItem.price} zł` : `$${menuItem.price}`}
            </div>
          </div>

          {/* Diet Icons */}
          <div className="diet-container">
            {menuItem.vegan || venue.plant_based && (
              <span className="vegan">
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
                  alt="Vegan icon"
                />
              </span>
            )}
            {menuItem.vegan_option && (
              <span className="vegan-option">
                <span style={{ color: 'green' }}>(</span>
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/vegan-symbol.png"
                  alt="Vegan option icon"
                />
                <span style={{ color: 'green' }}>)</span>
              </span>
            )}
            {menuItem.vegetarian && (
              <span className="vegetarian">
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
                  alt="Vegetarian icon"
                />
              </span>
            )}
            {menuItem.vegetarian_option && (
              <span className="vegetarian-option">
                <span style={{ color: 'green' }}>(</span>
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/V2.png"
                  alt="Vegetarian option icon"
                />
                <span style={{ color: 'green' }}>)</span>
              </span>
            )}
            {menuItem.gluten_free && (
              <span className="gluten-free">
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
                  alt="Gluten-free icon"
                />
              </span>
            )}
            {menuItem.gluten_free_option && (
              <span className="gluten-free-option">
                <span style={{ color: 'orange' }}>(</span>
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/wheat2.png"
                  alt="Gluten-free option icon"
                />
                <span style={{ color: 'orange' }}>)</span>
              </span>
            )}
            {menuItem.spicy && <span className="spicy">🌶️</span>}
            {menuItem.contains_nuts && <span className="nuts">🥜</span>}
            {menuItem.contains_alcohol && (
              <span className="alcohol">
                <img
                  className="diet-icon"
                  src="https://mobyl-menu-bucket.s3.amazonaws.com/MM-Images/martini6.png"
                  alt="Contains alcohol icon"
                />
              </span>
            )}
          </div>
        </div>

        {/* Picture */}
        {menuItem.picture && (
          <img
            className="picture-upload"
            src={menuItem.picture}
            alt={`Picture of ${menuItem.name}`}
            loading="lazy"
          />
        )}

        {/* Interaction Container */}
        {orderingEnabled && (
          <OrderInteractionContainer 
            menuItem={menuItem}
            venue={venue}
            tableId={tableId}
            addItemToOrder={addItemToOrder}
            addItemToOrderWithTableId={addItemToOrderWithTableId}
          />
        )}

        {/* Description */}
        <div className="item-description">{menuItem.description}</div>
      </div>
    </div>
  );
};

export default CarouselItem;