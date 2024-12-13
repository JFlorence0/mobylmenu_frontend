import React, { useState } from 'react';
import '../../../styles/restaurantStyles/FormStyles.css';

const FormButton = ({ onClick, title, disabled = false }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    if (disabled || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onClick();
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  return (
    <button
      className={`custom-form-button ${isSubmitting ? 'submitting' : ''}`}
      onClick={handleClick}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? (
        <svg
          className={`form-button-checkmark ${isSubmitting ? 'active' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            className="form-button-checkmark-path"
            fill="none"
            d="M2 12l7 7L22 4"
          />
        </svg>
      ) : (
        title
      )}
    </button>
  );
};

export default FormButton;