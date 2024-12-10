import React, { useState } from 'react';

const OrderInteractionContainer = ({
  menuItem,
  venue,
  tableId,
  addItemToOrder,
  addItemToOrderWithTableId,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [customizations, setCustomizations] = useState({});
  const [showOrderConfirmationWindow, setShowOrderConfirmationWindow] = useState(false);

  const handleQuantityChange = (value) => {
    setQuantity((prev) => Math.max(1, Math.min(100, prev + value)));
  };

  const handleCustomizationChange = (groupId, optionId, isMultiple) => {
    setCustomizations((prev) => {
      const newCustomizations = { ...prev };
      if (isMultiple) {
        newCustomizations[groupId] = newCustomizations[groupId] || [];
        if (newCustomizations[groupId].includes(optionId)) {
          newCustomizations[groupId] = newCustomizations[groupId].filter((id) => id !== optionId);
        } else {
          newCustomizations[groupId].push(optionId);
        }
      } else {
        newCustomizations[groupId] = [optionId];
      }
      return newCustomizations;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      menuItem,
      venue,
      quantity,
      note,
      customizations,
    };
    if (tableId) {
      addItemToOrderWithTableId(orderData, tableId);
    } else {
      addItemToOrder(orderData);
    }
  };

  console.log('MENU ITEM', menuItem)

  return (
    <div className="interaction-container">
      <a
        href="#"
        className="link circle"
        data-menu-item={menuItem.name}
        data-menu-item-price={menuItem.price}
        data-menu-item-id={menuItem.id}
        data-venue-id={venue.id}
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          setShowOrderConfirmationWindow(true); // Show confirmation form
        }}
      >
        <div className="plus-sign">
          <span className="quantity-number" id="circle-count"></span>
        </div>
      </a>

      {showOrderConfirmationWindow &&
      <form onSubmit={handleSubmit}>
        <div
        className="confirmation-window confirm-added-item"
        style={{ display: showOrderConfirmationWindow ? 'flex' : 'none' }}
        >
          <span className="confirmation-menu-item-header">{menuItem.name}</span>
          <span className="confirmation-menu-item-header-price">{menuItem.price}</span>

          {/* Customization Groups */}
          {menuItem.customization_groups &&
            menuItem.customization_groups.map((group) => (
              <div className="customization-group" key={group.id}>
                <span className="group-name">{group.name}</span>
                <div className="group-options">
                  {group.options.map((option) => (
                    <label className="group-option-label" key={option.id}>
                      <input
                        type={group.max_selections > 1 ? 'checkbox' : 'radio'}
                        name={`customization_group_${group.id}`}
                        value={option.id}
                        data-price-modifier={option.price_modifier}
                        onChange={() =>
                          handleCustomizationChange(group.id, option.id, group.maxSelections > 1)
                        }
                      />
                      {option.name}
                      {option.price_modifier && ` (+${option.price_modifier})`}
                    </label>
                  ))}
                </div>
              </div>
            ))}

          {/* Note Input */}
          <textarea
            className="note-input"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add any order modifications here"
          ></textarea>

          {/* Quantity Controls */}
          <div className="quantity-container">
            <button type="button" onClick={() => handleQuantityChange(-1)} className="decrement-button">
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
              min="1"
              max="100"
            />
            <button type="button" onClick={() => handleQuantityChange(1)} className="increment-button">
              +
            </button>
          </div>

          {/* Total Display */}
          <div className="current-item-total">
            Current Total: 
            <span className="current-item-total-display">
              ${(menuItem.price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="confirmation-button-container-longer">
            <button
              type="button"
              id="dismiss-button"
              className="dismiss-button"
              onClick={() => setShowOrderConfirmationWindow(false)}
            >
              Cancel
            </button>
            <button type="submit" id="confirm-button" className="confirm-button">
              Confirm
            </button>
          </div>
        </div>
      </form>
      }
    </div>
  );
};

export default OrderInteractionContainer;
