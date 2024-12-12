import React from 'react';

const DeleteConfirmationWindow = ({ title, confirmationText, setIsVisible, onDelete }) => {
  return (
    <div className="popup" id="popup">
          <h2>{title}</h2>
          <p>{confirmationText}</p>
          <button
            id="delete-button"
            className="delete-popup-button"
            onClick={ async () => {
              await onDelete()
              setIsVisible(false);
            }}
          >
            Remove Venue
          </button>
          <button
            id="cancel-button"
            className="cancel-button"
            onClick={() => setIsVisible(false)}
          >
            Cancel
          </button>
        </div>
  );
};

export default DeleteConfirmationWindow;